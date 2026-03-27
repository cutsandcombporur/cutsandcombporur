# Image Optimization Guide

This document describes the image optimization strategy for the Cuts & Comb salon website.

## Requirements

- All images must be compressed to <200KB
- WebP format with JPEG fallback
- Responsive images with multiple sizes
- Lazy loading for below-the-fold images

## Image Formats

### WebP with JPEG Fallback

All images should be available in both WebP and JPEG formats:

```
/public/images/
  hero-bg.jpg
  hero-bg.webp
  gallery/
    bridal-001-before.jpg
    bridal-001-before.webp
    bridal-001-after.jpg
    bridal-001-after.webp
```

### Responsive Image Sizes

For responsive loading, provide images in multiple sizes:

```
/public/images/
  hero-bg-400w.jpg
  hero-bg-400w.webp
  hero-bg-800w.jpg
  hero-bg-800w.webp
  hero-bg-1200w.jpg
  hero-bg-1200w.webp
  hero-bg-1600w.jpg
  hero-bg-1600w.webp
```

## Image Compression

### Tools

Use one of the following tools to compress images:

1. **ImageOptim** (Mac) - https://imageoptim.com/
2. **Squoosh** (Web) - https://squoosh.app/
3. **Sharp** (Node.js) - For batch processing

### Compression Guidelines

- JPEG Quality: 80-85%
- WebP Quality: 80%
- Target file size: <200KB per image
- Maintain visual quality for professional appearance

## Using OptimizedImage Component

### Above-the-Fold Images (Priority)

For images visible on initial page load (hero sections):

```tsx
import OptimizedImage from '../components/common/OptimizedImage';

<OptimizedImage
  src="/images/hero-bg.jpg"
  alt="Salon hero image"
  priority={true}
  sizes="100vw"
  className="w-full h-full object-cover"
/>
```

### Below-the-Fold Images (Lazy Loading)

For images that appear after scrolling:

```tsx
<OptimizedImage
  src="/images/gallery/bridal-001-before.jpg"
  alt="Bridal makeover before"
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
  className="w-full h-full object-cover"
/>
```

## Batch Image Optimization Script

For batch processing, you can use this Node.js script with Sharp:

```javascript
// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const sizes = [400, 800, 1200, 1600];

  for (const size of sizes) {
    // Generate JPEG
    await sharp(inputPath)
      .resize(size)
      .jpeg({ quality: 85 })
      .toFile(path.join(outputDir, `${filename}-${size}w.jpg`));

    // Generate WebP
    await sharp(inputPath)
      .resize(size)
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, `${filename}-${size}w.webp`));
  }
}

// Usage: node scripts/optimize-images.js
```

## Performance Targets

- Mobile 4G Load Time: ≤3 seconds
- First Contentful Paint: ≤1.5 seconds
- Total image payload: <1MB for initial page load

## Validation

Use these tools to validate image optimization:

1. **Lighthouse** - Chrome DevTools
2. **WebPageTest** - https://www.webpagetest.org/
3. **PageSpeed Insights** - https://pagespeed.web.dev/

## Migration Checklist

- [ ] Convert all existing images to WebP format
- [ ] Generate responsive image sizes (400w, 800w, 1200w, 1600w)
- [ ] Compress all images to <200KB
- [ ] Update components to use OptimizedImage
- [ ] Test lazy loading behavior
- [ ] Validate performance with Lighthouse
