const features = [
  { icon: '💰', title: 'Affordable Prices', desc: 'Premium services at budget-friendly rates for everyone' },
  { icon: '👨‍👩‍👧‍👦', title: 'Unisex Salon', desc: 'Expert services for men, women, and kids under one roof' },
  { icon: '💎', title: 'Premium Products', desc: 'We use only top-quality, branded products for every service' },
  { icon: '⏰', title: 'Open 7 Days', desc: 'Mon to Sun, 8 AM to 9 PM — we are here when you need us' },
];

function WhyChooseUs() {
  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&q=80"
                alt="Salon interior"
                className="w-full h-[400px] md:h-[500px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white rounded-2xl p-6 shadow-xl hidden md:block">
              <p className="text-3xl font-bold">5+</p>
              <p className="text-sm opacity-90">Years of Experience</p>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary-900 mt-2 mb-6">
              Your Trusted Salon in Porur
            </h2>
            <p className="text-secondary-600 mb-8">
              At Cuts & Comb, we believe everyone deserves to look and feel their best. Our skilled team delivers top-notch grooming and beauty services in a warm, welcoming environment.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4">
                  <div className="text-3xl flex-shrink-0">{f.icon}</div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">{f.title}</h3>
                    <p className="text-secondary-600 text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
