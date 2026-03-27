/**
 * OptimizedImage Component
 * 
 * Provides image optimization with:
 * - WebP format with JPEG fallback
 * - Responsive images with srcset
 * - Lazy loading
 * - Compression optimization
 * 
 * Requirements: 9.2, 9.3
 */

import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  priority?: boolean; // For above-the-fold images
}

/**
 * OptimizedImage component with WebP support and lazy loading
 * 
 * For production, images should be:
 * - Converted to WebP format with JPEG fallback
 * - Compressed to <200KB
 * - Available in multiple sizes for responsive loading
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  sizes,
  priority = false,
}) => {
  // Generate WebP and fallback paths
  // Assumes images are stored with .jpg/.png extension
  // and WebP versions are available with .webp extension
  const getWebPPath = (imagePath: string): string => {
    return imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  // Generate srcset for responsive images
  // Assumes images are available in multiple sizes (e.g., image-400w.jpg, image-800w.jpg)
  const generateSrcSet = (imagePath: string): string => {
    const basePath = imagePath.replace(/\.(jpg|jpeg|png|webp)$/i, '');
    const extension = imagePath.match(/\.(jpg|jpeg|png|webp)$/i)?.[0] || '.jpg';
    
    // Generate srcset for common viewport widths
    const widths = [400, 800, 1200, 1600];
    return widths
      .map((w) => `${basePath}-${w}w${extension} ${w}w`)
      .join(', ');
  };

  // For above-the-fold images (priority), use eager loading
  const effectiveLoading = priority ? 'eager' : loading;

  // If priority is set, use standard img tag for immediate loading
  if (priority) {
    return (
      <picture>
        <source
          type="image/webp"
          srcSet={generateSrcSet(getWebPPath(src))}
          sizes={sizes || '100vw'}
        />
        <source
          type="image/jpeg"
          srcSet={generateSrcSet(src)}
          sizes={sizes || '100vw'}
        />
        <img
          src={src}
          alt={alt}
          className={className}
          width={width}
          height={height}
          loading="eager"
        />
      </picture>
    );
  }

  // For below-the-fold images, use lazy loading
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={getWebPPath(src)}
      />
      <LazyLoadImage
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        effect="blur"
        loading={effectiveLoading}
      />
    </picture>
  );
};

export default OptimizedImage;
