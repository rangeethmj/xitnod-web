export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  services: string[];
  engagement: string;
  message: string;
  website?: string;
  turnstileToken?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactPayload, string>>;
  sanitized?: ContactPayload;
}

export const ALLOWED_SERVICES = new Set([
  "01 · Cloud & Infrastructure",
  "02 · SOC & Threat Defense",
  "03 · Web Development",
  "04 · Applied AI & Governance",
]);

export const ALLOWED_ENGAGEMENTS = new Set([
  "Fixed-Scope Sprint (1-3 Weeks)",
  "Fractional Engineering Retainer",
  "Security / Architecture Advisory",
  "Not sure yet, let's scope together",
]);

const DEFAULT_ENGAGEMENT = "Fixed-Scope Sprint (1-3 Weeks)";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function cleanText(input: unknown, maxLen: number): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\u0000-\u001F\u007F\r\n]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

export function validateContactPayload(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { valid: false, errors: { message: "Invalid request payload." } };
  }

  const body = raw as Record<string, unknown>;
  const errors: Partial<Record<keyof ContactPayload, string>> = {};

  const name = cleanText(body.name, 100);
  const email = cleanText(body.email, 140).toLowerCase();
  const company = cleanText(body.company, 120);
  const rawEngagement = cleanText(body.engagement, 80);
  const engagement = ALLOWED_ENGAGEMENTS.has(rawEngagement) ? rawEngagement : DEFAULT_ENGAGEMENT;
  const message =
    typeof body.message === "string"
      ? body.message.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, 2500)
      : "";
  const website = cleanText(body.website, 120);
  const turnstileToken = cleanText(body.turnstileToken, 2048);

  const rawServices = Array.isArray(body.services) ? body.services : [];
  const services = Array.from(
    new Set(
      rawServices
        .filter((s): s is string => typeof s === "string" && ALLOWED_SERVICES.has(s))
        .slice(0, 4)
    )
  );

  if (name.length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_RE.test(email)) {
    errors.email = "Please enter a valid work email address.";
  }
  if (services.length === 0) {
    errors.services = "Select at least one service area.";
  }
  if (message.length < 15) {
    errors.message = "Please share a brief overview of what you are building or securing (15+ characters).";
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      name,
      email,
      company,
      services,
      engagement,
      message,
      website,
      turnstileToken,
    },
  };
}
