/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, Mail, CheckCircle, ArrowRight, Loader2, FileText, BarChart2, BookOpen } from "lucide-react";
import { DOWNLOAD_RESOURCES } from "../data";

export default function Partnerships() {
  // Partnership Form States
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Newsletter States
  const [newsEmail, setNewsEmail] = useState("");
  const [newsSubmitted, setNewsSubmitted] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);

  // Download States (tracking which resource ID is currently downloading)
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});
  const [downloadSuccess, setDownloadSuccess] = useState<{ [key: string]: boolean }>({});
  const [downloadCounts, setDownloadCounts] = useState<{ [key: string]: number }>({
    "pdf-summary": 342,
    "data-sheet": 519,
    "resource-guide": 204,
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
      // Reset fields
      setName("");
      setCompany("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;

    setNewsLoading(true);
    setTimeout(() => {
      setNewsLoading(false);
      setNewsSubmitted(true);
      setNewsEmail("");
    }, 1000);
  };

  const startDownload = (id: string) => {
    if (downloadProgress[id] !== undefined) return;

    // Simulate progress bar increments
    setDownloadProgress((prev) => ({ ...prev, [id]: 0 }));
    
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        const current = prev[id];
        if (current >= 100) {
          clearInterval(interval);
          setDownloadSuccess((s) => ({ ...s, [id]: true }));
          setDownloadCounts((c) => ({ ...c, [id]: c[id] + 1 }));
          
          // Clear progress indicator after 3 seconds
          setTimeout(() => {
            setDownloadProgress((p) => {
              const updated = { ...p };
              delete updated[id];
              return updated;
            });
            setDownloadSuccess((s) => ({ ...s, [id]: false }));
          }, 3000);

          return { ...prev, [id]: 100 };
        }
        return { ...prev, [id]: current + 20 };
      });
    }, 150);
  };

  const getResourceIcon = (id: string) => {
    switch (id) {
      case "pdf-summary":
        return <FileText className="h-6 w-6 text-red-500" />;
      case "data-sheet":
        return <BarChart2 className="h-6 w-6 text-blue-500" />;
      case "resource-guide":
        return <BookOpen className="h-6 w-6 text-green-500" />;
      default:
        return <FileText className="h-6 w-6 text-forest-700" />;
    }
  };

  return (
    <section id="partnerships" className="py-24 bg-beige-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-forest-100 text-[10px] font-mono text-forest-700 tracking-wider uppercase">
            <span>Collaborate & Grow</span>
          </span>
          <h2 id="partnerships-title" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 mt-3 tracking-tight">
            Partnerships & Resources
          </h2>
          <p id="partnerships-intro" className="mt-4 text-base sm:text-lg text-forest-700 font-light">
            We work with progressive companies and supply networks to scale structural bamboo adoption worldwide.
          </p>
        </div>

        {/* Dual Column Layout: Form and Downloads */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Partnership Contact Form Card */}
          <div className="lg:col-span-6 bg-card border border-beige-200 p-8 sm:p-10 rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-forest-600 mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">For Brands & Developers</span>
              </div>
              <h3 id="form-header" className="font-display text-2xl font-bold text-forest-950 tracking-tight mb-2">
                Request Collaboration
              </h3>
              <p id="form-subheader" className="text-sm text-forest-600 font-light leading-relaxed mb-6">
                Discover why partnering with the initiative can elevate your company's eco-metrics and boost LEED structural benchmarks.
              </p>

              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="collab-form"
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-forest-800 uppercase tracking-wider mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Parker Yingst"
                          className="w-full p-3 rounded-xl border border-beige-200 focus:border-bamboo-400 focus:ring-1 focus:ring-bamboo-400 focus:outline-none bg-beige-50/50 transition-all text-sm text-forest-950"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-forest-800 uppercase tracking-wider mb-2">
                          Company / Brand
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Eco Corp"
                          className="w-full p-3 rounded-xl border border-beige-200 focus:border-bamboo-400 focus:ring-1 focus:ring-bamboo-400 focus:outline-none bg-beige-50/50 transition-all text-sm text-forest-950"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-forest-800 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="bamboo@synthlab.org"
                        className="w-full p-3 rounded-xl border border-beige-200 focus:border-bamboo-400 focus:ring-1 focus:ring-bamboo-400 focus:outline-none bg-beige-50/50 transition-all text-sm text-forest-950"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-forest-800 uppercase tracking-wider mb-2">
                        Message / Request Details *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="How can we help optimize your supply chain using industrial bamboo..."
                        className="w-full p-3 rounded-xl border border-beige-200 focus:border-bamboo-400 focus:ring-1 focus:ring-bamboo-400 focus:outline-none bg-beige-50/50 transition-all text-sm text-forest-950 resize-none"
                      />
                    </div>

                    <button
                      id="collab-submit-btn"
                      type="submit"
                      disabled={formLoading}
                      className="w-full flex items-center justify-center p-4 bg-forest-900 text-white font-bold rounded-xl hover:bg-forest-800 disabled:bg-forest-700 transition-colors cursor-pointer"
                    >
                      {formLoading ? (
                        <>
                          <Loader2 className="animate-spin h-5 w-5 mr-2" />
                          Processing Request...
                        </>
                      ) : (
                        "Submit Collaboration Request"
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="form-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 bg-forest-50 border border-forest-100 rounded-2xl text-center space-y-4"
                  >
                    <div className="flex justify-center">
                      <CheckCircle className="h-12 w-12 text-forest-700" />
                    </div>
                    <h4 className="font-display text-xl font-bold text-forest-950">
                      Request Logged Successfully
                    </h4>
                    <p className="text-xs sm:text-sm text-forest-700 font-light leading-relaxed">
                      Thank you for contacting the Bamboo Sustainability Initiative. Our technical team and leadership under Parker Yingst will review your ESG goals and reach out directly within 48 business hours.
                    </p>
                    <button
                      id="reset-form-btn"
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs font-mono font-bold uppercase text-forest-900 hover:text-bamboo-600 transition-colors cursor-pointer"
                    >
                      ← Submit another inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Downloads Card Section */}
          <div className="lg:col-span-6 bg-card border border-beige-200 p-8 sm:p-10 rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-forest-600 mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Educational Downloads</span>
              </div>
              <h3 id="downloads-header" className="font-display text-2xl font-bold text-forest-950 tracking-tight mb-2">
                Resource Downloads
              </h3>
              <p id="downloads-subheader" className="text-sm text-forest-600 font-light leading-relaxed mb-6">
                Access verified public-use PDF summaries, infographic data sheets, and comprehensive resource guides compiled by our science team.
              </p>

              {/* Resource Download Cards List */}
              <div id="resources-list" className="space-y-4">
                {DOWNLOAD_RESOURCES.map((resource) => {
                  const isDownloading = downloadProgress[resource.id] !== undefined;
                  const isSuccess = downloadSuccess[resource.id];
                  const progress = downloadProgress[resource.id] || 0;
                  const count = downloadCounts[resource.id];

                  return (
                    <div
                      key={resource.id}
                      id={`resource-item-${resource.id}`}
                      className="p-4 rounded-2xl border border-beige-200 hover:border-forest-200 transition-all flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center space-x-3.5 min-w-0">
                        <div className="p-3 bg-beige-50 rounded-xl border border-beige-200/50 flex-shrink-0">
                          {getResourceIcon(resource.id)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-forest-950 truncate leading-tight">
                            {resource.title}
                          </h4>
                          <p className="text-[10px] text-forest-500 font-mono mt-1 uppercase">
                            {resource.type} • {resource.size} • <span className="text-forest-700">{count} downloads</span>
                          </p>
                        </div>
                      </div>

                      {/* Download Trigger */}
                      <button
                        id={`dl-btn-${resource.id}`}
                        onClick={() => startDownload(resource.id)}
                        disabled={isDownloading}
                        className={`flex-shrink-0 p-2.5 rounded-xl transition-all cursor-pointer ${
                          isSuccess
                            ? "bg-forest-900 text-bamboo-300 border border-forest-900"
                            : isDownloading
                            ? "bg-beige-100 text-forest-400 border border-beige-200"
                            : "bg-forest-50 hover:bg-forest-100 text-forest-700 border border-forest-100"
                        }`}
                      >
                        {isSuccess ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : isDownloading ? (
                          <div className="relative">
                            <Loader2 className="animate-spin h-5 w-5 text-forest-500" />
                            <span className="absolute inset-0 flex items-center justify-center text-[8px] font-mono font-bold text-forest-700">
                              {progress}%
                            </span>
                          </div>
                        ) : (
                          <Download className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Newsletter Subscription Box (Required from section 10) */}
            <div id="newsletter-box" className="mt-8 pt-6 border-t border-beige-200">
              <h4 className="text-xs font-mono font-bold text-forest-800 uppercase tracking-wider mb-2">
                Newsletter Signup
              </h4>
              <p className="text-xs text-forest-600 font-light mb-4">
                Stay updated on the project's milestones, prototypes, and community events.
              </p>

              <AnimatePresence mode="wait">
                {!newsSubmitted ? (
                  <form
                    key="newsletter-form"
                    onSubmit={handleNewsletterSubmit}
                    className="flex flex-col sm:flex-row gap-2"
                  >
                    <input
                      type="email"
                      required
                      value={newsEmail}
                      onChange={(e) => setNewsEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 p-3 rounded-xl border border-beige-200 focus:border-bamboo-400 focus:outline-none bg-beige-50/50 text-xs text-forest-950"
                    />
                    <button
                      id="news-subscribe-btn"
                      type="submit"
                      disabled={newsLoading}
                      className="sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl text-xs font-bold text-forest-950 bg-bamboo-400 hover:bg-bamboo-300 disabled:bg-bamboo-200 transition-colors cursor-pointer"
                    >
                      {newsLoading ? (
                        <Loader2 className="animate-spin h-4 w-4" />
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    key="news-success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-forest-50 border border-forest-100 rounded-xl flex items-center space-x-2 text-xs text-forest-700"
                  >
                    <CheckCircle className="h-4 w-4 text-forest-600 flex-shrink-0" />
                    <span>Successfully subscribed! Welcome aboard, advocate.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
