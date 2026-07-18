/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ShoppingBag, Sparkles, Play, Heart, Database, ArrowRight } from "lucide-react";
import { FUTURE_EXPANSIONS } from "../data";

const getIcon = (name: string, className: string = "h-6 w-6") => {
  switch (name) {
    case "ShoppingBag":
      return <ShoppingBag className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Play":
      return <Play className={className} />;
    case "Heart":
      return <Heart className={className} />;
    case "Database":
      return <Database className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export default function LongTermVision() {
  return (
    <section id="vision" className="py-24 bg-forest-900 text-white relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bamboo-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-forest-800 border border-forest-700 text-[10px] font-mono text-bamboo-300 tracking-wider uppercase">
            <span>Corporate Roadmap</span>
          </span>
          <h2 id="vision-title" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 tracking-tight">
            Long-Term Vision
          </h2>
          <p id="vision-intro" className="mt-4 text-base sm:text-lg text-forest-200 font-light leading-relaxed">
            The Bamboo Sustainability Initiative aims to evolve into a multi-platform sustainability brand that blends education, product innovation, and community activism.
          </p>
        </div>

        {/* Future Expansions Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Main big block card */}
          <div className="md:col-span-2 lg:col-span-1 bg-forest-950/80 border border-forest-800 p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden h-[340px] md:h-auto lg:h-[340px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-bamboo-400/5 rounded-full blur-2xl" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-bamboo-400 font-bold bg-forest-900 px-3 py-1 rounded-full border border-forest-800">
                Core Evolution
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-6 tracking-tight leading-snug">
                Building a Global Sustainability Brand
              </h3>
              <p className="text-sm text-forest-300 font-light mt-4 leading-relaxed">
                We are building the systems, supply models, and visual assets required to shift commercial manufacturing from depleting forests toward rapid-growth bamboo crop bases.
              </p>
            </div>

            <div className="mt-8 text-xs font-mono text-forest-400 flex items-center space-x-2">
              <span>Progress status</span>
              <span className="inline-block w-2 h-2 rounded-full bg-bamboo-400 animate-ping" />
              <span className="text-bamboo-300 font-bold uppercase">Active Plan</span>
            </div>
          </div>

          {/* Individual secondary cards */}
          {FUTURE_EXPANSIONS.map((item, idx) => {
            return (
              <motion.div
                key={item.id}
                id={`expansion-card-${item.id}`}
                whileHover={{ y: -5, backgroundColor: "rgba(18, 38, 19, 0.6)" }}
                className="bg-forest-950/40 border border-forest-800/60 p-6 rounded-3xl flex flex-col justify-between h-[160px] md:h-[180px] lg:h-[160px] transition-all duration-300 relative group"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 rounded-xl bg-forest-900 border border-forest-800 text-bamboo-300 group-hover:text-white group-hover:bg-forest-800 transition-colors duration-300">
                    {getIcon(item.iconName)}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base sm:text-lg text-white tracking-tight leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-forest-300 font-light mt-2 leading-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-forest-500 uppercase mt-2">
                  <span>Expansion Node 0{idx + 1}</span>
                  <ArrowRight className="h-4 w-4 text-forest-600 group-hover:text-bamboo-400 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
