import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version, x-visitor-session-id',
};

const ALLOWED_FIELDS = [
  'session_id', 'event_type', 'event_name', 'event_data',
  'page_url', 'page_title', 'page_path',
  'element_id', 'element_class', 'element_text', 'element_tag',
  'product_id', 'product_name', 'product_category',
  'duration_seconds', 'scroll_depth',
];

function clampStr(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null;
  return v.slice(0, max);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const body = await req.json();
    const evt = body?.event;
    if (!evt || typeof evt !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const sessionId = clampStr(evt.session_id, 128);
    if (!sessionId || !/^[a-zA-Z0-9_-]+$/.test(sessionId)) {
      return new Response(JSON.stringify({ error: 'Invalid session_id' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify session exists to prevent event pollution for arbitrary IDs
    const { data: session } = await supabase
      .from('visitor_sessions')
      .select('session_id')
      .eq('session_id', sessionId)
      .maybeSingle();
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unknown session' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const row: Record<string, unknown> = {};
    for (const key of ALLOWED_FIELDS) {
      if (evt[key] === undefined) continue;
      if (key === 'event_data') {
        row[key] = evt[key] && typeof evt[key] === 'object' ? evt[key] : {};
      } else if (key === 'duration_seconds' || key === 'scroll_depth') {
        const n = Number(evt[key]);
        if (!Number.isFinite(n) || n < 0) continue;
        row[key] = Math.floor(Math.min(n, key === 'scroll_depth' ? 100 : 86400));
      } else {
        const maxLen = key === 'page_url' ? 2000
          : key === 'page_title' || key === 'page_path' || key === 'element_class' ? 500
          : key === 'element_text' ? 100
          : key === 'element_id' || key === 'event_name' || key === 'product_name' ? 200
          : 128;
        const s = clampStr(evt[key], maxLen);
        if (s !== null) row[key] = s;
      }
    }
    row.session_id = sessionId;

    const { error } = await supabase.from('visitor_events').insert(row);
    if (error) {
      console.error('Insert error:', error);
      return new Response(JSON.stringify({ error: 'Insert failed' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('insert-visitor-event error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
