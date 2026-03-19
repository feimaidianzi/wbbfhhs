import { SUPPORTED_LANGUAGES, LanguageCode } from '@/i18n/languages';
import { getDomainForLanguage, getHtmlLang, getUrlForLanguage, getLangPrefix } from './seoConfig';

// All routes that should be included in sitemap
const allRoutes = [
  '/',
  '/about',
  '/contact',
  '/news',
  '/products',
  '/applications',
  '/software',
  '/custom-research',
  '/projects',
  '/fpv',
  // Products
  '/products/accessories',
  '/products/agriculture',
  '/products/firefighting',
  '/products/logistics',
  '/products/multi-rotor',
  '/products/swarm',
  '/products/swarm-kit',
  '/products/tethered',
  '/products/training',
  '/products/wire-laying',
  '/products/work-drone',
  // Product details
  '/products/tethered/th-100',
  '/products/tethered/th-200',
  '/products/tethered/th-300',
  '/products/logistics/wl-10',
  '/products/logistics/wl-20',
  '/products/logistics/wl-30',
  '/products/multi-rotor/x650',
  '/products/multi-rotor/x850',
  '/products/multi-rotor/x1200',
  '/products/multi-rotor/x1600',
  '/products/swarm/w200',
  '/products/swarm/w300',
  '/products/swarm/w400',
  // Accessories
  '/products/accessories/vtx-vrx',
  '/products/accessories/fc-esc',
  '/products/accessories/gimbal',
  '/products/accessories/camera',
  '/products/accessories/digital-fpv',
  '/products/accessories/elrs',
  '/products/accessories/others',
  '/products/accessories/mesh-link',
  '/products/accessories/ai-module',
  // Applications
  '/applications/power-inspection',
  '/applications/power-inspection/transmission-line',
  '/applications/power-inspection/substation',
  '/applications/power-inspection/solar-panel',
  '/applications/logistics',
  '/applications/military',
  '/applications/solutions',
  // Solutions
  '/solutions/industrial-uav-environmental-monitoring',
  '/solutions/uav-firefighting-emergency-rescue',
  '/solutions/industrial-uav-water-conservancy',
  '/solutions/industrial-uav-transportation-monitoring',
  '/solutions/industrial-uav-surveying-mapping',
  // Software
  '/software/exam-system',
  '/software/pv-inspection',
  '/software/drone-management',
  '/software/power-inspection-system',
  '/software/pv-system',
  '/software/environment-system',
  '/software/ground-station',
  '/software/swarm-ground-station',
  // Custom research
  '/custom-research/swarm',
  '/custom-research/software',
  '/custom-research/payload',
  '/custom-research/accessories',
  '/custom-research/drone',
  // Projects
  '/projects/training',
  '/projects/show',
  '/projects/flight-service',
  '/projects/cooperation',
];

// Priority mapping based on route depth and importance
const getPriority = (route: string): string => {
  if (route === '/') return '1.0';
  if (route === '/products' || route === '/applications' || route === '/about') return '0.9';
  if (route.split('/').length === 2) return '0.8';
  if (route.split('/').length === 3) return '0.7';
  return '0.6';
};

// Change frequency based on content type
const getChangeFreq = (route: string): string => {
  if (route === '/' || route === '/news') return 'daily';
  if (route.includes('/products') || route.includes('/applications')) return 'weekly';
  return 'monthly';
};

// Generate sitemap for a specific language
export const generateLanguageSitemap = (lang: LanguageCode): string => {
  const today = new Date().toISOString().split('T')[0];

  const urls = allRoutes.map(route => {
    // Generate alternate links for all languages
    const alternateLinks = SUPPORTED_LANGUAGES.map(l => 
      `    <xhtml:link rel="alternate" hreflang="${getHtmlLang(l.code)}" href="${getUrlForLanguage(l.code, route)}" />`
    ).join('\n');

    return `  <url>
    <loc>${getUrlForLanguage(lang, route)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${getChangeFreq(route)}</changefreq>
    <priority>${getPriority(route)}</priority>
${alternateLinks}
    <xhtml:link rel="alternate" hreflang="x-default" href="${getUrlForLanguage('en', route)}" />
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;
};

// Generate sitemap index file
export const generateSitemapIndex = (): string => {
  const today = new Date().toISOString().split('T')[0];

  const sitemaps = SUPPORTED_LANGUAGES.map(lang => {
    const prefix = getLangPrefix(lang.code);
    return `  <sitemap>
    <loc>${getDomainForLanguage(lang.code)}${prefix}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;
};

// Generate robots.txt for a specific language
export const generateRobotsTxt = (lang: LanguageCode): string => {
  const domain = getDomainForLanguage(lang);

  return `# CANI Technology - Industrial Drone Manufacturer
# ${domain}

User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Baiduspider
Allow: /
Crawl-delay: 1

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /auth

# Sitemap
Sitemap: ${domain}/sitemap.xml

# Host
Host: ${domain}
`;
};

// Export all sitemaps as a downloadable object
export const getAllSitemaps = (): Record<string, string> => {
  const sitemaps: Record<string, string> = {
    'sitemap-index.xml': generateSitemapIndex(),
  };

  SUPPORTED_LANGUAGES.forEach(lang => {
    sitemaps[`sitemap-${lang.code}.xml`] = generateLanguageSitemap(lang.code);
    sitemaps[`robots-${lang.code}.txt`] = generateRobotsTxt(lang.code);
  });

  return sitemaps;
};

// Download a single sitemap
export const downloadSitemap = (lang: LanguageCode) => {
  const content = generateLanguageSitemap(lang);
  const blob = new Blob([content], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sitemap-${lang}.xml`;
  a.click();
  URL.revokeObjectURL(url);
};

// Download all sitemaps as a zip (simplified version - just downloads sitemap index)
export const downloadAllSitemaps = () => {
  const content = generateSitemapIndex();
  const blob = new Blob([content], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap-index.xml';
  a.click();
  URL.revokeObjectURL(url);
};
