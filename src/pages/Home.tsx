import HeroSection from '../components/home/HeroSection';
import ServicesOverview from '../components/home/ServicesOverview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTABanner from '../components/home/CTABanner';

function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesOverview />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTABanner />
    </div>
  );
}

export default Home;
