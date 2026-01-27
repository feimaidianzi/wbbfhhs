import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Supported languages for sitemap generation
const SUPPORTED_LANGUAGES = [
  'zh', 'en', 'ja', 'ko', 'vi', 'th', 'ms', 'id', 
  'fr', 'de', 'es', 'ru', 'ar', 'tr'
];

const BASE_DOMAIN = 'cani.com';

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

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, languages, googleToken, baiduToken, bingApiKey } = await req.json();
    const lastmod = new Date().toISOString().split('T')[0];
    const allRoutes = [...STATIC_ROUTES, ...PRODUCT_DETAIL_ROUTES];

    // Fetch dynamic product routes from database
    const { data: products } = await supabase
      .from('products')
      .select('id')
      .eq('is_published', true);

    const dynamicProductRoutes = products?.map(p => `/products/detail/${p.id}`) || [];
    const combinedRoutes = [...allRoutes, ...dynamicProductRoutes];

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

      console.log('Sitemap ping results:', pingResults);

      return new Response(JSON.stringify({
        success: true,
        message: 'Search engine ping completed',
        results: pingResults,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      error: 'Invalid action. Use: generate, submit, or ping',
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
