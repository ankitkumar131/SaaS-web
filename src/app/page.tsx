import Navbar from "@/components/site/navbar";
import Hero from "@/components/site/hero";
import SocialProof from "@/components/site/social-proof";
import Features from "@/components/site/features";
import HowItWorks from "@/components/site/how-it-works";
import Providers from "@/components/site/providers";
import AgentMode from "@/components/site/agent-mode";
import Failover from "@/components/site/failover";
import Pricing from "@/components/site/pricing";
import CtaSection from "@/components/site/cta";
import Footer from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Providers />
        <AgentMode />
        <Failover />
        <Pricing />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
