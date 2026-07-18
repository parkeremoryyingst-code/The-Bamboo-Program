import React, { useState, useEffect, useRef } from "react";
import { User, Users, Bot, Sparkles, MessageSquare, Send, Award, AlertTriangle, Shield, Check, Trophy, Flame, ChevronRight, Zap, RefreshCw, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  unlocked: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  role: string;
  text: string;
  timestamp: string;
  isSelf?: boolean;
}

export default function InteractiveHub() {
  const [activeTab, setActiveTab] = useState<"profile" | "community" | "ai" | "quiz">("profile");

  // PROFILE STATE
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("bsi-username") || "EcoAdvocate";
  });
  const [ecoRole, setEcoRole] = useState(() => {
    return localStorage.getItem("bsi-ecorole") || "Pioneer";
  });
  const [xp, setXp] = useState(() => {
    return parseInt(localStorage.getItem("bsi-xp") || "100", 10);
  });
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem("bsi-streak") || "1", 10);
  });
  const [carbonSaved, setCarbonSaved] = useState(() => {
    return parseFloat(localStorage.getItem("bsi-carbonsaved") || "14.2");
  });

  const [badges, setBadges] = useState<Badge[]>([
    { id: "pioneer", name: "Bamboo Pioneer", description: "Configured your community advocate profile.", iconName: "User", unlocked: true },
    { id: "estimator", name: "Eco Auditor", description: "Checked material carbon offsets.", iconName: "Zap", unlocked: false },
    { id: "communicator", name: "Vocal Advocate", description: "Participated in the community chatroom.", iconName: "MessageSquare", unlocked: false },
    { id: "ai-cert", name: "AI Collaborator", description: "Consulted the Gemini Materials Assistant.", iconName: "Bot", unlocked: false },
    { id: "streak-3", name: "Green Heat", description: "Maintained a 3-turn interactive streak.", iconName: "Flame", unlocked: false }
  ]);

  // LOCAL STORAGE SYNC
  useEffect(() => {
    localStorage.setItem("bsi-username", username);
    localStorage.setItem("bsi-ecorole", ecoRole);
    localStorage.setItem("bsi-xp", xp.toString());
    localStorage.setItem("bsi-streak", streak.toString());
    localStorage.setItem("bsi-carbonsaved", carbonSaved.toString());
  }, [username, ecoRole, xp, streak, carbonSaved]);

  const unlockBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === badgeId && !b.unlocked) {
          addXp(150);
          return { ...b, unlocked: true };
        }
        return b;
      })
    );
  };

  const addXp = (amount: number) => {
    setXp((prev) => prev + amount);
  };

  const incrementStreak = () => {
    setStreak((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        unlockBadge("streak-3");
      }
      return next;
    });
  };

  // COMMUNITY CHAT STATE
  const [communityMessages, setCommunityMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "ZenkoParx (Parker)", role: "Founder", text: "Welcome everyone to the official Bamboo Sustainability Initiative! This pilot is powered by our incredible community.", timestamp: "10:15 AM" },
    { id: "2", sender: "MaterialSage_04", role: "Material Scientist", text: "Guadua bamboo has incredible tensile properties. Our tests show it outperforms softwoods by nearly 3x in compression tests.", timestamp: "10:22 AM" },
    { id: "3", sender: "EcoBuild_Steve", role: "Green Architect", text: "Has anyone modeled the LEED score improvements when swapping SPF studs for Laminated Bamboo Timber?", timestamp: "10:30 AM" },
    { id: "4", sender: "BambusaBot", role: "BSI Assistant", text: "Fun Fact: Bamboo is actually a grass, not a tree! It releases 35% more oxygen and self-regenerates from its original root network.", timestamp: "10:35 AM" }
  ]);
  const [communityInput, setCommunityInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [communityMessages, activeTab]);

  // Automated Community Responses Simulation
  const handleSendCommunityMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!communityInput.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: username,
      role: `${ecoRole} Advocate`,
      text: communityInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isSelf: true
    };

    setCommunityMessages((prev) => [...prev, userMsg]);
    const typedText = communityInput.toLowerCase();
    setCommunityInput("");
    addXp(50);
    incrementStreak();
    unlockBadge("communicator");

    // Trigger realistic community replies
    setTimeout(() => {
      let replyText = "That's a great point! Public adoption is exactly how we make this shift viable.";
      let responder = "ZenkoParx (Parker)";
      let responderRole = "Founder";

      if (typedText.includes("cycle") || typedText.includes("bike")) {
        replyText = "The Guadua bike frame is really the pinnacle of bamboo's shock absorption. It rides smoother than a standard alloy frame!";
        responder = "MaterialSage_04";
        responderRole = "Material Scientist";
      } else if (typedText.includes("keyboard") || typedText.includes("tech")) {
        replyText = "The mechanical keyboard case is so resonant. Carving it from solid Moso bamboo really shows off the grain.";
        responder = "EcoBuild_Steve";
        responderRole = "Green Architect";
      } else if (typedText.includes("official") || typedText.includes("unverified") || typedText.includes("disclaimer")) {
        replyText = "Absolutely, we always emphasize that this is a community framework. We operate independently to raise public choice until formal standardization is fully unlocked.";
        responder = "ZenkoParx (Parker)";
        responderRole = "Founder";
      } else if (typedText.includes("carbon") || typedText.includes("co2") || typedText.includes("save")) {
        replyText = "Exactly. The root structure traps carbon permanently in soil, while harvested stalks lock carbon inside durable materials like furniture or bikes.";
        responder = "BambusaBot";
        responderRole = "BSI Assistant";
      }

      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: responder,
        role: responderRole,
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setCommunityMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  // GEMINI AI CHAT STATE
  const [aiMessages, setAiMessages] = useState<{ role: "user" | "model"; text: string }[]>([
    { role: "model", text: "Hello! I am the **Gemini-powered Materials Assistant** for the Bamboo Sustainability Initiative. I can answer any technical questions about bamboo growth, carbon offsetting, or engineered applications. Ask me anything!" }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiStatusMessage, setAiStatusMessage] = useState("");
  const [isAiConfigured, setIsAiConfigured] = useState(true);
  const aiChatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (aiChatEndRef.current) {
      aiChatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiMessages, aiLoading]);

  const handleSendAiMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim() || aiLoading) return;

    const userText = aiInput.trim();
    setAiInput("");
    setAiMessages((prev) => [...prev, { role: "user", text: userText }]);
    setAiLoading(true);
    addXp(75);
    incrementStreak();
    unlockBadge("ai-cert");

    // Cycle through supportive, tech-centric status updates for realism
    const statusQuotes = [
      "Consulting botanical parameters...",
      "Calculating carbon sequestration rates...",
      "Analyzing structural density benchmarks...",
      "Formulating material carbon comparison..."
    ];
    let quoteIndex = 0;
    setAiStatusMessage(statusQuotes[0]);
    const interval = setInterval(() => {
      quoteIndex = (quoteIndex + 1) % statusQuotes.length;
      setAiStatusMessage(statusQuotes[quoteIndex]);
    }, 1500);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: aiMessages.slice(1) // omit the welcome message
        })
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with fullstack server.");
      }

      const data = await response.json();
      setAiMessages((prev) => [...prev, { role: "model", text: data.text }]);
      setIsAiConfigured(data.isConfigured !== false);
    } catch (err) {
      console.error(err);
      // Fallback response if server or API key fails
      setAiMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I am operating in **Local Eco-Bot Fallback Mode** because the server is either initializing or the Gemini API key isn't active. Let me tell you about bamboo's incredible tensile properties! It can substitute steel, hardwood, and concrete in many green construction projects while holding a completely negative net carbon score."
        }
      ]);
      setIsAiConfigured(false);
    } finally {
      clearInterval(interval);
      setAiLoading(false);
      setAiStatusMessage("");
    }
  };

  // QUIZ STATE
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [isQuizAnswerSubmitted, setIsQuizAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestions = [
    {
      question: "What biological classification does bamboo belong to?",
      options: [
        "A fast-growing, evergreen wood species",
        "A perennial rapid-growth grass (Bambusoideae family)",
        "A rare form of coniferous fern",
        "An ancient root-forming succulent"
      ],
      correctAnswer: 1,
      explanation: "Bamboo is actually a giant grass! Its root network (rhizomes) remains completely intact after harvesting, allowing stalks to grow and regenerate without replanting."
    },
    {
      question: "How fast can Guadua and structural bamboo species grow compared to traditional hardwood trees?",
      options: [
        "Roughly the exact same speed",
        "About twice (2x) as fast",
        "Up to 30x faster",
        "Slower, but with double the density"
      ],
      correctAnswer: 2,
      explanation: "Engineered species like Guadua can grow up to 1 meter in a single day and achieve full load-bearing maturity in just 3-5 years, versus 30-50 years for standard pines!"
    },
    {
      question: "Why does manufactured bamboo often hold a completely net-negative carbon footprint?",
      options: [
        "It undergoes chemical processes that destroy carbon dioxide molecules",
        "It absorbs up to 35% more CO₂ than standard trees, and locks that carbon inside durable materials for decades",
        "It actively repels ambient greenhouse gases through magnetic static charge",
        "It consists of highly dense water cells that cannot bind carbon"
      ],
      correctAnswer: 1,
      explanation: "A stand of bamboo absorbs massive amounts of carbon while growing. When processed into high-strength products like bikes or timber, that carbon remains locked inside, preventing atmospheric release."
    }
  ];

  const handleQuizAnswerSubmit = () => {
    if (selectedQuizOption === null || isQuizAnswerSubmitted) return;
    setIsQuizAnswerSubmitted(true);
    if (selectedQuizOption === quizQuestions[currentQuizIndex].correctAnswer) {
      setQuizScore((prev) => prev + 1);
      addXp(50);
    }
  };

  const handleNextQuizQuestion = () => {
    const isCorrect = selectedQuizOption === quizQuestions[currentQuizIndex].correctAnswer;
    const currentCorrectCount = quizScore + (isCorrect ? 0 : 0); // already handled in submit
    
    setSelectedQuizOption(null);
    setIsQuizAnswerSubmitted(false);
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      if (quizScore === quizQuestions.length) {
        unlockBadge("estimator");
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedQuizOption(null);
    setIsQuizAnswerSubmitted(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <section id="community-hub" className="py-24 bg-white dark:bg-forest-900 transition-colors duration-300 relative overflow-hidden border-t border-beige-200/50 dark:border-forest-800/40">
      
      {/* Decorative backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-bamboo-400/5 dark:bg-bamboo-400/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* UNOFFICIAL PUBLIC CHOICE DISCLOSURE CARD */}
        <div id="unverified-public-disclosure" className="max-w-4xl mx-auto bg-amber-500/10 border border-amber-500/30 p-6 sm:p-8 rounded-3xl mb-16 flex flex-col md:flex-row gap-6 items-start md:items-center relative">
          <div className="absolute -top-3.5 left-6 bg-amber-500 text-forest-950 font-mono text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <AlertTriangle className="h-3 w-3" />
            Public Awareness Status
          </div>
          
          <div className="p-3.5 bg-amber-500/15 rounded-2xl text-amber-600 dark:text-amber-400 shrink-0">
            <Shield className="h-6 w-6" />
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-forest-900 dark:text-amber-300">
              Unofficial Framework & Public Choice Disclaimer
            </h3>
            <p className="text-xs sm:text-xs text-forest-800 dark:text-forest-200 leading-relaxed font-light">
              The Bamboo Sustainability Initiative functions strictly as a public awareness concept and private pilot framework. It is <strong className="font-semibold text-amber-700 dark:text-amber-400">entirely unofficial</strong> unless mass public choice, consumer adoption, and community awareness take momentum to formalize it into a standardized regulatory structure. By engaging with this site, products, and communities, you choose to co-develop public awareness.
            </p>
          </div>
        </div>

        {/* MAIN CONTAINER */}
        <div className="max-w-5xl mx-auto bg-beige-50 dark:bg-forest-950/40 border border-beige-200 dark:border-forest-800/40 rounded-3xl overflow-hidden shadow-md flex flex-col md:flex-row h-[650px] items-stretch">
          
          {/* LEFT COLUMN: NAVIGATION / PROFILE SUMMARY */}
          <div className="w-full md:w-64 bg-white dark:bg-forest-950 border-b md:border-b-0 md:border-r border-beige-200 dark:border-forest-800/40 p-6 flex flex-col justify-between shrink-0">
            <div>
              <div className="mb-6">
                <span className="text-[9px] font-mono font-black text-forest-400 uppercase tracking-widest block mb-1">Interactive Hub</span>
                <h4 className="text-base font-display font-bold text-forest-950 dark:text-white">Engagement Center</h4>
              </div>

              {/* NAVIGATION BUTTONS */}
              <div className="space-y-1.5">
                {[
                  { id: "profile", label: "My Advocate Profile", icon: User, count: badges.filter(b => b.unlocked).length + " Badges" },
                  { id: "community", label: "Community Chatroom", icon: Users, count: "Simulated Live" },
                  { id: "ai", label: "Gemini AI Materials", icon: Bot, count: isAiConfigured ? "Connected" : "Local Mode" },
                  { id: "quiz", label: "Advocate Quiz Center", icon: HelpCircle, count: "Earn 150+ XP" }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      id={`tab-btn-${tab.id}`}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        incrementStreak();
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer text-left ${
                        activeTab === tab.id
                          ? "bg-forest-900 text-white dark:bg-bamboo-400 dark:text-forest-950 shadow-sm"
                          : "text-forest-600 dark:text-forest-400 hover:bg-beige-50 dark:hover:bg-forest-900/40 hover:text-forest-900 dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className="h-4.5 w-4.5" />
                        <span className="text-xs font-semibold">{tab.label}</span>
                      </div>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                        activeTab === tab.id
                          ? "bg-forest-950/40 text-bamboo-200 dark:bg-forest-900/10 dark:text-forest-900"
                          : "bg-beige-100 dark:bg-forest-900 text-forest-500 dark:text-forest-400"
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* QUICK STATS IN SIDEBAR */}
            <div className="border-t border-beige-100 dark:border-forest-800/40 pt-4 mt-6 md:mt-0 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-forest-400 font-bold uppercase text-[9px]">Eco XP Level</span>
                <span className="font-bold text-forest-800 dark:text-white">{Math.floor(xp / 100)}</span>
              </div>
              <div className="w-full bg-beige-100 dark:bg-forest-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-bamboo-500 h-full transition-all duration-500"
                  style={{ width: `${xp % 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center space-x-1 text-orange-500">
                  <Flame className="h-4 w-4 fill-orange-500 animate-pulse" />
                  <span className="font-bold">{streak} Day Streak</span>
                </div>
                <span className="text-forest-500 font-bold">XP: {xp}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DISPLAY MODULE */}
          <div className="flex-1 bg-white dark:bg-forest-950/20 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            
            <AnimatePresence mode="wait">
              
              {/* TAB 1: PROFILE MANAGEMENT */}
              {activeTab === "profile" && (
                <motion.div
                  key="profile-panel"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="space-y-6 h-full overflow-y-auto pr-1"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-beige-100 dark:border-forest-800/40">
                    <div>
                      <h4 className="text-lg font-display font-bold text-forest-950 dark:text-white flex items-center gap-2">
                        <User className="h-5 w-5 text-bamboo-500" />
                        My Sustainability Profile
                      </h4>
                      <p className="text-xs text-forest-500 dark:text-forest-400">Configure your advocate persona and check carbon contributions.</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-bamboo-50 dark:bg-forest-900/40 border border-bamboo-100 dark:border-forest-800/50 px-3 py-1.5 rounded-xl">
                      <Trophy className="h-4.5 w-4.5 text-bamboo-500" />
                      <span className="text-xs font-mono font-bold text-forest-800 dark:text-bamboo-300">
                        {carbonSaved.toFixed(1)} kg CO₂ Saved
                      </span>
                    </div>
                  </div>

                  {/* USERNAME & ROLE CONFIG */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-forest-400 uppercase mb-1.5">Advocate Username</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.slice(0, 20))}
                        className="w-full bg-beige-50 dark:bg-forest-900/60 border border-beige-200 dark:border-forest-800/60 px-3.5 py-2 rounded-xl text-xs text-forest-800 dark:text-forest-100 focus:ring-1 focus:ring-bamboo-400 focus:outline-none font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-forest-400 uppercase mb-1.5">Ecological Role</label>
                      <select
                        value={ecoRole}
                        onChange={(e) => {
                          setEcoRole(e.target.value);
                          unlockBadge("pioneer");
                          addXp(10);
                        }}
                        className="w-full bg-beige-50 dark:bg-forest-900/60 border border-beige-200 dark:border-forest-800/60 px-3.5 py-2 rounded-xl text-xs text-forest-800 dark:text-forest-100 focus:ring-1 focus:ring-bamboo-400 focus:outline-none font-medium"
                      >
                        <option value="Pioneer">Pioneer (Public Awareness)</option>
                        <option value="Engineer">Materials Engineer</option>
                        <option value="Architect">Sustainable Builder</option>
                        <option value="Educator">Community Coordinator</option>
                      </select>
                    </div>
                  </div>

                  {/* BADGES SECTION */}
                  <div className="space-y-3 pt-2">
                    <h5 className="text-[11px] font-mono font-bold text-forest-400 uppercase tracking-widest">Unlocked Achievements</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {badges.map((b) => (
                        <div
                          key={b.id}
                          className={`border rounded-2xl p-3.5 flex items-start space-x-3 transition-all ${
                            b.unlocked
                              ? "bg-white dark:bg-forest-900/40 border-beige-200 dark:border-forest-800/40 shadow-sm"
                              : "bg-beige-50/50 dark:bg-forest-950/20 border-beige-100 dark:border-forest-800/20 opacity-50"
                          }`}
                        >
                          <div className={`p-2 rounded-xl shrink-0 ${
                            b.unlocked ? "bg-bamboo-100 dark:bg-forest-800 text-bamboo-600 dark:text-bamboo-300" : "bg-beige-100 dark:bg-forest-900 text-forest-400"
                          }`}>
                            {b.unlocked ? <Award className="h-4 w-4" /> : <Award className="h-4 w-4 text-forest-300" />}
                          </div>
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-xs font-bold text-forest-900 dark:text-white leading-none">{b.name}</span>
                              {b.unlocked && <Check className="h-3 w-3 text-bamboo-500" />}
                            </div>
                            <p className="text-[10px] text-forest-500 dark:text-forest-400 font-light leading-snug mt-1">{b.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: COMMUNITY CHATROOM */}
              {activeTab === "community" && (
                <motion.div
                  key="community-panel"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="flex flex-col justify-between h-full overflow-hidden"
                >
                  {/* Chat Header */}
                  <div className="pb-3 border-b border-beige-100 dark:border-forest-800/40 flex items-center justify-between shrink-0">
                    <div>
                      <h4 className="text-sm font-semibold text-forest-950 dark:text-white flex items-center gap-1.5">
                        <Users className="h-4.5 w-4.5 text-bamboo-500" />
                        Advocate Channel (Simulated Room)
                      </h4>
                      <p className="text-[10px] text-forest-500 dark:text-forest-400">Share material benchmarks and community adoption goals.</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-bamboo-100 text-bamboo-800 dark:bg-forest-900/60 dark:text-bamboo-300">
                      ● 18 Online
                    </span>
                  </div>

                  {/* Messages Scroll Area */}
                  <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1 my-2">
                    {communityMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col max-w-[85%] ${msg.isSelf ? "ml-auto items-end" : "mr-auto items-start"}`}
                      >
                        <div className="flex items-baseline space-x-1.5 mb-1 text-[10px] font-mono">
                          <span className="font-bold text-forest-700 dark:text-forest-300">{msg.sender}</span>
                          <span className="text-[8px] bg-beige-100 dark:bg-forest-900 px-1 py-0.2 rounded text-forest-400 uppercase tracking-widest">{msg.role}</span>
                          <span className="text-[8px] text-forest-400">{msg.timestamp}</span>
                        </div>
                        <div className={`p-3 rounded-2xl text-xs leading-relaxed font-light ${
                          msg.isSelf
                            ? "bg-forest-900 text-white dark:bg-bamboo-400 dark:text-forest-950 rounded-tr-none"
                            : "bg-beige-50 dark:bg-forest-900/50 text-forest-850 dark:text-forest-100 border border-beige-200/50 dark:border-forest-800/30 rounded-tl-none"
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleSendCommunityMessage} className="flex gap-2 border-t border-beige-100 dark:border-forest-800/40 pt-3 shrink-0">
                    <input
                      type="text"
                      placeholder="Type a sustainable idea or ask about bamboo cycle/keyboards..."
                      value={communityInput}
                      onChange={(e) => setCommunityInput(e.target.value)}
                      className="flex-1 bg-beige-50 dark:bg-forest-900 border border-beige-200 dark:border-forest-800 px-3.5 py-2.5 rounded-xl text-xs text-forest-800 dark:text-forest-100 focus:outline-none focus:ring-1 focus:ring-bamboo-400"
                    />
                    <button
                      type="submit"
                      className="p-2.5 bg-forest-900 text-white dark:bg-bamboo-400 dark:text-forest-950 rounded-xl hover:bg-forest-800 dark:hover:bg-bamboo-300 transition-colors cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </motion.div>
              )}

              {/* TAB 3: GEMINI AI CHAT */}
              {activeTab === "ai" && (
                <motion.div
                  key="ai-panel"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="flex flex-col justify-between h-full overflow-hidden"
                >
                  {/* Chat Header */}
                  <div className="pb-3 border-b border-beige-100 dark:border-forest-800/40 flex items-center justify-between shrink-0">
                    <div>
                      <h4 className="text-sm font-semibold text-forest-950 dark:text-white flex items-center gap-1.5">
                        <Bot className="h-4.5 w-4.5 text-bamboo-500 animate-bounce" />
                        Gemini Materials Assistant
                      </h4>
                      <p className="text-[10px] text-forest-500 dark:text-forest-400">Scientifically accurate answers on engineered bamboo and ESG.</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase tracking-wider ${
                      isAiConfigured
                        ? "bg-bamboo-500/10 text-bamboo-600 dark:text-bamboo-400"
                        : "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                    }`}>
                      <Sparkles className="h-2.5 w-2.5" />
                      {isAiConfigured ? "Gemini-3.5 Active" : "Fallback Mode"}
                    </span>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 my-2">
                    {aiMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col max-w-[90%] ${msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                      >
                        <span className="text-[8px] font-mono text-forest-400 uppercase mb-1">
                          {msg.role === "user" ? username : "Gemini Materials AI"}
                        </span>
                        <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                          msg.role === "user"
                            ? "bg-forest-900 text-white dark:bg-bamboo-400 dark:text-forest-950 rounded-tr-none"
                            : "bg-beige-50 dark:bg-forest-900/50 text-forest-850 dark:text-forest-100 border border-beige-200/50 dark:border-forest-800/30 rounded-tl-none font-light space-y-2"
                        }`}>
                          {msg.role === "model" ? (
                            <div className="prose prose-sm dark:prose-invert max-w-none text-xs">
                              {/* Simple Markdown Simulation for Client Side */}
                              {msg.text.split("\n").map((line, lidx) => {
                                if (line.startsWith("###")) {
                                  return <h4 key={lidx} className="text-xs font-bold text-forest-950 dark:text-white mt-2 mb-1 uppercase tracking-wide">{line.replace("###", "")}</h4>;
                                }
                                if (line.startsWith("1.") || line.startsWith("2.") || line.startsWith("3.") || line.startsWith("4.")) {
                                  return <div key={lidx} className="pl-3 py-0.5 list-decimal font-medium text-forest-800 dark:text-forest-200">{line}</div>;
                                }
                                if (line.startsWith("-") || line.startsWith("*")) {
                                  return <div key={lidx} className="pl-3 py-0.5 list-disc text-forest-700 dark:text-forest-300">{line}</div>;
                                }
                                // parse bold text **bold**
                                const parts = line.split("**");
                                return (
                                  <p key={lidx} className="mb-1 leading-relaxed">
                                    {parts.map((p, pidx) => pidx % 2 === 1 ? <strong key={pidx} className="font-bold text-forest-950 dark:text-white">{p}</strong> : p)}
                                  </p>
                                );
                              })}
                            </div>
                          ) : (
                            msg.text
                          )}
                        </div>
                      </div>
                    ))}

                    {/* AI Loading State */}
                    {aiLoading && (
                      <div className="flex flex-col items-start max-w-[85%]">
                        <span className="text-[8px] font-mono text-forest-400 uppercase mb-1">Gemini Materials AI</span>
                        <div className="bg-beige-50 dark:bg-forest-900/50 text-forest-800 dark:text-forest-200 border border-beige-200/50 dark:border-forest-800/30 p-4 rounded-2xl rounded-tl-none flex items-center space-x-3">
                          <RefreshCw className="h-3.5 w-3.5 text-bamboo-500 animate-spin" />
                          <span className="text-xs font-mono text-forest-500 animate-pulse">{aiStatusMessage}</span>
                        </div>
                      </div>
                    )}
                    <div ref={aiChatEndRef} />
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleSendAiMessage} className="flex gap-2 border-t border-beige-100 dark:border-forest-800/40 pt-3 shrink-0">
                    <input
                      type="text"
                      disabled={aiLoading}
                      placeholder="Ask Gemini: How strong is Guadua bamboo? What is Moso keyboard?"
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      className="flex-1 bg-beige-50 dark:bg-forest-900 border border-beige-200 dark:border-forest-800 px-3.5 py-2.5 rounded-xl text-xs text-forest-800 dark:text-forest-100 focus:outline-none focus:ring-1 focus:ring-bamboo-400 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={aiLoading}
                      className="p-2.5 bg-forest-900 text-white dark:bg-bamboo-400 dark:text-forest-950 rounded-xl hover:bg-forest-800 dark:hover:bg-bamboo-300 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </motion.div>
              )}

              {/* TAB 4: QUIZ / TRIVIA CHALLENGE */}
              {activeTab === "quiz" && (
                <motion.div
                  key="quiz-panel"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="flex flex-col justify-between h-full overflow-hidden"
                >
                  {/* Quiz Header */}
                  <div className="pb-3 border-b border-beige-100 dark:border-forest-800/40 flex items-center justify-between shrink-0">
                    <div>
                      <h4 className="text-sm font-semibold text-forest-950 dark:text-white flex items-center gap-1.5">
                        <HelpCircle className="h-4.5 w-4.5 text-bamboo-500" />
                        Advocate Quiz Center
                      </h4>
                      <p className="text-[10px] text-forest-500 dark:text-forest-400">Complete the quiz with 100% correct answers to unlock the Eco Auditor badge.</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-bamboo-100 text-bamboo-800 dark:bg-forest-900/60 dark:text-bamboo-300">
                      Earn +150 XP
                    </span>
                  </div>

                  {/* Quiz Core Content area */}
                  <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 my-2">
                    {!quizFinished ? (
                      <div className="space-y-4">
                        {/* Progress Tracker */}
                        <div className="flex items-center justify-between text-[10px] font-mono text-forest-500">
                          <span>QUESTION {currentQuizIndex + 1} OF {quizQuestions.length}</span>
                          <span>Score: {quizScore} Correct</span>
                        </div>
                        <div className="w-full bg-beige-100 dark:bg-forest-900 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-bamboo-500 h-full transition-all duration-300"
                            style={{ width: `${((currentQuizIndex) / quizQuestions.length) * 100}%` }}
                          />
                        </div>

                        {/* Question Text */}
                        <h4 className="text-sm font-display font-bold text-forest-900 dark:text-white leading-relaxed">
                          {quizQuestions[currentQuizIndex].question}
                        </h4>

                        {/* Options */}
                        <div className="space-y-2">
                          {quizQuestions[currentQuizIndex].options.map((opt, oIdx) => {
                            const isSelected = selectedQuizOption === oIdx;
                            const isCorrectAnswer = oIdx === quizQuestions[currentQuizIndex].correctAnswer;
                            
                            let optionClass = "border-beige-200 dark:border-forest-800 hover:bg-beige-50 dark:hover:bg-forest-900/40 text-forest-800 dark:text-forest-100";
                            if (isSelected) {
                              optionClass = "border-bamboo-500 bg-bamboo-500/10 text-bamboo-700 dark:text-bamboo-300";
                            }
                            if (isQuizAnswerSubmitted) {
                              if (isCorrectAnswer) {
                                optionClass = "border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-semibold";
                              } else if (isSelected) {
                                optionClass = "border-red-500 bg-red-500/15 text-red-800 dark:text-red-400";
                              } else {
                                optionClass = "border-beige-100 dark:border-forest-900 opacity-40 text-forest-500";
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={isQuizAnswerSubmitted}
                                onClick={() => setSelectedQuizOption(oIdx)}
                                className={`w-full text-left px-4 py-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${optionClass}`}
                              >
                                <span className="font-mono font-bold text-[10px] uppercase shrink-0 mt-0.5">
                                  {String.fromCharCode(65 + oIdx)})
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Feedback Area */}
                        {isQuizAnswerSubmitted && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-xl border text-xs leading-relaxed ${
                              selectedQuizOption === quizQuestions[currentQuizIndex].correctAnswer
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-emerald-300"
                                : "bg-red-500/10 border-red-500/20 text-red-800 dark:text-red-300"
                            }`}
                          >
                            <span className="font-bold block mb-1">
                              {selectedQuizOption === quizQuestions[currentQuizIndex].correctAnswer ? "✓ Correct!" : "✗ Incorrect"}
                            </span>
                            <span className="font-light">{quizQuestions[currentQuizIndex].explanation}</span>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      // Quiz Finished / Celebrations
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-6 space-y-5"
                      >
                        <div className="inline-flex p-4 rounded-full bg-bamboo-500/10 text-bamboo-500">
                          <Trophy className="h-10 w-10 animate-bounce" />
                        </div>
                        
                        <div className="space-y-1.5">
                          <h4 className="text-lg font-display font-bold text-forest-950 dark:text-white">
                            Quiz Completed!
                          </h4>
                          <p className="text-xs text-forest-500 dark:text-forest-400">
                            You scored <strong className="font-semibold">{quizScore} / {quizQuestions.length}</strong> correct answers.
                          </p>
                        </div>

                        {/* Special celebration if perfect score */}
                        {quizScore === quizQuestions.length ? (
                          <div className="max-w-md mx-auto bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl space-y-2.5 text-emerald-800 dark:text-emerald-300 text-xs">
                            <span className="font-bold block text-sm">🏆 Achievement Unlocked!</span>
                            <p className="font-light leading-relaxed">
                              You've unlocked the <strong>Eco Auditor</strong> Badge and earned <strong>+150 XP</strong>! Your deep material science knowledge is verified.
                            </p>
                          </div>
                        ) : (
                          <p className="text-xs text-forest-650 dark:text-forest-300 font-light max-w-sm mx-auto">
                            Answer all 3 questions correctly to unlock the prestigious **Eco Auditor** profile badge and level up!
                          </p>
                        )}

                        <div className="flex justify-center gap-3 pt-2">
                          <button
                            onClick={resetQuiz}
                            className="px-4 py-2 border border-beige-200 dark:border-forest-800 hover:bg-beige-50 dark:hover:bg-forest-900 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors"
                          >
                            Restart Quiz
                          </button>
                          {quizScore === quizQuestions.length && (
                            <button
                              onClick={() => {
                                setActiveTab("profile");
                              }}
                              className="px-4 py-2 bg-bamboo-500 hover:bg-bamboo-600 text-white dark:text-forest-950 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors flex items-center gap-1"
                            >
                              Go to Profile <ChevronRight className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Actions footer */}
                  {!quizFinished && (
                    <div className="border-t border-beige-100 dark:border-forest-800/40 pt-3 flex justify-end shrink-0">
                      {!isQuizAnswerSubmitted ? (
                        <button
                          disabled={selectedQuizOption === null}
                          onClick={handleQuizAnswerSubmit}
                          className="px-4 py-2 bg-forest-900 hover:bg-forest-800 dark:bg-bamboo-400 dark:text-forest-950 text-white rounded-xl text-xs font-mono font-bold cursor-pointer disabled:opacity-40 transition-colors"
                        >
                          Submit Answer
                        </button>
                      ) : (
                        <button
                          onClick={handleNextQuizQuestion}
                          className="px-4 py-2 bg-bamboo-500 hover:bg-bamboo-600 text-white dark:text-forest-950 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors flex items-center gap-1"
                        >
                          {currentQuizIndex < quizQuestions.length - 1 ? "Next Question" : "View Results"} <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
