# Design Document: Cuts & Comb Salon Website

## Overview

This document describes the technical design for the Cuts & Comb salon website - a mobile-first, responsive web application that serves as the digital presence for a luxury grooming salon in Porur. The design focuses on fast load times, seamless booking integration, and an engaging user experience optimized for mobile devices.

## Architecture

### Technology Stack

- **Frontend Framework**: React with TypeScript for type safety and component reusability
- **Styling**: Tailwind CSS for responsive, mobile-first design with custom theme
- **Routing**: React Router for client-side navigation
- **Build Tool**: Vite for fast development and optimized production builds
- **Image Optimization**: Next.js Image component or react-lazy-load-image-component
- **Booking Integration**: Embedded iframe or redirect to Fresha/Calendly/Square
- **Deployment**: Static hosting (Vercel, Netlify, or AWS S3 + CloudFront)

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                   React Application                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Home Page  │  │Services Page │  │ Offers Page  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ Gallery Page │  │ Contact Page │                        │
│  └──────────────┘  └──────────────┘                        │
│                                                              │
│  ┌──────────────────────────────────────────────────┐      │
│  │         Shared Components                         │      │
│  │  - Navigation  - Footer  - WhatsApp Button       │      │
│  └──────────────────────────────────────────────────┘      │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Booking    │ │   WhatsApp   │ │ Google Maps  │
│   System     │ │     API      │ │     API      │
│ (Fresha/etc) │ │              │ │              │
└──────────────┘ └──────────────┘ └──────────────┘
```

## Component Design

### 1. Layout Components

#### 1.1 Navigation Component

**Purpose**: Provides site-wide navigation with responsive behavior

**Props**:
- `currentPage: string` - Highlights active page

**Behavior**:
- Desktop (≥768px): Horizontal menu bar with logo on left, links on right
- Mobile (<768px): Hamburger menu icon that opens slide-in menu
- Smooth scroll to top when navigating between pages
- Sticky positioning on scroll

**State**:
- `isMenuOpen: boolean` - Controls mobile menu visibility

**Requirements Addressed**: 6.4, 6.5, 10.1, 10.3

#### 1.2 Footer Component

**Purpose**: Displays consistent footer across all pages

**Content Sections**:
- Quick links (Home, Services, Offers, Gallery, Contact)
- Contact information (address, phone, hours)
- Social media icons (Instagram, Facebook)

**Requirements Addressed**: 1.6, 11.1

#### 1.3 WhatsApp Floating Button

**Purpose**: Provides persistent WhatsApp contact option

**Props**:
- `phoneNumber: string` - Default: "99944 21126"
- `message: string` - Pre-filled message template

**Behavior**:
- Fixed position: bottom-right corner
- Visible on all pages
- Remains visible during scroll
- Opens WhatsApp with pre-filled message on click
- Z-index ensures it's above other content

**Requirements Addressed**: 8.1, 8.2, 8.3, 8.4

### 2. Page Components

#### 2.1 Home Page

**Sections**:

1. **Hero Section**
   - Full-width background image/video
   - Overlay with headline and tagline
   - Primary CTA: "Book Appointment" button
   - Responsive text sizing
   - Requirements: 1.1, 1.2, 1.3, 1.7

2. **Services Overview**
   - Grid layout (4 columns desktop, 2 columns mobile)
   - Service cards: Hair, Skin, Bridal, Makeovers
   - Each card: icon, title, brief description, "Learn More" link
   - Requirements: 1.4

3. **Testimonials Section**
   - Carousel or grid of testimonial cards
   - Each card: quote, customer name, service type
   - Highlight influencer collaborations
   - Requirements: 1.5

4. **Footer**
   - Reuses Footer component
   - Requirements: 1.6

**State**:
- `currentTestimonial: number` - For carousel navigation

**Requirements Addressed**: 1.1-1.7

#### 2.2 Services Page

**Data Structure**:
```typescript
interface Service {
  id: string;
  name: string;
  description: string;
  price: number | string; // string for "Starting from" prices
  duration?: string;
  category: 'everyday' | 'skin-spa' | 'makeover' | 'combo';
}
```

**Sections**:

1. **Everyday Grooming**
   - Haircuts, beard trims, styling, hair washes
   - List or card layout with pricing
   - Requirements: 2.2

2. **Skin and Spa**
   - Detan, oil massage, neck relaxation
   - List or card layout with pricing
   - Requirements: 2.3

3. **Makeover Packages**
   - Bridal, Pre-Bridal, Party Makeover
   - Card layout with detailed pricing
   - Requirements: 2.4

4. **Combo Offers**
   - Promotional packages
   - Highlighted cards with special styling
   - Requirements: 2.5

**Data Management**:
- Services stored in JSON file or TypeScript constants
- Allows updates without code changes
- Requirements: 12.1

**Requirements Addressed**: 2.1-2.5, 12.1

#### 2.3 Offers Page

**Data Structure**:
```typescript
interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: Date;
  services: string[];
  price: number;
  imageUrl?: string;
}
```

**Sections**:

1. **Monthly Combo Packages**
   - Rotating offers updated monthly
   - Card layout with prominent pricing
   - Requirements: 3.2

2. **Seasonal Offers**
   - Holiday and seasonal promotions
   - Discount badges and urgency indicators
   - Requirements: 3.3

3. **Call-to-Action**
   - "Book Now" button for each offer
   - Links to booking system with offer pre-selected
   - Requirements: 3.4

**Data Management**:
- Offers stored in JSON file
- Easy to update without code changes
- Requirements: 12.2

**Requirements Addressed**: 3.1-3.4, 12.2

#### 2.4 Gallery Page

**Data Structure**:
```typescript
interface GalleryImage {
  id: string;
  category: 'bridal' | 'mens-grooming' | 'hair-color' | 'influencer';
  beforeUrl: string;
  afterUrl: string;
  title: string;
  description?: string;
  uploadDate: Date;
  isInfluencer: boolean;
}
```

**Sections**:

1. **Category Tabs/Filter**
   - Bridal, Men's Grooming, Hair Color, Influencer Highlights
   - Filter images by selected category
   - Requirements: 4.2

2. **Image Grid**
   - Masonry or grid layout
   - Before/after image pairs
   - Hover effect shows description
   - Click opens lightbox view
   - Requirements: 4.3

3. **Influencer Highlights**
   - Separate section or filter option
   - Featured transformations
   - Requirements: 4.4

4. **Social Share Buttons**
   - Share to Instagram, Facebook, WhatsApp
   - Requirements: 11.4

**State**:
- `selectedCategory: string` - Current filter
- `lightboxImage: GalleryImage | null` - Currently viewed image

**Data Management**:
- Images stored in public folder or CDN
- Metadata in JSON file
- Sorted by uploadDate (newest first)
- Requirements: 12.3, 12.4

**Requirements Addressed**: 4.1-4.4, 11.4, 12.3, 12.4

#### 2.5 Contact Page

**Sections**:

1. **Contact Information**
   - Phone number with click-to-call link
   - Phone number with click-to-WhatsApp link
   - Email address (if applicable)
   - Requirements: 5.1, 5.2, 5.3

2. **Location Map**
   - Embedded Google Maps iframe
   - Shows Porur location
   - Interactive map with zoom/pan
   - Requirements: 5.4

3. **Business Hours**
   - Table or list format
   - Clear day-by-day breakdown
   - Highlight current day
   - Requirements: 5.5

4. **Contact Form** (Optional)
   - Name, email, phone, message fields
   - Submit sends email or stores inquiry

**Requirements Addressed**: 5.1-5.5

### 3. Shared Utilities

#### 3.1 Booking Integration

**Implementation Options**:

1. **Iframe Embed**
   - Embed booking system directly in modal or page
   - Seamless user experience

2. **Redirect**
   - Open booking system in new tab
   - Simpler implementation

**Function**:
```typescript
function openBooking(serviceId?: string): void {
  // Opens booking system with optional pre-selected service
}
```

**Requirements Addressed**: 7.1, 7.2, 7.3, 7.4

#### 3.2 WhatsApp Integration

**Function**:
```typescript
function openWhatsApp(phoneNumber: string, message: string): void {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}
```

**Requirements Addressed**: 8.3

#### 3.3 Performance Optimization

**Image Optimization**:
- Use WebP format with JPEG fallback
- Responsive images with srcset
- Lazy loading for below-fold images
- Compress images to <200KB

**Code Optimization**:
- Code splitting by route
- Minify CSS and JavaScript
- Tree shaking to remove unused code
- Gzip compression

**Caching Strategy**:
- Cache static assets with long TTL
- Service worker for offline support (optional)

**Requirements Addressed**: 9.1, 9.2, 9.3, 9.4

#### 3.4 Responsive Design System

**Breakpoints**:
- Mobile: <768px
- Tablet: 768px - 1024px
- Desktop: >1024px

**Touch Targets**:
- Minimum 44x44px for all interactive elements on mobile
- Adequate spacing between clickable elements

**Typography Scale**:
- Mobile: Base 16px, headings scale down
- Desktop: Base 18px, headings scale up

**Requirements Addressed**: 6.1, 6.2, 6.3

#### 3.5 Navigation Utilities

**Smooth Scroll**:
```typescript
function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
```

**Back to Top Button**:
- Show when scrollY > 500px
- Fixed position, bottom-left corner
- Smooth scroll to top on click

**Requirements Addressed**: 10.2, 10.4

## Data Models

### Services Data

**File**: `src/data/services.json`

```json
{
  "everyday": [
    {
      "id": "haircut-basic",
      "name": "Basic Haircut",
      "description": "Classic cut and style",
      "price": 300,
      "duration": "30 min"
    }
  ],
  "skinSpa": [...],
  "makeover": [...],
  "combo": [...]
}
```

### Offers Data

**File**: `src/data/offers.json`

```json
[
  {
    "id": "monthly-combo-jan",
    "title": "New Year Grooming Package",
    "description": "Haircut + Beard Trim + Face Massage",
    "discount": "20% off",
    "validUntil": "2024-01-31",
    "services": ["haircut-premium", "beard-trim", "face-massage"],
    "price": 800
  }
]
```

### Gallery Data

**File**: `src/data/gallery.json`

```json
[
  {
    "id": "bridal-001",
    "category": "bridal",
    "beforeUrl": "/images/gallery/bridal-001-before.jpg",
    "afterUrl": "/images/gallery/bridal-001-after.jpg",
    "title": "Traditional Bridal Makeover",
    "uploadDate": "2024-01-15",
    "isInfluencer": false
  }
]
```

## Routing Structure

```
/ (Home)
/services
/offers
/gallery
/contact
```

## Performance Targets

- **Mobile 4G Load Time**: ≤3 seconds
- **First Contentful Paint**: ≤1.5 seconds
- **Time to Interactive**: ≤3.5 seconds
- **Lighthouse Score**: ≥90 (Performance, Accessibility, Best Practices, SEO)

## Accessibility

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Alt text for all images
- Sufficient color contrast (WCAG AA)
- Focus indicators for all interactive elements

## Browser Support

- Chrome (last 2 versions)
- Safari (last 2 versions)
- Firefox (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 13+)
- Chrome Mobile (Android 8+)

## Deployment Strategy

1. **Build Process**:
   - Run `npm run build` to create optimized production bundle
   - Minify and compress assets
   - Generate source maps for debugging

2. **Hosting**:
   - Deploy to Vercel/Netlify for automatic SSL and CDN
   - Or AWS S3 + CloudFront for custom setup

3. **Environment Variables**:
   - Booking system URL
   - Google Maps API key
   - Social media profile URLs

4. **Monitoring**:
   - Google Analytics for traffic tracking
   - Error tracking (Sentry or similar)
   - Performance monitoring (Web Vitals)

## Security Considerations

- HTTPS only
- Content Security Policy headers
- No sensitive data stored client-side
- Sanitize any user input (contact form)
- Regular dependency updates

## Future Enhancements

- Online payment integration
- Customer account system
- Loyalty program tracking
- Blog/content section
- Multi-language support (Tamil, English)
- Progressive Web App (PWA) capabilities

## Correctness Properties

### Property 1: Navigation Consistency
**Statement**: For all pages P in the website, the navigation menu shall contain the same set of links and maintain consistent behavior.

**Formal**: ∀p ∈ Pages, navigation(p) = {Home, Services, Offers, Gallery, Contact} ∧ behavior(navigation(p)) = consistent

**Validates**: Requirements 10.1, 10.3

**Test Strategy**: Property-based test that verifies navigation component renders identically across all page contexts.

---

### Property 2: Responsive Breakpoint Consistency
**Statement**: For all components C, when viewport width W < 768px, mobile layout is applied; when W ≥ 768px, desktop layout is applied.

**Formal**: ∀c ∈ Components, (width < 768 → layout(c) = mobile) ∧ (width ≥ 768 → layout(c) = desktop)

**Validates**: Requirements 6.1, 6.2

**Test Strategy**: Property-based test with random viewport widths, verify correct layout class application.

---

### Property 3: Touch Target Size Compliance
**Statement**: For all interactive elements E on mobile devices, the minimum touch target size shall be 44x44 pixels.

**Formal**: ∀e ∈ InteractiveElements, isMobile → (width(e) ≥ 44 ∧ height(e) ≥ 44)

**Validates**: Requirement 6.3

**Test Strategy**: Property-based test that measures computed dimensions of all buttons, links, and interactive elements on mobile viewport.

---

### Property 4: Image Lazy Loading
**Statement**: For all images I that are below the fold (not in initial viewport), lazy loading shall be applied.

**Formal**: ∀i ∈ Images, position(i) > viewportHeight → lazyLoad(i) = true

**Validates**: Requirement 9.3

**Test Strategy**: Property-based test that checks loading attribute on images based on initial position.

---

### Property 5: Data Update Independence
**Statement**: Updating service pricing, offers, or gallery images shall not require code changes, only data file modifications.

**Formal**: ∀d ∈ {services, offers, gallery}, update(d) → ¬requiresCodeChange

**Validates**: Requirements 12.1, 12.2, 12.3

**Test Strategy**: Unit test that verifies data is loaded from JSON files and rendered dynamically.

---

### Property 6: WhatsApp Button Persistence
**Statement**: The WhatsApp floating button shall be visible on all pages and remain visible during scroll.

**Formal**: ∀p ∈ Pages, ∀scrollPosition, visible(whatsappButton) = true

**Validates**: Requirements 8.1, 8.2

**Test Strategy**: Property-based test that verifies button presence and fixed positioning across all routes and scroll positions.

---

### Property 7: Booking Integration Consistency
**Statement**: All "Book Appointment" buttons shall trigger the same booking system integration regardless of location.

**Formal**: ∀b ∈ BookingButtons, onClick(b) → openBookingSystem(config)

**Validates**: Requirements 7.1, 7.2

**Test Strategy**: Unit test that verifies all booking buttons call the same integration function.

---

### Property 8: Performance Budget Compliance
**Statement**: On mobile 4G connection, page load time shall not exceed 3 seconds.

**Formal**: ∀p ∈ Pages, loadTime(p, mobile4G) ≤ 3000ms

**Validates**: Requirement 9.1

**Test Strategy**: Performance test using Lighthouse CI or WebPageTest with 4G throttling.

---

### Property 9: Social Media Link Validity
**Statement**: All social media links shall open in a new tab and point to valid salon profiles.

**Formal**: ∀link ∈ SocialMediaLinks, target(link) = "_blank" ∧ valid(url(link))

**Validates**: Requirements 11.2, 11.3

**Test Strategy**: Unit test that verifies link attributes and URL format.

---

### Property 10: Gallery Image Ordering
**Statement**: Gallery images shall be displayed in descending order by upload date (newest first).

**Formal**: ∀i, j ∈ GalleryImages, position(i) < position(j) → uploadDate(i) ≥ uploadDate(j)

**Validates**: Requirement 12.4

**Test Strategy**: Property-based test that generates random gallery data and verifies sort order.

