import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Verify the caller is an admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);
    const anonClient = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });

    // Get current user
    const { data: { user }, error: userError } = await anonClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check admin role
    const { data: roleData } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: 'Forbidden: admin role required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const { action } = body;

    if (action === 'get-status') {
      // Return only configuration status, NOT the actual key values
      const { data, error } = await supabaseClient
        .from('seo_api_keys')
        .select('key_name, is_configured, last_used_at');

      if (error) throw error;

      const status: Record<string, boolean> = {};
      data?.forEach((row: any) => {
        status[row.key_name] = row.is_configured || false;
      });

      return new Response(JSON.stringify({ success: true, status }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'save-keys') {
      const { keys } = body;
      if (!keys || typeof keys !== 'object') {
        return new Response(JSON.stringify({ error: 'Invalid keys payload' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const allowedKeys = ['google_oauth_token', 'baidu_token', 'bing_api_key', 'yandex_user_id', 'yandex_api_key', 'so360_site_token'];
      
      for (const [keyName, keyValue] of Object.entries(keys)) {
        if (!allowedKeys.includes(keyName)) continue;
        
        const value = typeof keyValue === 'string' ? keyValue : null;
        const { error } = await supabaseClient
          .from('seo_api_keys')
          .update({
            key_value: value || null,
            is_configured: !!value,
            updated_at: new Date().toISOString(),
          })
          .eq('key_name', keyName);

        if (error) throw error;
      }

      return new Response(JSON.stringify({ success: true, message: 'Keys saved' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('manage-seo-keys error:', err);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
