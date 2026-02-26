import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  /** Priority loading for LCP images - disables lazy loading */
  priority?: boolean;
  /** Aspect ratio string like "16/9", "4/3", "1/1" */
  aspectRatio?: string;
  /** Fallback image URL */
  fallback?: string;
  /** Object fit */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  /** Called on error */
  onError?: () => void;
}

const DEFAULT_FALLBACK = "/placeholder.svg";

/**
 * Performance-optimized image component:
 * - Prevents CLS with aspect-ratio + width/height
 * - Lazy loading by default, priority for LCP
 * - Fallback on error
 * - decoding="async" for non-blocking decode
 */
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  aspectRatio = '16 / 9',
  fallback = DEFAULT_FALLBACK,
  objectFit = 'cover',
  onError,
}: OptimizedImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
      onError?.();
    }
  };

  return (
    <img
      ref={imgRef}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      onError={handleError}
      className={className}
      style={{
        aspectRatio,
        objectFit,
      }}
    />
  );
};

export default OptimizedImage;
