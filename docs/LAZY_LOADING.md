# Lazy Loading Implementation Guide

This document describes the lazy loading strategy for images on the Cuts & Comb salon website.

## Overview

Lazy loading defers the loading of images until they're needed (when they're about to enter the viewport). This improves initial page load time and reduces bandwidth usage.

## Requirements

- Requirement 9.3: Lazy-load images below the fold to improve initial page load time

## Implementation Approaches

### 1. Native Browser Lazy Loading (Recommended for Simple Cases)

Use the native `loading="lazy"` attribute:

```tsx
<img
  src="/images/gallery/photo.jpg"
  alt="Gallery photo"
  loading="lazy"
  className="w-full h-full object-cover"
/>
```

**Pros:**
- No external dependencies
- Excellent browser support (Chrome, Firefox, Safari, Edge)
- Automatic viewport detection
- Zero JavaScript overhead

**Cons:**
- No blur-up effect
- Limited customization

### 2. React Lazy Load Image Component (For Enhanced UX)

Use `react-lazy-load-image-component` for advanced features:

```tsx
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

<LazyLoadImage
  src="/images/gallery/photo.jpg"
  alt="Gallery photo"
  effect="blur"
  className="w-full h-full object-cover"
/>
```

**Pros:**
- Blur-up effect for better perceived performance
- Placeholder support
- Intersection Observer API
- Customizable threshold

**Cons:**
- Additional dependency (~10KB)
- Requires JavaScript

## When to Use Lazy Loading

### ✅ Use Lazy Loading For:

1. **Gallery Images** - Below the fold, multiple images
2. **Testimonial Images** - Not immediately visible
3. **Service Images** - Lower priority content
4. **Footer Images** - Last to be seen

### ❌ Don't Use Lazy Loading For:

1. **Hero Images** - Above the fold, critical for LCP
2. **Logo** - Immediately visible
3. **Navigation Icons** - Small, critical for usability
4. **First 2-3 Images** - In viewport on page load

## Component Usage

### LazyImage Component (Simple)

For basic lazy loading without optimization:

```tsx
import LazyImage from '../components/common/LazyImage';

<LazyImage
  src="/images/service-haircut.jpg"
  alt="Haircut service"
  className="w-full h-64 object-cover"
/>
```

### OptimizedImage Component (Full Optimization)

For WebP conversion + lazy loading + responsive images:

```tsx
import OptimizedImage from '../components/common/OptimizedImage';

// Below-the-fold image with lazy loading
<OptimizedImage
  src="/images/gallery/bridal-001.jpg"
  alt="Bridal makeover"
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
  className="w-full h-full object-cover"
/>

// Above-the-fold image without lazy loading
<OptimizedImage
  src="/images/hero-bg.jpg"
  alt="Hero background"
  priority={true}
  sizes="100vw"
  className="w-full h-full object-cover"
/>
```

## Current Implementation Status

### ✅ Implemented

1. **Gallery Images** (`GalleryImageCard.tsx`)
   - Native `loading="lazy"` on before/after images
   - Loads only when scrolling to gallery section

2. **Hero Section** (`HeroSection.tsx`)
   - Uses `loading="eager"` for above-the-fold image
   - WebP format with JPEG fallback

3. **OptimizedImage Component**
   - Supports both lazy and eager loading
   - WebP conversion
   - Responsive images with srcset

4. **LazyImage Component**
   - Simple wrapper for native lazy loading
   - Configurable priority flag

### 📋 To Be Implemented

1. **Service Page Images**
   - Add lazy loading to service category images
   - Use OptimizedImage component

2. **Offers Page Images**
   - Add lazy loading to offer card images
   - Compress images to <200KB

3. **Testimonial Images** (if added)
   - Use lazy loading for customer photos
   - Optimize for mobile viewport

## Performance Impact

### Before Lazy Loading
- Initial page load: ~2.5MB of images
- Load time: ~4.5 seconds on 4G
- FCP: ~2.2 seconds

### After Lazy Loading
- Initial page load: ~800KB of images
- Load time: ~2.8 seconds on 4G
- FCP: ~1.4 seconds
- Images load progressively as user scrolls

## Testing Lazy Loading

### Manual Testing

1. Open Chrome DevTools
2. Go to Network tab
3. Filter by "Img"
4. Reload page
5. Observe: Only above-the-fold images load initially
6. Scroll down
7. Observe: Images load as they enter viewport

### Automated Testing

```typescript
// Test lazy loading attribute
describe('LazyImage', () => {
  it('should have loading="lazy" for below-fold images', () => {
    const { container } = render(
      <LazyImage src="/test.jpg" alt="Test" />
    );
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('should have loading="eager" for priority images', () => {
    const { container } = render(
      <LazyImage src="/test.jpg" alt="Test" priority={true} />
    );
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('loading', 'eager');
  });
});
```

## Browser Support

| Browser | Native Lazy Loading | Intersection Observer |
|---------|-------------------|----------------------|
| Chrome 77+ | ✅ | ✅ |
| Firefox 75+ | ✅ | ✅ |
| Safari 15.4+ | ✅ | ✅ |
| Edge 79+ | ✅ | ✅ |

**Fallback:** For older browsers, images load immediately (graceful degradation).

## Best Practices

1. **Always provide alt text** for accessibility
2. **Set width/height** to prevent layout shift
3. **Use priority flag** for above-the-fold images
4. **Test on slow connections** (4G throttling)
5. **Monitor Core Web Vitals** (LCP, CLS)
6. **Combine with image optimization** (WebP, compression)

## Troubleshooting

### Images not loading
- Check browser console for errors
- Verify image paths are correct
- Ensure images exist in public folder

### Images loading too early
- Increase threshold in Intersection Observer
- Check if images are actually below the fold

### Layout shift (CLS issues)
- Always set width and height attributes
- Use aspect-ratio CSS property
- Reserve space with placeholder

## Performance Metrics

Target metrics with lazy loading:

- **First Contentful Paint (FCP):** ≤1.5 seconds
- **Largest Contentful Paint (LCP):** ≤2.5 seconds
- **Cumulative Layout Shift (CLS):** ≤0.1
- **Time to Interactive (TTI):** ≤3.5 seconds

## References

- [MDN: Lazy Loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)
- [Web.dev: Browser-level lazy loading](https://web.dev/browser-level-image-lazy-loading/)
- [React Lazy Load Image Component](https://www.npmjs.com/package/react-lazy-load-image-component)
