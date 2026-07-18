/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Leaf, Menu, X, MessageSquare, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  disclaimerActive?: boolean;
}

export default function Navbar({ disclaimerActive = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("bsi-theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("bsi-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Objectives", href: "#objectives" },
    { label: "Products", href: "#products-showcase" },
    { label: "Engagement", href: "#community-hub" },
    { label: "Community", href: "#community" },
    { label: "Partnerships", href: "#partnerships" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-forest-900/90 backdrop-blur-md shadow-lg py-3 border-b border-forest-800/30"
          : "bg-transparent py-5"
      }`}
      style={{
        top: disclaimerActive ? "var(--disclaimer-height, 36px)" : "0px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            id="nav-logo"
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center space-x-2 group focus:outline-none"
          >
            <div className="p-2 bg-bamboo-400 rounded-lg group-hover:bg-bamboo-300 transition-colors duration-200">
              <Leaf className="h-5 w-5 text-forest-900" />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-bamboo-300 transition-colors">
              BSI <span className="font-sans font-light text-forest-300">Initiative</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                id={`desktop-link-${item.href.replace("#", "")}`}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-3 py-2 text-sm font-medium text-forest-100 hover:text-bamboo-400 rounded-md transition-colors duration-150 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Desktop Theme Toggle */}
            <button
              id="theme-toggle-desktop"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-forest-100 hover:text-bamboo-400 hover:bg-forest-800/40 transition-all focus:outline-none focus:ring-2 focus:ring-bamboo-400/50 cursor-pointer flex items-center justify-center"
              title={theme === "light" ? "Switch to Forest Night" : "Switch to Light Theme"}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
              ) : (
                <Sun className="h-5 w-5 text-bamboo-300 transition-transform duration-300 hover:rotate-45" />
              )}
            </button>

            <a
              id="desktop-cta-join"
              href="#partnerships"
              onClick={(e) => handleNavClick(e, "#partnerships")}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-semibold text-forest-950 bg-bamboo-400 hover:bg-bamboo-300 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none shadow-md cursor-pointer"
            >
              Join the Initiative
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              id="theme-toggle-mobile"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-forest-100 hover:text-bamboo-400 focus:outline-none cursor-pointer flex items-center justify-center"
              title={theme === "light" ? "Switch to Forest Night" : "Switch to Light Theme"}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5 text-bamboo-300" />
              )}
            </button>

            <button
              id="mobile-menu-btn"
              onClick={() => {
                setMobileMenuOpen((prev) => !prev);
              }}
              type="button"
              className="relative z-50 inline-flex items-center justify-center p-3 rounded-xl text-forest-100 hover:text-white hover:bg-forest-800/50 focus:outline-none focus:ring-2 focus:ring-bamboo-400 active:scale-95 cursor-pointer pointer-events-auto select-none touch-manipulation transition-all duration-150"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6.5 w-6.5 text-bamboo-400" aria-hidden="true" />
              ) : (
                <Menu className="block h-6.5 w-6.5 text-white" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-forest-950 border-b border-forest-800/50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  id={`mobile-link-${item.href.replace("#", "")}`}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-forest-100 hover:text-bamboo-400 hover:bg-forest-900/50 transition-all cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 pb-2 px-3 border-t border-forest-900 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-forest-300 uppercase tracking-widest">
                    Theme Mode
                  </span>
                  <button
                    id="theme-toggle-drawer"
                    onClick={toggleTheme}
                    className="p-1.5 px-3 rounded-lg bg-forest-900 text-forest-100 hover:text-bamboo-400 focus:outline-none flex items-center gap-2 text-xs font-semibold uppercase tracking-wider border border-forest-800/40 cursor-pointer"
                  >
                    {theme === "light" ? (
                      <>
                        <Moon className="h-4 w-4" />
                        Forest Night
                      </>
                    ) : (
                      <>
                        <Sun className="h-4 w-4 text-bamboo-300" />
                        Light Mode
                      </>
                    )}
                  </button>
                </div>

                <a
                  id="mobile-cta-join"
                  href="#partnerships"
                  onClick={(e) => handleNavClick(e, "#partnerships")}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-base font-bold text-forest-950 bg-bamboo-400 hover:bg-bamboo-300 transition-all focus:outline-none cursor-pointer"
                >
                  Join the Initiative
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
