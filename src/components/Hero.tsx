/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowRight, Leaf, ChevronDown } from "lucide-react";
// @ts-ignore
import heroBg from "../assets/images/bamboo_forest_hero_1784333183045.jpg";

export default function Hero() {
  const handleScrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-forest-950"
    >
      {/* Background Image with elegant Zoom/Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={heroBg}
          alt="Lush Sustainable Bamboo Forest"
          className="w-full h-full object-cover object-center brightness-[0.45] contrast-[1.05]"
          referrerPolicy="no-referrer"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.02, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
        {/* Soft, rich gradients for typographic contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-forest-900/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/70 via-transparent to-forest-950/30 z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <span id="hero-tag" className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-forest-900/75 border border-bamboo-400/30 text-xs font-mono text-bamboo-300 tracking-wider uppercase">
            <Leaf className="h-3.5 w-3.5 animate-pulse" />
            <span>Environmental Initiative</span>
          </span>
        </motion.div>

        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]"
        >
          Building a <span className="text-transparent bg-clip-text bg-gradient-to-r from-bamboo-300 via-bamboo-400 to-emerald-400">Sustainable</span> Future with Bamboo
        </motion.h1>

        <motion.p
          id="hero-subtitle"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-forest-200/90 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Empowering industries and communities through eco-efficient, rapid-growth renewal.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          id="hero-cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <button
            id="hero-cta-join"
            onClick={() => handleScrollToSection("#partnerships")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-forest-950 bg-bamboo-400 hover:bg-bamboo-300 transition-all duration-300 shadow-xl shadow-bamboo-500/10 hover:shadow-bamboo-400/20 hover:-translate-y-0.5 cursor-pointer"
          >
            Join the Initiative
            <ArrowRight className="ml-2.5 h-5 w-5" />
          </button>
          
          <button
            id="hero-cta-learn"
            onClick={() => handleScrollToSection("#about")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-white bg-forest-900/60 hover:bg-forest-900/90 border border-forest-600/40 backdrop-blur-sm transition-all duration-300 hover:border-bamboo-400/30 hover:-translate-y-0.5 cursor-pointer"
          >
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Decorative Bottom Scroll Down */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:block">
        <motion.button
          id="hero-scroll-down"
          onClick={() => handleScrollToSection("#about")}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center text-forest-300 hover:text-bamboo-400 transition-colors focus:outline-none cursor-pointer"
        >
          <span className="text-xs font-mono uppercase tracking-widest mb-2 opacity-70">Discover</span>
          <ChevronDown className="h-5 w-5" />
        </motion.button>
      </div>
    </section>
  );
}
