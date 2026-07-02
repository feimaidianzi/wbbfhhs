import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * Use this whenever rendering user-generated HTML content.
 */
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';

  // Strip inline color/background styles that clash with the dark theme.
  // Keeps other style props (text-align, width, etc.) intact.
  DOMPurify.removeHook('uponSanitizeAttribute');
  DOMPurify.addHook('uponSanitizeAttribute', (_node, data) => {
    if (data.attrName === 'style' && typeof data.attrValue === 'string') {
      const cleaned = data.attrValue
        .split(';')
        .map((decl) => decl.trim())
        .filter((decl) => {
          if (!decl) return false;
          const prop = decl.split(':')[0]?.trim().toLowerCase();
          // Drop any color-related declaration so theme tokens win.
          return prop !== 'color'
            && prop !== 'background'
            && prop !== 'background-color';
        })
        .join('; ');
      data.attrValue = cleaned;
    }
  });

  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'a', 'img',
      'blockquote', 'pre', 'code',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span', 'hr',
      'figure', 'figcaption', 'details', 'summary',
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'style',
      'target', 'rel', 'width', 'height',
    ],
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ['target', 'rel'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input'],
    FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover'],
  });

  DOMPurify.removeHook('uponSanitizeAttribute');
  return clean;
};

/**
 * Sanitizes HTML and returns props for dangerouslySetInnerHTML
 */
export const createSafeHtmlProps = (html: string) => {
  return {
    dangerouslySetInnerHTML: {
      __html: sanitizeHtml(html),
    },
  };
};

/**
 * Strips all HTML tags and returns plain text.
 * Useful for excerpts and previews.
 */
export const stripHtml = (html: string): string => {
  if (!html) return '';
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
};
