import { useState } from 'react';
import ServiceCategorySection from '../components/services/ServiceCategorySection';
import servicesData from '../data/services.json';

const SUB_CATEGORY_LABELS: Record<string, string> = {
  haircut: 'Hair Cut & Styling',
  colour: 'Hair Colour',
  headMassage: 'Head Massage',
  bodyMassage: 'Body Massage',
  hairTreatments: 'Hair Treatments',
  facials: 'Facials',
  threading: 'Threading & Cleanup',
  bleach: 'Bleach',
  detan: 'Detan',
  waxing: 'Waxing',
  ricoWaxing: 'Rico Waxing',
  nails: 'Nails',
  pedicure: 'Pedicure',
  manicure: 'Manicure',
  bridal: 'Bridal Makeover',
  groom: 'Groom Makeover',
  mehndi: 'Mehndi',
};

function Services() {
  const [activeTab, setActiveTab] = useState<'male' | 'female'>('male');
  const data = servicesData as Record<string, Record<string, any[]>>;
  const categories = data[activeTab];

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-secondary-900">Our Services</h1>
          <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
            Discover our comprehensive range of grooming and beauty services.
          </p>
        </div>

        {/* Male / Female Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border-2 border-secondary-200 overflow-hidden">
            <button
              onClick={() => setActiveTab('male')}
              className={`px-8 py-3 text-lg font-semibold transition-colors min-h-[44px] ${
                activeTab === 'male'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-secondary-700 hover:bg-secondary-50'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setActiveTab('female')}
              className={`px-8 py-3 text-lg font-semibold transition-colors min-h-[44px] ${
                activeTab === 'female'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-secondary-700 hover:bg-secondary-50'
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Service Sub-Categories */}
        <div className="space-y-16">
          {Object.entries(categories).map(([key, services]) => (
            <ServiceCategorySection
              key={key}
              title={SUB_CATEGORY_LABELS[key] || key}
              services={services}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
