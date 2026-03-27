import { Link } from 'react-router-dom';

const serviceCategories = [
  {
    id: 'hair',
    title: 'Hair Styling',
    description: 'Cuts, coloring, treatments & more for men and women',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80',
    link: '/services',
  },
  {
    id: 'skin',
    title: 'Skin & Facials',
    description: 'Glow facials, detan, cleanup & luxury skin treatments',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    link: '/services',
  },
  {
    id: 'bridal',
    title: 'Bridal Makeover',
    description: 'Complete bridal & groom packages with MAC makeup',
    image: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&q=80',
    link: '/services',
  },
  {
    id: 'grooming',
    title: 'Grooming',
    description: 'Beard styling, head massage, waxing & spa combos',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
    link: '/services',
  },
  {
    id: 'nails',
    title: 'Nails & Pedicure',
    description: 'Manicure, pedicure, nail art & spa treatments',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
    link: '/services',
  },
  {
    id: 'mehndi',
    title: 'Mehndi',
    description: 'Arabic, bridal & designer mehndi for all occasions',
    image: 'https://images.unsplash.com/photo-1600002415506-dd06090d3480?w=600&q=80',
    link: '/services',
  },
];

function ServicesOverview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-14">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">What We Offer</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary-900 mt-2 mb-4">
            Our Services
          </h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            From everyday grooming to bridal makeovers, we've got you covered with premium services at affordable prices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((service) => (
            <Link
              key={service.id}
              to={service.link}
              className="group relative rounded-2xl overflow-hidden h-72 shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/90 via-secondary-900/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-heading font-bold text-white mb-1">{service.title}</h3>
                <p className="text-white/80 text-sm">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/services"
            className="btn-primary inline-block px-10 py-4 text-lg hover:scale-105 transform transition-all duration-200"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServicesOverview;
