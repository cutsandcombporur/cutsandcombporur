import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
}

/**
 * ServiceCard component displays individual service information
 * Shows service name, description, price, and duration
 * Requirements: 2.1
 */
function ServiceCard({ service }: ServiceCardProps) {
  // Format price display
  const formatPrice = (price: number | string): string => {
    if (typeof price === 'string') {
      return price;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="border-2 border-secondary-200 rounded-lg p-5 hover:border-primary-500 hover:shadow-lg transition-all duration-300">
      <h3 className="text-lg font-semibold text-secondary-900">
        {service.name}
      </h3>
      {service.description && (
        <p className="text-secondary-600 mt-1 text-sm leading-relaxed">
          {service.description}
        </p>
      )}
      <div className="flex justify-between items-center mt-3">
        <p className="text-primary-600 font-bold text-lg">
          {formatPrice(service.price)}
        </p>
        {service.duration && (
          <p className="text-secondary-500 text-sm">
            {service.duration}
          </p>
        )}
      </div>
    </div>
  );
}

export default ServiceCard;
