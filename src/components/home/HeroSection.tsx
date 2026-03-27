import { openBooking } from '../../utils/booking';
import { Link } from 'react-router-dom';

const heroImages = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary-900">
      {/* Main Hero */}
      <div className="relative min-h-[90vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600&q=80)` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/95 via-secondary-900/80 to-secondary-900/40" />

        <div className="container-custom relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <div>
              <div className="inline-block bg-primary-600/20 border border-primary-500/30 rounded-full px-4 py-1.5 mb-6">
                <span className="text-primary-300 text-sm font-medium tracking-wide">Welcome to Porur's Favourite Salon</span>
              </div>
              <h1 className="font-heading font-bold text-white mb-4">
                <span className="block text-5xl md:text-6xl lg:text-7xl leading-tight">Cuts & Comb</span>
                <span className="block text-2xl md:text-3xl font-medium text-primary-400 mt-3">Affordable Unisex Salon</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-3 tracking-[0.2em] uppercase font-medium">
                Bridal | Hair | Skin | Grooming
              </p>
              <p className="text-lg text-white/60 mb-8 max-w-lg">
                Expert grooming and beauty services for the whole family. Look your best, feel your best.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => openBooking()}
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 hover:scale-105 transform transition-all duration-200 min-h-[44px] shadow-lg shadow-primary-600/30"
                >
                  Book Appointment
                </button>
                <Link
                  to="/services"
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-200 min-h-[44px]"
                >
                  View Services
                </Link>
              </div>
            </div>

            {/* Right - Image Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-2xl h-48">
                  <img src={heroImages[0]} alt="Salon styling" className="w-full h-full object-cover" loading="eager" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl h-64">
                  <img src={heroImages[1]} alt="Hair coloring" className="w-full h-full object-cover" loading="eager" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-2xl h-64">
                  <img src={heroImages[2]} alt="Bridal makeover" className="w-full h-full object-cover" loading="eager" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-6">
                  <div className="text-center text-white">
                    <p className="text-4xl font-bold">500+</p>
                    <p className="text-sm mt-1 opacity-90">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
