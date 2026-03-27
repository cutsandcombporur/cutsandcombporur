import { Service } from '../../types';
import ServiceCard from './ServiceCard';

interface ServiceCategorySectionProps {
  title: string;
  services: Service[];
  description?: string;
}

/**
 * ServiceCategorySection component displays a category of services
 * Renders a section with title and grid of service cards
 * Requirements: 2.1
 */
function ServiceCategorySection({ 
  title, 
  services, 
  description 
}: ServiceCategorySectionProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-3 text-secondary-900">
          {title}
        </h2>
        {description && (
          <p className="text-secondary-600 text-lg">
            {description}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}

export default ServiceCategorySection;
