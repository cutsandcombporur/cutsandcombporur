# Lightbox Component

## Overview
The Lightbox component displays full-size before/after image pairs in a modal overlay with navigation controls, social share buttons, and keyboard navigation support.

## Features

### 1. Full-Size Image Display
- Displays before/after image pairs side-by-side
- Responsive aspect ratio (16:9 on mobile, 21:9 on desktop)
- Images use `object-contain` to preserve aspect ratio
- Center divider line separates before/after images
- Labels for "Before" and "After" on each side

### 2. Navigation Controls
- **Close Button**: Top-right corner, closes the lightbox
- **Previous Button**: Left side, navigates to previous image
- **Next Button**: Right side, navigates to next image
- All buttons have hover effects and proper ARIA labels

### 3. Keyboard Navigation
- **Escape**: Close the lightbox
- **Arrow Left**: Previous image
- **Arrow Right**: Next image
- Keyboard hint displayed on desktop

### 4. Social Share Buttons
Implements Requirement 11.4: Social media share buttons on Gallery_Page images

- **Instagram**: Copies link to clipboard (Instagram doesn't support direct URL sharing)
- **Facebook**: Opens Facebook share dialog in new window
- **WhatsApp**: Opens WhatsApp with pre-filled message and link

### 5. Accessibility Features
- Proper ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`)
- Keyboard navigation support
- Focus management
- Screen reader friendly labels

### 6. User Experience
- Prevents body scroll when lightbox is open
- Click backdrop to close
- Smooth transitions and hover effects
- Responsive design for mobile and desktop
- Touch-friendly button sizes (44x44px minimum)

## Props

```typescript
interface LightboxProps {
  image: GalleryImage | null;  // Currently displayed image (null = closed)
  onClose: () => void;          // Callback when lightbox closes
  onNext?: () => void;          // Callback for next image (optional)
  onPrevious?: () => void;      // Callback for previous image (optional)
}
```

## Usage Example

```tsx
import { useState } from 'react';
import { Lightbox } from '../components/gallery';
import { GalleryImage } from '../types';

function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([/* ... */]);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const previousIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setSelectedImage(images[previousIndex]);
  };

  return (
    <div>
      {/* Gallery grid */}
      <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
          <div key={image.id} onClick={() => handleImageClick(image)}>
            {/* Image card */}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        image={selectedImage}
        onClose={handleClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}
```

## Implementation Details

### Social Share Functions

#### Instagram Share
Instagram doesn't support direct URL sharing via web, so the component copies the current page URL to the clipboard and shows an alert.

```typescript
const shareToInstagram = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
  alert('Link copied! Share it on Instagram.');
};
```

#### Facebook Share
Opens Facebook's share dialog in a new window with the current page URL.

```typescript
const shareToFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
};
```

#### WhatsApp Share
Opens WhatsApp with a pre-filled message including the image title and page URL.

```typescript
const shareToWhatsApp = () => {
  const text = encodeURIComponent(`Check out this transformation: ${image.title}`);
  const url = encodeURIComponent(window.location.href);
  const shareUrl = `https://wa.me/?text=${text}%20${url}`;
  window.open(shareUrl, '_blank');
};
```

### Keyboard Navigation
Uses `useEffect` and `useCallback` hooks to manage keyboard event listeners efficiently.

```typescript
const handleKeyDown = useCallback(
  (e: KeyboardEvent) => {
    if (!image) return;
    switch (e.key) {
      case 'Escape': onClose(); break;
      case 'ArrowLeft': if (onPrevious) onPrevious(); break;
      case 'ArrowRight': if (onNext) onNext(); break;
    }
  },
  [image, onClose, onNext, onPrevious]
);

useEffect(() => {
  if (image) {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
  }
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'unset';
  };
}, [image, handleKeyDown]);
```

### Styling
- Uses Tailwind CSS for responsive design
- Fixed positioning with z-index 50 for overlay
- Semi-transparent black backdrop (bg-black/95)
- Responsive button sizes and spacing
- Gradient backgrounds for social media buttons matching brand colors

## Requirements Addressed
- **Requirement 11.4**: Social media share buttons on Gallery_Page images (Instagram, Facebook, WhatsApp)
- **Requirement 6.3**: Touch-friendly sizes (44x44px minimum) on mobile devices
- **Requirement 4.3**: Display before/after image pairs with click handling

## Browser Compatibility
- Modern browsers with ES6+ support
- Clipboard API for Instagram share (fallback needed for older browsers)
- Window.open for Facebook and WhatsApp share (widely supported)
