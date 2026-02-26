import { Helmet } from 'react-helmet-async';

interface HeroImagePreloadProps {
  /** The imported image URL (from ES6 import) */
  imageSrc: string;
  /** Image MIME type, defaults to image/jpeg */
  type?: string;
}

/**
 * Preloads a hero/LCP image via <link rel="preload"> in <head>.
 * Place this component in any page that has a large above-the-fold image
 * to hint the browser to fetch it as early as possible.
 */
export const HeroImagePreload = ({
  imageSrc,
  type = 'image/jpeg',
}: HeroImagePreloadProps) => {
  return (
    <Helmet>
      <link
        rel="preload"
        as="image"
        href={imageSrc}
        type={type}
        fetchPriority="high"
      />
    </Helmet>
  );
};

export default HeroImagePreload;
