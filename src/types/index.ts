/**
 * TypeScript interfaces and types for Cuts & Comb Salon Website
 * 
 * This file contains all data models and component prop types used throughout the application.
 * Requirements: 2.1, 3.1, 4.1, 12.1, 12.2, 12.3
 */

// ============================================================================
// Data Models
// ============================================================================

/**
 * Service category types
 */
export type ServiceCategory = 'male' | 'female';

/**
 * Service interface representing salon services
 * Requirements: 2.1, 12.1
 */
export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number | string;
  duration?: string;
  category: string;
}

/**
 * Sub-category of services (e.g. haircut, colour, facials)
 */
export interface ServiceSubCategory {
  [key: string]: Service[];
}

/**
 * Grouped services by gender
 */
export interface ServicesData {
  male: ServiceSubCategory;
  female: ServiceSubCategory;
}

/**
 * Offer interface representing promotional offers
 * Requirements: 3.1, 12.2
 */
export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string; // ISO date string
  services: string[]; // Array of service IDs
  price: number;
  imageUrl?: string;
}

/**
 * Gallery image category types
 */
export type GalleryCategory = 'bridal' | 'mens-grooming' | 'hair-color' | 'influencer';

/**
 * Gallery image interface representing before/after photos
 * Requirements: 4.1, 12.3
 */
export interface GalleryImage {
  id: string;
  category: GalleryCategory;
  beforeUrl: string;
  afterUrl: string;
  title: string;
  description?: string;
  uploadDate: string; // ISO date string
  isInfluencer: boolean;
}

/**
 * Contact information interface
 * Requirements: 5.1
 */
export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email?: string;
  address: string;
  mapUrl: string;
  businessHours: BusinessHours[];
}

/**
 * Business hours for each day
 */
export interface BusinessHours {
  day: string;
  hours: string;
  isToday?: boolean;
}

// ============================================================================
// Component Props
// ============================================================================

/**
 * Navigation component props
 * Requirements: 6.4, 6.5, 10.1
 */
export interface NavigationProps {
  currentPage?: string;
}

/**
 * Footer component props
 * Requirements: 1.6, 11.1
 */
export interface FooterProps {
  contactInfo?: ContactInfo;
}

/**
 * WhatsApp floating button props
 * Requirements: 8.1, 8.2, 8.3
 */
export interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

/**
 * Service card component props
 * Requirements: 2.1
 */
export interface ServiceCardProps {
  service: Service;
  onBookClick?: (serviceId: string) => void;
}

/**
 * Offer card component props
 * Requirements: 3.1
 */
export interface OfferCardProps {
  offer: Offer;
  onBookClick?: (offerId: string) => void;
}

/**
 * Gallery image card component props
 * Requirements: 4.1
 */
export interface GalleryImageCardProps {
  image: GalleryImage;
  onImageClick?: (imageId: string) => void;
}

/**
 * Hero section component props
 * Requirements: 1.2, 1.3
 */
export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

/**
 * Testimonial interface
 * Requirements: 1.5
 */
export interface Testimonial {
  id: string;
  quote: string;
  customerName: string;
  serviceType: string;
  isInfluencer?: boolean;
  rating?: number;
}

/**
 * Testimonial card component props
 * Requirements: 1.5
 */
export interface TestimonialCardProps {
  testimonial: Testimonial;
}

/**
 * Services overview section props
 * Requirements: 1.4
 */
export interface ServicesOverviewProps {
  services: Service[];
  onLearnMoreClick?: (category: ServiceCategory) => void;
}

/**
 * Gallery filter props
 * Requirements: 4.2
 */
export interface GalleryFilterProps {
  categories: GalleryCategory[];
  selectedCategory: GalleryCategory | 'all';
  onCategoryChange: (category: GalleryCategory | 'all') => void;
}

/**
 * Lightbox component props for gallery images
 * Requirements: 4.3
 */
export interface LightboxProps {
  image: GalleryImage | null;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

/**
 * Contact form data interface
 * Requirements: 5.1
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/**
 * Contact form component props
 * Requirements: 5.1
 */
export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  isSubmitting?: boolean;
}

/**
 * Back to top button props
 * Requirements: 10.4
 */
export interface BackToTopButtonProps {
  showThreshold?: number; // Scroll position in pixels to show button
}

/**
 * Social media links interface
 * Requirements: 11.1, 11.2, 11.3
 */
export interface SocialMediaLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
}

/**
 * Social share button props
 * Requirements: 11.4
 */
export interface SocialShareButtonProps {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Page route type
 */
export type PageRoute = '/' | '/services' | '/offers' | '/gallery' | '/contact';

/**
 * Responsive breakpoint type
 * Requirements: 6.1, 6.2
 */
export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * Loading state type
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}
