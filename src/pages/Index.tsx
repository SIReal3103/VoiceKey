import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import MarketSection from "@/components/MarketSection";
import UseCasesSection from "@/components/UseCasesSection";
import RoadmapSection from "@/components/RoadmapSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <HowItWorksSection />
    <MarketSection />
    <UseCasesSection />
    <RoadmapSection />
    <CTASection />
    <FooterSection />
  </div>
);

export default Index;
