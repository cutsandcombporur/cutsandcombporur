/**
 * LazyImage Component
 * 
 * Simple wrapper for images with native lazy loading support.
 * Use this for basic lazy loading without WebP conversion.
 * 
 * For full optimization (WebP + responsive), use OptimizedImage instead.
 * 
 * Requirements: 9.3
 */

import React from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean; // Set to true for above-the-fold images
}

/**
 * LazyImage component with native browser lazy loading
 * 
 * Uses the native loading="lazy" attribute for automatic lazy loading.
 * Images are loaded only when they're about to enter the viewport.
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};

export default LazyImage;
