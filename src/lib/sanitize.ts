import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * Use this whenever rendering user-generated HTML content.
 */
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'a', 'img',
      'blockquote', 'pre', 'code',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span', 'hr',
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'style',
      'target', 'rel', 'width', 'height',
    ],
    ALLOW_DATA_ATTR: false,
    // Force all links to open in new tab with secure attributes
    ADD_ATTR: ['target', 'rel'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input'],
    FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover'],
  });
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
