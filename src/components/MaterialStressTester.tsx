import React, { useState, useEffect } from "react";
import { Scale, Zap, ShieldAlert, CheckCircle, Flame, ArrowDown, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Material {
  id: string;
  name: string;
  type: string;
  yieldLimitKg: number;
  elasticModulusGpa: number;
  co2Footprint: number;
  color: string;
  darkColor: string;
  description: string;
  microstructure: string;
}

const MATERIALS: Material[] = [
  {
    id: "bamboo",
    name: "Guadua Bamboo",
    type: "Engineered Bio-Composite",
    yieldLimitKg: 3800,
    elasticModulusGpa: 18,
    co2Footprint: -1.2,
    color: "bg-bamboo-500",
    darkColor: "text-bamboo-400 border-bamboo-500",
    description: "Laminated Guadua fibers act as natural high-tensile cords, distributing shear stress seamlessly through a flexible bio-resin matrix.",
    microstructure: "Hollow cellular vascular bundles reinforced with lignin and silica."
  },
  {
    id: "pine",
    name: "Structural Pine",
    type: "Standard Softwood Wood",
    yieldLimitKg: 1400,
    elasticModulusGpa: 10,
    co2Footprint: 0.4,
    color: "bg-amber-600/80",
    darkColor: "text-amber-500 border-amber-600",
    description: "Traditional softwood containing unidirectional grain bundles. Prone to split parallel to grain fibers under moderate shear forces.",
    microstructure: "Tracheid wood fibers bound by natural hemicellulose."
  },
  {
    id: "steel",
    name: "Structural Carbon Steel",
    type: "Alloy Metal",
    yieldLimitKg: 5000,
    elasticModulusGpa: 200,
    co2Footprint: 1.8,
    color: "bg-slate-500",
    darkColor: "text-slate-400 border-slate-500",
    description: "Maximum stiffness and high threshold limits, but carries an immense carbon footprint due to high-heat coal-fired blast furnaces.",
    microstructure: "Crystalline iron ferrite lattice with interstitial carbon atoms."
  },
  {
    id: "abs-plastic",
    name: "ABS Plastic",
    type: "Synthetic Petro-Polymer",
    yieldLimitKg: 550,
    elasticModulusGpa: 2,
    co2Footprint: 3.2,
    color: "bg-red-500/80",
    darkColor: "text-red-400 border-red-500",
    description: "Extremely low stiffness, bucking rapidly. Synthesized directly from petroleum, causing heavy long-term environmental toxicity.",
    microstructure: "Amorphous styrene-acrylonitrile chains with butadiene rubber nodes."
  }
];

export default function MaterialStressTester() {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>("bamboo");
  const [loadWeight, setLoadWeight] = useState<number>(1000);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{
    status: "safe" | "warning" | "failed";
    deflectionMm: number;
    factorOfSafety: number;
    totalCO2EmittedKg: number;
  }>({
    status: "safe",
    deflectionMm: 2.2,
    factorOfSafety: 3.8,
    totalCO2EmittedKg: -12,
  });

  const material = MATERIALS.find((m) => m.id === selectedMaterialId) || MATERIALS[0];

  const calculatePhysics = (weight: number, mat: Material) => {
    // Deflection is proportional to weight / elasticModulus.
    // Let's create an intuitive physics-like simulation scale
    const baseDeflection = (weight / 500) * (30 / mat.elasticModulusGpa);
    const deflectionMm = parseFloat(Math.min(baseDeflection, 45).toFixed(1));

    // Factor of safety = yieldLimit / appliedWeight
    const factorOfSafety = parseFloat((mat.yieldLimitKg / weight).toFixed(1));

    // Total CO2 Emitted = weight in kg * material carbon footprint per kg.
    // For bamboo, a negative value represents net sequestration!
    const totalCO2EmittedKg = parseFloat((weight * 0.01 * mat.co2Footprint).toFixed(1));

    let status: "safe" | "warning" | "failed" = "safe";
    if (weight > mat.yieldLimitKg) {
      status = "failed";
    } else if (weight > mat.yieldLimitKg * 0.75) {
      status = "warning";
    }

    return { status, deflectionMm, factorOfSafety, totalCO2EmittedKg };
  };

  // Re-run physics whenever load or material changes
  useEffect(() => {
    const results = calculatePhysics(loadWeight, material);
    setTestResult(results);
  }, [loadWeight, selectedMaterialId]);

  return (
    <div id="material-stress-tester-widget" className="mt-16 border border-beige-200 dark:border-forest-800/40 bg-beige-50/50 dark:bg-forest-950/20 p-6 sm:p-8 rounded-3xl space-y-8">
      
      {/* Widget Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-forest-500 dark:text-bamboo-400 font-mono text-xs uppercase tracking-widest font-bold">
            <Activity className="h-4.5 w-4.5 animate-pulse text-bamboo-500" />
            Interactive Physics Sandbox
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-forest-950 dark:text-white mt-1">
            Comparative Material Stress Simulator
          </h3>
          <p className="text-xs text-forest-600 dark:text-forest-400 font-light mt-1">
            Apply simulated physical loads up to 5,000 kg to see structural deflection, limits, and ecological carbon footprints in real-time.
          </p>
        </div>
        
        {/* Toggle Grid */}
        <div className="flex flex-wrap gap-1.5 bg-white dark:bg-forest-900 border border-beige-200 dark:border-forest-800 p-1 rounded-2xl">
          {MATERIALS.map((mat) => (
            <button
              key={mat.id}
              onClick={() => {
                setSelectedMaterialId(mat.id);
                // Adjust load if it exceeds maximum limit of steel, etc to make it exciting
              }}
              className={`px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-semibold font-mono cursor-pointer transition-all ${
                selectedMaterialId === mat.id
                  ? "bg-forest-900 text-white dark:bg-bamboo-400 dark:text-forest-950 shadow-sm"
                  : "text-forest-600 dark:text-forest-400 hover:bg-beige-50 dark:hover:bg-forest-900/40"
              }`}
            >
              {mat.name.split(" ")[1] || mat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Visual SVG Pillar vs Stats Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Interactive Controls and Stats */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Material Metadata */}
            <div className="bg-white dark:bg-forest-900/60 border border-beige-200 dark:border-forest-800/60 p-5 rounded-2xl space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-forest-500 dark:text-bamboo-300 uppercase tracking-wider">
                  {material.type}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  material.co2Footprint < 0
                    ? "bg-bamboo-500/10 text-bamboo-600 dark:text-bamboo-400 border border-bamboo-500/20"
                    : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                }`}>
                  {material.co2Footprint < 0 ? "Carbon Negative" : `+${material.co2Footprint}x CO₂ footprint`}
                </span>
              </div>
              <h4 className="text-base font-display font-bold text-forest-900 dark:text-white">
                {material.name} Mechanical Limits
              </h4>
              <p className="text-xs text-forest-600 dark:text-forest-400 font-light leading-relaxed">
                {material.description}
              </p>
              <div className="border-t border-beige-100 dark:border-forest-800/40 pt-3 flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-mono text-forest-500">
                <div>
                  Microstructure: <span className="font-bold text-forest-800 dark:text-forest-200">{material.microstructure}</span>
                </div>
              </div>
            </div>

            {/* Slider Control */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline font-mono">
                <label className="text-xs font-bold text-forest-500 uppercase tracking-wider">
                  Applied Compressive Load (Mass)
                </label>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-xl font-black text-forest-950 dark:text-white">
                    {loadWeight.toLocaleString()}
                  </span>
                  <span className="text-xs text-forest-500 uppercase font-semibold">kg</span>
                </div>
              </div>

              <div className="relative flex items-center">
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={loadWeight}
                  onChange={(e) => setLoadWeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-beige-200 dark:bg-forest-800 rounded-lg appearance-none cursor-pointer accent-bamboo-500"
                />
              </div>

              <div className="flex justify-between text-[9px] font-mono text-forest-400">
                <span>100 kg</span>
                <span>Softwood limit (1.4T)</span>
                <span>Bamboo limit (3.8T)</span>
                <span>5,000 kg</span>
              </div>
            </div>
          </div>

          {/* Environmental and Mechanical Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Factor of Safety */}
            <div className="bg-white dark:bg-forest-900/40 border border-beige-200 dark:border-forest-800/40 p-4 rounded-2xl flex flex-col justify-between">
              <span className="text-[9px] font-mono text-forest-400 uppercase font-bold tracking-wider">Factor of Safety (FoS)</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className={`text-2xl font-black font-display ${
                  testResult.status === "failed" ? "text-red-500" : testResult.status === "warning" ? "text-orange-500" : "text-forest-900 dark:text-white"
                }`}>
                  {testResult.status === "failed" ? "0.0" : testResult.factorOfSafety}
                </span>
                {testResult.status !== "failed" && <span className="text-[10px] font-mono text-forest-500">x</span>}
              </div>
              <span className="text-[9px] text-forest-500 mt-1 font-mono">
                {testResult.status === "failed" ? "Failure Exceeded" : testResult.factorOfSafety >= 2.0 ? "Structural Margin OK" : "Critical Load Warning"}
              </span>
            </div>

            {/* Elastic Deflection */}
            <div className="bg-white dark:bg-forest-900/40 border border-beige-200 dark:border-forest-800/40 p-4 rounded-2xl flex flex-col justify-between">
              <span className="text-[9px] font-mono text-forest-400 uppercase font-bold tracking-wider">Deflection (Strain)</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className={`text-2xl font-black font-display ${
                  testResult.status === "failed" ? "text-red-500" : "text-forest-900 dark:text-white"
                }`}>
                  {testResult.status === "failed" ? "SNAP" : `${testResult.deflectionMm}`}
                </span>
                {testResult.status !== "failed" && <span className="text-[10px] font-mono text-forest-500">mm</span>}
              </div>
              <span className="text-[9px] text-forest-500 mt-1 font-mono">
                Stiffness: {material.elasticModulusGpa} GPa
              </span>
            </div>

            {/* Simulated CO2 sequestered or emitted */}
            <div className={`border p-4 rounded-2xl flex flex-col justify-between ${
              testResult.totalCO2EmittedKg < 0
                ? "bg-bamboo-500/10 border-bamboo-500/20 text-bamboo-800 dark:text-bamboo-300"
                : "bg-white dark:bg-forest-900/40 border-beige-200 dark:border-forest-800/40"
            }`}>
              <span className="text-[9px] font-mono text-forest-400 uppercase font-bold tracking-wider">Carbon Cost (Net)</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className={`text-2xl font-black font-display ${
                  testResult.totalCO2EmittedKg < 0 ? "text-bamboo-600 dark:text-bamboo-400" : "text-red-500/90"
                }`}>
                  {testResult.totalCO2EmittedKg > 0 ? `+${testResult.totalCO2EmittedKg}` : testResult.totalCO2EmittedKg}
                </span>
                <span className="text-[10px] font-mono text-forest-500">kg CO₂</span>
              </div>
              <span className="text-[9px] text-forest-500 mt-1 font-mono">
                {testResult.totalCO2EmittedKg < 0 ? "Net Carbon Sequestered" : "Atmospheric Emissions Added"}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Simulated Physics Column SVG render */}
        <div className="lg:col-span-5 bg-white dark:bg-forest-900 border border-beige-200 dark:border-forest-800 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden h-[360px] lg:h-auto min-h-[340px]">
          {/* Overlay grid lines for structural drafting look */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          {/* Dynamic Failure Banners */}
          <AnimatePresence>
            {testResult.status === "failed" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-4 left-4 right-4 z-20 bg-red-500 text-white text-center font-mono text-[10px] font-black uppercase tracking-widest py-1.5 rounded-full flex items-center justify-center gap-1.5 shadow-md"
              >
                <ShieldAlert className="h-4.5 w-4.5 animate-bounce" />
                Material Failure: Yield Limit Exceeded!
              </motion.div>
            )}
            {testResult.status === "warning" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-4 left-4 right-4 z-20 bg-orange-500 text-white text-center font-mono text-[10px] font-black uppercase tracking-widest py-1.5 rounded-full flex items-center justify-center gap-1.5 shadow-md"
              >
                <ShieldAlert className="h-4.5 w-4.5 animate-pulse" />
                Warning: Material Yield Approaching 80%
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top Plate representation */}
          <div className="text-center z-10">
            <span className="text-[10px] font-mono font-bold text-forest-400 uppercase tracking-widest">
              Stress Deflection Model
            </span>
          </div>

          {/* SVG Pillar */}
          <div className="flex-1 flex items-center justify-center relative py-6">
            
            {/* Pressure Vector Arrow */}
            <div className="absolute top-2 flex flex-col items-center">
              <motion.div
                animate={{
                  y: [0, 4, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
                className="flex flex-col items-center"
              >
                <ArrowDown className={`h-8 w-8 ${
                  testResult.status === "failed" ? "text-red-500" : testResult.status === "warning" ? "text-orange-500" : "text-bamboo-500"
                }`} />
                <span className="text-[9px] font-mono font-bold text-forest-400">
                  {loadWeight.toLocaleString()} kg Force
                </span>
              </motion.div>
            </div>

            <svg
              viewBox="0 0 160 220"
              className={`w-40 h-56 transition-transform duration-300 ${
                testResult.status === "failed" ? "animate-wiggle" : ""
              }`}
            >
              {/* Foundation base plate */}
              <rect x="20" y="200" width="120" height="8" rx="2" className="fill-forest-200 dark:fill-forest-800" />
              {/* Hydraulic press top plate */}
              <motion.rect
                x="30"
                y="36"
                width="100"
                height="8"
                rx="2"
                className="fill-forest-400 dark:fill-forest-700"
                animate={{
                  y: testResult.status === "failed" ? 35 : (testResult.deflectionMm * 0.6)
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />

              {/* Physical pillar representation with dynamic bend */}
              {(() => {
                // If failed, render cracked/snapped parts
                if (testResult.status === "failed") {
                  return (
                    <g>
                      {/* Snapped top half */}
                      <path
                        d="M 72,44 L 88,44 L 88,110 L 68,118 Z"
                        className={`${material.id === "bamboo" ? "fill-bamboo-600/70" : material.id === "pine" ? "fill-amber-700" : material.id === "steel" ? "fill-slate-600" : "fill-red-400"} transition-all duration-300`}
                      />
                      {/* Snapped bottom half */}
                      <path
                        d="M 68,126 L 88,118 L 88,200 L 72,200 Z"
                        className={`${material.id === "bamboo" ? "fill-bamboo-500" : material.id === "pine" ? "fill-amber-600" : material.id === "steel" ? "fill-slate-500" : "fill-red-500"} transition-all duration-300`}
                      />
                      {/* Failure energy crack indicator */}
                      <path d="M 68,118 L 88,118 L 68,126" stroke="#ef4444" strokeWidth="2" fill="none" />
                    </g>
                  );
                }

                // Straight to bent bezier curve representation based on deflection
                const flexShift = testResult.deflectionMm * 1.4;
                const topY = 44 + (testResult.deflectionMm * 0.6);
                const controlX = 80 + flexShift;
                const pathStr = `M 72,${topY} 
                                 C ${72 + flexShift},100 ${72 + flexShift},150 72,200 
                                 L 88,200 
                                 C ${88 + flexShift},150 ${88 + flexShift},100 88,${topY} 
                                 Z`;

                return (
                  <g>
                    {/* Visual stress tension points highlighted in orange/red under warning */}
                    <path
                      d={pathStr}
                      className={`transition-all duration-300 ${
                        testResult.status === "warning"
                          ? "fill-orange-500/80"
                          : "fill-forest-900/10 dark:fill-white/5"
                      }`}
                    />
                    
                    {/* Core Column */}
                    <path
                      d={pathStr}
                      className={`transition-all duration-300 ${
                        material.id === "bamboo"
                          ? "fill-bamboo-500 border border-bamboo-600"
                          : material.id === "pine"
                          ? "fill-amber-600"
                          : material.id === "steel"
                          ? "fill-slate-500"
                          : "fill-red-500"
                      }`}
                    />

                    {/* Node details if bamboo */}
                    {material.id === "bamboo" && (
                      <g className="stroke-bamboo-600/40 stroke-2">
                        <line x1={72 + flexShift * 0.3} y1="80" x2={88 + flexShift * 0.3} y2="80" />
                        <line x1={72 + flexShift * 0.6} y1="120" x2={88 + flexShift * 0.6} y2="120" />
                        <line x1={72 + flexShift * 0.3} y1="160" x2={88 + flexShift * 0.3} y2="160" />
                      </g>
                    )}
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Mechanical Lesson Prompt */}
          <div className="bg-beige-50 dark:bg-forest-950 border border-beige-200/50 dark:border-forest-800/40 p-3 rounded-2xl z-10">
            <p className="text-[10px] text-forest-700 dark:text-forest-300 font-mono text-center leading-relaxed">
              {testResult.status === "failed" ? (
                <span className="text-red-500 font-bold">
                  {material.name} snapped! Choose structural bamboo options which bend but do not fracture under stress.
                </span>
              ) : testResult.status === "warning" ? (
                <span className="text-orange-500 font-bold">
                  High stress reached. Guadua's silica composite layers distribute micro-cracks to prevent brittle snaps.
                </span>
              ) : (
                <span>
                  Load is well within safe structural bounds. Guadua bamboo holds a 3x higher strength-to-weight ratio than pine softwood.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
