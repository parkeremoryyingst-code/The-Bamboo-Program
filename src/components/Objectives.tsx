/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Trash2, Briefcase, BookOpen, Lightbulb, X, ArrowUpRight, Check } from "lucide-react";
import { CORE_OBJECTIVES } from "../data";
import { Objective } from "../types";

const getIcon = (name: string, className: string = "h-6 w-6") => {
  switch (name) {
    case "Globe":
      return <Globe className={className} />;
    case "Trash2":
      return <Trash2 className={className} />;
    case "Briefcase":
      return <Briefcase className={className} />;
    case "BookOpen":
      return <BookOpen className={className} />;
    case "Lightbulb":
      return <Lightbulb className={className} />;
    default:
      return <Globe className={className} />;
  }
};

export default function Objectives() {
  const [activeObjective, setActiveObjective] = useState<Objective | null>(null);

  return (
    <section id="objectives" className="py-24 bg-beige-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-forest-100 text-[10px] font-mono text-forest-700 tracking-wider uppercase">
            <span>Corporate Roadmap</span>
          </span>
          <h2 id="objectives-title" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 mt-3 tracking-tight">
            Core Objectives & Features
          </h2>
          <p id="objectives-intro" className="mt-4 text-base sm:text-lg text-forest-700 font-light max-w-2xl mx-auto">
            Our multi-pronged approach maps ecological research directly to commercial execution, forging an end-to-end framework.
          </p>
        </div>

        {/* Objectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_OBJECTIVES.map((objective) => {
            return (
              <motion.div
                key={objective.id}
                id={`objective-card-${objective.id}`}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => setActiveObjective(objective)}
                className="bg-card border border-beige-200 p-8 rounded-3xl cursor-pointer hover:border-bamboo-400/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group h-[280px]"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div className="p-3.5 rounded-2xl bg-forest-50 text-forest-700 group-hover:bg-forest-900 group-hover:text-bamboo-300 border border-forest-100 transition-colors duration-300">
                      {getIcon(objective.iconName)}
                    </div>
                    
                    <span className="p-1 rounded-full text-forest-300 group-hover:text-bamboo-500 transition-colors">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-forest-950 mt-6 group-hover:text-forest-900 transition-colors tracking-tight">
                    {objective.title}
                  </h3>
                  
                  <p className="text-sm text-forest-600/95 font-light mt-2 line-clamp-3 leading-relaxed">
                    {objective.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-beige-100 text-xs font-mono font-bold text-forest-500 uppercase tracking-wider group-hover:text-forest-900 transition-colors">
                  View Strategy Proposal
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Slide-In Modal Pop-up */}
        <AnimatePresence>
          {activeObjective && (
            <>
              {/* Dark Overlay backdrop */}
              <motion.div
                id="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveObjective(null)}
                className="fixed inset-0 bg-black z-50 cursor-pointer"
              />

              {/* Slide-In Side Sheet / Card Modal Container */}
              <motion.div
                id="modal-container"
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md md:max-w-lg bg-card z-50 shadow-2xl p-6 sm:p-10 flex flex-col justify-between border-l border-beige-200"
              >
                <div>
                  {/* Close controls */}
                  <div className="flex justify-between items-center mb-8 pb-4 border-b border-beige-100">
                    <div className="flex items-center space-x-2 text-forest-500">
                      {getIcon(activeObjective.iconName, "h-5 w-5 text-bamboo-500")}
                      <span className="font-mono text-xs uppercase tracking-widest font-semibold">Strategic Objective</span>
                    </div>
                    
                    <button
                      id="close-modal-btn"
                      onClick={() => setActiveObjective(null)}
                      className="p-1.5 rounded-lg hover:bg-beige-100 text-forest-600 transition-colors focus:outline-none"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div id="modal-content" className="space-y-6">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-forest-950 tracking-tight leading-tight">
                      {activeObjective.title}
                    </h3>

                    <p className="text-base text-forest-700 font-medium leading-relaxed">
                      {activeObjective.description}
                    </p>

                    <div className="p-5 bg-beige-50 rounded-2xl border border-beige-200">
                      <h4 className="text-xs font-mono font-bold text-forest-800 uppercase tracking-wider mb-2">
                        Implementation Blueprint
                      </h4>
                      <p className="text-sm text-forest-600 font-light leading-relaxed">
                        {activeObjective.details}
                      </p>
                    </div>

                    {/* Checkmarks list */}
                    <div className="space-y-2 pt-2">
                      <h5 className="text-xs font-mono font-bold text-forest-500 uppercase tracking-widest">
                        Core Milestones
                      </h5>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2.5 text-xs text-forest-700">
                          <Check className="h-4 w-4 text-bamboo-500 flex-shrink-0" />
                          <span>Establish public-use parameters baseline</span>
                        </div>
                        <div className="flex items-center space-x-2.5 text-xs text-forest-700">
                          <Check className="h-4 w-4 text-bamboo-500 flex-shrink-0" />
                          <span>Audit regional farming and export logs</span>
                        </div>
                        <div className="flex items-center space-x-2.5 text-xs text-forest-700">
                          <Check className="h-4 w-4 text-bamboo-500 flex-shrink-0" />
                          <span>Deploy physical manufacturing sample kits</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-6 border-t border-beige-100 flex gap-4">
                  <button
                    id="modal-cta-close"
                    onClick={() => setActiveObjective(null)}
                    className="flex-1 py-3 px-4 rounded-xl border border-beige-200 text-center text-sm font-semibold text-forest-700 hover:bg-beige-50 transition-colors cursor-pointer"
                  >
                    Close Sheet
                  </button>
                  <a
                    id="modal-cta-collab"
                    href="#partnerships"
                    onClick={() => {
                      setActiveObjective(null);
                      const el = document.querySelector("#partnerships");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-forest-900 text-center text-sm font-semibold text-white hover:bg-forest-800 transition-colors cursor-pointer"
                  >
                    Partner With Us
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
