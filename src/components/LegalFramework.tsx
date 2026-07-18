/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, Scale, Cookie, Eye, Mail, MessageSquare, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { SOCIAL_LINKS, CONTACT_INFO } from "../data";

export default function LegalFramework() {
  const [reportEmail, setReportEmail] = useState("");
  const [reportType, setReportType] = useState("accessibility");
  const [reportDetail, setReportDetail] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

  // Active tab inside legal panels for interactive viewing
  const [activeTab, setActiveTab] = useState<string>("copyright");

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportEmail || !reportDetail) return;

    setReportLoading(true);
    setTimeout(() => {
      setReportLoading(false);
      setReportSubmitted(true);
      setReportEmail("");
      setReportDetail("");
    }, 1000);
  };

  const handleScrollToNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const footerLinks = [
    { label: "Home", href: "#home" },
    { label: "About Overview", href: "#about" },
    { label: "Objectives", href: "#objectives" },
    { label: "Research", href: "#research" },
    { label: "Community Hub", href: "#community" },
    { label: "Partnerships", href: "#partnerships" },
  ];

  return (
    <footer id="legal-footer" className="bg-forest-950 text-forest-200 pt-20 pb-8 border-t border-forest-900 relative">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-forest-900/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Top: Branding, Quicklinks, Socials */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-bamboo-400 rounded-lg text-forest-950">
                <Scale className="h-4.5 w-4.5" />
              </div>
              <span className="font-display font-bold text-lg text-white tracking-wider">
                BAMBOO SUSTAINABILITY
              </span>
            </div>
            <p className="text-xs text-forest-300 max-w-sm leading-relaxed font-light">
              Accelerating the transition toward sustainable manufacturing and construction by expanding public awareness, industry adoption, and community engagement.
            </p>

            {/* Social List (Required from section 10) */}
            <div className="flex items-center space-x-3 pt-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  id={`footer-social-${link.name.toLowerCase()}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-forest-300 hover:text-bamboo-300 transition-colors border border-forest-800"
                  title={link.name}
                >
                  {link.name === "TikTok" ? (
                    <span className="text-[10px] font-mono font-black">TT</span>
                  ) : link.name === "YouTube" ? (
                    <span className="text-[10px] font-mono font-black">YT</span>
                  ) : link.name === "Discord" ? (
                    <span className="text-[10px] font-mono font-black">DC</span>
                  ) : (
                    <span className="text-[10px] font-mono font-black">BS</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              Navigation & Framework
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  id={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  href={link.href}
                  onClick={(e) => handleScrollToNav(e, link.href)}
                  className="text-xs text-forest-300 hover:text-bamboo-400 transition-colors py-1 block"
                >
                  {link.label}
                </a>
              ))}
              <a href="#about" onClick={(e) => handleScrollToNav(e, "#about")} className="text-xs text-forest-300 hover:text-bamboo-400 transition-colors py-1 block">
                Privacy Policy
              </a>
              <a href="#about" onClick={(e) => handleScrollToNav(e, "#about")} className="text-xs text-forest-300 hover:text-bamboo-400 transition-colors py-1 block">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Contact Details (Required from section 14) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              Official Contact
            </h4>
            <div className="space-y-2 text-xs text-forest-300 font-light">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-bamboo-400" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-bamboo-400 transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-bamboo-400" />
                <a href={CONTACT_INFO.discord} target="_blank" rel="noopener noreferrer" className="hover:text-bamboo-400 transition-colors">
                  Discord Community Server
                </a>
              </div>
              <div className="pt-2 text-[10px] text-forest-400 leading-normal">
                For general support, corporate collaborations, or media releases, please communicate through our email network directly.
              </div>
            </div>
          </div>

        </div>

        {/* Middle: Interactive Regulatory Tabs & Accordions */}
        <div className="border-t border-forest-900 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Tabs List */}
            <div className="lg:col-span-4 space-y-1">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
                Regulatory Disclosures
              </h4>
              {[
                { id: "copyright", label: "Copyright Notice" },
                { id: "disclaimer", label: "General Disclaimer" },
                { id: "accessibility", label: "Accessibility & Compliance" },
                { id: "cookies", label: "Data Usage & Cookies" },
                { id: "claims", label: "Environmental Claims" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`disclosure-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-forest-900 text-bamboo-300 border-l-4 border-bamboo-400 pl-4"
                      : "bg-transparent text-forest-400 hover:text-forest-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Display Panel */}
            <div className="lg:col-span-8 bg-forest-900/40 border border-forest-800/40 p-6 sm:p-8 rounded-3xl min-h-[220px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {activeTab === "copyright" && (
                    <div id="panel-copyright">
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                        <ShieldAlert className="h-4.5 w-4.5 text-bamboo-400" />
                        Copyright & Intellectual Property Notice
                      </h4>
                      <p className="text-xs text-forest-300 leading-relaxed font-light">
                        © 2026 Parker Yingst (ZenkoParx) / Bamboo Sustainability Initiative. All Rights Reserved.
                      </p>
                      <p className="text-xs text-forest-300 leading-relaxed font-light mt-2">
                        All text, website layouts, graphics, design assets, and proprietary concepts displayed on this site are the intellectual property of the Bamboo Sustainability Initiative and its founder, unless otherwise noted. Unauthorized reproduction, distribution, modification, or commercial exploitation of this material without express written consent is strictly prohibited.
                      </p>
                    </div>
                  )}

                  {activeTab === "disclaimer" && (
                    <div id="panel-disclaimer">
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                        <Scale className="h-4.5 w-4.5 text-bamboo-400" />
                        Unofficial Initiative & Public Choice Disclaimer
                      </h4>
                      <p className="text-xs text-forest-300 leading-relaxed font-light">
                        The Bamboo Sustainability Initiative operates strictly as an unofficial educational concept and decentralized pilot framework. It does not represent an officially certified or state-endorsed regulatory framework at this stage. It remains a community-led project until mass public awareness, consumer choice, and widespread corporate adoption drive formal global policy harmonization and standardization.
                      </p>
                      <p className="text-xs text-forest-300 leading-relaxed font-light mt-2">
                        All data, material specifications, and sustainability calculations are presented for educational and demonstration purposes. Individual material performance metrics may vary based on cultivation climate, region, harvesting cycles, and regional processing standards.
                      </p>
                    </div>
                  )}

                  {activeTab === "accessibility" && (
                    <div id="panel-accessibility">
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                        <Eye className="h-4.5 w-4.5 text-bamboo-400" />
                        Accessibility & Compliance Statement
                      </h4>
                      <p className="text-xs text-forest-300 leading-relaxed font-light">
                        The Bamboo Sustainability Initiative is committed to maintaining an accessible digital environment for all users. Our website and digital materials are designed to align with WCAG 2.1 AA accessibility standards, ensuring compatibility with screen readers, keyboard navigation, high-contrast modes, and mobile devices.
                      </p>
                      <p className="text-xs text-bamboo-400 font-mono mt-3">
                        Accessibility Notice: If you encounter any accessibility barriers or require alternative formats of our content, please contact our support team for assistance.
                      </p>
                    </div>
                  )}

                  {activeTab === "cookies" && (
                    <div id="panel-cookies">
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                        <Cookie className="h-4.5 w-4.5 text-bamboo-400" />
                        Data Usage, Cookies & Privacy Disclosure
                      </h4>
                      <p className="text-xs text-forest-300 leading-relaxed font-light">
                        To improve user experience and maintain secure site functionality, this website may use essential cookies, analytics tools, and basic interaction tracking. No personal data is sold, shared, or distributed without explicit user consent.
                      </p>
                      <p className="text-xs text-forest-400 leading-relaxed font-light mt-2">
                        Data Notice: By interacting with this site, you acknowledge that anonymized analytics may be collected to enhance performance, accessibility, and community engagement. Full details are available in our Privacy Policy.
                      </p>
                    </div>
                  )}

                  {activeTab === "claims" && (
                    <div id="panel-claims">
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4.5 w-4.5 text-bamboo-400" />
                        Environmental Claims Transparency
                      </h4>
                      <p className="text-xs text-forest-300 leading-relaxed font-light">
                        All environmental claims, sustainability metrics, and ecological benefits described within this initiative are based on current research, industry studies, and ongoing internal testing. Bamboo performance may vary depending on climate, species, harvesting method, and industrial processing.
                      </p>
                      <p className="text-xs text-bamboo-400 font-mono mt-3 leading-normal">
                        Environmental Disclaimer: Statements regarding carbon reduction, biodegradability, and ecological impact are intended for educational purposes and should not be interpreted as guaranteed outcomes in all scenarios.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Bottom: Complaint & Reporting & Abuse Form (Required from section 14) */}
        <div className="border-t border-forest-900 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              Official Reporting Channel
            </h4>
            <p className="text-xs text-forest-300 font-light leading-relaxed">
              If you believe any content on this site violates copyright, WCAG accessibility standards, or contains inaccurate environmental claims, please submit a detailed report here or email us directly at <a href={`mailto:${CONTACT_INFO.email}`} className="text-bamboo-400 underline">{CONTACT_INFO.email}</a>.
            </p>
          </div>

          <div className="lg:col-span-7 bg-forest-900/25 p-6 rounded-2xl border border-forest-800/50">
            <AnimatePresence mode="wait">
              {!reportSubmitted ? (
                <form
                  key="reporting-form"
                  onSubmit={handleReportSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-forest-400 uppercase mb-1.5">
                        Your Contact Email
                      </label>
                      <input
                        type="email"
                        required
                        value={reportEmail}
                        onChange={(e) => setReportEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full p-2.5 rounded-lg bg-forest-950 border border-forest-800 text-xs text-white focus:outline-none focus:border-bamboo-400 focus:ring-1 focus:ring-bamboo-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-forest-400 uppercase mb-1.5">
                        Report Category
                      </label>
                      <select
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-forest-950 border border-forest-800 text-xs text-white focus:outline-none focus:border-bamboo-400 cursor-pointer"
                      >
                        <option value="accessibility">Accessibility Compliance Barrier</option>
                        <option value="copyright">Intellectual Property/Copyright Violation</option>
                        <option value="environmental">Inaccurate Environmental Claim</option>
                        <option value="general">General Support / Report</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-forest-400 uppercase mb-1.5">
                      Detailed Report / Description
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={reportDetail}
                      onChange={(e) => setReportDetail(e.target.value)}
                      placeholder="Please specify URLs, specific paragraphs, or detailed compliance complaints..."
                      className="w-full p-2.5 rounded-lg bg-forest-950 border border-forest-800 text-xs text-white focus:outline-none focus:border-bamboo-400 focus:ring-1 focus:ring-bamboo-400 resize-none"
                    />
                  </div>

                  <button
                    id="submit-report-btn"
                    type="submit"
                    disabled={reportLoading}
                    className="w-full py-2.5 px-4 bg-forest-800 hover:bg-forest-700 text-xs text-white font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                  >
                    {reportLoading ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      "Submit Official Report"
                    )}
                  </button>
                </form>
              ) : (
                <motion.div
                  key="report-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-4 space-y-2"
                >
                  <div className="flex justify-center">
                    <CheckCircle className="h-8 w-8 text-bamboo-400" />
                  </div>
                  <h5 className="font-display font-bold text-sm text-white">
                    Report Logged Safely
                  </h5>
                  <p className="text-[11px] text-forest-300 leading-relaxed font-light">
                    Your report has been securely registered in our system. A verification ticket has been sent to our administrator pool. We appreciate your vigilance in maintaining WCAG 2.1 and legal accuracy.
                  </p>
                  <button
                    id="reset-report-btn"
                    onClick={() => setReportSubmitted(false)}
                    className="text-[10px] font-mono font-bold uppercase text-bamboo-400 hover:text-bamboo-300 cursor-pointer"
                  >
                    Submit another report
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Brand Copyright Bar */}
        <div className="border-t border-forest-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-forest-500">
          <div>
            © 2026 Parker Yingst (ZenkoParx) / Bamboo Sustainability Initiative.
          </div>
          <div className="mt-2 sm:mt-0 flex space-x-4">
            <a href="#about" onClick={(e) => handleScrollToNav(e, "#about")} className="hover:text-white transition-colors">WCAG 2.1 Compliance</a>
            <a href="#about" onClick={(e) => handleScrollToNav(e, "#about")} className="hover:text-white transition-colors">GDPR Notice</a>
            <a href="#about" onClick={(e) => handleScrollToNav(e, "#about")} className="hover:text-white transition-colors">Intellectual Framework</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
