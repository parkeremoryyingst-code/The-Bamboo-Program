/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AlertTriangle, X, ExternalLink } from "lucide-react";

interface TopDisclaimerProps {
  onClose: () => void;
}

export default function TopDisclaimer({ onClose }: TopDisclaimerProps) {
  const handleLearnMoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#regulatory-citations");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="top-un-official-disclaimer"
      className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 dark:bg-amber-600 text-forest-950 dark:text-white px-4 py-2 sm:py-1.5 shadow-md flex items-center justify-between gap-3 text-center transition-all duration-300 select-none"
    >
      <div className="flex-1 flex items-center justify-center gap-2 text-[11px] sm:text-xs font-medium leading-tight">
        <AlertTriangle className="h-4 w-4 text-forest-950 dark:text-white flex-shrink-0 animate-pulse" />
        <span>
          <strong className="font-bold">Notice:</strong> This portal is an <span className="underline decoration-wavy decoration-forest-900/40">unofficial, community-led pilot</span> initiative. Some interactive modules may operate in simulated/draft environments.
        </span>
        <a
          href="#regulatory-citations"
          onClick={handleLearnMoreClick}
          className="inline-flex items-center gap-1 font-bold underline hover:text-forest-900 dark:hover:text-amber-100 transition-colors cursor-pointer pointer-events-auto ml-1.5"
        >
          Learn More <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <button
        id="dismiss-top-disclaimer-btn"
        onClick={onClose}
        className="p-1 rounded-full hover:bg-forest-950/10 dark:hover:bg-white/10 text-forest-950 dark:text-white transition-colors cursor-pointer pointer-events-auto active:scale-95 focus:outline-none flex-shrink-0"
        title="Dismiss notice"
        aria-label="Dismiss notice"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
