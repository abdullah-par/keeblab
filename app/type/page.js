"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, Moon, Sun, Command, CornerDownLeft } from 'lucide-react';

const paragraphs = [
  "The quick brown fox jumps over the lazy dog near the riverbank. Technology continues to evolve at an unprecedented pace, transforming how we live and work.",
  "Programming is both an art and a science that requires creativity and logical thinking. Modern developers use various tools and frameworks to build amazing applications.",
  "Nature provides us with countless wonders, from the depths of the ocean to the peaks of mountains. Every ecosystem plays a vital role in maintaining balance.",
  "Music has the power to evoke emotions and bring people together across cultures. Different genres reflect the diversity of human expression and creativity.",
  "Reading opens doors to new worlds and perspectives we might never otherwise encounter. Books have been humanity's way of preserving knowledge for centuries."
];

export default function TypingTest() {
  const [theme, setTheme] = useState("dark");
  const [currentParagraph, setCurrentParagraph] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isActive, setIsActive] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [streak, setStreak] = useState(0);
  const [particles, setParticles] = useState([]);
  const inputRef = useRef(null);

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
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => { loadNewParagraph(); }, []);

  useEffect(() => {
    if (isActive && startTime) {
      const interval = setInterval(() => {
        const timeInMinutes = (Date.now() - startTime) / 1000 / 60;
        const wordsTyped = userInput.length / 5;
        setWpm(Math.round(wordsTyped / timeInMinutes) || 0);
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isActive, startTime, userInput]);

  const loadNewParagraph = () => {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    setCurrentParagraph(paragraphs[randomIndex]);
    setUserInput('');
    setIsActive(false);
    setStartTime(null);
  };

  const createParticle = () => {
    const particle = { id: Date.now() + Math.random(), x: Math.random() * 100, y: Math.random() * 100 };
    setParticles(prev => [...prev, particle]);
    setTimeout(() => { setParticles(prev => prev.filter(p => p.id !== particle.id)); }, 1000);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length > currentParagraph.length) return;

    if (!isActive && value.length > 0) {
      setIsActive(true);
      setStartTime(Date.now());
    }

    const lastChar = value[value.length - 1];
    const expectedChar = currentParagraph[value.length - 1];

    if (value.length > userInput.length) {
      if (lastChar === expectedChar) {
        setStreak(prev => prev + 1);
        if (streak > 0 && streak % 10 === 0) createParticle();
      } else {
        setStreak(0);
      }
    }

    setUserInput(value);

    // Accuracy Logic
    let correct = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === currentParagraph[i]) correct++;
    }
    setAccuracy(value.length === 0 ? 100 : Math.round((correct / value.length) * 100));

    if (value === currentParagraph) {
      setCompletedCount(prev => prev + 1);
      createParticle();
      setTimeout(loadNewParagraph, 500);
    }
  };

  const getCharClass = (index) => {
    const isDark = theme === "dark";
    if (index >= userInput.length) return isDark ? 'text-slate-500' : 'text-slate-400';
    return userInput[index] === currentParagraph[index]
      ? (isDark ? 'text-white' : 'text-slate-900')
      : 'text-rose-500 bg-rose-500/10 rounded-sm';
  };

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden font-sans transition-colors duration-500 ${isDark
      ? "bg-[#071023] text-[#F8FAFF]"
      : "bg-gradient-to-br from-[#F0F4F8] via-[#E8EEF5] to-[#D6E4F0] text-[#0F172A]"
      }`}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(80px, -60px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>

      {/* Dynamic Island Navbar */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className={`flex items-center gap-4 px-6 py-2.5 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-300 ${isDark
          ? "bg-[#0A0C10]/80 border-white/10 shadow-blue-500/10"
          : "bg-white/80 border-slate-200 shadow-xl"
          }`}>
          <a href="/" className={`font-bold text-lg tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            KeebLab
          </a>
          <div className={`w-px h-4 ${isDark ? "bg-white/10" : "bg-slate-200"}`} />
          <a href="#" className={`text-sm font-semibold transition-colors ${isDark ? "text-gray-300 hover:text-white" : "text-slate-600 hover:text-blue-600"}`}>
            Sign up
          </a>
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`p-1.5 rounded-full transition-colors ml-2 ${isDark
              ? "bg-white/10 text-yellow-400 hover:bg-white/20"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </div>

      {/* Background Grid Pattern & Floating Keys */}
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

      {/* Background Glows matching KeebLab Hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-1000 ${isDark ? "bg-blue-500/10" : "bg-blue-400/20"}`}
          style={{
            animation: `float ${Math.max(4, 10 - wpm / 15)}s infinite ease-in-out`
          }}
        />
        <div
          className={`absolute bottom-[10%] right-[20%] w-[400px] h-[400px] rounded-full blur-[100px] transition-all duration-1000 ${isDark ? "bg-cyan-500/10" : "bg-purple-400/15"}`}
          style={{
            animation: `float ${Math.max(3, 12 - wpm / 12)}s infinite ease-in-out reverse` // Reverse for variation
          }}
        />
        {/* Extra dynamic blob that appears when typing starts */}
        <div
          className={`absolute top-[40%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[100px] transition-all duration-1000 opacity-0 ${isActive ? "opacity-30" : "opacity-0"} ${isDark ? "bg-purple-500/10" : "bg-cyan-400/15"}`}
          style={{
            animation: `pulse-glow ${Math.max(2, 5 - wpm / 30)}s infinite ease-in-out`
          }}
        />
      </div>

      <div className="w-full max-w-5xl relative z-10">
        {/* Stats Section with High-End Typography */}
        <div className="flex items-end justify-between mb-16 px-4">
          <div className="flex gap-12">
            {[
              { label: 'wpm', value: wpm },
              { label: 'accuracy', value: `${accuracy}%` },
              { label: 'completed', value: completedCount },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className={`text-sm font-bold uppercase tracking-widest mb-1 ${isDark ? "text-slate-500" : "text-slate-600"
                  }`}>{item.label}</span>
                <span className={`text-6xl font-black ${isDark ? "text-white" : "text-slate-900"
                  }`}>{item.value}</span>
              </div>
            ))}
          </div>
          <div className={`font-mono text-xl ${isDark ? "text-slate-500" : "text-slate-600"
            }`}>{timeElapsed}s</div>
        </div>

        {/* Typing Area with the "Advanced" feel */}
        <div
          className={`text-3xl font-mono leading-relaxed mb-12 p-10 rounded-[2.5rem] border backdrop-blur-sm cursor-text transition-all duration-300 ${isDark
            ? "border-white/5 bg-white/[0.02]"
            : "border-blue-200/50 bg-white/60 shadow-xl shadow-blue-500/5"
            }`}
          style={{
            boxShadow: isActive ? (isDark ? `0 0 ${Math.min(50, wpm / 2)}px rgba(59, 130, 246, 0.15)` : `0 0 ${Math.min(50, wpm / 2)}px rgba(59, 130, 246, 0.2)`) : 'none',
            borderColor: isActive ? (isDark ? `rgba(255, 255, 255, ${Math.min(0.3, 0.1 + wpm / 500)})` : `rgba(59, 130, 246, ${Math.min(0.5, 0.3 + wpm / 500)})`) : undefined
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {currentParagraph.split('').map((char, index) => (
            <span
              key={index}
              className={`transition-all duration-75 ${getCharClass(index)} ${index === userInput.length ? `border-l-2 pl-0.5 animate-pulse ${isDark ? 'border-[#5b8cff]' : 'border-blue-500'
                }` : ''
                }`}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Progress Bar */}
        <div className={`h-1.5 rounded-full overflow-hidden mb-12 ${isDark ? "bg-white/5" : "bg-slate-200"
          }`}>
          <motion.div
            className="h-full bg-gradient-to-r from-[#5b8cff] to-[#06b6d4]"
            initial={{ width: 0 }}
            animate={{ width: `${(userInput.length / currentParagraph.length) * 100}%` }}
          />
        </div>

        <input
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          className="absolute opacity-0 pointer-events-none"
          autoFocus
        />

        {/* Action Buttons matching the Hero Style */}
        <div className="flex gap-6">
          <button
            onClick={() => { setUserInput(''); setStartTime(null); setIsActive(false); setStreak(0); }}
            className={`flex-1 font-bold py-5 rounded-2xl border transition-all flex items-center justify-center gap-2 ${isDark
              ? "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
              : "bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-md"
              }`}
          >
            <RotateCcw size={20} /> Reset Session
          </button>
          <button
            onClick={loadNewParagraph}
            className={`flex-1 text-white font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 ${isDark
              ? "bg-[#3b6ef6] hover:bg-[#5b8cff] shadow-blue-500/20"
              : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-blue-500/30"
              }`}
          >
            Next Paragraph <ArrowRight size={20} />
          </button>
        </div>

        {/* Streak Toast */}
        <AnimatePresence>
          {streak > 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`text-center mt-10 font-black tracking-widest text-2xl uppercase ${isDark ? "text-[#06b6d4]" : "text-blue-600"
                }`}
            >
              🔥 {streak} streak
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
