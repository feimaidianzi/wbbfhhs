// Baidu "普通收录" URL push API
// Pushes site URLs (zh + en) to Baidu Search via http://data.zz.baidu.com/urls
// Token is stored in BAIDU_PUSH_TOKEN secret. Admin-only.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BAIDU_SITE = "https://caniuav.com";
const BAIDU_ENDPOINT = `http://data.zz.baidu.com/urls?site=${encodeURIComponent(BAIDU_SITE)}&token=`;

// Pull all live URLs by reusing the dynamic-sitemap function output
async function fetchAllUrls(supabaseUrl: string): Promise<string[]> {
  const res = await fetch(`${supabaseUrl}/functions/v1/dynamic-sitemap`, {
    headers: { "Accept": "application/xml" },
  });
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  const matches = xml.match(/<loc>([^<]+)<\/loc>/g) ?? [];
  const urls = matches
    .map((m) => m.replace(/<\/?loc>/g, "").trim())
    .filter((u) => u.startsWith("http"));
  // De-dupe
  return Array.from(new Set(urls));
}

async function pushBatch(urls: string[], token: string): Promise<{
  success?: number; remain?: number; not_same_site?: string[]; not_valid?: string[]; error?: string; error_msg?: string;
}> {
  const body = urls.join("\n");
  const r = await fetch(BAIDU_ENDPOINT + token, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body,
  });
  const text = await r.text();
  try { return JSON.parse(text); } catch { return { error: `HTTP ${r.status}`, error_msg: text }; }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const token = Deno.env.get("BAIDU_PUSH_TOKEN");

    if (!token) {
      return new Response(JSON.stringify({ error: "BAIDU_PUSH_TOKEN not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Auth: triggered_by source — manual (admin) or auto (service-role from edge functions / triggers)
    let triggeredBy: "manual" | "auto" = "auto";
    let userEmail: string | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
        global: { headers: { Authorization: authHeader } },
      });
      const token = authHeader.replace("Bearer ", "");
      const { data: claims } = await userClient.auth.getClaims(token);
      if (claims?.claims?.sub) {
        // Verify admin role using service-role client (RLS-safe RPC)
        const adminClient = createClient(supabaseUrl, serviceKey);
        const { data: isAdmin } = await adminClient.rpc("has_role", {
          _user_id: claims.claims.sub, _role: "admin",
        });
        if (!isAdmin) {
          return new Response(JSON.stringify({ error: "Forbidden" }), {
            status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        triggeredBy = "manual";
        userEmail = claims.claims.email ?? null;
      }
    }

    // Optional: caller may pass specific URLs (e.g. on news publish auto-push)
    let urls: string[] = [];
    if (req.method === "POST") {
      try {
        const body = await req.json();
        if (Array.isArray(body?.urls) && body.urls.length > 0) {
          urls = body.urls.filter((u: unknown) => typeof u === "string" && u.startsWith("http"));
        }
      } catch { /* no body — fall through to full sitemap */ }
    }

    if (urls.length === 0) {
      urls = await fetchAllUrls(supabaseUrl);
    }

    // Baidu accepts up to 2000 URLs per request — chunk to be safe
    const CHUNK = 1500;
    const aggregate = { success: 0, remain: 0, not_same_site: [] as string[], not_valid: [] as string[] };
    const errors: string[] = [];

    for (let i = 0; i < urls.length; i += CHUNK) {
      const slice = urls.slice(i, i + CHUNK);
      const r = await pushBatch(slice, token);
      if (r.error) { errors.push(r.error_msg || r.error); continue; }
      aggregate.success += r.success ?? 0;
      aggregate.remain = r.remain ?? aggregate.remain;
      if (r.not_same_site) aggregate.not_same_site.push(...r.not_same_site);
      if (r.not_valid) aggregate.not_valid.push(...r.not_valid);
    }

    // Log to sitemap_submission_history
    const adminClient = createClient(supabaseUrl, serviceKey);
    await adminClient.from("sitemap_submission_history").insert({
      submission_type: "baidu_push",
      languages: ["zh", "en"],
      route_count: urls.length,
      status: errors.length === 0 ? "success" : "partial",
      triggered_by: userEmail ? `manual:${userEmail}` : triggeredBy,
      results: aggregate as any,
      error_message: errors.length ? errors.join("; ") : null,
      completed_at: new Date().toISOString(),
    });

    return new Response(JSON.stringify({
      ok: true,
      pushed: urls.length,
      ...aggregate,
      errors,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
