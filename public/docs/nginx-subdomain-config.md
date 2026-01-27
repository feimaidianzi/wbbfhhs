# Nginx/CDN Multi-Language Subdomain Configuration Guide

This document provides configuration examples for implementing subdomain-based multi-language routing for CANI Technology website.

## Domain Structure

| Language | Subdomain | URL |
|----------|-----------|-----|
| Chinese (Default) | www.cani.com | https://www.cani.com |
| English | en.cani.com | https://en.cani.com |
| Japanese | ja.cani.com | https://ja.cani.com |
| Korean | ko.cani.com | https://ko.cani.com |
| Vietnamese | vi.cani.com | https://vi.cani.com |
| Thai | th.cani.com | https://th.cani.com |
| Malay | ms.cani.com | https://ms.cani.com |
| Indonesian | id.cani.com | https://id.cani.com |
| French | fr.cani.com | https://fr.cani.com |
| German | de.cani.com | https://de.cani.com |
| Spanish | es.cani.com | https://es.cani.com |
| Russian | ru.cani.com | https://ru.cani.com |
| Arabic | ar.cani.com | https://ar.cani.com |
| Turkish | tr.cani.com | https://tr.cani.com |

## Nginx Configuration

### Option 1: Single Server Block with Subdomain Detection

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    
    # Wildcard domain
    server_name ~^(?<lang>[a-z]{2})\.cani\.com$ www.cani.com cani.com;
    
    # SSL Configuration
    ssl_certificate /etc/ssl/certs/cani.com.pem;
    ssl_certificate_key /etc/ssl/private/cani.com.key;
    
    root /var/www/cani/dist;
    index index.html;
    
    # Set default language if not captured
    set $detected_lang 'zh';
    
    # Map subdomain to language code
    if ($lang ~* ^(en|ja|ko|vi|th|ms|id|fr|de|es|ru|ar|tr)$) {
        set $detected_lang $lang;
    }
    
    # Redirect root domain to www
    if ($host = 'cani.com') {
        return 301 https://www.cani.com$request_uri;
    }
    
    # Set language header for the application
    location / {
        add_header X-Language $detected_lang;
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-Content-Type-Options "nosniff";
        
        # SPA routing - serve index.html for all routes
        try_files $uri $uri/ /index.html;
    }
    
    # Static assets with cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2|woff)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;
}
```

### Option 2: Using Nginx Map for Language Detection

```nginx
# Define language map at http context
map $host $site_language {
    default         "zh";
    en.cani.com     "en";
    ja.cani.com     "ja";
    ko.cani.com     "ko";
    vi.cani.com     "vi";
    th.cani.com     "th";
    ms.cani.com     "ms";
    id.cani.com     "id";
    fr.cani.com     "fr";
    de.cani.com     "de";
    es.cani.com     "es";
    ru.cani.com     "ru";
    ar.cani.com     "ar";
    tr.cani.com     "tr";
}

server {
    listen 443 ssl http2;
    server_name *.cani.com www.cani.com cani.com;
    
    ssl_certificate /etc/ssl/certs/wildcard.cani.com.pem;
    ssl_certificate_key /etc/ssl/private/wildcard.cani.com.key;
    
    root /var/www/cani/dist;
    
    location / {
        # Pass language to frontend via cookie or header
        add_header Set-Cookie "lang=$site_language; Path=/; Secure; SameSite=Lax";
        add_header X-Site-Language $site_language;
        
        try_files $uri $uri/ /index.html;
    }
}
```

## Cloudflare Workers Configuration

For CDN-based routing using Cloudflare Workers:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const LANGUAGE_MAP = {
  'en.cani.com': 'en',
  'ja.cani.com': 'ja',
  'ko.cani.com': 'ko',
  'vi.cani.com': 'vi',
  'th.cani.com': 'th',
  'ms.cani.com': 'ms',
  'id.cani.com': 'id',
  'fr.cani.com': 'fr',
  'de.cani.com': 'de',
  'es.cani.com': 'es',
  'ru.cani.com': 'ru',
  'ar.cani.com': 'ar',
  'tr.cani.com': 'tr',
};

async function handleRequest(request) {
  const url = new URL(request.url);
  const host = url.hostname;
  
  // Detect language from subdomain
  const language = LANGUAGE_MAP[host] || 'zh';
  
  // Fetch original response
  const response = await fetch(request);
  
  // Clone response and add language header
  const newResponse = new Response(response.body, response);
  newResponse.headers.set('X-Site-Language', language);
  newResponse.headers.set('Set-Cookie', `lang=${language}; Path=/; Secure; SameSite=Lax`);
  
  return newResponse;
}
```

## AWS CloudFront + Lambda@Edge

For AWS deployments:

```javascript
'use strict';

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const host = request.headers.host[0].value;
  
  const languageMap = {
    'en.cani.com': 'en',
    'ja.cani.com': 'ja',
    'ko.cani.com': 'ko',
    'vi.cani.com': 'vi',
    'th.cani.com': 'th',
    'ms.cani.com': 'ms',
    'id.cani.com': 'id',
    'fr.cani.com': 'fr',
    'de.cani.com': 'de',
    'es.cani.com': 'es',
    'ru.cani.com': 'ru',
    'ar.cani.com': 'ar',
    'tr.cani.com': 'tr',
  };
  
  const language = languageMap[host] || 'zh';
  
  // Add custom header for language
  request.headers['x-site-language'] = [{
    key: 'X-Site-Language',
    value: language
  }];
  
  callback(null, request);
};
```

## Frontend Integration

The React application reads the language from subdomain using the utility in `src/utils/seoConfig.ts`:

```typescript
// Detects language from current subdomain
export const detectLanguageFromSubdomain = (): LanguageCode => {
  if (typeof window === 'undefined') return 'zh';
  
  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0];
  
  const subdomainToLanguage: Record<string, LanguageCode> = {
    'en': 'en',
    'ja': 'ja',
    'ko': 'ko',
    // ... etc
  };
  
  return subdomainToLanguage[subdomain] || 'zh';
};
```

## DNS Configuration

Add A records for all language subdomains pointing to your server IP:

```
# DNS Zone File Example
@       IN  A       185.158.133.1
www     IN  A       185.158.133.1
en      IN  A       185.158.133.1
ja      IN  A       185.158.133.1
ko      IN  A       185.158.133.1
vi      IN  A       185.158.133.1
th      IN  A       185.158.133.1
ms      IN  A       185.158.133.1
id      IN  A       185.158.133.1
fr      IN  A       185.158.133.1
de      IN  A       185.158.133.1
es      IN  A       185.158.133.1
ru      IN  A       185.158.133.1
ar      IN  A       185.158.133.1
tr      IN  A       185.158.133.1
```

Or use a wildcard record:
```
*       IN  A       185.158.133.1
```

## SSL Certificate

For subdomain support, obtain a wildcard SSL certificate:

```bash
# Using Certbot with Let's Encrypt
sudo certbot certonly --dns-cloudflare \
  -d "cani.com" \
  -d "*.cani.com"
```

## Sitemap Configuration

Each language should have its own sitemap, generated by `src/utils/sitemapGenerator.ts`. Deploy these to:

- `https://www.cani.com/sitemap.xml` (sitemap index)
- `https://en.cani.com/sitemap.xml` (English sitemap)
- `https://ja.cani.com/sitemap.xml` (Japanese sitemap)
- etc.

## Testing Checklist

- [ ] All subdomains resolve correctly
- [ ] SSL certificates are valid for all subdomains
- [ ] Language is correctly detected and displayed
- [ ] hreflang tags point to correct subdomain URLs
- [ ] Canonical URLs match the current subdomain
- [ ] Search engines can crawl all language versions
- [ ] Cookie/localStorage language preference is respected
