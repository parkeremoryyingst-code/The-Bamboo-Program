/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Hammer, Megaphone, Users, Compass, ChevronLeft, ChevronRight, CheckCircle, Eye } from "lucide-react";
import { PROJECT_COMPONENTS } from "../data";

const getIcon = (name: string, className: string = "h-8 w-8") => {
  switch (name) {
    case "Activity":
      return <Activity className={className} />;
    case "Hammer":
      return <Hammer className={className} />;
    case "Megaphone":
      return <Megaphone className={className} />;
    case "Users":
      return <Users className={className} />;
    case "Compass":
      return <Compass className={className} />;
    default:
      return <Activity className={className} />;
  }
};

export default function ResearchInnovation() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const stepData = PROJECT_COMPONENTS[activeStep];

  const handleNext = () => {
    setActiveStep((prev) => (prev === PROJECT_COMPONENTS.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev === 0 ? PROJECT_COMPONENTS.length - 1 : prev - 1));
  };

  // Mock specs that fit each phase nicely to make the prototype showcase extremely rich
  const getPhaseSpecs = (id: string) => {
    switch (id) {
      case "research-dev":
        return [
          { label: "Species Profiled", value: "14 Varieties" },
          { label: "Tensile Strength", value: "Up to 400 MPa" },
          { label: "Moisture Coefficient", value: "< 0.08%" },
        ];
      case "product-prototyping":
        return [
          { label: "Compostable Trays", value: "98% Decay Rate" },
          { label: "Desk Tensile Limit", value: "180kg Max" },
          { label: "Joinery Friction", value: "0.02μ Slip" },
        ];
      case "public-awareness":
        return [
          { label: "Educational Videos", value: "24 Published" },
          { label: "Community Views", value: "1.2 Million" },
          { label: "Content Guides", value: "8 Free PDFs" },
        ];
      case "partnership-outreach":
        return [
          { label: "Partner Brands", value: "12 Enrolled" },
          { label: "Supply Chain Audits", value: "3 Completed" },
          { label: "Avg. Carbon Boost", value: "-22% Offset" },
        ];
      case "community-engagement":
        return [
          { label: "Makers Registered", value: "4,200 active" },
          { label: "Live Workshops", value: "6 Hosted" },
          { label: "DIY Blueprint Downloads", value: "15,800 total" },
        ];
      default:
        return [];
    }
  };

  const specs = getPhaseSpecs(stepData.id);

  return (
    <section id="research" className="py-24 bg-card relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-bamboo-100 text-[10px] font-mono text-bamboo-700 tracking-wider uppercase">
            <span>R&D / Phase Showcase</span>
          </span>
          <h2 id="research-title" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-forest-950 mt-3 tracking-tight">
            Research & Innovation
          </h2>
          <p id="research-intro" className="mt-4 text-base sm:text-lg text-forest-700 font-light max-w-2xl mx-auto">
            Experience our progressive implementation roadmap from baseline laboratory science up to scaled public community adoption.
          </p>
        </div>

        {/* Timeline Slider Navigation Node Train */}
        <div className="relative mb-12 max-w-4xl mx-auto hidden md:block">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-beige-200 -translate-y-1/2 z-0 rounded-full" />
          
          {/* Filled active timeline line */}
          <div
            className="absolute top-1/2 left-0 h-1 bg-forest-900 -translate-y-1/2 z-0 rounded-full transition-all duration-500"
            style={{ width: `${(activeStep / (PROJECT_COMPONENTS.length - 1)) * 100}%` }}
          />

          {/* Timeline Nodes */}
          <div className="relative flex justify-between z-10">
            {PROJECT_COMPONENTS.map((comp, idx) => {
              const isPassed = idx <= activeStep;
              const isActive = idx === activeStep;
              return (
                <button
                  key={comp.id}
                  id={`timeline-node-${idx}`}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center focus:outline-none group cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-forest-900 text-bamboo-300 border-forest-900 scale-110 shadow-lg shadow-forest-950/15"
                        : isPassed
                        ? "bg-forest-50 text-forest-700 border-forest-500 hover:border-forest-600"
                        : "bg-card text-forest-300 border-beige-200 hover:border-forest-300"
                    }`}
                  >
                    {getIcon(comp.iconName, "h-5 w-5")}
                  </div>
                  <span
                    className={`text-[10px] font-mono mt-3 uppercase tracking-wider font-bold transition-colors ${
                      isActive ? "text-forest-900" : "text-forest-500 group-hover:text-forest-700"
                    }`}
                  >
                    Phase {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline Display Body */}
        <div className="bg-beige-100 rounded-3xl border border-beige-200/60 p-6 sm:p-10 max-w-5xl mx-auto shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Icon / Slide Transition Panel */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-card rounded-2xl border border-beige-200 h-64 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-bamboo-400" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={stepData.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <div className="p-5 rounded-full bg-forest-50 text-forest-900 mb-4 border border-forest-100 shadow-md">
                    {getIcon(stepData.iconName, "h-10 w-10 text-forest-900")}
                  </div>
                  
                  <span className="font-mono text-xs text-bamboo-600 font-bold tracking-widest uppercase">
                    {stepData.phase}
                  </span>
                  
                  <span className="text-[10px] font-mono text-forest-500 uppercase mt-1">
                    BSI Core Track
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description and Data Display */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stepData.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 id="timeline-step-title" className="font-display text-2xl sm:text-3xl font-bold text-forest-950 tracking-tight">
                    {stepData.title}
                  </h3>
                  
                  <p id="timeline-step-desc" className="text-sm sm:text-base text-forest-800 font-light leading-relaxed">
                    {stepData.description}
                  </p>

                  <div className="p-4 bg-card/70 border border-beige-200 rounded-xl">
                    <p className="text-xs text-forest-600 italic font-light leading-relaxed">
                      "{stepData.details}"
                    </p>
                  </div>

                  {/* Specs grid */}
                  <div className="pt-2">
                    <h5 className="text-[10px] font-mono font-bold text-forest-400 uppercase tracking-widest mb-3">
                      Target Metric Thresholds
                    </h5>
                    <div className="grid grid-cols-3 gap-4">
                      {specs.map((spec, i) => (
                        <div key={i} className="bg-card/40 p-3 rounded-lg border border-beige-200/50">
                          <div className="text-[10px] text-forest-500 font-mono uppercase tracking-wide truncate">
                            {spec.label}
                          </div>
                          <div className="text-sm font-semibold text-forest-900 font-display mt-1">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-beige-200/60 gap-4">
                <div className="text-xs font-mono text-forest-500">
                  Step <span className="font-bold text-forest-900">{activeStep + 1}</span> of {PROJECT_COMPONENTS.length}
                </div>

                {/* Micro Node Indicators (Nodes at the Bottom of Phase Showcase) */}
                <div className="flex items-center space-x-2.5 bg-card/40 py-1.5 px-3 rounded-full border border-beige-200/40">
                  {PROJECT_COMPONENTS.map((comp, idx) => {
                    const isActive = idx === activeStep;
                    return (
                      <button
                        key={comp.id}
                        id={`timeline-bottom-node-${idx}`}
                        onClick={() => setActiveStep(idx)}
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-300 relative group cursor-pointer focus:outline-none ${
                          isActive
                            ? "bg-forest-900 dark:bg-bamboo-400 border-forest-900 dark:border-bamboo-400 scale-125 shadow-sm"
                            : "bg-white dark:bg-forest-900/60 border-beige-300 dark:border-forest-800 hover:border-forest-500 hover:scale-110"
                        }`}
                        title={`Jump to Phase ${idx + 1}: ${comp.title}`}
                        aria-label={`Jump to Phase ${idx + 1}`}
                      >
                        <span className="absolute -top-8 bg-forest-950 text-white text-[9px] font-mono py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none whitespace-nowrap shadow-md z-20">
                          Phase {idx + 1}: {comp.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    id="timeline-btn-prev"
                    onClick={handlePrev}
                    className="p-2.5 rounded-xl bg-card border border-beige-200 text-forest-800 hover:bg-forest-50 hover:text-forest-950 transition-colors focus:outline-none shadow-sm cursor-pointer"
                    aria-label="Previous step"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    id="timeline-btn-next"
                    onClick={handleNext}
                    className="p-2.5 rounded-xl bg-card border border-beige-200 text-forest-800 hover:bg-forest-50 hover:text-forest-950 transition-colors focus:outline-none shadow-sm cursor-pointer"
                    aria-label="Next step"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
