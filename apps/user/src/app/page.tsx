import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import DistrictRivalry from "@/components/landing/DistrictRivalry";
import CommunityPulse from "@/components/landing/CommunityPulse";
import Testimonials from "@/components/landing/Testimonials";
import Sponsors from "@/components/landing/Sponsors";
import FinalCTA from "@/components/landing/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <section className="py-20 relative overflow-hidden" id="community">
        <div className="absolute inset-0 gradient-mesh" />
        <CommunityPulse />
        <DistrictRivalry />
      </section>
      <Testimonials />
      <Sponsors />
      <FinalCTA />
    </>
  );
}
