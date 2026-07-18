/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { MessageSquare, ExternalLink, UserCheck, Shield } from "lucide-react";
import { LEADERSHIP } from "../data";

export default function Leadership() {
  return (
    <section id="community" className="py-24 bg-beige-50 relative overflow-hidden">
      {/* Decorative vector meshes */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-forest-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-bamboo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-forest-100 text-[10px] font-mono text-forest-700 tracking-wider uppercase">
            <span>Leadership & Community</span>
          </span>
          <h2 id="leadership-title" className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-forest-950 mt-3 tracking-tight">
            Project Leadership & Community
          </h2>
          <p id="leadership-intro" className="mt-4 text-base sm:text-lg text-forest-700 font-light max-w-xl mx-auto">
            Meet the designer and community hub driving global action around renewable materials.
          </p>
        </div>

        {/* Content Block */}
        <div className="max-w-4xl mx-auto bg-card border border-beige-200 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12">
          
          {/* Founder Bio Block */}
          <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-bamboo-600">
                <UserCheck className="h-5 w-5 text-bamboo-500" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">Founder & Director</span>
              </div>

              <div>
                <h3 id="founder-name" className="font-display text-2xl sm:text-3xl font-bold text-forest-950 tracking-tight">
                  {LEADERSHIP.founder}
                </h3>
                <span className="text-xs text-forest-500 font-mono">Creator • Designer • Environmentalist</span>
              </div>

              <p id="founder-bio" className="text-sm sm:text-base text-forest-800 font-light leading-relaxed">
                {LEADERSHIP.bio}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-beige-100 flex items-center space-x-3 text-xs text-forest-500 font-mono">
              <Shield className="h-4 w-4 text-forest-400" />
              <span>Certified Sustainable Builder Alliance</span>
            </div>
          </div>

          {/* Discord CTA Block */}
          <div className="md:col-span-5 bg-forest-900 p-8 sm:p-10 flex flex-col justify-between text-white relative overflow-hidden border-t md:border-t-0 md:border-l border-beige-200">
            {/* Ambient glows */}
            <div className="absolute inset-0 bg-gradient-to-br from-forest-800 to-forest-950 z-0" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-bamboo-400/10 rounded-full blur-2xl z-10" />

            <div className="relative z-10">
              <span className="inline-flex items-center justify-center p-3 bg-forest-800/80 rounded-2xl border border-forest-700 text-bamboo-300 mb-6">
                <MessageSquare className="h-6 w-6" />
              </span>
              <h4 className="font-display text-xl font-bold tracking-tight text-white mb-2">
                Join the Movement
              </h4>
              <p className="text-xs sm:text-sm text-forest-200 leading-relaxed font-light">
                Connect directly with Parker and thousands of other sustainability-minded creators, gamers, and builders in our central Discord hub.
              </p>
            </div>

            <div className="relative z-10 mt-8">
              <a
                id="community-discord-cta"
                href={LEADERSHIP.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-forest-950 bg-bamboo-400 hover:bg-bamboo-300 transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg focus:outline-none cursor-pointer"
              >
                <span>{LEADERSHIP.discordCta}</span>
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
