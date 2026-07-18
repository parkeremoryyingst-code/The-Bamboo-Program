/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Overview from "./components/Overview";
import WhyBamboo from "./components/WhyBamboo";
import Objectives from "./components/Objectives";
import ProductShowcase from "./components/ProductShowcase";
import ResearchInnovation from "./components/ResearchInnovation";
import LongTermVision from "./components/LongTermVision";
import Leadership from "./components/Leadership";
import InteractiveHub from "./components/InteractiveHub";
import Partnerships from "./components/Partnerships";
import LegalFramework from "./components/LegalFramework";
import CookieBanner from "./components/CookieBanner";
import TopDisclaimer from "./components/TopDisclaimer";

export default function App() {
  const [showDisclaimer, setShowDisclaimer] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("bsi-disclaimer-dismissed") !== "true";
    }
    return true;
  });

  const handleDismissDisclaimer = () => {
    setShowDisclaimer(false);
    localStorage.setItem("bsi-disclaimer-dismissed", "true");
  };

  return (
    <div id="bsi-root-layout" className="relative min-h-screen bg-beige-50 dark:bg-forest-950 text-forest-950 dark:text-forest-100 antialiased overflow-x-hidden selection:bg-bamboo-200 selection:text-forest-900 transition-colors duration-300">
      
      {showDisclaimer && (
        <TopDisclaimer onClose={handleDismissDisclaimer} />
      )}

      {/* Dynamic Floating Navigation with Theme Toggle */}
      <Navbar disclaimerActive={showDisclaimer} />

      <main
        id="main-content-flow"
        style={{
          paddingTop: showDisclaimer ? "var(--disclaimer-height, 36px)" : "0px",
        }}
        className="transition-all duration-300"
      >
        {/* Hero Section */}
        <Hero />

        {/* Project Overview & Mission */}
        <Overview />

        {/* Why Bamboo Matters - Interactive Facts Section */}
        <WhyBamboo />

        {/* Core Objectives - Features Grid with Drawer Sheets */}
        <Objectives />

        {/* Advanced Engineered Bamboo Products Showcase & Calculator */}
        <ProductShowcase />

        {/* Research & Innovation - Interactive Timeline Slider */}
        <ResearchInnovation />

        {/* Long Term Vision - Expansion Bento Grid */}
        <LongTermVision />

        {/* Project Leadership & Community Links */}
        <Leadership />

        {/* Community Engagement Hub - Profile, Chat, and Gemini AI */}
        <InteractiveHub />

        {/* Partnerships, Forms, Resource Downloads & Newsletters */}
        <Partnerships />
      </main>

      {/* Official Legal Website Footer & Disclosure Accordions */}
      <LegalFramework />

      {/* Persistent Cookie Choice Consent Banner */}
      <CookieBanner />
    </div>
  );
}
