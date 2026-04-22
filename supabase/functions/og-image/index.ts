// Public Edge Function: dynamic Open Graph image generator (1200x630 SVG)
// Returns an SVG response that social platforms render as a share card.
// Usage: /functions/v1/og-image?title=Hello&subtitle=News&category=Tech
//
// Why SVG instead of PNG?
// - Zero dependencies (no canvas/satori), instant cold start
// - Twitter, LinkedIn, Facebook, WhatsApp all rasterize SVG OG images
// - Cacheable at the CDN edge

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// Naive width-aware line wrapper. Assumes ~18px avg per char at 64px font.
const wrapText = (text: string, maxCharsPerLine: number, maxLines: number): string[] => {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  // Handle CJK (no spaces) by character chunking
  if (words.length === 1 && text.length > maxCharsPerLine) {
    for (let i = 0; i < text.length && lines.length < maxLines; i += maxCharsPerLine) {
      lines.push(text.slice(i, i + maxCharsPerLine));
    }
  } else {
    for (const w of words) {
      const candidate = current ? `${current} ${w}` : w;
      if (candidate.length > maxCharsPerLine) {
        if (current) lines.push(current);
        current = w;
        if (lines.length >= maxLines) break;
      } else {
        current = candidate;
      }
    }
    if (current && lines.length < maxLines) lines.push(current);
  }
  if (lines.length === maxLines && text.length > lines.join(" ").length) {
    lines[maxLines - 1] = lines[maxLines - 1].replace(/.{0,3}$/, "…");
  }
  return lines;
};

const buildSvg = (opts: {
  title: string;
  subtitle?: string;
  category?: string;
  brand: string;
}) => {
  const { title, subtitle, category, brand } = opts;
  const titleLines = wrapText(title, 30, 3);
  const subtitleLines = subtitle ? wrapText(subtitle, 60, 2) : [];

  const titleY = 220;
  const lineHeight = 78;
  const subtitleY = titleY + titleLines.length * lineHeight + 30;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0f1a"/>
      <stop offset="50%" stop-color="#0f1a2e"/>
      <stop offset="100%" stop-color="#1a2845"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.6">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Grid pattern for tech feel -->
  <g stroke="#3b82f6" stroke-opacity="0.06" stroke-width="1">
    ${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="630"/>`).join("")}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="1200" y2="${i * 100}"/>`).join("")}
  </g>

  <!-- Top accent bar -->
  <rect x="80" y="80" width="80" height="6" fill="url(#accent)" rx="3"/>

  ${
    category
      ? `<text x="80" y="140" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="28" font-weight="600" fill="#06b6d4" letter-spacing="2">${escapeXml(category.toUpperCase())}</text>`
      : ""
  }

  <!-- Title -->
  <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans', sans-serif" font-weight="800" fill="#ffffff">
    ${titleLines
      .map(
        (line, i) =>
          `<text x="80" y="${titleY + i * lineHeight}" font-size="68">${escapeXml(line)}</text>`,
      )
      .join("")}
  </g>

  <!-- Subtitle -->
  ${
    subtitleLines.length > 0
      ? `<g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="28" fill="#cbd5e1">
        ${subtitleLines
          .map(
            (line, i) =>
              `<text x="80" y="${subtitleY + i * 40}">${escapeXml(line)}</text>`,
          )
          .join("")}
      </g>`
      : ""
  }

  <!-- Bottom brand bar -->
  <line x1="80" y1="540" x2="1120" y2="540" stroke="#1e3a5f" stroke-width="1"/>
  <text x="80" y="585" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="32" font-weight="700" fill="#ffffff">${escapeXml(brand)}</text>
  <text x="80" y="612" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="20" fill="#64748b">caniuav.com · Industrial UAV Components</text>

  <!-- Decorative tech badge -->
  <g transform="translate(1000, 555)">
    <rect x="0" y="0" width="120" height="44" rx="22" fill="#3b82f6" fill-opacity="0.15" stroke="#3b82f6" stroke-opacity="0.4" stroke-width="1.5"/>
    <text x="60" y="29" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="18" font-weight="700" fill="#06b6d4" text-anchor="middle">CANI</text>
  </g>
</svg>`;
};

Deno.serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const title = (url.searchParams.get("title") || "Industrial UAV Components").slice(0, 200);
    const subtitle = (url.searchParams.get("subtitle") || "").slice(0, 200);
    const category = (url.searchParams.get("category") || "").slice(0, 60);
    const brand = (url.searchParams.get("brand") || "CANI Technology").slice(0, 60);

    const svg = buildSvg({ title, subtitle, category, brand });

    return new Response(svg, {
      headers: {
        ...corsHeaders,
        "Content-Type": "image/svg+xml; charset=utf-8",
        // Cache at the edge for a day; share platforms also cache aggressively
        "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable",
      },
    });
  } catch (e) {
    return new Response(`OG image error: ${(e as Error).message}`, {
      status: 500,
      headers: corsHeaders,
    });
  }
});
