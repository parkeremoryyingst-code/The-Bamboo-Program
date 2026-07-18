/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Trees, RefreshCw, ShieldCheck, Leaf, Cpu, HelpCircle, CheckCircle } from "lucide-react";
import { WHY_BAMBOO_INTRO, ENVIRONMENTAL_BENEFITS } from "../data";
import MaterialStressTester from "./MaterialStressTester";

const getIcon = (name: string) => {
  switch (name) {
    case "Zap":
      return <Zap className="h-6 w-6" />;
    case "Trees":
      return <Trees className="h-6 w-6" />;
    case "RefreshCw":
      return <RefreshCw className="h-6 w-6" />;
    case "ShieldCheck":
      return <ShieldCheck className="h-6 w-6" />;
    case "Leaf":
      return <Leaf className="h-6 w-6" />;
    case "Cpu":
      return <Cpu className="h-6 w-6" />;
    default:
      return <Leaf className="h-6 w-6" />;
  }
};

export default function WhyBamboo() {
  const [selectedId, setSelectedId] = useState<string>(ENVIRONMENTAL_BENEFITS[0].id);

  const selectedBenefit = ENVIRONMENTAL_BENEFITS.find((b) => b.id === selectedId) || ENVIRONMENTAL_BENEFITS[0];

  return (
    <section id="why-bamboo" className="py-24 bg-card relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-bamboo-50/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-bamboo-100 text-[10px] font-mono text-bamboo-700 tracking-wider uppercase">
            <span>Environmental Science</span>
          </span>
          <h2 id="why-bamboo-title" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-forest-950 mt-3 tracking-tight">
            Why Bamboo Matters
          </h2>
          <p id="why-bamboo-intro" className="mt-4 text-base sm:text-lg text-forest-700 font-light leading-relaxed">
            {WHY_BAMBOO_INTRO}
          </p>
        </div>

        {/* Interactive Layout: Side-by-side spec viewer & Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Grid: Hover-triggered Fact Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ENVIRONMENTAL_BENEFITS.map((benefit, idx) => {
              const isSelected = benefit.id === selectedId;
              return (
                <motion.div
                  key={benefit.id}
                  id={`benefit-card-${benefit.id}`}
                  onClick={() => setSelectedId(benefit.id)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between h-48 select-none relative overflow-hidden ${
                    isSelected
                      ? "bg-forest-900 text-white border-forest-900 shadow-xl shadow-forest-950/10"
                      : "bg-beige-50 hover:bg-beige-100/70 text-forest-900 border-beige-200/80 shadow-sm"
                  }`}
                >
                  {/* Miniature background index number */}
                  <div className={`absolute top-2 right-4 text-6xl font-display font-black opacity-[0.03] select-none ${isSelected ? "text-bamboo-300" : "text-forest-950"}`}>
                    {idx + 1}
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl ${isSelected ? "bg-forest-800 text-bamboo-300 border border-forest-700" : "bg-card text-forest-500 shadow-sm border border-beige-100"}`}>
                        {getIcon(benefit.iconName)}
                      </div>
                      
                      <span className={`text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full ${
                        isSelected ? "bg-bamboo-400 text-forest-950" : "bg-forest-100 text-forest-700"
                      }`}>
                        {benefit.metric}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg mt-4 tracking-tight">
                      {benefit.title}
                    </h3>
                  </div>

                  <p className={`text-xs mt-2 line-clamp-2 leading-relaxed ${isSelected ? "text-forest-200" : "text-forest-600 font-light"}`}>
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Panel: Spec Detail Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-forest-50 border border-forest-100 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
              {/* Highlight background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-bamboo-200/20 rounded-full blur-2xl" />

              <h4 className="font-mono text-xs text-bamboo-500 uppercase tracking-widest font-semibold flex items-center gap-2 mb-4">
                <CheckCircle className="h-4 w-4 text-bamboo-400" />
                Selected Parameter Spec
              </h4>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedBenefit.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-baseline space-x-2">
                    <span className="font-display text-4xl sm:text-5xl font-black text-forest-900 tracking-tight">
                      {selectedBenefit.metric}
                    </span>
                    <span className="text-xs font-mono text-forest-500 uppercase">
                      Target Capacity
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-forest-950 tracking-tight">
                      {selectedBenefit.title}
                    </h3>
                    <p className="text-sm text-forest-700/90 mt-3 leading-relaxed font-light">
                      {selectedBenefit.description}
                    </p>
                  </div>

                  <div className="bg-card border border-beige-200 p-4 rounded-2xl shadow-sm">
                    <h5 className="text-xs font-mono font-bold text-forest-800 uppercase tracking-wider mb-2">
                      Project Objective Link
                    </h5>
                    <p className="text-xs text-forest-600 font-light leading-relaxed">
                      This parameters is crucial for resolving the deforestation curves, replacing harmful artificial polymers, and reducing general industry carbon outputs across target supply chains.
                    </p>
                  </div>

                  {/* Decorative Progress Meter */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-forest-600">
                      <span>Carbon Sequestration Ratio</span>
                      <span className="font-bold text-forest-900">100% Verified</span>
                    </div>
                    <div className="h-2 w-full bg-forest-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-bamboo-400 to-forest-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Interactive Stress Tester Section */}
        <MaterialStressTester />

      </div>
    </section>
  );
}
