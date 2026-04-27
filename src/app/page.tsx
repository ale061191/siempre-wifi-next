import Hero from '@/components/Hero';
import TrustIcons from '@/components/TrustIcons';
import Benefits from '@/components/Benefits';
import ImageShowcase from '@/components/ImageShowcase';
import FeatureHighlight from '@/components/FeatureHighlight';
import HowItWorks from '@/components/HowItWorks';
import Plans from '@/components/Plans';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustIcons />
      <Benefits />
      <ImageShowcase />
      <FeatureHighlight />
      <HowItWorks />
      <Plans />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
}
