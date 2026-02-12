import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface IpApiResponse {
  status: string;
  country?: string;
  regionName?: string;
  city?: string;
  query?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 获取客户端IP
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                     req.headers.get("x-real-ip") ||
                     req.headers.get("cf-connecting-ip") ||
                     "unknown";

    // Parse body if present, but don't require it
    let sessionId: string | null = null;
    try {
      const body = await req.text();
      if (body && body.trim().length > 0) {
        try {
          const parsed = JSON.parse(body);
          sessionId = parsed.sessionId || null;
          // Validate sessionId format: must be a non-empty string, max 128 chars, alphanumeric/hyphens/underscores only
          if (sessionId && (typeof sessionId !== 'string' || sessionId.length > 128 || !/^[a-zA-Z0-9_-]+$/.test(sessionId))) {
            console.warn("Invalid sessionId format, ignoring:", sessionId);
            sessionId = null;
          }
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          // Continue without sessionId - not a fatal error
        }
      }
    } catch (error) {
      console.error("Body read error:", error);
      // No body or invalid JSON - that's fine for IP-only requests
    }

    let country = null;
    let region = null;
    let city = null;

    // 使用免费的IP地理位置API (ip-api.com)
    if (clientIp && clientIp !== "unknown" && !clientIp.startsWith("127.") && !clientIp.startsWith("192.168.") && !clientIp.startsWith("10.")) {
      try {
        const geoResponse = await fetch(`http://ip-api.com/json/${clientIp}?fields=status,country,regionName,city,query&lang=zh-CN`);
        if (geoResponse.ok) {
          const geoData: IpApiResponse = await geoResponse.json();
          if (geoData.status === "success") {
            country = geoData.country;
            region = geoData.regionName;
            city = geoData.city;
          }
        }
      } catch (geoError) {
        console.error("Geo lookup failed:", geoError);
      }
    }

    // 更新访客会话 (only if sessionId provided)
    if (sessionId) {
      const { error: updateError } = await supabase
        .from("visitor_sessions")
        .update({
          ip_address: clientIp,
          country,
          region,
          city,
        })
        .eq("session_id", sessionId);

      if (updateError) {
        console.error("Update session error:", updateError);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      ip: clientIp,
      country,
      region,
      city,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Get visitor IP error:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
