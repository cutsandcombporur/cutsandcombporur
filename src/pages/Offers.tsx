import { openBooking } from '../utils/booking';

const offerImages = [
  { id: 'offer-1', src: import.meta.env.BASE_URL + 'offers/1772646969599.png', alt: 'Special Offer' },
  { id: 'offer-2', src: import.meta.env.BASE_URL + 'offers/Instagram post - 600.jpg', alt: 'Salon Offer' },
  { id: 'offer-3', src: import.meta.env.BASE_URL + 'offers/Instagram post - 603.jpg', alt: 'Salon Offer' },
  { id: 'offer-4', src: import.meta.env.BASE_URL + 'offers/Picsart_26-02-23_19-37-01-587.png', alt: 'Salon Offer' },
  { id: 'offer-5', src: import.meta.env.BASE_URL + 'offers/Picsart_26-02-23_19-38-00-963.png', alt: 'Salon Offer' },
];

function Offers() {
  return (
    <div className="section-padding bg-secondary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">Limited Time</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-secondary-900">
            Special Offers
          </h1>
          <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
            Grab our exclusive deals and combo packages before they're gone!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerImages.map((offer) => (
            <div
              key={offer.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-square bg-secondary-100 cursor-pointer">
                {/* Cropped view (default) */}
                <img
                  src={offer.src}
                  alt={offer.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  loading="lazy"
                />
                {/* Full view (on hover) */}
                <img
                  src={offer.src}
                  alt={offer.alt}
                  className="absolute inset-0 w-full h-full object-contain p-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  loading="lazy"
                />
                {/* Hover hint */}
                <div className="absolute bottom-2 left-0 right-0 text-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                  <span className="bg-secondary-900/70 text-white text-xs px-3 py-1 rounded-full">
                    Hover to view full offer
                  </span>
                </div>
              </div>
              <div className="p-4 text-center">
                <button
                  onClick={() => openBooking()}
                  className="btn-primary px-6 py-2.5 text-sm font-semibold hover:scale-105 transform transition-all duration-200"
                >
                  Book This Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Offers;
