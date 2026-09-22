import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { LiveSimulationWidget } from "@/components/home/LiveSimulationWidget";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { FeaturedZonesSection } from "@/components/home/FeaturedZonesSection";
import { EVTelemetrySection } from "@/components/home/EVTelemetrySection";
import { CTABanner } from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <LiveSimulationWidget />
        <HowItWorksSection />
        <FeaturedZonesSection />
        <EVTelemetrySection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
