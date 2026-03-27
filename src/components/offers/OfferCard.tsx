import { Offer } from '../../types';

interface OfferCardProps {
  offer: Offer;
  onBookClick?: (offerId: string) => void;
}

/**
 * OfferCard component displays promotional offer information
 * Shows offer title, description, discount badge, pricing, and Book Now CTA
 * Requirements: 3.1, 3.4
 */
function OfferCard({ offer, onBookClick }: OfferCardProps) {
  // Format price display
  const formatPrice = (price: number): string => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  // Format date display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Handle book now click
  const handleBookClick = () => {
    if (onBookClick) {
      onBookClick(offer.id);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 md:p-8 border-2 border-primary-600 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Discount Badge */}
      <div className="bg-primary-600 text-white px-4 py-2 rounded-full inline-block mb-4 text-sm font-bold self-start">
        {offer.discount}
      </div>

      {/* Offer Title */}
      <h3 className="text-xl md:text-2xl font-bold mb-3 text-secondary-900">
        {offer.title}
      </h3>

      {/* Offer Description */}
      <p className="text-secondary-700 mb-4 text-sm md:text-base leading-relaxed flex-grow">
        {offer.description}
      </p>

      {/* Valid Until */}
      <p className="text-secondary-600 text-xs md:text-sm mb-4">
        Valid until: {formatDate(offer.validUntil)}
      </p>

      {/* Price */}
      <p className="text-3xl md:text-4xl font-bold text-primary-600 mb-6">
        {formatPrice(offer.price)}
      </p>

      {/* Book Now Button */}
      <button
        onClick={handleBookClick}
        className="btn-primary w-full min-h-touch py-3 px-6 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label={`Book ${offer.title}`}
      >
        Book Now
      </button>
    </div>
  );
}

export default OfferCard;
