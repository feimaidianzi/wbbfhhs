/**
 * Builds a dynamic Open Graph share image URL backed by the og-image edge function.
 * Use this as the og:image fallback when no native cover_image is available
 * (e.g. text-only news, products without hero photos).
 *
 * The endpoint returns a 1200x630 SVG card with title/category/brand styling.
 */
const OG_ENDPOINT =
  "https://tuxslfemwkdmnkldlmmy.supabase.co/functions/v1/og-image";

export interface OgImageOptions {
  title: string;
  subtitle?: string;
  category?: string;
  brand?: string;
}

export const buildOgImageUrl = ({
  title,
  subtitle,
  category,
  brand,
}: OgImageOptions): string => {
  const params = new URLSearchParams();
  params.set("title", title.slice(0, 200));
  if (subtitle) params.set("subtitle", subtitle.slice(0, 200));
  if (category) params.set("category", category.slice(0, 60));
  if (brand) params.set("brand", brand.slice(0, 60));
  return `${OG_ENDPOINT}?${params.toString()}`;
};
