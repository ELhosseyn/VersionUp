import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UseCases from "@/components/UseCases";
import Benefits from "@/components/Benefits";
import CTA from "@/components/CTA";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <UseCases />
      <Benefits />
      <CTA />
    </main>
  );
};

export default Index;
