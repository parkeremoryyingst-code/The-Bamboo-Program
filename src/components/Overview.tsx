/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Info, ShieldAlert, Sparkles, HeartHandshake } from "lucide-react";
import { PROJECT_OVERVIEW, MISSION_STATEMENT } from "../data";

export default function Overview() {
  return (
    <section id="about" className="py-24 bg-beige-100 relative overflow-hidden">
      {/* Decorative leafy elements or background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-bamboo-200/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Project Overview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="flex items-center space-x-2 text-forest-500 mb-4">
              <Info className="h-5 w-5 text-bamboo-500" />
              <span className="font-mono text-xs uppercase tracking-widest font-semibold">Initiative Profile</span>
            </div>
            
            <h2 id="overview-title" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 tracking-tight leading-tight">
              {PROJECT_OVERVIEW.title}
            </h2>
            
            <p id="overview-desc" className="mt-6 text-base sm:text-lg text-forest-800 font-light leading-relaxed">
              {PROJECT_OVERVIEW.description}
            </p>

            {/* Legal Notice Box */}
            <div
              id="overview-legal-notice"
              className="mt-8 p-4 bg-beige-200/60 border-l-4 border-bamboo-500/80 rounded-r-xl"
            >
              <div className="flex items-start space-x-3">
                <ShieldAlert className="h-5 w-5 text-bamboo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-forest-900 uppercase tracking-wider">
                    Legal Protection Notice
                  </h4>
                  <p className="text-xs text-forest-700/90 mt-1 leading-relaxed">
                    {PROJECT_OVERVIEW.legalNotice}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex"
          >
            <div className="w-full bg-forest-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-xl shadow-forest-950/10">
              {/* Abstract green pattern decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-bamboo-400/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
              
              <div>
                <span className="inline-flex items-center justify-center p-3 bg-forest-800/80 rounded-2xl border border-forest-700 mb-6 text-bamboo-300">
                  <Sparkles className="h-6 w-6" />
                </span>
                <h3 className="font-display text-xl font-bold tracking-tight text-white mb-2">
                  The Core Promise
                </h3>
                <p className="text-sm text-forest-200 leading-relaxed font-light">
                  Traditional resources are failing under the pressure of planetary demand. Bamboo offers structural integrity, carbon offsetting, and circular viability in a single organic engine.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-forest-800 flex items-center space-x-4">
                <div className="text-2xl font-display font-bold text-bamboo-400">100%</div>
                <div className="text-xs text-forest-300 uppercase tracking-wider font-mono font-medium">
                  Renewable & Sustainable Materials
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mission Statement Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-20 relative bg-card border border-beige-200 rounded-3xl p-8 sm:p-12 text-center shadow-md max-w-4xl mx-auto overflow-hidden"
        >
          {/* Subtle decoration lines representing bamboo stalks */}
          <div className="absolute top-0 bottom-0 left-6 w-[2px] bg-forest-100 opacity-70" />
          <div className="absolute top-0 bottom-0 right-6 w-[2px] bg-forest-100 opacity-70" />
          
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200/50 text-[10px] font-mono text-forest-700 tracking-wider uppercase">
              <HeartHandshake className="h-3.5 w-3.5 text-bamboo-500" />
              <span>Initiative Objective</span>
            </span>
          </div>

          <h3 className="font-display text-xs font-bold tracking-widest text-forest-500 uppercase mb-4">
            Official Mission Statement
          </h3>
          <p id="mission-text" className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-forest-950 leading-relaxed max-w-3xl mx-auto italic">
            "{MISSION_STATEMENT}"
          </p>
        </motion.div>

      </div>
    </section>
  );
}
