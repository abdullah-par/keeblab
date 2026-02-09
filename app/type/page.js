"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, Moon, Sun, Command, CornerDownLeft } from 'lucide-react';

const paragraphLevels = {
  easy: [
    "The sun rises in the east and sets in the west, casting long shadows across the valley. It is a daily cycle that has continued for billions of years, providing energy to all life on our planet. Many people find the early morning hours to be the most peaceful time of day, perfect for reflection or planning the hours ahead. As the light touches the horizon, the world begins to wake up in a symphony of sounds.",
    "Cats are fascinating creatures that have lived alongside humans for thousands of years. They are known for their independence, but they also form strong bonds with their caretakers through subtle gestures of affection. Watching a cat stalk a laser pointer across the living room floor is a reminder of their predatory instincts, even if their current prey is just a harmless beam of light. They bring joy to millions of households.",
    "A perfect cup of coffee is often considered an essential part of a productive morning routine. The aroma of freshly ground beans can wake up the senses even before the first sip is taken. Whether you prefer it black, with cream, or sweetened with sugar, coffee provides a comforting warmth that helps many people transition into their daily tasks. It is a simple pleasure that connects people in kitchens and cafes around the globe.",
    "Blue skies and white, fluffy clouds create a picturesque backdrop for a perfect afternoon in the park. The gentle breeze rustles the leaves of the trees, providing a soft background noise that complements the distant laughter of children playing. It is a moment where time seems to slow down, allowing one to appreciate the simple beauty of nature. Many people find that spending time outdoors is the best way to recharge their mental energy.",
    "Reading books is a form of magic that allows us to travel through time and space without ever leaving our seats. Every page turned is a step deeper into a new world, filled with characters and ideas that can change our perspective on reality. It has been humanity's way of preserving knowledge and stories for centuries, ensuring that the wisdom of the past is never lost to the future. A good book is a lifelong companion."
  ],
  medium: [
    "The quick brown fox jumps over the lazy dog near the riverbank, a classic sentence used for typing practice because it contains every letter of the alphabet. Technology continues to evolve at an unprecedented pace, transforming how we live and work in ways we could only imagine a decade ago. From the smartphones in our pockets to the advanced systems that manage our global infrastructure, digital innovation is the core driver of modern society's growth and development.",
    "Programming is both an art and a science that requires a unique blend of creativity and logical thinking to solve complex problems. Modern developers use a wide variety of tools and frameworks to build amazing applications that serve millions of users every day. Understanding the underlying principles of computer science is just as important as mastering the syntax of a specific language, as it allows for the creation of robust and efficient software solutions.",
    "Nature provides us with countless wonders, from the mysterious depths of the ocean to the majestic peaks of the highest mountains. Every ecosystem, no matter how small or seemingly insignificant, plays a vital role in maintaining the delicate balance of life on Earth. Protecting these natural habitats is not just an environmental concern, but a necessity for the survival of future generations who will inherit the planet and its diverse biological riches.",
    "Music has the remarkable power to evoke deep emotions and bring people together across different cultures and languages. Different genres reflect the vast diversity of human expression, telling stories of love, loss, triumph, and struggle through melody and rhythm. Whether it is a grand orchestral symphony or a simple acoustic melody, the universal language of music resonates with the human spirit, providing comfort and inspiration throughout our lives.",
    "Consistency is the fundamental key to mastering any new skill, whether it is learning a musical instrument, a foreign language, or a complex programming concept. Small, daily efforts accumulate over time, leading to significant improvements that might seem impossible at the beginning of the journey. Staying focused on long-term goals and maintaining a positive mindset through challenges is what separates those who succeed from those who simply try."
  ],
  hard: [
    "The concept of artificial intelligence has transitioned from the realm of science fiction to a pervasive reality in the twenty-first century, influencing distinct sectors such as healthcare, finance, and autonomous transportation. Modern algorithms can now analyze vast datasets significantly faster and more accurately than any human, leading to breakthroughs in medical diagnosis and financial modeling. However, the rise of AI also brings ethical challenges and questions about the future of work that society must address.",
    "Quantum computing promises to solve computational problems that are currently intractable for even the most powerful classical supercomputers, potentially revolutionizing fields such as cryptography, drug discovery, and materials science. By leveraging the principles of superposition and entanglement, quantum bits can represent and process information in ways that traditional bits cannot. While still in its early stages of development, the progress in quantum hardware and software is accelerating rapidly toward practical applications.",
    "In the complex realm of software engineering, understanding and applying design patterns is crucial for writing maintainable, reusable, and scalable code. Patterns like Singleton, Factory, and Observer provide proven architectural solutions to common problems that developers face during the software lifecycle. By following these established best practices, engineering teams can reduce technical debt and ensure that their systems can evolve to meet new requirements without requiring complete and costly rewrites.",
    "The history of the internet is a fascinating and complex tale of innovation, competition, and global collaboration, starting from the early days of ARPANET and evolving into the massive network that connects billions of people today. It has fundamentally changed how we access and share information, participate in the economy, and communicate with one another across geographical boundaries. The ongoing evolution of the web continues to shape our culture, politics, and daily interactions in profound ways.",
    "Biodiversity is essential for the natural processes that support all life on Earth, including our own human civilization. Without a wide range of animals, plants, and microorganisms, we cannot have the healthy ecosystems that we rely on to provide the air we breathe and the food we eat. The loss of species due to habitat destruction and climate change poses a significant threat to global stability, making conservation efforts more critical now than ever before in human history."
  ],
  expert: [
    "function debounce(func, wait) { let timeout; return function executedFunction(...args) { const later = () => { clearTimeout(timeout); func(...this, args); }; clearTimeout(timeout); timeout = setTimeout(later, wait); }; } // This utility function is commonly used in web development to ensure that a function is not called too frequently, which is particularly useful for optimizing performance during window resizing or scroll events by limiting the rate at which expensive operations are executed.",
    "The thermodynamic quantity known as entropy is a measure of the amount of energy in a physical system that is not available to do useful work. It is also a fundamental measure of the disorder or randomness within a system. The second law of thermodynamics state that the total entropy of an isolated system can never decrease over time; it can only remain constant or increase, which explains the arrow of time and the inevitable progression toward equilibrium in the universe.",
    "Epistemology is the branch of philosophy concerned with the nature and scope of knowledge and is often referred to as the theory of knowledge. It questions what knowledge specifically is, how it can be reliably acquired, and the extent to which knowledge pertinent to any given subject or entity can actually be achieved. Philosophers in this field examine the relationships between truth, belief, and justification, exploring the foundations upon which our understanding of the world is built.",
    "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take arms against a sea of troubles And by opposing end them. To die—to sleep, No more; and by a sleep to say we end The heart-ache and the thousand natural shocks That flesh is heir to. 'Tis a consummation Devoutly to be wish'd. To die, to sleep; To sleep, perchance to dream—ay, there's the rub: For in that sleep of death what dreams may come.",
    "Neuroplasticity, also known as brain plasticity or neural plasticity, is the extraordinary ability of neural networks in the human brain to change through growth and reorganization. This happens when the brain is rewired to function in some way that differs from how it previously functioned, allowing for recovery from injuries and adaptation to new environments. It is a fundamental property of the nervous system that enables learning and memory throughout a person's entire lifetime, regardless of their age."
  ]
};

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
  const scrollContainerRef = useRef(null);
  const activeCharRef = useRef(null);

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

  useEffect(() => {
    if (activeCharRef.current && scrollContainerRef.current) {
      activeCharRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [userInput.length]);

  const getDifficultyLevel = (count) => {
    if (count < 3) return 'easy';
    if (count < 6) return 'medium';
    if (count < 10) return 'hard';
    return 'expert';
  };

  const loadNewParagraph = (forcedCount) => {
    // forcedCount is used when resetting to ensure we start at easy (0)
    const count = typeof forcedCount === 'number' ? forcedCount : completedCount;
    const level = getDifficultyLevel(count);
    const pool = paragraphLevels[level];
    const newParagraph = pool[Math.floor(Math.random() * pool.length)];

    // Avoid repeating the exact same paragraph if possible
    if (newParagraph === currentParagraph && pool.length > 1) {
      loadNewParagraph(count);
      return;
    }

    setCurrentParagraph(newParagraph);
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
      ? "bg-[#0A0C10] text-white"
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Dynamic Island Navbar */}
      <motion.div
        initial={{ y: -100, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-6 left-1/2 z-50 w-full max-w-xs sm:max-w-sm"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`flex items-center justify-between px-6 py-3 rounded-full border shadow-2xl backdrop-blur-2xl transition-all duration-300 ${isDark
            ? "bg-[#0A0C10]/60 border-white/10 shadow-blue-500/10"
            : "bg-white/60 border-white/40 shadow-xl shadow-blue-500/5"
            }`}
        >
          <a href="/" className={`font-bold text-lg tracking-tight flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            KeebLab
          </a>

          <div className="flex items-center gap-3">
            <a href="/" className={`text-xs font-semibold uppercase tracking-wider transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-slate-500 hover:text-blue-600"}`}>
              Home
            </a>
            <div className={`w-px h-3 ${isDark ? "bg-white/10" : "bg-slate-300"}`} />
            <a href="#" className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25">
              Sign up
            </a>
            <div className={`hidden sm:block w-px h-3 ${isDark ? "bg-white/10" : "bg-slate-300"}`} />
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-2 rounded-full transition-colors ${isDark
                ? "bg-white/5 text-yellow-400 hover:bg-white/10"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </motion.div>
      </motion.div>

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
        <div className="flex items-end justify-between mb-16 px-4">
          <div className="flex gap-4 sm:gap-8 md:gap-12">
            <div className="flex flex-col">
              <span className={`text-sm font-bold uppercase tracking-widest mb-1 ${isDark ? "text-slate-500" : "text-slate-600"}`}>Level</span>
              <span className={`text-xl sm:text-2xl font-black uppercase ${getDifficultyLevel(completedCount) === 'easy' ? (isDark ? 'text-green-400' : 'text-green-600') :
                getDifficultyLevel(completedCount) === 'medium' ? (isDark ? 'text-yellow-400' : 'text-yellow-600') :
                  (isDark ? 'text-rose-500' : 'text-rose-600')
                }`}>
                {getDifficultyLevel(completedCount)}
              </span>
            </div>
            {[
              { label: 'wpm', value: wpm },
              { label: 'accuracy', value: `${accuracy}%` },
              { label: 'completed', value: completedCount },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className={`text-sm font-bold uppercase tracking-widest mb-1 ${isDark ? "text-slate-500" : "text-slate-600"
                  }`}>{item.label}</span>
                <span className={`text-4xl sm:text-5xl md:text-6xl font-black ${isDark ? "text-white" : "text-slate-900"
                  }`}>{item.value}</span>
              </div>
            ))}
          </div>
          <div className={`font-mono text-lg md:text-xl ${isDark ? "text-slate-500" : "text-slate-600"
            }`}>{timeElapsed}s</div>
        </div>

        {/* Typing Area with the "Advanced" feel */}
        <div
          ref={scrollContainerRef}
          className={`text-3xl font-mono leading-relaxed mb-12 p-10 rounded-[2.5rem] border backdrop-blur-sm cursor-text transition-all duration-300 max-h-[350px] overflow-y-auto scroll-smooth scrollbar-hide ${isDark
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
              ref={index === userInput.length ? activeCharRef : null}
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
            onClick={() => {
              setUserInput('');
              setStartTime(null);
              setIsActive(false);
              setStreak(0);
              setWpm(0);
              setAccuracy(100);
              setTimeElapsed(0);
              setCompletedCount(0);
              setTimeout(() => loadNewParagraph(0), 0); // Reload easy paragraph
              inputRef.current?.focus();
            }}
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
