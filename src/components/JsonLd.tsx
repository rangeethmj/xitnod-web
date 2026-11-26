import React from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Renders Schema.org JSON-LD safely by escaping `<` to prevent `</script>` breakout XSS.
 */
export function JsonLd({ data }: JsonLdProps) {
  const safeJson = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}
