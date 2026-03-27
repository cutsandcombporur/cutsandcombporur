import ContactInfo from '../components/contact/ContactInfo';
import GoogleMap from '../components/contact/GoogleMap';
import BusinessHours from '../components/contact/BusinessHours';

function Contact() {
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER || '9994421126';
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919994421126';
  const address = import.meta.env.VITE_SALON_ADDRESS || 'Porur, Chennai';
  const mapsUrl = import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL || '';

  return (
    <div className="section-padding bg-secondary-50">
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
            Get in touch with us for appointments, inquiries, or just to say hello!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <ContactInfo
              phoneNumber={phoneNumber}
              whatsappNumber={whatsappNumber}
              address={address}
            />
            <BusinessHours />
          </div>

          {/* Right Column - Map */}
          <div>
            <GoogleMap embedUrl={mapsUrl} address={address} />
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-center text-white shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to Transform Your Look?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Book your appointment today and experience luxury grooming at its finest
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${phoneNumber}`}
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors min-h-[44px] inline-flex items-center justify-center"
            >
              Call Now
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors min-h-[44px] inline-flex items-center justify-center"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
