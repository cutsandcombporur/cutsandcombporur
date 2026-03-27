import { Testimonial } from '../../types';

const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    quote: "Absolutely amazing bridal makeover! The team at Cuts & Comb made me feel like a princess on my special day. Highly professional and talented.",
    customerName: "Priya Sharma",
    serviceType: "Bridal Makeover",
    isInfluencer: false,
    rating: 5
  },
  {
    id: 'test-2',
    quote: "Best grooming experience in Porur! The premium haircut and beard styling exceeded my expectations. Will definitely be coming back.",
    customerName: "Rajesh Kumar",
    serviceType: "Men's Grooming",
    isInfluencer: false,
    rating: 5
  },
  {
    id: 'test-3',
    quote: "As a local influencer, I've tried many salons, but Cuts & Comb stands out. Their attention to detail and quality of service is unmatched!",
    customerName: "Divya Menon",
    serviceType: "Hair Color & Styling",
    isInfluencer: true,
    rating: 5
  }
];

function TestimonialsSection() {
  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-secondary-900 mb-4">
          What Our Clients Say
        </h2>
        <p className="text-center text-secondary-600 mb-12 max-w-2xl mx-auto">
          Trusted by hundreds of satisfied customers and local influencers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ${
                testimonial.isInfluencer ? 'border-2 border-primary-400' : ''
              }`}
            >
              {testimonial.isInfluencer && (
                <div className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  ⭐ Influencer Collaboration
                </div>
              )}
              
              {/* Rating Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              <p className="text-secondary-700 mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </p>

              <div className="border-t border-secondary-200 pt-4">
                <p className="font-semibold text-secondary-900">{testimonial.customerName}</p>
                <p className="text-sm text-secondary-600">{testimonial.serviceType}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
