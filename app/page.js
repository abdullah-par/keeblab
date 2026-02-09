"use client"

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Moon, Sun, ArrowRight, Menu, X, Brain, Code, Users, Zap, Award, TrendingUp, GraduationCap, Command, CornerDownLeft, Terminal, Activity, RotateCcw, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AITrial = ({ isDark, onClose }) => {
  const [input, setInput] = useState("");
  const [wpm, setWpm] = useState(0);
  const [level, setLevel] = useState("EASY");
  const [startTime, setStartTime] = useState(null);

  const easyText = "The sun rises in the east.";
  const hardText = "Quantum computing leverages superposition and entanglement to solve intractable problems.";
  const currentGoal = level === "EASY" ? easyText : hardText;

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const mins = (Date.now() - startTime) / 60000;
        const words = input.length / 5;
        const currentWpm = Math.round(words / mins);
        setWpm(currentWpm);
        if (currentWpm > 40 && level === "EASY") {
          setLevel("HARD");
          setInput("");
          setStartTime(Date.now());
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [input, startTime, level]);

  const handleChange = (e) => {
    if (!startTime && e.target.value.length > 0) setStartTime(Date.now());
    setInput(e.target.value);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${level === "EASY" ? "bg-green-500/20 text-green-400" : "bg-rose-500/20 text-rose-400 animate-pulse"}`}>
            {level} MODE
          </div>
          <span className="text-sm font-mono opacity-60">{wpm} WPM</span>
        </div>
      </div>

      <div className="text-xl font-mono mb-6 leading-relaxed">
        {currentGoal.split("").map((char, i) => (
          <span key={i} className={i < input.length ? (input[i] === char ? (isDark ? "text-white" : "text-slate-900") : "text-rose-500") : "opacity-30"}>
            {char}
          </span>
        ))}
      </div>

      <input
        autoFocus
        value={input}
        onChange={handleChange}
        placeholder="Type to see AI adapt..."
        className="w-full bg-transparent border-b-2 border-blue-500/30 py-2 focus:border-blue-500 outline-none font-mono"
      />

      <p className="mt-4 text-xs opacity-50 italic">
        Tip: Type faster than 40 WPM to trigger difficulty adaptation.
      </p>
    </div>
  );
};

const CodingTrial = ({ isDark, onClose }) => {
  const [input, setInput] = useState("");
  const codeSnippet = "const KeebLab = () => { return <Practice /> };";

  const getHighlighter = (char, i) => {
    if (i >= input.length) return "opacity-30";
    if (input[i] !== char) return "text-rose-500 bg-rose-500/10";

    // Simple syntax highlighting simulation
    if (["{", "}", "(", ")", "<", ">", "/", ";", "=", "=>"].includes(char)) return "text-yellow-400";
    if (["const", "return"].includes(codeSnippet.slice(i, i + 6).split(" ")[0])) return "text-purple-400";
    return isDark ? "text-blue-300" : "text-blue-600";
  };

  return (
    <div className={`relative font-mono`}>
      <div className="flex justify-between items-center mb-4 text-xs opacity-50 uppercase tracking-tighter">
        <span>coding_session.js</span>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
      </div>

      <div className="text-lg mb-6 leading-relaxed bg-black/20 p-4 rounded-lg">
        {codeSnippet.split("").map((char, i) => (
          <span key={i} className={getHighlighter(char, i)}>
            {char}
          </span>
        ))}
      </div>

      <input
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type the code..."
        className="w-full bg-transparent border-l-2 border-blue-500 pl-4 py-1 focus:outline-none placeholder:opacity-20"
      />
    </div>
  );
};



const MultiplayerTrial = ({ isDark, onClose }) => {
  const [userPos, setUserPos] = useState(0);
  const [bot1Pos, setBot1Pos] = useState(0);
  const [bot2Pos, setBot2Pos] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const demoText = "Racing to the finish line.";

  useEffect(() => {
    if (userPos > 0 && !isFinished) {
      const interval = setInterval(() => {
        setBot1Pos(prev => Math.min(prev + Math.random() * 2, 100));
        setBot2Pos(prev => Math.min(prev + Math.random() * 1.5, 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [userPos, isFinished]);

  useEffect(() => {
    if (userPos >= 100 || bot1Pos >= 100) setIsFinished(true);
  }, [userPos, bot1Pos]);

  const handleInput = (e) => {
    const val = e.target.value;
    const progress = (val.length / demoText.length) * 100;
    setUserPos(progress);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8">
        <h4 className="font-bold flex items-center gap-2">
          <Users size={18} className="text-cyan-400" /> Live Match
        </h4>
      </div>

      <div className="space-y-6 mb-8 relative">
        {[
          { label: "You", pos: userPos, color: "bg-blue-500" },
          { label: "Bot 1", pos: bot1Pos, color: "bg-rose-500" },
          { label: "Bot 2", pos: bot2Pos, color: "bg-slate-500" }
        ].map((player, i) => (
          <div key={i} className="relative h-8 bg-black/20 rounded-full overflow-hidden border border-white/5">
            <motion.div
              className={`absolute top-0 left-0 h-full ${player.color} flex items-center px-3 text-[10px] font-bold uppercase`}
              animate={{ width: `${player.pos}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            >
              {player.label}
            </motion.div>
          </div>
        ))}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-white/20 border-r-2 border-dashed border-white/40" />
      </div>

      {!isFinished ? (
        <div className="space-y-4">
          <p className="text-sm font-mono opacity-60 text-center">{demoText}</p>
          <input
            autoFocus
            onChange={handleInput}
            placeholder="Type fast to win!"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 transition-all font-mono"
          />
        </div>
      ) : (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-4">
          <div className="text-2xl font-black text-cyan-400 mb-2">
            {userPos >= 100 ? "🥇 YOU WON!" : "🥈 2ND PLACE"}
          </div>
          <button onClick={() => { setUserPos(0); setBot1Pos(0); setBot2Pos(0); setIsFinished(false); }} className="text-xs flex items-center gap-1 mx-auto opacity-50 hover:opacity-100 transition-opacity">
            <RotateCcw size={12} /> Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
};

const KidsTrial = ({ isDark, onClose }) => {

  const [input, setInput] = useState("");
  const word = "SUN";
  const colors = ["text-yellow-400", "text-orange-400", "text-red-400"];

  return (
    <div
      className={`p-8 rounded-[3rem] border-4 flex flex-col items-center justify-center text-center ${isDark ? "bg-indigo-900 shadow-indigo-500/20 border-white/20" : "bg-yellow-50 shadow-yellow-500/20 border-yellow-200"}`}
    >
      <div className="flex gap-4 mb-8">
        {word.split("").map((char, i) => (
          <motion.div
            key={i}
            animate={input[i] === char ? { y: [0, -20, 0] } : {}}
            className={`text-6xl md:text-8xl font-black ${input[i] === char ? "text-green-400" : (isDark ? "text-white/20" : "text-black/10")}`}
          >
            {char}
          </motion.div>
        ))}
      </div>

      <input
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value.toUpperCase())}
        className="opacity-0 absolute"
      />

      <p className={`text-xl font-bold ${isDark ? "text-indigo-200" : "text-indigo-600"}`}>
        {input === word ? "🌟 GREAT JOB! 🌟" : "Type the letters!"}
      </p>

      {input === word && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setInput("")}
          className="mt-6 px-6 py-2 rounded-full bg-white text-indigo-600 font-bold shadow-lg"
        >
          Next Word
        </motion.button>
      )}
    </div>
  );
};

const TrialOverlay = ({ activeTrial, isDark, onClose }) => {
  const getTrialComponent = () => {
    switch (activeTrial) {
      case 'ai': return <AITrial isDark={isDark} onClose={onClose} />;
      case 'coding': return <CodingTrial isDark={isDark} onClose={onClose} />;
      case 'multiplayer': return <MultiplayerTrial isDark={isDark} onClose={onClose} />;
      case 'kids': return <KidsTrial isDark={isDark} onClose={onClose} />;
      default: return null;
    }
  };

  const getTrialTitle = () => {
    switch (activeTrial) {
      case 'ai': return 'AI Adaptive Difficulty';
      case 'coding': return 'Coding Speed Session';
      case 'multiplayer': return 'Live Multiplayer Arena';
      case 'kids': return 'Kids Learning World';
      default: return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 backdrop-blur-2xl transition-colors duration-500 ${isDark ? "bg-[#0A0C10]/95" : "bg-white/80"
          }`}
        onClick={onClose}
      />

      {/* Glow Effects */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none ${isDark ? "bg-blue-500/30" : "bg-blue-400/20"
        }`} />

      {/* Dashboard Window Container */}
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden ${isDark
          ? "bg-[#0A0C10]/80 border-white/10 shadow-blue-500/10"
          : "bg-white/90 border-blue-100 shadow-xl shadow-blue-500/5"
          }`}
      >
        {/* Window Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${isDark ? "border-white/5 bg-white/[0.02]" : "border-slate-100 bg-slate-50/50"
          }`}>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className={`text-xs font-mono font-bold flex items-center gap-2 uppercase tracking-widest ${isDark ? "text-gray-500" : "text-slate-400"
            }`}>
            <Terminal size={14} /> KeebLab Trial // {getTrialTitle()}
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors ${isDark ? "hover:bg-white/10 text-gray-400 hover:text-white" : "hover:bg-black/5 text-slate-400 hover:text-slate-900"
              }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-12">
          {getTrialComponent()}
        </div>

        {/* Footer Info */}
        <div className={`px-6 py-4 border-t flex items-center justify-center gap-2 text-[10px] font-mono font-medium uppercase tracking-[0.2em] ${isDark ? "border-white/5 text-gray-500" : "border-slate-100 text-slate-400"
          }`}>
          <Activity size={10} className="animate-pulse" /> Experimental Sandbox Mode
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function KeebLab() {

  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "const improve = (skill) => { return practice.daily(skill) + focus; };";
  const [activeTrial, setActiveTrial] = useState(null); // 'ai', 'coding', 'multiplayer', 'kids'
  const router = useRouter();
  const isDark = theme === "dark";

  useEffect(() => {
    let currentIndex = 0;
    let timeout;

    const typeChar = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(typeChar, Math.random() * 50 + 50); // Random typing speed
      } else {
        setTimeout(() => {
          currentIndex = 0;
          setDisplayedText("");
          typeChar();
        }, 3000); // Wait before restarting
      }
    };

    typeChar();
    return () => clearTimeout(timeout);
  }, []);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (activeTrial) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeTrial]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setActiveTrial(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [showLearnMore]);

  return (
    <>
      <style>{`
        body {
          overflow-x: hidden;
        }
        
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }
      `}</style>
      <div
        className={`min-h-screen w-full transition-colors duration-500 ${isDark
          ? "bg-[#0A0C10] text-white"
          : "bg-gradient-to-br from-[#F0F4F8] via-[#E8EEF5] to-[#D6E4F0] text-[#0F172A]"
          }`}
        style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      >
        <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .nav-link {
          position: relative;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #60a5fa, #22d3ee);
          transition: width 0.3s ease, left 0.3s ease;
          border-radius: 2px;
        }
        
        .nav-link:hover::after {
          width: 100%;
          left: 0;
        }
      `}</style>
        <a
          href="#main"
          className="sr-only focus:not-sr-only absolute left-4 top-20 bg-white/90 dark:bg-black/70 text-sm px-3 py-2 rounded-md"
        >
          Skip to main content
        </a>

        {/* Global Background Grid Pattern */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className={`absolute inset-0 bg-[radial-gradient(${isDark ? '#ffffff15' : '#00000010'}_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]`} />

          {/* Floating Keyboard Elements */}
          <div className="absolute top-20 left-10 opacity-20 hidden md:block animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: '0s' }}>
            <div className={`p-4 rounded-xl border-2 ${isDark ? "border-white/20 text-white" : "border-slate-300 text-slate-500"}`}>
              <Command size={32} />
            </div>
          </div>
          <div className="absolute top-40 right-20 opacity-20 hidden md:block animate-[float_9s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}>
            <div className={`px-4 py-2 rounded-lg border-2 font-mono font-bold ${isDark ? "border-white/20 text-white" : "border-slate-300 text-slate-500"}`}>
              SHIFT
            </div>
          </div>
          <div className="absolute bottom-40 left-20 opacity-20 hidden md:block animate-[float_10s_ease-in-out_infinite]" style={{ animationDelay: '4s' }}>
            <div className={`px-4 py-2 rounded-lg border-2 font-mono font-bold ${isDark ? "border-white/20 text-white" : "border-slate-300 text-slate-500"}`}>
              ESC
            </div>
          </div>
          <div className="absolute top-1/3 right-[15%] opacity-10 hidden lg:block animate-[float_11s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>
            <div className={`p-3 rounded-lg border-2 ${isDark ? "border-white/20 text-white" : "border-slate-300 text-slate-500"}`}>
              <CornerDownLeft size={24} />
            </div>
          </div>
          <div className="absolute bottom-1/4 left-[15%] opacity-10 hidden lg:block animate-[float_12s_ease-in-out_infinite]" style={{ animationDelay: '3s' }}>
            <div className={`px-3 py-1 rounded border-2 font-mono text-sm ${isDark ? "border-white/20 text-white" : "border-slate-300 text-slate-500"}`}>
              DEL
            </div>
          </div>
          <div className="absolute top-1/4 left-[25%] opacity-10 hidden lg:block animate-[float_13s_ease-in-out_infinite]" style={{ animationDelay: '5s' }}>
            <div className={`px-3 py-1 rounded border-2 font-mono text-sm ${isDark ? "border-white/20 text-white" : "border-slate-300 text-slate-500"}`}>
              ALT
            </div>
          </div>
        </div>

        <header
          className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl transition-all duration-500 border-b ${isDark
            ? scrollY > 50 ? "bg-[#0A0C10]/95 border-white/10 shadow-lg shadow-blue-500/5" : "bg-[#0A0C10]/70 border-white/5"
            : scrollY > 50 ? "bg-white/95 border-black/10 shadow-lg" : "bg-white/70 border-black/5"
            }`}
        >
          <div className="container mx-auto h-16 flex items-center justify-between relative px-6">
            {/* Logo */}
            <Link
              href="/"
              aria-label="KeebLab Home"
              className={`inline-flex items-center px-6 py-2 rounded-full font-extrabold text-lg md:text-xl tracking-tight focus:outline-none focus-visible:ring-2 transition-all duration-300 ${isDark
                ? "bg-white/10 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
                : "bg-black/5 text-slate-900 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
                }`}
            >
              KeebLab
            </Link>

            <nav className="flex items-center gap-4">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                <Link
                  href="/"
                  className={`nav-link px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                >
                  Home
                </Link>
                <a
                  href="#features"
                  className={`nav-link px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer ${isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                >
                  Features
                </a>
                <a
                  href="#about"
                  className={`nav-link px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer ${isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                >
                  About
                </a>
                <button
                  onClick={() => alert('Sign up functionality coming soon!')}
                  className={`hidden md:inline-flex items-center gap-2 rounded-full px-6 py-2 font-bold transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer ${isDark
                    ? "bg-white/10 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
                    : "bg-black/5 text-slate-900 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
                    }`}
                >
                  Sign up
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition"
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                <button
                  aria-label="Toggle theme"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className={`p-2 rounded-full bg-transparent transform transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isDark
                    ? "text-yellow-400 hover:bg-white/10"
                    : "text-slate-700 hover:bg-black/5"
                    }`}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </nav>
          </div>
        </header>

        {menuOpen && (
          <div
            id="mobile-menu"
            className={`md:hidden absolute top-16 left-0 right-0 z-40 ${isDark
              ? "bg-[#0A0C10]/95 border-b border-white/10"
              : "bg-white/95 border-b border-black/10"
              } backdrop-blur-xl shadow-2xl`}
            style={{
              animation: "slideInFromTop 0.3s ease-out"
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg hover:opacity-80 transition-all duration-300 ${isDark ? "text-gray-300 hover:bg-white/10" : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                Home
              </Link>
              <a
                href="#features"
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg hover:opacity-80 transition-all duration-300 ${isDark ? "text-gray-300 hover:bg-white/10" : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                Features
              </a>
              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg hover:opacity-80 transition-all duration-300 ${isDark ? "text-gray-300 hover:bg-white/10" : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                About
              </a>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  alert('Sign up functionality coming soon!');
                }}
                className={`w-full text-center rounded-full px-4 py-3 font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isDark
                  ? "bg-white/10 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
                  : "bg-black/5 text-slate-900 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
                  }`}
              >
                Sign up
              </button>
            </div>
          </div>
        )}

        <section
          id="main"
          className="relative min-h-screen flex items-center pt-20 md:pt-24 pb-16 md:pb-20 overflow-hidden"
        >
          <div className="absolute inset-0 -z-10">
            <div
              className={`absolute -top-32 md:-top-44 left-1/2 -translate-x-1/2 w-[700px] md:w-[1100px] h-[700px] md:h-[1100px] rounded-full blur-[220px] ${isDark
                ? "bg-gradient-to-tr from-blue-500/20 to-cyan-400/10"
                : "bg-gradient-to-tr from-blue-400/30 to-cyan-300/20"
                }`}
              style={{
                animation: "pulse 8s ease-in-out infinite, float 20s ease-in-out infinite"
              }}
            />
            <div
              className={`absolute -bottom-32 md:-bottom-44 right-6 md:right-1/4 w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full blur-[160px] rotate-12 ${isDark
                ? "bg-rose-500/8"
                : "bg-purple-400/15"
                }`}
              style={{
                animation: "float 15s ease-in-out infinite reverse"
              }}
            />
            <div
              className={`absolute top-1/4 -left-20 md:left-10 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[140px] ${isDark
                ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                : "bg-gradient-to-br from-purple-300/20 to-pink-300/20"
                }`}
              style={{
                animation: "float 18s ease-in-out infinite"
              }}
            />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <div
              className={`inline-block mb-6 px-4 py-2 rounded-full border ${isDark
                ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                : "bg-blue-100 border-blue-200 text-blue-700"
                } text-sm font-semibold`}
              style={{
                animation: "fadeInUp 0.8s ease-out"
              }}
            >
              🚀 AI-Powered Typing Practice
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              <span
                className={`block ${isDark ? "text-slate-100" : "text-[#0F172A]"
                  }`}
                style={{
                  animation: "fadeInUp 1s ease-out 0.2s both"
                }}
              >
                A better way to
              </span>

              <span
                className={`block mt-1 bg-clip-text text-transparent ${isDark
                  ? "bg-gradient-to-r from-blue-400 to-cyan-400"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500"
                  }`}
                style={{
                  animation: "fadeInUp 1s ease-out 0.4s both, gradient 3s ease infinite"
                }}
              >
                feel your typing
              </span>
            </h1>

            <p
              className={`mt-6 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-slate-600"
                }`}
              style={{
                animation: "fadeInUp 1s ease-out 0.6s both"
              }}
            >
              KeebLab is a focused typing practice platform designed to improve accuracy, speed, and consistency — through deliberate training, not distractions.
            </p>

            <div
              className="mt-10 sm:mt-12 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
              style={{
                animation: "fadeInUp 1s ease-out 0.8s both"
              }}
            >
              <button
                onClick={() => router.push('/type')}
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto rounded-xl px-8 sm:px-10 py-3.5 sm:py-4 font-semibold text-base sm:text-lg transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                aria-label="Start Typing"
              >
                Start Typing <ArrowRight size={20} />
              </button>
              <button
                onClick={() => {
                  setShowLearnMore(true);
                  setTimeout(() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl px-8 py-3.5 sm:py-4 font-semibold text-base sm:text-lg transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isDark
                  ? "border-2 border-white/20 hover:bg-white/10 hover:border-white/30"
                  : "border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400"
                  }`}
              >
                Learn More
              </button>
            </div>

            {/* Live Typing Dashboard Preview */}
            <div
              className="mt-16 md:mt-24 mx-auto max-w-4xl transform transition-transform hover:scale-[1.01] duration-500"
              style={{ animation: "fadeInUp 1s ease-out 1s both" }}
            >
              <div className={`rounded-2xl border backdrop-blur-xl shadow-2xl overflow-hidden ${isDark
                ? "bg-[#0A0C10]/80 border-white/10 shadow-blue-500/10"
                : "bg-white/80 border-blue-100 shadow-xl"
                }`}>
                {/* Window Header */}
                <div className={`px-6 py-4 border-b flex items-center justify-between ${isDark ? "border-white/5 bg-white/[0.02]" : "border-slate-100 bg-slate-50/50"}`}>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className={`text-xs font-mono font-medium flex items-center gap-2 ${isDark ? "text-gray-500" : "text-slate-400"}`}>
                    <Terminal size={12} /> keeblab-session-01
                  </div>
                  <div className="w-16" /> {/* Spacer for balance */}
                </div>

                {/* Dashboard Content */}
                <div className="p-8 md:p-12 text-left font-mono">
                  {/* Stats Bar */}
                  <div className="flex gap-8 mb-12 opacity-80">
                    <div className="flex flex-col">
                      <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? "text-gray-500" : "text-slate-500"}`}>WPM</span>
                      <span className={`text-2xl font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                        102 <Zap size={16} className="text-yellow-400 fill-yellow-400 animate-pulse" />
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? "text-gray-500" : "text-slate-500"}`}>ACC</span>
                      <span className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>100%</span>
                    </div>
                    <div className="flex flex-col hidden sm:flex">
                      <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? "text-gray-500" : "text-slate-500"}`}>TIME</span>
                      <span className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>00:42</span>
                    </div>
                  </div>

                  {/* Typing Line */}
                  <div className={`text-2xl md:text-3xl leading-relaxed font-medium ${isDark ? "text-gray-400" : "text-slate-400"}`}>
                    <span className={isDark ? "text-blue-400" : "text-blue-600"}>
                      {displayedText}
                    </span>
                    <span className={`inline-block w-0.5 h-8 ml-1 align-middle animate-pulse ${isDark ? "bg-blue-400" : "bg-blue-600"}`} />
                  </div>

                  {/* Subtle Footer */}
                  <div className={`mt-12 flex items-center gap-2 text-sm ${isDark ? "text-gray-600" : "text-slate-400"}`}>
                    <Activity size={14} className="animate-pulse" /> Live Analysis Active
                  </div>
                </div>
              </div>
            </div>

          </div>


        </section>

        {/* How It Works Section */}
        {showLearnMore && (
          <section
            id="how-it-works"
            className="py-20 md:py-28 lg:py-32 relative overflow-hidden"
            style={{
              animation: visibleSections.has('how-it-works') ? 'fadeInUp 0.8s ease-out' : 'none',
              opacity: visibleSections.has('how-it-works') ? 1 : 0
            }}
          >
            <div className="max-w-7xl mx-auto px-6">
              {/* Project Summary */}
              <div className={`max-w-4xl mx-auto mb-16 md:mb-20 rounded-3xl p-8 md:p-12 lg:p-14 border ${isDark
                ? "bg-gradient-to-br from-white/5 to-white/[0.02] border-blue-500/20"
                : "bg-white border-blue-200 shadow-2xl shadow-blue-500/10"
                }`}>
                <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 ${isDark ? "text-white" : "text-slate-900"
                  }`}>
                  What is{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                    KeebLab?
                  </span>
                </h2>
                <div className="space-y-4">
                  <p className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-slate-700"
                    }`}>
                    KeebLab is a modern typing practice platform built for everyone — from beginners learning their first letters to professionals mastering code syntax. Our mission is simple: help you type better through focused practice and intelligent feedback.
                  </p>
                  <p className={`text-base leading-relaxed ${isDark ? "text-gray-400" : "text-slate-600"
                    }`}>
                    Unlike traditional typing tutors, KeebLab uses <strong className={isDark ? "text-white" : "text-slate-900"}>AI-powered adaptive difficulty</strong> that grows with you. Whether you're a child learning the alphabet, a student improving accuracy, a developer practicing code snippets, or a competitive typist chasing speed records — KeebLab adapts to your level and keeps you challenged without frustration.
                  </p>
                  <div className={`mt-6 grid md:grid-cols-3 gap-4 pt-6 border-t ${isDark ? "border-white/10" : "border-slate-200"}`}>
                    <div>
                      <div className={`text-2xl font-black mb-1 bg-clip-text text-transparent bg-gradient-to-r ${isDark
                        ? "from-blue-400 to-cyan-400"
                        : "from-blue-600 to-cyan-600"
                        }`}>
                        For Everyone
                      </div>
                      <p className={`text-sm ${isDark ? "text-gray-500" : "text-slate-600"}`}>
                        Kids, students, developers, and enthusiasts
                      </p>
                    </div>
                    <div>
                      <div className={`text-2xl font-black mb-1 bg-clip-text text-transparent bg-gradient-to-r ${isDark
                        ? "from-purple-400 to-pink-400"
                        : "from-purple-600 to-pink-600"
                        }`}>
                        AI-Powered
                      </div>
                      <p className={`text-sm ${isDark ? "text-gray-500" : "text-slate-600"}`}>
                        Intelligent difficulty adaptation
                      </p>
                    </div>
                    <div>
                      <div className={`text-2xl font-black mb-1 bg-clip-text text-transparent bg-gradient-to-r ${isDark
                        ? "from-cyan-400 to-teal-400"
                        : "from-cyan-600 to-teal-600"
                        }`}>
                        Distraction-Free
                      </div>
                      <p className={`text-sm ${isDark ? "text-gray-500" : "text-slate-600"}`}>
                        Clean interface, pure focus
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Title */}
              <div className="text-center mb-12 md:mb-16">
                <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"
                  }`}>
                  How It{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                    Works
                  </span>
                </h2>
                <p className={`mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-slate-600"
                  }`}>
                  Master your typing in four simple steps
                </p>
              </div>

              {/* Steps Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Step 1 */}
                <div className={`group relative rounded-[2.5rem] p-8 border transition-all duration-700 hover:-translate-y-2 ${isDark
                  ? "bg-white/[0.03] border-white/10 hover:border-blue-500/50 hover:shadow-[0_20px_50px_-20px_rgba(59,130,246,0.3)] shadow-2xl"
                  : "bg-white/80 border-blue-100 shadow-xl shadow-blue-500/5 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20"
                  } backdrop-blur-[20px]`}>
                  <div className={`absolute -top-6 left-8 w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${isDark
                    ? "bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]"
                    : "bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_10px_20px_-5px_rgba(59,130,246,0.3)]"
                    }`}>
                    <Terminal size={28} className="text-white" />
                  </div>
                  <div className="pt-8">
                    <h3 className={`text-2xl font-black mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
                      Start Typing
                    </h3>
                    <p className={`text-base leading-relaxed ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                      Begin with a paragraph that matches your skill level. No pressure, just find your flow and let the practice begin.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className={`group relative rounded-[2.5rem] p-8 border transition-all duration-700 hover:-translate-y-2 animate-delay-100 ${isDark
                  ? "bg-white/[0.03] border-white/10 hover:border-purple-500/50 hover:shadow-[0_20px_50px_-20px_rgba(168,85,247,0.3)] shadow-2xl"
                  : "bg-white/80 border-purple-100 shadow-xl shadow-purple-500/5 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20"
                  } backdrop-blur-[20px]`}>
                  <div className={`absolute -top-6 left-8 w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 ${isDark
                    ? "bg-gradient-to-br from-purple-600 to-pink-500 shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)]"
                    : "bg-gradient-to-br from-purple-500 to-pink-400 shadow-[0_10px_20px_-5px_rgba(168,85,247,0.3)]"
                    }`}>
                    <Activity size={28} className="text-white" />
                  </div>
                  <div className="pt-8">
                    <h3 className={`text-2xl font-black mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
                      Get Feedback
                    </h3>
                    <p className={`text-base leading-relaxed ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                      Receive instant, high-fidelity metrics on your speed, accuracy, and rhythmic consistency after every session.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className={`group relative rounded-[2.5rem] p-8 border transition-all duration-700 hover:-translate-y-2 animate-delay-200 ${isDark
                  ? "bg-white/[0.03] border-white/10 hover:border-blue-500/50 hover:shadow-[0_20px_50px_-20px_rgba(59,130,246,0.3)] shadow-2xl"
                  : "bg-white/80 border-blue-100 shadow-xl shadow-blue-500/5 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20"
                  } backdrop-blur-[20px]`}>
                  <div className={`absolute -top-6 left-8 w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${isDark
                    ? "bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]"
                    : "bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_10px_20px_-5px_rgba(59,130,246,0.3)]"
                    }`}>
                    <Brain size={28} className="text-white" />
                  </div>
                  <div className="pt-8">
                    <h3 className={`text-2xl font-black mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
                      AI Adapts
                    </h3>
                    <p className={`text-base leading-relaxed ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                      Our neural engine analyzes your performance in real-time and adjusts difficulty to keep you perfectly challenged.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className={`group relative rounded-[2.5rem] p-8 border transition-all duration-700 hover:-translate-y-2 animate-delay-300 ${isDark
                  ? "bg-white/[0.03] border-white/10 hover:border-purple-500/50 hover:shadow-[0_20px_50px_-20px_rgba(168,85,247,0.3)] shadow-2xl"
                  : "bg-white/80 border-purple-100 shadow-xl shadow-purple-500/5 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20"
                  } backdrop-blur-[20px]`}>
                  <div className={`absolute -top-6 left-8 w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 ${isDark
                    ? "bg-gradient-to-br from-purple-600 to-pink-500 shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)]"
                    : "bg-gradient-to-br from-purple-500 to-pink-400 shadow-[0_10px_20px_-5px_rgba(168,85,247,0.3)]"
                    }`}>
                    <TrendingUp size={28} className="text-white" />
                  </div>
                  <div className="pt-8">
                    <h3 className={`text-2xl font-black mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
                      Track Progress
                    </h3>
                    <p className={`text-base leading-relaxed ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                      Visualize your journey through beautiful charts and detailed history. Watch your WPM soar to new heights.
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className={`mt-12 rounded-3xl p-10 border ${isDark
                ? "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20"
                : "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200"
                }`}>
                <div className="max-w-4xl mx-auto">
                  <h3 className={`text-2xl md:text-3xl font-bold mb-4 text-center ${isDark ? "text-white" : "text-slate-900"
                    }`}>
                    Why KeebLab is Different
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center">
                      <div className={`text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r ${isDark
                        ? "from-blue-400 to-cyan-400"
                        : "from-blue-600 to-cyan-600"
                        }`}>
                        Zero
                      </div>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                        Ads or distractions
                      </p>
                    </div>
                    <div className="text-center">
                      <div className={`text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r ${isDark
                        ? "from-purple-400 to-pink-400"
                        : "from-purple-600 to-pink-600"
                        }`}>
                        100%
                      </div>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                        Focus on improvement
                      </p>
                    </div>
                    <div className="text-center">
                      <div className={`text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r ${isDark
                        ? "from-cyan-400 to-teal-400"
                        : "from-cyan-600 to-teal-600"
                        }`}>
                        AI
                      </div>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                        Powered personalization
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section >
        )
        }

        {/* Features Section */}
        <section
          id="features"
          className="py-20 md:py-28 lg:py-32 relative overflow-hidden"
          style={{
            animation: visibleSections.has('features') ? 'fadeInUp 0.8s ease-out' : 'none',
            opacity: visibleSections.has('features') ? 1 : 0
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Title */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"
                }`}>
                Powerful{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  Typing Features
                </span>
              </h2>
              <p className={`mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-slate-600"
                }`}>
                Experience the next generation of typing practice with AI-powered tools and competitive features
              </p>
            </div>

            {/* Main Features Grid */}
            <div className="grid lg:grid-cols-5 gap-6 md:gap-8 mb-8">
              {/* AI-Powered Difficulty - Large Card */}
              <div className={`lg:col-span-3 rounded-3xl p-8 md:p-10 lg:p-12 border-2 transition-all hover:scale-[1.02] ${isDark
                ? "bg-gradient-to-br from-white/5 to-white/[0.02] border-blue-500/30"
                : "bg-white border-blue-200 shadow-xl shadow-blue-500/10"
                }`}>
                <motion.div
                  key="static-ai"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`p-3 rounded-xl ${isDark
                      ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
                      : "bg-gradient-to-br from-blue-100 to-cyan-100"
                      }`}>
                      <Brain size={32} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"
                        }`}>
                        AI-Powered Difficulty
                      </h3>
                      <p className={`text-base leading-relaxed ${isDark ? "text-gray-300" : "text-slate-600"
                        }`}>
                        Our advanced AI system adapts to your skill level, providing increasingly challenging paragraphs as you progress
                      </p>
                    </div>
                  </div>

                  {/* Sub-features */}
                  <div className="space-y-4 mt-8">
                    <div className="flex items-start gap-3">
                      <Zap size={20} className={isDark ? "text-cyan-400 mt-1" : "text-blue-500 mt-1"} />
                      <div>
                        <h4 className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                          Adaptive Learning
                        </h4>
                        <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                          Progressive difficulty adjustment based on your accuracy and speed metrics
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp size={20} className={isDark ? "text-cyan-400 mt-1" : "text-blue-500 mt-1"} />
                      <div>
                        <h4 className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                          Progressive Challenges
                        </h4>
                        <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                          Each paragraph gets incrementally harder, pushing your limits while maintaining motivation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award size={20} className={isDark ? "text-cyan-400 mt-1" : "text-blue-500 mt-1"} />
                      <div>
                        <h4 className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                          Smart Recommendations
                        </h4>
                        <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                          Personalized practice suggestions to target your weak areas and maximize improvement
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTrial('ai')}
                    className={`mt-8 w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isDark
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40"
                      }`}
                  >
                    Try AI Trial <Zap size={20} />
                  </button>
                </motion.div>
              </div>

              {/* Stats Panel */}
              <div className={`lg:col-span-2 rounded-3xl p-8 border ${isDark
                ? "bg-gradient-to-br from-black/40 to-black/20 border-white/10"
                : "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200"
                }`}>
                <h3 className={`text-lg font-bold uppercase tracking-wider mb-6 ${isDark ? "text-slate-400" : "text-slate-600"
                  }`}>
                  Performance Metrics
                </h3>

                <div className="space-y-6">
                  {/* Accuracy Target */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className={`text-xs uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-600"
                        }`}>
                        Accuracy Target
                      </span>
                      <span className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-900"
                        }`}>
                        98.7%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-slate-200"
                      }`}>
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: '98.7%' }} />
                    </div>
                  </div>

                  {/* Response Time */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className={`text-xs uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-600"
                        }`}>
                        Response Time
                      </span>
                      <span className={`text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600`}>
                        &lt; 150ms
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-slate-200"
                      }`}>
                      <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500" style={{ width: '75%' }} />
                    </div>
                  </div>

                  {/* Users Improving */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className={`text-xs uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-600"
                        }`}>
                        Users Improving Daily
                      </span>
                    </div>
                    <div className={`text-5xl font-black mt-4 bg-clip-text text-transparent bg-gradient-to-r ${isDark
                      ? "from-cyan-400 to-blue-400"
                      : "from-blue-600 to-cyan-600"
                      }`}>
                      10,000+
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Coding Excellence */}
              <div className={`group relative rounded-[2.5rem] p-8 md:p-10 lg:p-12 border transition-all duration-700 hover:-translate-y-2 flex flex-col h-full overflow-hidden ${isDark
                ? "bg-white/[0.03] border-white/10 hover:border-blue-500/50 shadow-2xl"
                : "bg-white/80 border-blue-100 shadow-xl shadow-blue-500/5 hover:border-blue-400 hover:shadow-2xl"
                } backdrop-blur-[20px]`}>
                {/* Accent Glow */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none transition-all duration-700 group-hover:opacity-40 group-hover:scale-150 ${isDark ? "bg-blue-500" : "bg-blue-400"}`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className={`inline-flex w-20 h-20 rounded-3xl mb-8 items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${isDark
                    ? "bg-gradient-to-br from-blue-600 to-purple-600 shadow-[0_15px_30px_-10px_rgba(59,130,246,0.5)]"
                    : "bg-gradient-to-br from-blue-500 to-purple-500 shadow-[0_10px_20px_-5px_rgba(59,130,246,0.3)]"
                    }`}>
                    <Code size={36} className="text-white" />
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-bold mb-4 tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                    Coding Excellence
                  </h3>
                  <p className={`text-base md:text-lg leading-relaxed mb-8 ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                    Master the syntax. Practice with real-world snippets from JavaScript to Python, designed for engineering peak performance.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      { icon: <Zap size={16} />, text: 'Multi-language syntax support', color: 'text-blue-400' },
                      { icon: <Activity size={16} />, text: 'Production-ready code snippets', color: 'text-purple-400' }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 group/item">
                        <div className={`p-2 rounded-lg transition-colors ${isDark ? "bg-white/5 " + item.color : "bg-blue-50 " + item.color}`}>
                          {item.icon}
                        </div>
                        <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-slate-600"}`}>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => router.push('/coding')}
                    className={`mt-auto w-full py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isDark
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_10px_20px_-5px_rgba(59,130,246,0.4)] hover:shadow-[0_15px_30px_-10px_rgba(59,130,246,0.6)]"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_10px_20px_-5px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_30px_-10px_rgba(59,130,246,0.4)]"
                      }`}
                  >
                    Launch Training <ArrowRight size={20} />
                  </button>
                </div>
              </div>

              {/* Global Arena */}
              <div className={`group relative rounded-[2.5rem] p-8 md:p-10 lg:p-12 border transition-all duration-700 hover:-translate-y-2 flex flex-col h-full overflow-hidden ${isDark
                ? "bg-white/[0.03] border-white/10 hover:border-cyan-500/50 shadow-2xl"
                : "bg-white/80 border-cyan-100 shadow-xl shadow-cyan-500/5 hover:border-cyan-400 hover:shadow-2xl"
                } backdrop-blur-[20px]`}>
                {/* Accent Glow */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none transition-all duration-700 group-hover:opacity-40 group-hover:scale-150 ${isDark ? "bg-cyan-500" : "bg-cyan-400"}`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className={`inline-flex w-20 h-20 rounded-3xl mb-8 items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 ${isDark
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_15px_30px_-10px_rgba(6,182,212,0.5)]"
                    : "bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_10px_20px_-5px_rgba(6,182,212,0.3)]"
                    }`}>
                    <Users size={36} className="text-white" />
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-bold mb-4 tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                    Global Arena
                  </h3>
                  <p className={`text-base md:text-lg leading-relaxed mb-8 ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                    Battle typists worldwide in pulse-pounding races. Speed is your power; rhythmic precision is your greatest shield.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      { icon: <Activity size={16} />, text: 'Real-time competitive races', color: 'text-cyan-400' },
                      { icon: <Award size={16} />, text: 'Global ranking & leaderboard', color: 'text-blue-400' }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 group/item">
                        <div className={`p-2 rounded-lg transition-colors ${isDark ? "bg-white/5 " + item.color : "bg-cyan-50 " + item.color}`}>
                          {item.icon}
                        </div>
                        <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-slate-600"}`}>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => router.push('/multiplayer')}
                    className={`mt-auto w-full py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 ${isDark
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_10px_20px_-5px_rgba(6,182,212,0.4)] hover:shadow-[0_15px_30px_-10px_rgba(6,182,212,0.6)]"
                      : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_10px_20px_-5px_rgba(6,182,212,0.3)] hover:shadow-[0_15px_30px_-10px_rgba(6,182,212,0.4)]"
                      }`}
                  >
                    Enter Arena <ArrowRight size={20} />
                  </button>
                </div>
              </div>

              {/* Learning World */}
              <div className={`group relative rounded-[2.5rem] p-8 md:p-10 lg:p-12 border transition-all duration-700 hover:-translate-y-2 flex flex-col h-full overflow-hidden ${isDark
                ? "bg-white/[0.03] border-white/10 hover:border-blue-500/50 shadow-2xl"
                : "bg-white/80 border-blue-100 shadow-xl shadow-blue-500/5 hover:border-blue-400 hover:shadow-2xl"
                } backdrop-blur-[20px]`}>
                {/* Accent Glow */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none transition-all duration-700 group-hover:opacity-40 group-hover:scale-150 ${isDark ? "bg-blue-500" : "bg-blue-400"}`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className={`inline-flex w-20 h-20 rounded-3xl mb-8 items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${isDark
                    ? "bg-gradient-to-br from-blue-600 to-cyan-600 shadow-[0_15px_30px_-10px_rgba(59,130,246,0.5)]"
                    : "bg-gradient-to-br from-blue-500 to-cyan-500 shadow-[0_10px_20px_-5px_rgba(59,130,246,0.3)]"
                    }`}>
                    <GraduationCap size={36} className="text-white" />
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-bold mb-4 tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                    Learning World
                  </h3>
                  <p className={`text-base md:text-lg leading-relaxed mb-8 ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                    A safe, playful sandbox for explorers. Mastering alphabets, spelling, and keyboards has never felt this magical.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      { icon: <Brain size={16} />, text: 'Kid-friendly adaptive UI', color: 'text-blue-400' },
                      { icon: <Zap size={16} />, text: 'Sparkling achievement system', color: 'text-cyan-400' }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 group/item">
                        <div className={`p-2 rounded-lg transition-colors ${isDark ? "bg-white/5 " + item.color : "bg-blue-50 " + item.color}`}>
                          {item.icon}
                        </div>
                        <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-slate-600"}`}>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => router.push('/kids')}
                    className={`mt-auto w-full py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isDark
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_10px_20px_-5px_rgba(59,130,246,0.4)] hover:shadow-[0_15px_30px_-10px_rgba(59,130,246,0.6)]"
                      : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_10px_20px_-5px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_30px_-10px_rgba(59,130,246,0.4)]"
                      }`}
                  >
                    Start Adventure <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="pb-20 md:pb-28 lg:pb-32"
          style={{
            animation: visibleSections.has('about') ? 'fadeInUp 0.8s ease-out' : 'none',
            opacity: visibleSections.has('about') ? 1 : 0
          }}
        >
          <div
            className="max-w-6xl mx-auto px-6"
            style={{
              opacity: scrollY > 200 ? 1 : 0,
              transform: scrollY > 200 ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out"
            }}
          >
            <div
              className={`rounded-3xl p-8 md:p-12 lg:p-16 border backdrop-blur-xl shadow-2xl relative overflow-hidden ${isDark
                ? "bg-white/5 border-white/10"
                : "bg-white/80 border-blue-100 shadow-blue-500/10"
                }`}
            >
              {/* Decorative Background Blob */}
              <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 pointer-events-none ${isDark ? "bg-blue-500" : "bg-cyan-400"}`} />

              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2
                    className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight ${isDark ? "text-white" : "text-slate-900"
                      }`}
                  >
                    Master the art of <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                      Typing
                    </span>
                  </h2>
                  <p
                    className={`text-base md:text-lg leading-relaxed mb-6 ${isDark ? "text-gray-300" : "text-slate-700"
                      }`}
                  >
                    KeebLab is the ultimate typing practice platform designed to help you type faster and more accurately. Powered by advanced AI, our content adapts to your skill level, pushing you to improve with every keystroke.
                  </p>
                  <p
                    className={`text-base leading-relaxed ${isDark ? "text-gray-400" : "text-slate-600"
                      }`}
                  >
                    Whether you're a student learning to touch type, a developer looking to speed up your coding, or a competitive typist aiming for the leaderboards, KeebLab provides the tools you need to succeed.
                  </p>
                </div>

                <div className="grid gap-6">
                  {[
                    {
                      id: 'ai',
                      icon: <Brain size={20} />,
                      title: 'AI-Powered Growth',
                      desc: 'Intelligent algorithms that customize content to your neural patterns.',
                      color: 'blue',
                      borderColor: 'hover:border-blue-500/50',
                      iconColor: 'text-blue-400'
                    },
                    {
                      id: 'coding',
                      icon: <Code size={20} />,
                      title: 'Developer Centric',
                      desc: 'Practice with real code syntax for maximum engineering efficiency.',
                      color: 'purple',
                      borderColor: 'hover:border-purple-500/50',
                      iconColor: 'text-purple-400'
                    },
                    {
                      id: 'multiplayer',
                      icon: <TrendingUp size={20} />,
                      title: 'Global Rankings',
                      desc: 'Challenge friends and climb the competitive global leaderboards.',
                      color: 'cyan',
                      borderColor: 'hover:border-cyan-500/50',
                      iconColor: 'text-cyan-400'
                    }
                  ].map((feature, idx) => (
                    <div
                      key={idx}
                      className={`group p-6 rounded-[2rem] border transition-all duration-500 hover:-translate-y-1 ${isDark
                        ? "bg-white/[0.03] border-white/10 " + feature.borderColor
                        : "bg-white border-blue-100 shadow-sm hover:border-blue-300"
                        } backdrop-blur-[10px]`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${isDark
                          ? "bg-white/5 " + feature.iconColor
                          : "bg-blue-50 " + feature.iconColor
                          }`}>
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className={`font-black text-xl mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                            {feature.title}
                          </h3>
                          <p className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                            {feature.desc}
                          </p>
                          <button
                            onClick={() => {
                              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                              setActiveTrial(feature.id);
                            }}
                            className={`mt-4 text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all group/btn ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
                              }`}
                          >
                            Launch Trial <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer
          className={`transition-all duration-700 border-t relative overflow-hidden backdrop-blur-2xl ${isDark
            ? "bg-[#0A0C10]/95 border-white/10"
            : "bg-white/90 border-blue-100 shadow-[0_-20px_50px_-20px_rgba(59,130,246,0.1)]"
            }`}
        >
          {/* Dynamic Background Glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className={`absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-[100px] opacity-10 ${isDark ? "bg-blue-600" : "bg-blue-400"}`} />
            <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[100px] opacity-10 ${isDark ? "bg-purple-600" : "bg-purple-400"}`} />
          </div>

          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 lg:py-24 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 items-start">
              {/* Brand Column */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <Link href="/" className={`text-4xl font-black inline-block transition-all duration-500 hover:scale-105 group ${isDark ? "text-white" : "text-slate-900"}`}>
                    KeebLab<span className="text-blue-500 transition-all duration-500 group-hover:pl-1">.</span>
                  </Link>
                  <p className={`mt-6 text-lg md:text-xl leading-relaxed max-w-md font-medium ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                    Elevating your typing experience through high-fidelity practice and AI-powered adaptation.
                  </p>
                </div>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/abdullah-parvez-565693246/" target="_blank" rel="noopener noreferrer" className={`group p-4 rounded-[1.5rem] border transition-all duration-500 hover:-translate-y-1 ${isDark ? "bg-white/[0.03] border-white/10 hover:border-blue-500/50 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.5)] text-gray-400 hover:text-blue-400" : "bg-white border-blue-100 shadow-sm hover:border-blue-300 text-slate-600 hover:text-blue-600"}`}>
                    <Linkedin size={24} className="transition-transform duration-500 group-hover:scale-110" />
                  </a>
                </div>
              </div>

              {/* Navigation */}
              <div className="grid grid-cols-2 gap-12 lg:col-span-2">
                <div>
                  <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-10 ${isDark ? "text-slate-500" : "text-slate-400"}`}>Navigation</h4>
                  <ul className="space-y-5">
                    {[
                      { name: 'Typing Test', href: '/type' },
                      { name: 'How It Works', href: '#how-it-works' },
                      { name: 'Features', href: '#features' },
                      { name: 'About', href: '#about' }
                    ].map((link) => (
                      <li key={link.name}>
                        <a href={link.href} className={`text-lg font-bold transition-all duration-300 border-b-2 border-transparent hover:border-blue-500/50 pb-1 ${isDark ? "text-gray-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-10 ${isDark ? "text-slate-500" : "text-slate-400"}`}>Support</h4>
                  <ul className="space-y-5">
                    {[
                      { name: 'Privacy Policy', href: '#' },
                      { name: 'Terms of Service', href: '#' }
                    ].map((link) => (
                      <li key={link.name}>
                        <a href={link.href} className={`text-lg font-bold transition-all duration-300 border-b-2 border-transparent hover:border-slate-500/50 pb-1 ${isDark ? "text-gray-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className={`mt-24 pt-12 border-t flex flex-col lg:flex-row justify-between items-center gap-10 ${isDark ? "border-white/10" : "border-slate-200"}`}>
              <div className="flex flex-col gap-2 items-center lg:items-start text-center lg:text-left">
                <p className={`text-sm font-medium tracking-tight ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  © {new Date().getFullYear()} KeebLab. Precision practice for the modern enthusiast.
                </p>
                <div className={`flex items-center gap-3 p-1 pl-4 pr-1 rounded-full border transition-all duration-500 hover:scale-105 ${isDark
                  ? "bg-white/[0.03] border-white/5 hover:border-blue-500/30"
                  : "bg-slate-50 border-slate-200 hover:border-blue-300 shadow-sm"}`}>
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? "text-slate-600" : "text-slate-400"}`}>Creator</span>
                  <a
                    href="https://www.linkedin.com/in/abdullah-parvez-565693246/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-1.5 rounded-full text-sm font-black transition-all duration-300 ${isDark
                      ? "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_5px_15px_-5px_rgba(37,99,235,0.4)]"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"}`}
                  >
                    Abdullah Parvez
                  </a>
                </div>
              </div>

              <div className={`group flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all duration-500 ${isDark
                ? "bg-green-500/5 border-green-500/20 hover:border-green-500/40"
                : "bg-green-50 border-green-100 hover:bg-green-100 shadow-sm"}`}>
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-75" />
                </div>
                <span className={`text-[11px] font-black uppercase tracking-[0.15em] ${isDark ? "text-green-500/90" : "text-green-600"}`}>
                  System Live
                </span>
                <div className={`w-px h-3 mx-1 ${isDark ? "bg-green-500/20" : "bg-green-500/20"}`} />
                <ChevronRight size={14} className={`transition-transform duration-500 group-hover:translate-x-1 ${isDark ? "text-green-500/50" : "text-green-500/50"}`} />
              </div>
            </div>
          </div>
        </footer>
      </div>
      <AnimatePresence>
        {activeTrial && (
          <TrialOverlay
            activeTrial={activeTrial}
            isDark={isDark}
            onClose={() => setActiveTrial(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
