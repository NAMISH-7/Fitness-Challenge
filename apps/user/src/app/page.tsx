import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Stats from "@/components/landing/Stats";
import ChallengeShowcase from "@/components/landing/ChallengeShowcase";
import Sponsors from "@/components/landing/Sponsors";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <ChallengeShowcase />
      <Stats />
      <Sponsors />
    </>
  );
}
