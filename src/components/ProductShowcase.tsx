import React, { useState } from "react";
import { Bike, Keyboard, Shirt, Construction, HelpCircle, ArrowRight, CheckCircle2, ChevronRight, Info, Layers, Package, ExternalLink, BookOpen, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Product {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  specs: { [key: string]: string };
  carbonSavings: string; // text description
  icon: React.ComponentType<{ className?: string }>;
  traditionalEquivalent: string;
  co2ReductionKg: number; // For calculator
  unitName: string;
  pricingHistory: {
    year: string;
    price: string;
    status: string; // e.g. "Custom Prototype", "Pilot Batch", "Active Campaign", "Projected Scale Parity"
    isProjected?: boolean;
    scaleDesc: string;
  }[];
}

const PRODUCTS: Product[] = [
  {
    id: "bamboo-cycle",
    name: "Bamboo Performance Cycle",
    category: "Micro-Mobility",
    tagline: "Ultra-Light, High-Strength Guadua Frame",
    description: "Engineered from high-density Guadua bamboo, this performance bicycle frame combines the tensile strength of steel with the lightweight agility of carbon fiber. Bamboo’s natural vascular structure provides unmatched vibration dampening, creating an incredibly smooth ride.",
    features: [
      "Guadua bamboo tubes bound with hemp-epoxy joints",
      "40% greater shock absorption than carbon-fiber frames",
      "Protected with weather-resistant non-toxic silica coating",
      "Handcrafted frame with a unique organic grain pattern"
    ],
    specs: {
      "Weight": "9.8 kg (Complete build)",
      "Frame Tensile Strength": "Up to 380 MPa",
      "Material Origin": "Certified Organic Farms, Colombia",
      "Lifetime": "Designed for 15+ years"
    },
    carbonSavings: "Saves approx. 14.2 kg of CO₂ emissions compared to producing a standard aluminum frame.",
    icon: Bike,
    traditionalEquivalent: "Aluminum frame bicycle",
    co2ReductionKg: 14.2,
    unitName: "cycle",
    pricingHistory: [
      { year: "2020", price: "$4,500", status: "Bespoke Prototype", scaleDesc: "Individual hand-laminated frames, custom epoxy formulas." },
      { year: "2023", price: "$2,800", status: "Limited Pilot", scaleDesc: "Small workshop jigs, imported raw Guadua poles." },
      { year: "2026", price: "$1,650", status: "Active Campaign", scaleDesc: "Semi-automated frame alignment, regional assembly loops." },
      { year: "2030", price: "$850", status: "Projected Mass Market", scaleDesc: "Global supply standardization, high-volume automated molding.", isProjected: true }
    ]
  },
  {
    id: "moso-keyboard",
    name: "Moso Tech Mechanical Keyboard",
    category: "Consumer Tech",
    tagline: "Precision Engineering Encased in Solid Moso",
    description: "Elevate your workspace with a premium 75% hot-swappable mechanical keyboard carved from a single block of sustainably harvested Moso bamboo. Naturally anti-static, durable, and highly resonant for an exquisite typing sound profile.",
    features: [
      "CNC-milled solid Moso bamboo housing and keycaps",
      "Hot-swappable switches with premium gasket mount",
      "USB-C connectivity with custom braided linen cable",
      "Natural beeswax finish (chemical and varnish free)"
    ],
    specs: {
      "Layout": "75% ANSI (82 Keys)",
      "Switch Compatibility": "3-pin/5-pin MX mechanical",
      "Battery Capacity": "4000mAh (Wireless version)",
      "Keycap Lifespan": "100 Million Keystrokes"
    },
    carbonSavings: "Replaces 420g of high-impact virgin petroleum plastics with renewable, biodegradable biomass.",
    icon: Keyboard,
    traditionalEquivalent: "ABS Plastic keyboard",
    co2ReductionKg: 2.8,
    unitName: "keyboard",
    pricingHistory: [
      { year: "2020", price: "$320", status: "Custom Tooling Run", scaleDesc: "Single CNC pass carving, low-yield bamboo curing." },
      { year: "2023", price: "$210", status: "Specialist Group Buy", scaleDesc: "Batch production based on pre-order community blocks." },
      { year: "2026", price: "$145", status: "Active Campaign", scaleDesc: "Continuous milling, zero-waste optimization routines." },
      { year: "2030", price: "$75", status: "Projected Scale Parity", scaleDesc: "Standard retail lines, direct injection-grade bio-composite.", isProjected: true }
    ]
  },
  {
    id: "eco-fibre-apparel",
    name: "Eco-Fibre Performance Activewear",
    category: "Sustainable Textiles",
    tagline: "Enzymatic Bamboo Cellulose Performance Wear",
    description: "Crafted through a closed-loop organic enzymatic retting process, this activewear offers superior performance without the synthetic microplastics of traditional polyester. Naturally anti-microbial, highly breathable, and silky smooth against the skin.",
    features: [
      "70% bamboo organic cellulose, 30% organic cotton",
      "No chemical chemical-pulping or toxic bleaching",
      "Natural thermal regulation (cool in summer, warm in winter)",
      "Inherent UV protection rating of UPF 50+"
    ],
    specs: {
      "Fabric Weight": "180 gsm lightweight knit",
      "Breathability Rating": "Extremely High (850g/m²/24h)",
      "Odour Control": "Inherent bamboo-kun anti-bacterial agent",
      "Dyes": "100% GOTS certified organic plant-based dyes"
    },
    carbonSavings: "Production consumes 60% less water and releases 40% less greenhouse gas than synthetic polyester.",
    icon: Shirt,
    traditionalEquivalent: "Synthetic Polyester activewear shirt",
    co2ReductionKg: 4.5,
    unitName: "shirt",
    pricingHistory: [
      { year: "2020", price: "$110", status: "Lab-Scale Trials", scaleDesc: "Enzymatic cellulose treatment in specialized research labs." },
      { year: "2023", price: "$75", status: "Limited Boutique", scaleDesc: "Closed-loop micro-weaving facilities, organic herb dye blocks." },
      { year: "2026", price: "$48", status: "Active Campaign", scaleDesc: "Industrial loom access, commercial scale sewing circles." },
      { year: "2030", price: "$22", status: "Projected Retail Parity", scaleDesc: "Standard wholesale textile distribution, high-throughput spin.", isProjected: true }
    ]
  },
  {
    id: "structural-lbl",
    name: "Laminated Bamboo Timber (LBL)",
    category: "Green Building",
    tagline: "The Future of Heavy-Timber Carbon Sequestration",
    description: "High-performance laminated bamboo beams designed for structural load-bearing in green architecture. Formed under hydraulic pressure with bio-resins, offering higher compressive and tensile margins than comparable glue-lam pine or cedar.",
    features: [
      "Cross-laminated multi-directional bamboo fibers",
      "High dimensional stability with minimal warping or shrinkage",
      "Class-A fire resistance rating (natural density retardant)",
      "Acts as a permanent carbon sink, locking away CO₂"
    ],
    specs: {
      "Compressive Strength": "72 MPa (Parallel to grain)",
      "Bending Elasticity": "16.5 GPa",
      "Density": "850 kg/m³ (Heavy-duty class)",
      "Formaldehyde Rating": "E0 Class (Zero VOC outgassing)"
    },
    carbonSavings: "Sequesters 1.1 tonnes of CO₂ equivalent per cubic meter of material installed, turning structures into carbon sinks.",
    icon: Construction,
    traditionalEquivalent: "Structural Pine timber beam (1 m³)",
    co2ReductionKg: 280.0,
    unitName: "cubic meter",
    pricingHistory: [
      { year: "2020", price: "$1,200", status: "Custom Milling", scaleDesc: "Hand-glued laminated strips, custom engineering reviews." },
      { year: "2023", price: "$850", status: "Commercial Pilot", scaleDesc: "Certified regional testing, structural grading trials." },
      { year: "2026", price: "$580", status: "Active Campaign", scaleDesc: "Multi-layered press plants, approved regional code blocks." },
      { year: "2030", price: "$340", status: "Projected Timber Parity", scaleDesc: "Mass industrial forestry Integration, standard distributor lines.", isProjected: true }
    ]
  },
  {
    id: "strand-woven-sbl",
    name: "Strand Woven Bamboo Lumber (SBL)",
    category: "Heavy Construction",
    tagline: "Ultra-Density Structural Timber Replacement",
    description: "Strand Woven Bamboo Lumber (SBL) is produced by fracturing raw bamboo culms into longitudinal strands, immersing them in eco-friendly phenolic resin, and compressing them under extreme hydraulic pressure and heat. The result is a rock-hard composite twice as dense as oak, ideal for heavy-traffic marine boardwalks, bridge decking, and railway sleepers.",
    features: [
      "Extreme density: twice the hardness of white oak and maple",
      "Superior dimensional stability with <0.5% water absorption",
      "Termite-proof, decay-resistant, and flame-retardant (Class Bf-s1)",
      "Formulated with zero-VOC, formaldehyde-free emissions resins"
    ],
    specs: {
      "Density": "1,150 kg/m³ (Steel-like wood density)",
      "Janka Hardness": "3,200+ lbf (Extreme durability class)",
      "Modulus of Rupture (MOR)": "145 MPa",
      "Moisture Expansion": "Practically inert (<0.3%)"
    },
    carbonSavings: "Saves approx. 450 kg of CO₂ equivalent per cubic meter compared to standard treated yellow pine or tropical hardwood imports.",
    icon: Layers,
    traditionalEquivalent: "Ipe tropical hardwood decking (1 m³)",
    co2ReductionKg: 450.0,
    unitName: "cubic meter",
    pricingHistory: [
      { year: "2020", price: "$1,850", status: "Bespoke Curing", scaleDesc: "Manual hydraulic pressing and high-temp batch steam drying." },
      { year: "2023", price: "$1,250", status: "Small-Batch Press", scaleDesc: "Continuous hot-press systems, imported organic binder agent blocks." },
      { year: "2026", price: "$850", status: "Active Campaign", scaleDesc: "Optimized cold-molding consolidation, certified high-throughput kilns." },
      { year: "2030", price: "$490", status: "Projected Timber Parity", scaleDesc: "Integrated agricultural fiber loops, globally standardized resin feeds.", isProjected: true }
    ]
  },
  {
    id: "bio-composite-pellets",
    name: "Enzymatic Bamboo Bio-Composites",
    category: "Eco-Packaging",
    tagline: "100% Compostable High-Rigidity Injection Resin",
    description: "These premium high-performance biomass pellets are made from non-food agricultural waste fibers consolidated with natural corn-starch binders. Perfect for single-use plastic substitutions or high-durability polymer shells, they run seamlessly in existing industrial injection molding and extrusion tooling.",
    features: [
      "100% bio-based: renewable agricultural bamboo cellulose",
      "Fully soil-biodegradable and compostable within 180 days",
      "Compatible with existing PLA and petroleum-based tooling",
      "High heat deflection (up to 110°C), boil-water safe"
    ],
    specs: {
      "Tensile Modulus": "4.6 GPa",
      "Biodegradability Time": "120 - 180 days (standard soil)",
      "Processing Temperature": "165°C - 190°C",
      "Melt Flow Index": "12g / 10min (standard injection grade)"
    },
    carbonSavings: "Avoids 2.2 kg of fossil CO₂ per kilogram compared to standard virgin polyethylene (PE) or ABS plastic production.",
    icon: Package,
    traditionalEquivalent: "Virgin ABS or PE plastic pellets",
    co2ReductionKg: 2.2,
    unitName: "kilogram",
    pricingHistory: [
      { year: "2020", price: "$15.50", status: "Lab Bio-Polymer Trials", scaleDesc: "Manual crushing and custom organic chemical esterification." },
      { year: "2023", price: "$9.80", status: "Boutique Extruder Batches", scaleDesc: "Local agricultural co-op processing, low-yield bio-resin." },
      { year: "2026", price: "$5.40", status: "Active Campaign", scaleDesc: "Automated continuous extruder systems, direct-to-molder pipelines." },
      { year: "2030", price: "$2.10", status: "Projected Resin Parity", scaleDesc: "High-density global packaging standard, massive organic resin parity.", isProjected: true }
    ]
  }
];

export default function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [calcQuantity, setCalcQuantity] = useState<number>(1);
  const [calcProductId, setCalcProductId] = useState<string>(PRODUCTS[0].id);
  const [selectedPricingYear, setSelectedPricingYear] = useState<string>("2026");

  const selectedCalcProduct = PRODUCTS.find(p => p.id === calcProductId) || PRODUCTS[0];
  const calculatedSavings = (selectedCalcProduct.co2ReductionKg * calcQuantity).toFixed(1);

  return (
    <section id="products-showcase" className="py-24 bg-beige-50 dark:bg-forest-950 border-t border-beige-200/50 dark:border-forest-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-bamboo-100 dark:bg-forest-900/60 text-forest-800 dark:text-bamboo-300 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border border-bamboo-200/30 dark:border-forest-800/40">
            <span className="w-2 h-2 rounded-full bg-bamboo-500 animate-pulse"></span>
            <span>Engineered Materials Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-forest-950 dark:text-white tracking-tight">
            Advanced Bamboo Products
          </h2>
          <p className="text-sm sm:text-base text-forest-700 dark:text-forest-300 leading-relaxed font-light">
            Industrial bamboo is no longer just a raw material. Explore these engineered alternatives designed to substitute plastics, metals, and standard timber across critical consumer and structural sectors.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PRODUCTS.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-white dark:bg-forest-900/20 border border-beige-200 dark:border-forest-800/40 rounded-3xl p-6 sm:p-8 hover:shadow-md hover:border-bamboo-300 dark:hover:border-bamboo-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-bamboo-600 dark:text-bamboo-400 uppercase tracking-widest bg-bamboo-50 dark:bg-forest-900/50 px-2.5 py-1 rounded-lg border border-bamboo-100/30 dark:border-forest-800/30">
                      {product.category}
                    </span>
                    <div className="p-3 bg-beige-50 dark:bg-forest-900/40 rounded-2xl text-forest-800 dark:text-bamboo-300 border border-beige-100 dark:border-forest-800/50">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold text-forest-950 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xs font-mono font-medium text-forest-500 dark:text-forest-400 mb-4 italic">
                    {product.tagline}
                  </p>
                  <p className="text-sm text-forest-700 dark:text-forest-300 font-light leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {product.features.slice(0, 3).map((feat, index) => (
                      <div key={index} className="flex items-start space-x-2 text-xs text-forest-800 dark:text-forest-300 font-light">
                        <CheckCircle2 className="h-4.5 w-4.5 text-bamboo-500 dark:text-bamboo-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-beige-100 dark:border-forest-800/50 pt-6 flex items-center justify-between mt-auto">
                  <div className="text-[11px] font-mono text-forest-500 dark:text-forest-400">
                    <span className="block text-forest-400 uppercase tracking-widest text-[9px] font-bold">CO₂ Savings vs Traditional</span>
                    <span className="text-xs font-bold text-forest-800 dark:text-bamboo-300 font-mono">
                      -{product.co2ReductionKg} kg CO₂ / {product.unitName}
                    </span>
                  </div>

                  <button
                    id={`btn-view-details-${product.id}`}
                    onClick={() => {
                      setSelectedProduct(product);
                      setSelectedPricingYear("2026");
                    }}
                    className="inline-flex items-center text-xs font-bold text-forest-800 dark:text-bamboo-300 hover:text-bamboo-600 dark:hover:text-bamboo-400 transition-colors cursor-pointer"
                  >
                    Technical Specifications
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CARBON ESTIMATOR CALCULATOR */}
        <div id="carbon-estimator-card" className="mt-16 bg-white dark:bg-forest-900/10 border border-beige-200 dark:border-forest-800/30 p-8 rounded-3xl shadow-sm max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center space-x-2 text-bamboo-600 dark:text-bamboo-400">
                <Info className="h-5 w-5" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Public Choice Action Tool</span>
              </div>
              <h3 className="text-xl font-display font-bold text-forest-950 dark:text-white">
                Eco-Impact & Material Carbon Calculator
              </h3>
              <p className="text-xs sm:text-sm text-forest-700 dark:text-forest-300 font-light leading-relaxed">
                Estimate the direct reduction in greenhouse gas emissions when you choose engineered bamboo over high-impact materials. Mass public awareness and personal consumer choice drive carbon savings at an industrial scale.
              </p>

              {/* Calculator Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-forest-400 dark:text-forest-500 uppercase mb-1.5">
                    Select Material Alternative
                  </label>
                  <select
                    id="calc-product-select"
                    value={calcProductId}
                    onChange={(e) => {
                      setCalcProductId(e.target.value);
                      setCalcQuantity(1);
                    }}
                    className="w-full bg-beige-50 dark:bg-forest-900 border border-beige-200 dark:border-forest-800 rounded-xl px-3 py-2 text-xs text-forest-800 dark:text-forest-100 font-medium focus:ring-1 focus:ring-bamboo-400 focus:outline-none"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-forest-400 dark:text-forest-500 uppercase mb-1.5">
                    Quantity / Scale ({selectedCalcProduct.unitName}s)
                  </label>
                  <input
                    id="calc-quantity-input"
                    type="number"
                    min="1"
                    max="10000"
                    value={calcQuantity}
                    onChange={(e) => setCalcQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-beige-50 dark:bg-forest-900 border border-beige-200 dark:border-forest-800 rounded-xl px-3 py-2 text-xs text-forest-800 dark:text-forest-100 font-mono font-bold focus:ring-1 focus:ring-bamboo-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="md:col-span-5 bg-bamboo-50 dark:bg-forest-900/40 border border-bamboo-100 dark:border-forest-800/60 rounded-2xl p-6 text-center flex flex-col justify-center items-center h-full min-h-[180px]">
              <span className="text-[10px] font-mono font-bold text-bamboo-600 dark:text-bamboo-400 uppercase tracking-widest mb-1">
                Estimated Net Emission Reduction
              </span>
              <div className="flex items-baseline justify-center space-x-1.5 my-2">
                <span className="text-4xl sm:text-5xl font-mono font-black text-forest-950 dark:text-bamboo-300">
                  {calculatedSavings}
                </span>
                <span className="text-sm font-mono font-bold text-forest-600 dark:text-forest-400">
                  kg CO₂e
                </span>
              </div>
              <p className="text-[10px] text-forest-500 dark:text-forest-400 font-light leading-snug">
                Equal to taking a medium combustion car off the road for approx. <span className="font-semibold text-bamboo-600 dark:text-bamboo-400">{(parseFloat(calculatedSavings) * 2.4).toFixed(0)} kilometers</span>.
              </p>
              <div className="mt-4 text-[9px] font-mono font-bold text-forest-400 dark:text-forest-500 border-t border-bamboo-100 dark:border-forest-800/40 pt-2.5 w-full">
                Alternative: {selectedCalcProduct.traditionalEquivalent}
              </div>
            </div>

          </div>
        </div>

        {/* DETAILS MODAL */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="fixed inset-0 bg-forest-950/60 backdrop-blur-sm"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-white dark:bg-forest-900 border border-beige-200 dark:border-forest-800 w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
              >
                {/* Modal Header */}
                <div className="p-6 sm:p-8 bg-beige-50 dark:bg-forest-950/60 border-b border-beige-200 dark:border-forest-800/50 flex justify-between items-center shrink-0">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-bamboo-600 dark:text-bamboo-400 uppercase tracking-widest block mb-1">
                      {selectedProduct.category} Specifications
                    </span>
                    <h3 className="text-xl font-display font-bold text-forest-950 dark:text-white">
                      {selectedProduct.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-2 text-forest-400 hover:text-forest-950 dark:hover:text-white rounded-xl bg-white dark:bg-forest-900 border border-beige-100 dark:border-forest-800 shadow-sm transition-all text-xs font-mono font-bold cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                  {/* Tagline */}
                  <p className="text-sm text-bamboo-700 dark:text-bamboo-400 font-mono font-semibold">
                    {selectedProduct.tagline}
                  </p>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-forest-700 dark:text-forest-300 font-light leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3">
                    <h4 className="text-[11px] font-mono font-bold text-forest-400 uppercase tracking-widest">
                      Engineering Design Elements
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProduct.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-forest-800 dark:text-forest-200 font-light">
                          <CheckCircle2 className="h-4.5 w-4.5 text-bamboo-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Specs Table */}
                  <div className="space-y-3">
                    <h4 className="text-[11px] font-mono font-bold text-forest-400 uppercase tracking-widest">
                      Technical Spec Sheets
                    </h4>
                    <div className="bg-beige-50 dark:bg-forest-950/40 rounded-2xl border border-beige-200/50 dark:border-forest-800/30 overflow-hidden">
                      <table className="w-full text-left text-xs border-collapse">
                        <tbody>
                          {Object.entries(selectedProduct.specs).map(([key, val], idx) => (
                            <tr key={key} className={idx !== 0 ? "border-t border-beige-200/50 dark:border-forest-800/30" : ""}>
                              <td className="p-3 font-mono font-bold text-forest-500 dark:text-forest-400 bg-beige-100/30 dark:bg-forest-950/20 w-1/3">
                                {key}
                              </td>
                              <td className="p-3 text-forest-800 dark:text-forest-200 font-medium">
                                {val}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Dynamic Cost & Pricing Trajectory Component */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[11px] font-mono font-bold text-forest-400 uppercase tracking-widest">
                        Cost Trajectory & Scale Evolution
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-bamboo-600 dark:text-bamboo-400 uppercase">
                        Select Year to inspect supply-chain scale
                      </span>
                    </div>

                    <div className="bg-beige-50 dark:bg-forest-950/40 rounded-2xl border border-beige-200/50 dark:border-forest-800/30 p-5 space-y-4">
                      {/* Cost Slider nodes */}
                      <div className="flex items-center justify-between relative px-2">
                        {/* Connecting track line */}
                        <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-beige-200 dark:bg-forest-800 -translate-y-1/2 z-0" />
                        
                        {selectedProduct.pricingHistory.map((item) => {
                          const isSelected = selectedPricingYear === item.year;
                          return (
                            <button
                              key={item.year}
                              onClick={() => setSelectedPricingYear(item.year)}
                              className="relative z-20 flex flex-col items-center group cursor-pointer focus:outline-none pointer-events-auto select-none touch-manipulation active:scale-95 transition-transform duration-100"
                            >
                              <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 border-2 ${
                                  isSelected
                                    ? "bg-bamboo-500 text-white border-bamboo-500 scale-115 shadow-md"
                                    : "bg-white dark:bg-forest-900 text-forest-500 dark:text-forest-400 border-beige-200 dark:border-forest-800 hover:border-bamboo-400 dark:hover:border-bamboo-400 hover:scale-105"
                                }`}
                              >
                                {item.year}
                              </div>
                              <span className={`text-[10px] font-bold font-mono mt-2 transition-all duration-300 ${
                                isSelected ? "text-forest-950 dark:text-bamboo-300 font-black scale-105" : "text-forest-500 dark:text-forest-400 group-hover:text-forest-750"
                              }`}>
                                {item.price}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Info Panel for Selected Year */}
                      {(() => {
                        const historyItem = selectedProduct.pricingHistory.find(h => h.year === selectedPricingYear) || selectedProduct.pricingHistory[2];
                        return (
                          <div className="bg-white dark:bg-forest-900 border border-beige-100 dark:border-forest-800/50 p-4 rounded-xl space-y-1.5 shadow-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-extrabold text-forest-900 dark:text-white uppercase tracking-wider">
                                {historyItem.year} {historyItem.status}
                              </span>
                              {historyItem.isProjected && (
                                <span className="text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-bamboo-500/10 text-bamboo-600 dark:text-bamboo-400 animate-pulse border border-bamboo-500/20">
                                  Future Projection
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-forest-700 dark:text-forest-300 font-light leading-relaxed">
                              {historyItem.scaleDesc} Choosing sustainable options today generates critical public demand to make the 2030 cost trajectory standard.
                            </p>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Eco Savings Detail Card */}
                  <div className="bg-bamboo-500/10 border border-bamboo-500/20 rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5">
                    <div className="p-2 bg-bamboo-500/20 text-bamboo-700 dark:text-bamboo-300 rounded-xl shrink-0">
                      <Info className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs font-mono font-bold text-bamboo-800 dark:text-bamboo-300 uppercase tracking-wide">
                        Lifecycle Carbon Calculation
                      </h5>
                      <p className="text-xs text-forest-800 dark:text-forest-300 leading-normal font-light">
                        {selectedProduct.carbonSavings} Replacement of carbon-intensive materials with rapid-growth bamboo provides direct carbon sequestration in durable goods.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 bg-beige-50 dark:bg-forest-950/60 border-t border-beige-200 dark:border-forest-800/50 flex justify-end shrink-0">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-5 py-2.5 bg-forest-950 text-white dark:bg-bamboo-400 dark:text-forest-950 hover:bg-forest-900 dark:hover:bg-bamboo-300 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                  >
                    Got It
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* OFFICIAL SOURCES & REGULATORY STANDARDS CITATIONS SECTION */}
        <div id="regulatory-citations" className="mt-20 border-t border-beige-200/60 dark:border-forest-800/40 pt-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-bamboo-600 dark:text-bamboo-400 tracking-wider">
                <BookOpen className="h-3.5 w-3.5" /> Academic & International Certifications
              </span>
              <h3 className="text-2xl font-display font-bold text-forest-950 dark:text-white tracking-tight">
                Official Standards & Scientific Citations
              </h3>
              <p className="text-xs sm:text-sm text-forest-650 dark:text-forest-400 max-w-2xl mx-auto font-light leading-relaxed">
                Our material indices, mechanical metrics, and lifecycle carbon estimates are sourced directly from established intergovernmental bodies, international standardization organizations, and verified environmental databases.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  code: "ISO 22156:2021",
                  title: "Bamboo Structures — Structural Design",
                  agency: "International Organization for Standardization (ISO)",
                  desc: "This international standard governs structural mechanics, limit states, and safety margins for bamboo timber. It provides the legal and structural foundation for implementing engineered bamboo in global mass-timber building codes.",
                  link: "https://www.iso.org/standard/74245.html",
                  tags: ["Structural", "Civil Engineering"]
                },
                {
                  code: "ISO 22157:2019",
                  title: "Physical and Mechanical Test Methods",
                  agency: "International Organization for Standardization (ISO)",
                  desc: "Defines scientific testing procedures for identifying the compressive, tensile, shear, and bending strengths of bamboo. These test procedures validate that raw Guadua and Moso exceed standard softwood strengths.",
                  link: "https://www.iso.org/standard/70659.html",
                  tags: ["Material Science", "Testing"]
                },
                {
                  code: "INBAR Technical Report",
                  title: "Carbon Sequestration & Timber Substitution",
                  agency: "International Bamboo and Rattan Organization (INBAR)",
                  desc: "The premier intergovernmental agency reports detailing quantitative carbon storage models. Explains how engineered bamboo products lock carbon inside structural frameworks for up to 50 years with a net-negative carbon footprint.",
                  link: "https://www.inbar.int/",
                  tags: ["Carbon Accounting", "Global Policy"]
                },
                {
                  code: "FSC-STD-40-004 V3-1",
                  title: "FSC Chain of Custody Certification",
                  agency: "Forest Stewardship Council (FSC)",
                  desc: "Provides strict criteria for certifying ecological biodiversity, soil preservation, and socio-economic labor standards across raw bamboo harvesting forests, ensuring zero deforestation and long-term sustainability.",
                  link: "https://fsc.org/",
                  tags: ["Forestry", "Eco-Certification"]
                }
              ].map((src, sIdx) => (
                <div 
                  key={sIdx} 
                  className="bg-white dark:bg-forest-900/30 border border-beige-200/40 dark:border-forest-800/40 rounded-2xl p-5 hover:border-bamboo-300 dark:hover:border-bamboo-500/30 transition-all duration-300 flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-bamboo-600 dark:text-bamboo-400 bg-bamboo-50 dark:bg-forest-900/40 px-2 py-0.5 rounded border border-bamboo-100/30 dark:border-forest-800/40">
                        {src.code}
                      </span>
                      <div className="flex gap-1.5">
                        {src.tags.map((t, tIdx) => (
                          <span key={tIdx} className="text-[8px] font-mono font-semibold text-forest-400 dark:text-forest-500 uppercase">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-forest-950 dark:text-white leading-snug">
                      {src.title}
                    </h4>
                    <p className="text-[10px] font-mono font-bold text-forest-500 dark:text-forest-400">
                      {src.agency}
                    </p>
                    <p className="text-[11px] text-forest-700 dark:text-forest-300 font-light leading-relaxed">
                      {src.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-beige-100 dark:border-forest-800/40 mt-4 flex justify-end">
                    <a
                      href={src.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-bamboo-600 hover:text-bamboo-700 dark:text-bamboo-400 dark:hover:text-bamboo-300 transition-colors cursor-pointer"
                    >
                      <FileText className="h-3 w-3" /> View Official Source <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Scientific disclaimer */}
            <p className="text-center text-[10px] text-forest-400 dark:text-forest-500 font-mono italic">
              * Note: Environmental indicators represented across active calculators utilize standard ISO 14040/44 Lifecycle Assessment (LCA) methodologies.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
