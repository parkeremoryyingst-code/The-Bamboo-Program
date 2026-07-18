import React, { useState, useEffect } from "react";
import { Cookie, X, Check, Shield, Info, ArrowRight, Settings, Sliders } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Cookie settings state
  const [necessary, setNecessary] = useState(true); // always true
  const [analytics, setAnalytics] = useState(true);
  const [personalization, setPersonalization] = useState(false);

  useEffect(() => {
    // Check if user already consented
    const consent = localStorage.getItem("bsi-cookie-consent");
    if (!consent) {
      // delay showing slightly for beautiful page entrance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences = {
      necessary: true,
      analytics: true,
      personalization: true,
      timestamp: Date.now()
    };
    localStorage.setItem("bsi-cookie-consent", JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const preferences = {
      necessary: true,
      analytics,
      personalization,
      timestamp: Date.now()
    };
    localStorage.setItem("bsi-cookie-consent", JSON.stringify(preferences));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="cookie-consent-banner"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="fixed bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-md bg-white dark:bg-forest-950 border border-beige-200 dark:border-forest-800 rounded-3xl shadow-xl z-50 overflow-hidden"
      >
        <div className="p-6 space-y-4">
          
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-bamboo-100 dark:bg-forest-900 text-bamboo-600 dark:text-bamboo-400 rounded-xl">
                <Cookie className="h-5 w-5 animate-bounce" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-forest-950 dark:text-white flex items-center gap-1.5">
                  Eco-Cookie Consent
                </h4>
                <p className="text-[10px] font-mono text-forest-400 uppercase tracking-widest">Privacy & Choice</p>
              </div>
            </div>
            <button
              onClick={handleAcceptAll}
              className="text-forest-400 hover:text-forest-600 dark:hover:text-white p-1 rounded-lg hover:bg-beige-50 dark:hover:bg-forest-900 cursor-pointer"
              title="Close and Accept All"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs text-forest-750 dark:text-forest-300 leading-relaxed font-light">
            We use cookies and client-side storage to persist your Sustainability Profile, track carbon estimator offsets, and manage theme modes. Select your choice below.
          </p>

          {/* Settings Sub-Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-beige-100 dark:border-forest-800/50 pt-4 space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-[11px] font-mono font-bold text-forest-800 dark:text-white uppercase">Necessary Cookies</h5>
                    <p className="text-[9px] text-forest-400 font-light">Saves theme preferences and profile details (required).</p>
                  </div>
                  <div className="w-8 h-4 bg-bamboo-400 rounded-full relative opacity-50 cursor-not-allowed">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-[11px] font-mono font-bold text-forest-800 dark:text-white uppercase">Sustainability Analytics</h5>
                    <p className="text-[9px] text-forest-400 font-light">Counts carbon calculator actions to gauge aggregate public awareness.</p>
                  </div>
                  <button
                    onClick={() => setAnalytics(!analytics)}
                    className={`w-8 h-4 rounded-full relative transition-colors cursor-pointer ${
                      analytics ? "bg-bamboo-500" : "bg-beige-200 dark:bg-forest-800"
                    }`}
                  >
                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${
                      analytics ? "right-0.5" : "left-0.5"
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-[11px] font-mono font-bold text-forest-800 dark:text-white uppercase">Eco-Personalization</h5>
                    <p className="text-[9px] text-forest-400 font-light">Tailors the AI chat topics based on products you view.</p>
                  </div>
                  <button
                    onClick={() => setPersonalization(!personalization)}
                    className={`w-8 h-4 rounded-full relative transition-colors cursor-pointer ${
                      personalization ? "bg-bamboo-500" : "bg-beige-200 dark:bg-forest-800"
                    }`}
                  >
                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${
                      personalization ? "right-0.5" : "left-0.5"
                    }`} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2 text-xs font-mono font-semibold">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-beige-200 dark:border-forest-800 text-forest-700 dark:text-forest-300 hover:bg-beige-50 dark:hover:bg-forest-900 transition-colors cursor-pointer text-center"
            >
              <Sliders className="h-4 w-4" />
              {showSettings ? "Hide Settings" : "Customize"}
            </button>
            <button
              onClick={showSettings ? handleSavePreferences : handleAcceptAll}
              className="flex-1 px-3 py-2.5 rounded-xl bg-forest-950 text-white dark:bg-bamboo-400 dark:text-forest-950 hover:bg-forest-900 dark:hover:bg-bamboo-300 transition-all text-center cursor-pointer font-bold shadow-sm"
            >
              {showSettings ? "Save Choices" : "Accept All"}
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
