import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Supported languages for sitemap generation
const SUPPORTED_LANGUAGES = [
  'zh', 'en', 'ja', 'ko', 'vi', 'th', 'ms', 'id', 
  'fr', 'de', 'es', 'ru', 'ar', 'tr'
];

const BASE_DOMAIN = 'caniuav.com';

// Static routes for sitemap
const STATIC_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/products',
  '/applications',
  '/news',
  '/projects',
  '/software',
  '/fpv',
  '/low-altitude',
  '/custom-research',
  // Product categories
  '/products/multi-rotor',
  '/products/logistics',
  '/products/tethered',
  '/products/airport',
  '/products/firefighting',
  '/products/swarm',
  '/products/accessories',
  '/products/training',
  // Application pages
  '/applications/power',
  '/applications/power-inspection',
  '/applications/military',
  '/applications/police',
  '/applications/emergency',
  '/applications/environment',
  '/applications/water',
  '/applications/traffic',
  '/applications/surveying',
  '/applications/smart-city',
  '/applications/5g',
  '/applications/logistics',
  '/applications/firefighting',
  '/applications/tethered',
  '/applications/solutions',
  // Software pages
  '/software/ground-station',
  '/software/swarm-ground-station',
  '/software/drone-management',
  '/software/power-inspection',
  '/software/pv-inspection',
  '/software/pv-system',
  '/software/environment-system',
  '/software/exam-system',
  // Custom research
  '/custom-research/drone',
  '/custom-research/payload',
  '/custom-research/accessories',
  '/custom-research/airport',
  '/custom-research/swarm',
  '/custom-research/software',
  // Projects
  '/projects/flight-service',
  '/projects/drone-show',
  '/projects/cooperation',
  '/projects/training',
];

// Product detail routes
const PRODUCT_DETAIL_ROUTES = [
  // Multi-rotor
  '/products/multi-rotor/x650',
  '/products/multi-rotor/x850',
  '/products/multi-rotor/x1200',
  '/products/multi-rotor/x1600',
  // Logistics
  '/products/logistics/wl10',
  '/products/logistics/wl20',
  '/products/logistics/wl30',
  // Tethered
  '/products/tethered/th100',
  '/products/tethered/th200',
  '/products/tethered/th300',
  // Airport
  '/products/airport/uhs400p',
  '/products/airport/uhs600',
  '/products/airport/uhs1000',
  '/products/airport/vehicle-mounted',
];

function getSubdomain(lang: string): string {
  return lang === 'zh' ? 'www' : lang;
}

function getDomainForLanguage(lang: string): string {
  const subdomain = getSubdomain(lang);
  return `https://${subdomain}.${BASE_DOMAIN}`;
}

function generateSitemapXML(lang: string, routes: string[], lastmod: string): string {
  const domain = getDomainForLanguage(lang);
  
  const urls = routes.map(route => {
    // Generate hreflang alternates for all languages
    const alternates = SUPPORTED_LANGUAGES.map(altLang => {
      const altDomain = getDomainForLanguage(altLang);
      return `    <xhtml:link rel="alternate" hreflang="${altLang === 'zh' ? 'zh-CN' : altLang}" href="${altDomain}${route}" />`;
    }).join('\n');
    
    return `  <url>
    <loc>${domain}${route}</loc>
${alternates}
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : route.startsWith('/products/') ? '0.9' : '0.8'}</priority>
  </url>`;
  }).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
}

function generateSitemapIndex(languages: string[], lastmod: string): string {
  const sitemaps = languages.map(lang => {
    const domain = getDomainForLanguage(lang);
    return `  <sitemap>
    <loc>${domain}/sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`;
  }).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;
}

async function submitToGoogle(sitemapUrl: string, accessToken?: string): Promise<{ success: boolean; message: string }> {
  // Google Search Console API requires OAuth2 authentication
  // For now, return instructions for manual submission
  if (!accessToken) {
    return {
      success: false,
      message: `请手动提交到 Google Search Console: https://search.google.com/search-console/sitemaps?resource_id=${encodeURIComponent(sitemapUrl.split('/sitemap')[0])}`
    };
  }
  
  try {
    const response = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(sitemapUrl.split('/sitemap')[0])}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (response.ok) {
      return { success: true, message: 'Successfully submitted to Google' };
    } else {
      const error = await response.text();
      return { success: false, message: `Google submission failed: ${error}` };
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Google submission error: ${errorMessage}` };
  }
}

async function submitToBaidu(sitemapUrl: string, baiduToken?: string): Promise<{ success: boolean; message: string }> {
  if (!baiduToken) {
    return {
      success: false,
      message: '请在百度站长平台手动提交: https://ziyuan.baidu.com/linksubmit/index'
    };
  }
  
  try {
    // Baidu sitemap ping
    const domain = sitemapUrl.split('/sitemap')[0].replace('https://', '');
    const pingUrl = `http://data.zz.baidu.com/urls?site=${domain}&token=${baiduToken}`;
    
    const response = await fetch(pingUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: sitemapUrl,
    });
    
    const result = await response.json();
    if (result.success) {
      return { success: true, message: 'Successfully submitted to Baidu' };
    } else {
      return { success: false, message: `Baidu submission: ${JSON.stringify(result)}` };
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Baidu submission error: ${errorMessage}` };
  }
}

async function submitToBing(sitemapUrl: string, bingApiKey?: string): Promise<{ success: boolean; message: string }> {
  if (!bingApiKey) {
    return {
      success: false,
      message: '请在 Bing Webmaster Tools 手动提交: https://www.bing.com/webmasters/sitemaps'
    };
  }
  
  try {
    const response = await fetch(
      `https://ssl.bing.com/webmaster/api.svc/json/SubmitSitemap?siteUrl=${encodeURIComponent(sitemapUrl.split('/sitemap')[0])}&feedPath=${encodeURIComponent(sitemapUrl)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apiKey': bingApiKey,
        },
      }
    );
    
    if (response.ok) {
      return { success: true, message: 'Successfully submitted to Bing' };
    } else {
      const error = await response.text();
      return { success: false, message: `Bing submission failed: ${error}` };
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Bing submission error: ${errorMessage}` };
  }
}

// Helper to send email notification
async function sendEmailNotification(
  type: string,
  status: string,
  languages: string[],
  routeCount: number,
  errorMessage: string | null
) {
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
  const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'admin@caniuav.com';
  
  if (!RESEND_API_KEY) {
    console.log('RESEND_API_KEY not configured, skipping email notification');
    return;
  }

  try {
    const statusEmoji = status === 'success' ? '✅' : status === 'partial' ? '⚠️' : '❌';
    const statusText = status === 'success' ? '成功' : status === 'partial' ? '部分成功' : '失败';
    const typeText = type === 'generate' ? 'Sitemap生成' : type === 'submit' ? 'Sitemap提交' : 'Sitemap Ping';
    
    const subject = `${statusEmoji} ${typeText}${statusText} - CANI SEO通知`;
    
    const html = `
      <h2>${statusEmoji} ${typeText}${statusText}</h2>
      <p><strong>时间:</strong> ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</p>
      <p><strong>操作类型:</strong> ${typeText}</p>
      <p><strong>状态:</strong> ${statusText}</p>
      <p><strong>语言:</strong> ${languages.join(', ')}</p>
      <p><strong>路由数量:</strong> ${routeCount}</p>
      ${errorMessage ? `<p><strong>错误信息:</strong> ${errorMessage}</p>` : ''}
      <hr/>
      <p style="color: #666;">此邮件由 CANI SEO 管理系统自动发送</p>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'CANI SEO <noreply@caniuav.com>',
        to: [ADMIN_EMAIL],
        subject: subject,
        html: html,
      }),
    });

    if (response.ok) {
      console.log('Email notification sent successfully');
    } else {
      const errorText = await response.text();
      console.error('Failed to send email:', errorText);
    }
  } catch (err) {
    console.error('Email notification error:', err);
  }
}

// Helper to log submission history
async function logSubmissionHistory(
  supabase: any,
  type: string,
  languages: string[],
  routeCount: number,
  results: any,
  status: string,
  errorMessage: string | null,
  triggeredBy: string,
  sendEmail: boolean = false
) {
  try {
    await supabase.from('sitemap_submission_history').insert({
      submission_type: type,
      languages: languages,
      route_count: routeCount,
      results: results,
      status: status,
      error_message: errorMessage,
      triggered_by: triggeredBy,
      completed_at: new Date().toISOString(),
    });

    // Send email notification if requested
    if (sendEmail) {
      await sendEmailNotification(type, status, languages, routeCount, errorMessage);
    }
  } catch (err) {
    console.error('Failed to log submission history:', err);
  }
}

// Helper to get API keys from database
async function getApiKeys(supabase: any): Promise<{ googleToken?: string; baiduToken?: string; bingApiKey?: string; adminEmail?: string }> {
  try {
    const { data } = await supabase
      .from('seo_api_keys')
      .select('key_name, key_value')
      .eq('is_configured', true);

    const keys: Record<string, string> = {};
    data?.forEach((row: any) => {
      if (row.key_value) {
        keys[row.key_name] = row.key_value;
      }
    });

    return {
      googleToken: keys['google_oauth_token'],
      baiduToken: keys['baidu_token'],
      bingApiKey: keys['bing_api_key'],
      adminEmail: keys['admin_email'],
    };
  } catch (err) {
    console.error('Failed to get API keys:', err);
    return {};
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { action, languages, googleToken: inputGoogleToken, baiduToken: inputBaiduToken, bingApiKey: inputBingApiKey, triggeredBy = 'manual', sendNotify = false } = body;
    const lastmod = new Date().toISOString().split('T')[0];
    const allRoutes = [...STATIC_ROUTES, ...PRODUCT_DETAIL_ROUTES];

    // Fetch dynamic product routes from database
    const { data: products } = await supabase
      .from('products')
      .select('id')
      .eq('is_published', true);

    const dynamicProductRoutes = products?.map((p: any) => `/products/detail/${p.id}`) || [];
    const combinedRoutes = [...allRoutes, ...dynamicProductRoutes];

    // Get stored API keys if not provided in request
    const storedKeys = await getApiKeys(supabase);
    const googleToken = inputGoogleToken || storedKeys.googleToken;
    const baiduToken = inputBaiduToken || storedKeys.baiduToken;
    const bingApiKey = inputBingApiKey || storedKeys.bingApiKey;

    if (action === 'generate') {
      // Generate sitemaps for all or specified languages
      const targetLanguages = languages || SUPPORTED_LANGUAGES;
      const sitemaps: Record<string, string> = {};
      
      for (const lang of targetLanguages) {
        sitemaps[`sitemap-${lang}.xml`] = generateSitemapXML(lang, combinedRoutes, lastmod);
      }
      
      // Generate sitemap index
      sitemaps['sitemap-index.xml'] = generateSitemapIndex(targetLanguages, lastmod);
      
      // Store in system_settings for caching
      await supabase
        .from('system_settings')
        .upsert({
          key: 'generated_sitemaps',
          value: JSON.stringify({
            generated_at: new Date().toISOString(),
            languages: targetLanguages,
            route_count: combinedRoutes.length,
          }),
          description: 'Auto-generated sitemap metadata',
        }, { onConflict: 'key' });

      // Log to history and send email
      await logSubmissionHistory(
        supabase,
        'generate',
        targetLanguages,
        combinedRoutes.length,
        { file_count: Object.keys(sitemaps).length },
        'success',
        null,
        triggeredBy,
        sendNotify
      );

      console.log(`Generated ${Object.keys(sitemaps).length} sitemap files for ${targetLanguages.length} languages`);

      return new Response(JSON.stringify({
        success: true,
        message: `Generated ${Object.keys(sitemaps).length} sitemap files`,
        sitemaps,
        metadata: {
          languages: targetLanguages,
          routeCount: combinedRoutes.length,
          generatedAt: new Date().toISOString(),
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'submit') {
      // Submit sitemaps to search engines
      const results: Record<string, any> = {};
      const targetLanguages = languages || SUPPORTED_LANGUAGES;

      for (const lang of targetLanguages) {
        const sitemapUrl = `${getDomainForLanguage(lang)}/sitemap.xml`;
        results[lang] = {
          url: sitemapUrl,
          google: await submitToGoogle(sitemapUrl, googleToken),
          baidu: lang === 'zh' ? await submitToBaidu(sitemapUrl, baiduToken) : { success: false, message: 'Baidu only for Chinese' },
          bing: await submitToBing(sitemapUrl, bingApiKey),
        };
      }

      // Also submit sitemap index
      const indexUrl = `https://www.${BASE_DOMAIN}/sitemap-index.xml`;
      results['index'] = {
        url: indexUrl,
        google: await submitToGoogle(indexUrl, googleToken),
        bing: await submitToBing(indexUrl, bingApiKey),
      };

      // Calculate status
      const successCount = Object.values(results).filter((r: any) => 
        r.google?.success || r.baidu?.success || r.bing?.success
      ).length;
      const totalCount = Object.keys(results).length;
      const status = successCount === totalCount ? 'success' : successCount > 0 ? 'partial' : 'failed';

      // Log submission attempt
      await supabase
        .from('system_settings')
        .upsert({
          key: 'last_sitemap_submission',
          value: JSON.stringify({
            submitted_at: new Date().toISOString(),
            languages: targetLanguages,
            results_summary: Object.entries(results).map(([lang, r]: [string, any]) => ({
              lang,
              google: r.google?.success || false,
              baidu: r.baidu?.success || false,
              bing: r.bing?.success || false,
            })),
          }),
          description: 'Last sitemap submission to search engines',
        }, { onConflict: 'key' });

      // Log to history and send email
      await logSubmissionHistory(
        supabase,
        'submit',
        targetLanguages,
        combinedRoutes.length,
        results,
        status,
        null,
        triggeredBy,
        sendNotify
      );

      console.log('Sitemap submission results:', results);

      return new Response(JSON.stringify({
        success: true,
        message: 'Sitemap submission completed',
        results,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'ping') {
      // Quick ping to notify search engines of updates
      const pingResults: Record<string, any> = {};
      const targetLanguages = languages || ['zh', 'en'];

      for (const lang of targetLanguages) {
        const sitemapUrl = `${getDomainForLanguage(lang)}/sitemap.xml`;
        
        // Ping Google
        try {
          const googlePing = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
          pingResults[lang] = {
            google: { success: googlePing.ok, status: googlePing.status },
          };
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          pingResults[lang] = {
            google: { success: false, error: errorMessage },
          };
        }
      }

      // Log to history
      await logSubmissionHistory(
        supabase,
        'ping',
        targetLanguages,
        0,
        pingResults,
        'success',
        null,
        triggeredBy,
        sendNotify
      );

      console.log('Sitemap ping results:', pingResults);

      return new Response(JSON.stringify({
        success: true,
        message: 'Search engine ping completed',
        results: pingResults,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Process pending submissions triggered by content updates
    if (action === 'process-pending') {
      const { data: pendingTasks } = await supabase
        .from('sitemap_submission_history')
        .select('id')
        .eq('status', 'pending')
        .eq('triggered_by', 'content_update')
        .order('created_at', { ascending: true })
        .limit(5);

      if (pendingTasks && pendingTasks.length > 0) {
        // Generate and ping for pending tasks
        const targetLanguages = SUPPORTED_LANGUAGES;
        
        for (const lang of targetLanguages) {
          const sitemapUrl = `${getDomainForLanguage(lang)}/sitemap.xml`;
          try {
            await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
          } catch (err) {
            console.error(`Ping failed for ${lang}:`, err);
          }
        }

        // Mark tasks as completed
        for (const task of pendingTasks) {
          await supabase
            .from('sitemap_submission_history')
            .update({ 
              status: 'success',
              completed_at: new Date().toISOString()
            })
            .eq('id', task.id);
        }

        return new Response(JSON.stringify({
          success: true,
          message: `Processed ${pendingTasks.length} pending tasks`,
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'No pending tasks to process',
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      error: 'Invalid action. Use: generate, submit, ping, or process-pending',
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('Sitemap function error:', err);
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
