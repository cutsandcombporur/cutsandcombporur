# Implementation Plan: Cuts & Comb Salon Website

## Overview

This implementation plan breaks down the Cuts & Comb salon website into discrete coding tasks. The website will be built using React with TypeScript, Tailwind CSS, and Vite. The approach follows a mobile-first, component-driven development strategy with performance optimization and responsive design as core principles.

## Tasks

- [x] 1. Project setup and configuration
  - Initialize Vite project with React and TypeScript template
  - Install and configure Tailwind CSS with custom theme
  - Install React Router for client-side routing
  - Set up project structure (components, pages, data, utils folders)
  - Configure TypeScript with strict mode
  - Set up ESLint and Prettier for code quality
  - Create environment variables file for configuration
  - _Requirements: All (foundation for entire project)_

- [ ] 2. Create data models and JSON data files
  - [x] 2.1 Create TypeScript interfaces for data models
    - Define Service, Offer, GalleryImage, and ContactInfo interfaces
    - Create types for component props
    - _Requirements: 2.1, 3.1, 4.1, 12.1, 12.2, 12.3_
  
  - [x] 2.2 Create services.json data file
    - Structure data for Everyday Grooming, Skin & Spa, Makeover Packages, and Combo Offers
    - Include service names, descriptions, pricing, and durations
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 12.1_
  
  - [x] 2.3 Create offers.json data file
    - Structure data for monthly combo packages and seasonal offers
    - Include titles, descriptions, discounts, valid dates, and pricing
    - _Requirements: 3.2, 3.3, 12.2_
  
  - [x] 2.4 Create gallery.json data file
    - Structure data for gallery images with categories and metadata
    - Include before/after URLs, titles, upload dates, and influencer flags
    - _Requirements: 4.2, 4.3, 4.4, 12.3, 12.4_
  
  - [ ]* 2.5 Write property test for data models
    - **Property 5: Data Update Independence**
    - **Validates: Requirements 12.1, 12.2, 12.3**
    - Verify data is loaded from JSON files without code changes

- [ ] 3. Implement shared layout components
  - [x] 3.1 Create Navigation component
    - Implement responsive navigation with hamburger menu for mobile
    - Add navigation links for all pages with active state highlighting
    - Implement sticky positioning on scroll
    - Ensure touch-friendly sizing (44x44px minimum) on mobile
    - _Requirements: 6.3, 6.4, 6.5, 10.1, 10.3_
  
  - [ ]* 3.2 Write property test for Navigation component
    - **Property 1: Navigation Consistency**
    - **Validates: Requirements 10.1, 10.3**
    - Verify navigation renders identically across all page contexts
  
  - [x] 3.3 Create Footer component
    - Display quick links, contact information, and business hours
    - Add Instagram and Facebook icons with external links
    - Ensure responsive layout for mobile and desktop
    - _Requirements: 1.6, 11.1_
  
  - [x] 3.4 Create WhatsApp floating button component
    - Implement fixed positioning in bottom-right corner
    - Add click handler to open WhatsApp with pre-filled message
    - Ensure visibility on all pages and during scroll
    - Style with appropriate z-index and mobile-friendly size
    - _Requirements: 8.1, 8.2, 8.3, 8.4_
  
  - [ ]* 3.5 Write property test for WhatsApp button
    - **Property 6: WhatsApp Button Persistence**
    - **Validates: Requirements 8.1, 8.2**
    - Verify button presence and fixed positioning across all routes

- [ ] 4. Implement responsive design utilities
  - [x] 4.1 Configure Tailwind breakpoints and custom theme
    - Set up mobile (<768px), tablet (768-1024px), and desktop (>1024px) breakpoints
    - Define custom colors matching salon branding
    - Configure typography scale for responsive text sizing
    - _Requirements: 6.1, 6.2_
  
  - [x] 4.2 Create responsive layout wrapper component
    - Implement container with max-width and padding
    - Apply mobile-first responsive classes
    - _Requirements: 6.1, 6.2_
  
  - [ ]* 4.3 Write property test for responsive breakpoints
    - **Property 2: Responsive Breakpoint Consistency**
    - **Validates: Requirements 6.1, 6.2**
    - Verify correct layout application at different viewport widths
  
  - [ ]* 4.4 Write property test for touch target sizes
    - **Property 3: Touch Target Size Compliance**
    - **Validates: Requirement 6.3**
    - Verify all interactive elements meet 44x44px minimum on mobile

- [x] 5. Checkpoint - Verify shared components
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement Home page
  - [x] 6.1 Create Hero section component
    - Implement full-width background image with overlay
    - Add headline, tagline, and "Book Appointment" CTA button
    - Ensure responsive text sizing and image optimization
    - _Requirements: 1.1, 1.2, 1.3_
  
  - [x] 6.2 Create Services overview section
    - Implement grid layout (4 columns desktop, 2 columns mobile)
    - Create service cards for Hair, Skin, Bridal, and Makeovers
    - Add icons, titles, descriptions, and "Learn More" links
    - _Requirements: 1.4_
  
  - [x] 6.3 Create Testimonials section
    - Implement testimonial cards with quotes and customer names
    - Add carousel or grid layout for multiple testimonials
    - Highlight influencer collaborations
    - _Requirements: 1.5_
  
  - [x] 6.4 Assemble Home page with all sections
    - Integrate Hero, Services overview, Testimonials, and Footer
    - Ensure smooth scrolling and responsive behavior
    - _Requirements: 1.1, 1.6, 1.7_

- [ ] 7. Implement Services page
  - [x] 7.1 Create service category section component
    - Build reusable component for displaying service lists
    - Implement card or list layout with service name, description, price, and duration
    - _Requirements: 2.1_
  
  - [-] 7.2 Create Services page with all categories
    - Load services data from services.json
    - Display Everyday Grooming, Skin & Spa, Makeover Packages, and Combo Offers sections
    - Ensure responsive grid layout
    - _Requirements: 2.2, 2.3, 2.4, 2.5_
  
  - [ ] 7.3 Write unit tests for Services page
    - Test data loading from JSON file
    - Test rendering of all service categories
    - Test responsive layout behavior
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 8. Implement Offers page
  - [x] 8.1 Create offer card component
    - Display offer title, description, discount, and pricing
    - Add "Book Now" CTA button
    - Style with prominent visual design for promotions
    - _Requirements: 3.1, 3.4_
  
  - [x] 8.2 Create Offers page with dynamic content
    - Load offers data from offers.json
    - Display monthly combo packages and seasonal offers sections
    - Implement responsive grid layout
    - _Requirements: 3.2, 3.3_
  
  - [ ]* 8.3 Write unit tests for Offers page
    - Test data loading from JSON file
    - Test rendering of offer cards
    - Test "Book Now" button functionality
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 9. Implement Gallery page
  - [x] 9.1 Create gallery image component
    - Display before/after image pairs
    - Implement hover effect showing description
    - Add click handler to open lightbox view
    - _Requirements: 4.3_
  
  - [x] 9.2 Create category filter component
    - Implement tabs or buttons for Bridal, Men's Grooming, Hair Color, and Influencer categories
    - Add active state styling
    - _Requirements: 4.2_
  
  - [x] 9.3 Create lightbox modal component
    - Display full-size image with navigation controls
    - Add social share buttons (Instagram, Facebook, WhatsApp)
    - Implement close and keyboard navigation
    - _Requirements: 11.4_
  
  - [x] 9.4 Create Gallery page with filtering and sorting
    - Load gallery data from gallery.json
    - Implement category filtering based on selected tab
    - Sort images by upload date (newest first)
    - Display images in responsive grid layout
    - _Requirements: 4.1, 4.2, 4.4, 12.4_
  
  - [ ]* 9.5 Write property test for gallery image ordering
    - **Property 10: Gallery Image Ordering**
    - **Validates: Requirement 12.4**
    - Verify images are sorted by upload date in descending order

- [x] 10. Implement Contact page
  - [x] 10.1 Create contact information section
    - Display phone number with click-to-call link
    - Display phone number with click-to-WhatsApp link
    - Format contact details clearly
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [x] 10.2 Create Google Maps embed component
    - Embed Google Maps iframe showing Porur location
    - Ensure responsive sizing
    - _Requirements: 5.4_
  
  - [x] 10.3 Create business hours section
    - Display hours in table or list format
    - Highlight current day
    - Ensure readable formatting
    - _Requirements: 5.5_
  
  - [x] 10.4 Assemble Contact page with all sections
    - Integrate contact info, map, and business hours
    - Ensure responsive layout
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 11. Checkpoint - Verify all pages render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Implement booking system integration
  - [x] 12.1 Create booking utility function
    - Implement openBooking function that opens booking system (Fresha/Calendly/Square)
    - Support optional pre-selected service parameter
    - Choose between iframe embed or redirect approach
    - _Requirements: 7.1, 7.2_
  
  - [x] 12.2 Connect all "Book Appointment" buttons
    - Wire Hero section CTA to booking function
    - Wire Offers page "Book Now" buttons to booking function
    - Ensure consistent behavior across all booking triggers
    - _Requirements: 1.7, 3.4, 7.3_
  
  - [ ]* 12.3 Write property test for booking integration
    - **Property 7: Booking Integration Consistency**
    - **Validates: Requirements 7.1, 7.2**
    - Verify all booking buttons call the same integration function

- [x] 13. Implement social media integration
  - [x] 13.1 Add social media links to Footer
    - Add Instagram and Facebook icons with external links
    - Ensure links open in new tab with target="_blank"
    - _Requirements: 11.1, 11.2, 11.3_
  
  - [x] 13.2 Add social share functionality to Gallery
    - Implement share buttons in lightbox modal
    - Create share functions for Instagram, Facebook, and WhatsApp
    - _Requirements: 11.4_
  
  - [ ]* 13.3 Write property test for social media links
    - **Property 9: Social Media Link Validity**
    - **Validates: Requirements 11.2, 11.3**
    - Verify link attributes and URL format

- [x] 14. Implement navigation utilities
  - [x] 14.1 Create smooth scroll utility
    - Implement scrollToTop function with smooth behavior
    - Apply to navigation link clicks
    - _Requirements: 10.2_
  
  - [x] 14.2 Create "Back to Top" button component
    - Show button when scroll position > 500px
    - Implement fixed positioning in bottom-left corner
    - Add click handler to scroll to top smoothly
    - _Requirements: 10.4_
  
  - [ ]* 14.3 Write unit tests for navigation utilities
    - Test scroll behavior
    - Test "Back to Top" button visibility logic
    - _Requirements: 10.2, 10.4_

- [x] 15. Implement performance optimizations
  - [x] 15.1 Configure image optimization
    - Convert images to WebP format with JPEG fallback
    - Compress images to <200KB
    - Implement responsive images with srcset
    - _Requirements: 9.2_
  
  - [x] 15.2 Implement lazy loading for images
    - Add lazy loading attribute to below-fold images
    - Use react-lazy-load-image-component or native loading="lazy"
    - _Requirements: 9.3_
  
  - [ ]* 15.3 Write property test for image lazy loading
    - **Property 4: Image Lazy Loading**
    - **Validates: Requirement 9.3**
    - Verify loading attribute on images based on position
  
  - [x] 15.4 Configure build optimizations
    - Enable code splitting by route in Vite config
    - Configure minification for CSS and JavaScript
    - Enable gzip compression
    - _Requirements: 9.4_
  
  - [ ]* 15.5 Run performance tests
    - **Property 8: Performance Budget Compliance**
    - **Validates: Requirement 9.1**
    - Test page load time on mobile 4G using Lighthouse CI
    - Ensure load time ≤ 3 seconds

- [x] 16. Implement routing and final integration
  - [x] 16.1 Set up React Router configuration
    - Define routes for Home, Services, Offers, Gallery, and Contact pages
    - Implement route-based code splitting
    - Add 404 page for invalid routes
    - _Requirements: 10.1, 10.2_
  
  - [x] 16.2 Create App component with routing
    - Integrate Router with all page components
    - Add Navigation and WhatsApp button to layout
    - Ensure smooth transitions between pages
    - _Requirements: 10.1, 10.2, 10.3_
  
  - [x] 16.3 Test navigation between all pages
    - Verify all navigation links work correctly
    - Test active page highlighting
    - Ensure page transitions are smooth (≤500ms)
    - _Requirements: 10.2, 10.3_

- [x] 17. Final checkpoint and deployment preparation
  - [x] 17.1 Run full test suite
    - Execute all unit tests and property tests
    - Fix any failing tests
    - Ensure code coverage meets standards
  
  - [x] 17.2 Create production build
    - Run `npm run build` to generate optimized bundle
    - Verify bundle size and performance metrics
    - Test production build locally
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  
  - [x] 17.3 Configure deployment settings
    - Set up environment variables for production
    - Configure booking system URL
    - Add Google Maps API key
    - Set social media profile URLs
  
  - [x] 17.4 Create deployment documentation
    - Document deployment process
    - List environment variables needed
    - Provide instructions for updating data files
    - _Requirements: 12.1, 12.2, 12.3_

- [ ] 18. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The implementation follows a mobile-first approach with responsive design throughout
- Data files (JSON) allow content updates without code changes
- Performance optimization is integrated throughout the implementation, not just at the end
- Checkpoints ensure incremental validation and provide opportunities for user feedback
