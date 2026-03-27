import { openBooking } from '../../utils/booking';

function CTABanner() {
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER || '9994421126';

  return (
    <section className="relative py-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=80)' }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-primary-900/85" />
      <div className="container-custom relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
          Ready for a Fresh New Look?
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Book your appointment today and let our experts take care of the rest.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => openBooking()}
            className="bg-white text-primary-700 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors min-h-[44px] shadow-lg"
          >
            Book Now
          </button>
          <a
            href={`tel:${phoneNumber}`}
            className="border-2 border-white text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors min-h-[44px]"
          >
            Call 99944 21126
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTABanner;
