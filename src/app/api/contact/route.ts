import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/validation";
import { SITE } from "@/data/site";

// Bounded in-memory sliding-window rate limiter (defense-in-depth alongside Cloudflare WAF / Redis)
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_TRACKED_IPS = 1000;
const MAX_BODY_BYTES = 16 * 1024; // 16 KB
const UPSTREAM_TIMEOUT_MS = 8000;

const ipHits = new Map<string, number[]>();

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
};

function getClientIp(req: NextRequest): string {
  // Prefer single-value trusted proxy headers set by Cloudflare / Vercel before x-forwarded-for
  const cfIp = req.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp.slice(0, 64);

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp.slice(0, 64);

  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length > 0) {
      // Rightmost entry appended by the nearest reverse proxy is harder to spoof than index 0
      return parts[parts.length - 1].slice(0, 64);
    }
  }
  return "unknown";
}

function checkRateLimit(ip: string): { limited: boolean; retryAfterSec: number } {
  const now = Date.now();

  // Opportunistic pruning when map grows large to prevent memory-exhaustion DoS
  if (ipHits.size >= MAX_TRACKED_IPS) {
    for (const [key, list] of ipHits.entries()) {
      const fresh = list.filter((ts) => now - ts < RATE_WINDOW_MS);
      if (fresh.length === 0) {
        ipHits.delete(key);
      } else {
        ipHits.set(key, fresh);
      }
    }
    // Hard eviction cap if still at limit
    if (ipHits.size >= MAX_TRACKED_IPS) {
      const oldestKey = ipHits.keys().next().value;
      if (oldestKey !== undefined) ipHits.delete(oldestKey);
    }
  }

  const timestamps = (ipHits.get(ip) || []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipHits.set(ip, timestamps);
    const oldest = timestamps[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((RATE_WINDOW_MS - (now - oldest)) / 1000));
    return { limited: true, retryAfterSec };
  }

  timestamps.push(now);
  ipHits.set(ip, timestamps);
  return { limited: false, retryAfterSec: 0 };
}

function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // Non-browser / same-origin requests without Origin header

  try {
    const incoming = new URL(origin);
    const configured = new URL(SITE.url);
    if (incoming.origin === configured.origin) return true;
    if (
      process.env.NODE_ENV !== "production" &&
      (incoming.hostname === "localhost" || incoming.hostname === "127.0.0.1")
    ) {
      return true;
    }
    // Allow same-host deployment previews (e.g., *.vercel.app matching request Host header)
    const reqHost = req.headers.get("host");
    if (reqHost && incoming.host === reqHost) return true;
  } catch {
    return false;
  }
  return false;
}

function generateReferenceId(): string {
  const rand = crypto.randomBytes(3).toString("hex").toUpperCase();
  const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  return `XTN-${datePart}-${rand}`;
}

export async function POST(req: NextRequest) {
  // 1. CSRF / Origin check
  if (!isAllowedOrigin(req)) {
    return NextResponse.json(
      { message: "Cross-origin requests are not permitted." },
      { status: 403, headers: NO_STORE_HEADERS }
    );
  }

  // 2. Enforce JSON Content-Type
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { message: "Unsupported Content-Type. Expected application/json." },
      { status: 415, headers: NO_STORE_HEADERS }
    );
  }

  // 3. Sliding-window rate limiting
  const clientIp = getClientIp(req);
  const { limited, retryAfterSec } = checkRateLimit(clientIp);
  if (limited) {
    return NextResponse.json(
      { message: "Too many inquiries sent recently. Please wait a few minutes and try again." },
      {
        status: 429,
        headers: {
          ...NO_STORE_HEADERS,
          "Retry-After": String(retryAfterSec),
        },
      }
    );
  }

  // 4. Enforce body size cap before parsing JSON
  const contentLengthHeader = req.headers.get("content-length");
  if (contentLengthHeader && Number(contentLengthHeader) > MAX_BODY_BYTES) {
    return NextResponse.json(
      { message: "Request payload exceeds maximum allowed size." },
      { status: 413, headers: NO_STORE_HEADERS }
    );
  }

  let body: unknown;
  try {
    const rawText = await req.text();
    if (Buffer.byteLength(rawText, "utf8") > MAX_BODY_BYTES) {
      return NextResponse.json(
        { message: "Request payload exceeds maximum allowed size." },
        { status: 413, headers: NO_STORE_HEADERS }
      );
    }
    body = JSON.parse(rawText);
  } catch {
    return NextResponse.json(
      { message: "Malformed JSON request." },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  // 5. Early honeypot check: silently discard automated bots before validation hints leak
  if (
    body &&
    typeof body === "object" &&
    "website" in body &&
    typeof (body as Record<string, unknown>).website === "string" &&
    ((body as Record<string, unknown>).website as string).trim().length > 0
  ) {
    return NextResponse.json(
      {
        ok: true,
        referenceId: generateReferenceId(),
        receivedAt: new Date().toISOString(),
      },
      { headers: NO_STORE_HEADERS }
    );
  }

  // 6. Strict server-side validation & allowlist enforcement
  const result = validateContactPayload(body);
  if (!result.valid || !result.sanitized) {
    return NextResponse.json(
      { message: "Please fix the highlighted fields.", errors: result.errors },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  const data = result.sanitized;

  // 7. Fail-closed Cloudflare Turnstile verification whenever TURNSTILE_SECRET_KEY is configured
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    if (!data.turnstileToken) {
      return NextResponse.json(
        { message: "Bot verification token is required. Please complete the challenge and retry." },
        { status: 403, headers: NO_STORE_HEADERS }
      );
    }

    try {
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: data.turnstileToken,
          remoteip: clientIp,
        }),
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });

      if (!verifyRes.ok) {
        return NextResponse.json(
          { message: "Verification service temporarily unavailable. Please try again shortly." },
          { status: 503, headers: NO_STORE_HEADERS }
        );
      }

      const verifyJson = (await verifyRes.json()) as { success?: boolean };
      if (!verifyJson.success) {
        return NextResponse.json(
          { message: "Bot verification failed. Please refresh and try again." },
          { status: 403, headers: NO_STORE_HEADERS }
        );
      }
    } catch {
      return NextResponse.json(
        { message: "Verification service timed out. Please try again shortly." },
        { status: 503, headers: NO_STORE_HEADERS }
      );
    }
  }

  const referenceId = generateReferenceId();
  const receivedAt = new Date().toISOString();

  // 8. Resend email delivery (fail closed in production if unconfigured; non-PII log in dev)
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const toEmail = process.env.CONTACT_TO_EMAIL || SITE.email;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "XITNOD Website <noreply@xitnod.com>";

    try {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: data.email,
          subject: `[${referenceId}] New XITNOD Inquiry: ${data.name}${data.company ? ` (${data.company})` : ""}`,
          text: [
            `Reference: ${referenceId}`,
            `Received: ${receivedAt}`,
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Company: ${data.company || "Not provided"}`,
            `Engagement: ${data.engagement}`,
            `Services: ${data.services.join(", ")}`,
            "",
            "Brief:",
            data.message,
          ].join("\n"),
        }),
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });

      if (!emailRes.ok) {
        console.error(`[XITNOD Contact] Resend delivery failed with status ${emailRes.status} (ref: ${referenceId})`);
        return NextResponse.json(
          { message: `We could not dispatch your brief right now. Please email ${SITE.email}.` },
          { status: 502, headers: NO_STORE_HEADERS }
        );
      }
    } catch {
      console.error(`[XITNOD Contact] Resend upstream request timed out (ref: ${referenceId})`);
      return NextResponse.json(
        { message: `We could not reach our mail relay right now. Please email ${SITE.email}.` },
        { status: 504, headers: NO_STORE_HEADERS }
      );
    }
  } else if (process.env.NODE_ENV === "production") {
    console.error("[XITNOD Contact] RESEND_API_KEY is not configured in production.");
    return NextResponse.json(
      { message: `Contact relay is not yet configured. Please email ${SITE.email} directly.` },
      { status: 503, headers: NO_STORE_HEADERS }
    );
  } else {
    // Local development only: log non-PII metadata
    console.info("[XITNOD Contact Inquiry - Dev Mode]", {
      referenceId,
      receivedAt,
      engagement: data.engagement,
      services: data.services,
    });
  }

  return NextResponse.json(
    {
      ok: true,
      referenceId,
      receivedAt,
    },
    { headers: NO_STORE_HEADERS }
  );
}
