// Dynamic sitemap.xml generator — pulls products and news articles from the
// database and emits a fully populated sitemap with hreflang alternates for
// every supported locale. Public endpoint (no auth required).
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SUPPORTED_LANGUAGES = [
  "zh", "en", "ja", "ko", "vi", "th", "ms", "id",
  "fr", "de", "es", "ru", "ar", "tr",
];

const BASE_DOMAIN = "caniuav.com";

const STATIC_ROUTES: { path: string; priority: string; changefreq: string }[] = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
  { path: "/news", priority: "0.9", changefreq: "daily" },
  { path: "/products", priority: "0.9", changefreq: "weekly" },
  { path: "/applications", priority: "0.8", changefreq: "weekly" },
  { path: "/software", priority: "0.8", changefreq: "weekly" },
  { path: "/projects", priority: "0.7", changefreq: "monthly" },
  { path: "/fpv", priority: "0.8", changefreq: "weekly" },
  { path: "/custom-research", priority: "0.7", changefreq: "monthly" },
  // Product categories
  { path: "/products/multi-rotor", priority: "0.9", changefreq: "weekly" },
  { path: "/products/logistics", priority: "0.9", changefreq: "weekly" },
  { path: "/products/tethered", priority: "0.9", changefreq: "weekly" },
  { path: "/products/firefighting", priority: "0.9", changefreq: "weekly" },
  { path: "/products/swarm", priority: "0.9", changefreq: "weekly" },
  { path: "/products/swarm-kit", priority: "0.9", changefreq: "weekly" },
  { path: "/products/accessories", priority: "0.9", changefreq: "weekly" },
  { path: "/products/training", priority: "0.8", changefreq: "monthly" },
  { path: "/products/agriculture", priority: "0.8", changefreq: "monthly" },
  { path: "/products/wire-laying", priority: "0.8", changefreq: "monthly" },
  { path: "/products/work-drone", priority: "0.8", changefreq: "monthly" },
  // Product details (hardcoded)
  { path: "/products/multi-rotor/x650", priority: "0.8", changefreq: "monthly" },
  { path: "/products/multi-rotor/x850", priority: "0.8", changefreq: "monthly" },
  { path: "/products/multi-rotor/x1200", priority: "0.8", changefreq: "monthly" },
  { path: "/products/multi-rotor/x1600", priority: "0.8", changefreq: "monthly" },
  { path: "/products/logistics/wl-10", priority: "0.8", changefreq: "monthly" },
  { path: "/products/logistics/wl-20", priority: "0.8", changefreq: "monthly" },
  { path: "/products/logistics/wl-30", priority: "0.8", changefreq: "monthly" },
  { path: "/products/tethered/th-100", priority: "0.8", changefreq: "monthly" },
  { path: "/products/tethered/th-200", priority: "0.8", changefreq: "monthly" },
  { path: "/products/tethered/th-300", priority: "0.8", changefreq: "monthly" },
  { path: "/products/swarm/w200", priority: "0.8", changefreq: "monthly" },
  { path: "/products/swarm/w300", priority: "0.8", changefreq: "monthly" },
  { path: "/products/swarm/w400", priority: "0.8", changefreq: "monthly" },
  // Accessory categories
  { path: "/products/accessories/vtx-vrx", priority: "0.8", changefreq: "weekly" },
  { path: "/products/accessories/fc-esc", priority: "0.8", changefreq: "weekly" },
  { path: "/products/accessories/gimbal", priority: "0.8", changefreq: "weekly" },
  { path: "/products/accessories/camera", priority: "0.8", changefreq: "weekly" },
  { path: "/products/accessories/digital-fpv", priority: "0.8", changefreq: "weekly" },
  { path: "/products/accessories/elrs", priority: "0.8", changefreq: "weekly" },
  { path: "/products/accessories/others", priority: "0.7", changefreq: "weekly" },
  { path: "/products/accessories/mesh-link", priority: "0.8", changefreq: "weekly" },
  { path: "/products/accessories/ai-module", priority: "0.8", changefreq: "weekly" },
  // Applications
  { path: "/applications/power-inspection", priority: "0.8", changefreq: "monthly" },
  { path: "/applications/power-inspection/transmission-line", priority: "0.7", changefreq: "monthly" },
  { path: "/applications/power-inspection/substation", priority: "0.7", changefreq: "monthly" },
  { path: "/applications/power-inspection/solar-panel", priority: "0.7", changefreq: "monthly" },
  { path: "/applications/logistics", priority: "0.8", changefreq: "monthly" },
  { path: "/applications/military", priority: "0.8", changefreq: "monthly" },
  { path: "/applications/solutions", priority: "0.8", changefreq: "monthly" },
  // Solutions
  { path: "/solutions/industrial-uav-environmental-monitoring", priority: "0.8", changefreq: "monthly" },
  { path: "/solutions/uav-firefighting-emergency-rescue", priority: "0.8", changefreq: "monthly" },
  { path: "/solutions/industrial-uav-water-conservancy", priority: "0.8", changefreq: "monthly" },
  { path: "/solutions/industrial-uav-transportation-monitoring", priority: "0.8", changefreq: "monthly" },
  { path: "/solutions/industrial-uav-surveying-mapping", priority: "0.8", changefreq: "monthly" },
  // Software
  { path: "/software/ground-station", priority: "0.8", changefreq: "monthly" },
  { path: "/software/swarm-ground-station", priority: "0.8", changefreq: "monthly" },
  { path: "/software/drone-management", priority: "0.8", changefreq: "monthly" },
  { path: "/software/power-inspection-system", priority: "0.8", changefreq: "monthly" },
  { path: "/software/pv-inspection", priority: "0.7", changefreq: "monthly" },
  { path: "/software/pv-system", priority: "0.7", changefreq: "monthly" },
  { path: "/software/environment-system", priority: "0.7", changefreq: "monthly" },
  { path: "/software/exam-system", priority: "0.7", changefreq: "monthly" },
  // Custom research
  { path: "/custom-research/drone", priority: "0.7", changefreq: "monthly" },
  { path: "/custom-research/payload", priority: "0.7", changefreq: "monthly" },
  { path: "/custom-research/accessories", priority: "0.7", changefreq: "monthly" },
  { path: "/custom-research/swarm", priority: "0.7", changefreq: "monthly" },
  { path: "/custom-research/software", priority: "0.7", changefreq: "monthly" },
  // Projects
  { path: "/projects/flight-service", priority: "0.7", changefreq: "monthly" },
  { path: "/projects/show", priority: "0.7", changefreq: "monthly" },
  { path: "/projects/cooperation", priority: "0.7", changefreq: "monthly" },
  { path: "/projects/training", priority: "0.7", changefreq: "monthly" },
];

function getDomainForLanguage(lang: string): string {
  const subdomain = lang === "zh" ? "www" : lang;
  return `https://${subdomain}.${BASE_DOMAIN}`;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildUrlEntry(
  path: string,
  lastmod: string,
  changefreq: string,
  priority: string,
): string {
  const safePath = escapeXml(path);
  const alternates = SUPPORTED_LANGUAGES.map((altLang) => {
    const altDomain = getDomainForLanguage(altLang);
    const hreflang = altLang === "zh" ? "zh-CN" : altLang;
    return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${altDomain}${safePath}" />`;
  }).join("\n");
  // Default loc uses the English (root) domain.
  const defaultDomain = getDomainForLanguage("en");
  return `  <url>
    <loc>${defaultDomain}${safePath}</loc>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultDomain}${safePath}" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Pull published products and news articles in parallel.
    const [productsResp, newsResp] = await Promise.all([
      supabase
        .from("products")
        .select("id, updated_at")
        .eq("is_published", true),
      supabase
        .from("news_articles")
        .select("id, updated_at, published_at")
        .eq("is_published", true),
    ]);

    if (productsResp.error) console.error("products error:", productsResp.error);
    if (newsResp.error) console.error("news error:", newsResp.error);

    const products = productsResp.data ?? [];
    const news = newsResp.data ?? [];

    const todayIso = new Date().toISOString().split("T")[0];

    const entries: string[] = [];

    // 1) Static routes
    for (const route of STATIC_ROUTES) {
      entries.push(
        buildUrlEntry(route.path, todayIso, route.changefreq, route.priority),
      );
    }

    // 2) Database product detail pages
    for (const p of products) {
      const lastmod = p.updated_at
        ? new Date(p.updated_at).toISOString().split("T")[0]
        : todayIso;
      entries.push(
        buildUrlEntry(
          `/products/detail/${p.id}`,
          lastmod,
          "weekly",
          "0.7",
        ),
      );
    }

    // 3) News article pages
    for (const n of news) {
      const lastmod = n.updated_at || n.published_at
        ? new Date(n.updated_at ?? n.published_at!).toISOString().split("T")[0]
        : todayIso;
      entries.push(
        buildUrlEntry(`/news/${n.id}`, lastmod, "weekly", "0.6"),
      );
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        // Cache at edge for 1 hour to reduce DB load while keeping data fresh.
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("dynamic-sitemap error:", message);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Error generating sitemap: ${escapeXml(message)} -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/xml; charset=utf-8",
        },
      },
    );
  }
});
