"use client"

import React, { useEffect, useState } from "react";
import { Github, Linkedin, Moon, Sun, ArrowRight, Menu, X, Brain, Code, Users, Zap, Award, TrendingUp, GraduationCap, Command, CornerDownLeft, Terminal, Activity } from "lucide-react";

export default function KeebLab() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "const improve = (skill) => { return practice.daily(skill) + focus; };";

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
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
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

  const isDark = theme === "dark";

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
            <a
              href="/"
              aria-label="KeebLab Home"
              className={`inline-flex items-center px-6 py-2 rounded-full font-extrabold text-lg md:text-xl tracking-tight focus:outline-none focus-visible:ring-2 transition-all duration-300 ${isDark
                ? "bg-white/10 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
                : "bg-black/5 text-slate-900 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
                }`}
            >
              KeebLab
            </a>

            <nav className="flex items-center gap-4">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                <a
                  href="/"
                  className={`nav-link px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                >
                  Home
                </a>
                <a
                  href="#features"
                  className={`nav-link px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                >
                  Features
                </a>
                <a
                  href="#about"
                  className={`nav-link px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                >
                  About
                </a>
                <a
                  href="#"
                  className={`hidden md:inline-flex items-center gap-2 rounded-full px-6 py-2 font-bold transition-all duration-300 hover:scale-105 ${isDark
                    ? "bg-white/10 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
                    : "bg-black/5 text-slate-900 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
                    }`}
                >
                  Sign up
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden p-2 rounded-md focus:outline-none focus-visible:ring-2 transition"
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                <button
                  aria-label="Toggle theme"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className={`p-2 rounded-full bg-transparent transform transition-all duration-300 hover:scale-105 ${isDark
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
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg hover:opacity-80 transition-all duration-300 ${isDark ? "text-gray-300 hover:bg-white/10" : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                Home
              </a>
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
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className={`w-full text-center rounded-full px-4 py-3 font-bold transition-all duration-300 ${isDark
                  ? "bg-white/10 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
                  : "bg-black/5 text-slate-900 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20"
                  }`}
              >
                Sign up
              </a>
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.1] mb-6">
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
                onClick={() => window.location.href = '/type'}
                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto rounded-xl px-8 sm:px-10 py-3.5 sm:py-4 font-semibold text-base sm:text-lg transition-all hover:scale-105 active:scale-95 bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
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
                className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl px-8 py-3.5 sm:py-4 font-semibold text-base sm:text-lg transition-all hover:scale-105 active:scale-95 ${isDark
                  ? "border border-white/20 hover:bg-white/10 hover:border-white/30"
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
            className="py-24 md:py-32 relative overflow-hidden"
            style={{
              animation: visibleSections.has('how-it-works') ? 'fadeInUp 0.8s ease-out' : 'none',
              opacity: visibleSections.has('how-it-works') ? 1 : 0
            }}
          >
            <div className="max-w-7xl mx-auto px-6">
              {/* Project Summary */}
              <div className={`max-w-4xl mx-auto mb-20 rounded-3xl p-10 md:p-14 border ${isDark
                ? "bg-gradient-to-br from-white/5 to-white/[0.02] border-blue-500/20"
                : "bg-white border-blue-200 shadow-2xl shadow-blue-500/10"
                }`}>
                <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 ${isDark ? "text-white" : "text-slate-900"
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
              <div className="text-center mb-16">
                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"
                  }`}>
                  How It{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                    Works
                  </span>
                </h2>
                <p className={`mt-4 text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-slate-600"
                  }`}>
                  Master your typing in four simple steps
                </p>
              </div>

              {/* Steps Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Step 1 */}
                <div className={`rounded-3xl p-8 border transition-all hover:scale-[1.02] ${isDark
                  ? "bg-gradient-to-br from-white/5 to-white/[0.02] border-blue-500/30"
                  : "bg-white border-blue-200 shadow-xl shadow-blue-500/10"
                  }`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${isDark
                    ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
                    : "bg-gradient-to-br from-blue-100 to-cyan-100"
                    }`}>
                    <span className={`text-2xl font-black ${isDark ? "text-blue-400" : "text-blue-600"}`}>1</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"
                    }`}>
                    Start Typing
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                    Begin with a paragraph that matches your current skill level. No pressure, just type naturally.
                  </p>
                </div>

                {/* Step 2 */}
                <div className={`rounded-3xl p-8 border transition-all hover:scale-[1.02] ${isDark
                  ? "bg-gradient-to-br from-white/5 to-white/[0.02] border-purple-500/30"
                  : "bg-white border-purple-200 shadow-xl shadow-purple-500/10"
                  }`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${isDark
                    ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                    : "bg-gradient-to-br from-purple-100 to-pink-100"
                    }`}>
                    <span className={`text-2xl font-black ${isDark ? "text-purple-400" : "text-purple-600"}`}>2</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"
                    }`}>
                    Get Feedback
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                    Receive instant, detailed metrics on speed, accuracy, and consistency after each session.
                  </p>
                </div>

                {/* Step 3 */}
                <div className={`rounded-3xl p-8 border transition-all hover:scale-[1.02] ${isDark
                  ? "bg-gradient-to-br from-white/5 to-white/[0.02] border-cyan-500/30"
                  : "bg-white border-cyan-200 shadow-xl shadow-cyan-500/10"
                  }`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${isDark
                    ? "bg-gradient-to-br from-cyan-500/20 to-teal-500/20"
                    : "bg-gradient-to-br from-cyan-100 to-teal-100"
                    }`}>
                    <span className={`text-2xl font-black ${isDark ? "text-cyan-400" : "text-cyan-600"}`}>3</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"
                    }`}>
                    AI Adapts
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                    Our AI analyzes your performance and adjusts difficulty to keep you challenged but not frustrated.
                  </p>
                </div>

                {/* Step 4 */}
                <div className={`rounded-3xl p-8 border transition-all hover:scale-[1.02] ${isDark
                  ? "bg-gradient-to-br from-white/5 to-white/[0.02] border-green-500/30"
                  : "bg-white border-green-200 shadow-xl shadow-green-500/10"
                  }`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${isDark
                    ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20"
                    : "bg-gradient-to-br from-green-100 to-emerald-100"
                    }`}>
                    <span className={`text-2xl font-black ${isDark ? "text-green-400" : "text-green-600"}`}>4</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"
                    }`}>
                    Track Progress
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                    Watch your skills improve over time with detailed analytics and progress visualization.
                  </p>
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
          className="py-24 md:py-32 relative overflow-hidden"
          style={{
            animation: visibleSections.has('features') ? 'fadeInUp 0.8s ease-out' : 'none',
            opacity: visibleSections.has('features') ? 1 : 0
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Title */}
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"
                }`}>
                Powerful{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  Typing Features
                </span>
              </h2>
              <p className={`mt-4 text-lg max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-slate-600"
                }`}>
                Experience the next generation of typing practice with AI-powered tools and competitive features
              </p>
            </div>

            {/* Main Features Grid */}
            <div className="grid lg:grid-cols-5 gap-6 mb-8">
              {/* AI-Powered Difficulty - Large Card */}
              <div className={`lg:col-span-3 rounded-3xl p-8 md:p-10 border-2 transition-all hover:scale-[1.02] ${isDark
                ? "bg-gradient-to-br from-white/5 to-white/[0.02] border-blue-500/30"
                : "bg-white border-blue-200 shadow-xl shadow-blue-500/10"
                }`}>
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
                    <p className={`text-base ${isDark ? "text-gray-400" : "text-slate-600"
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
                      <p className={`text-sm ${isDark ? "text-gray-500" : "text-slate-600"}`}>
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
                      <p className={`text-sm ${isDark ? "text-gray-500" : "text-slate-600"}`}>
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
                      <p className={`text-sm ${isDark ? "text-gray-500" : "text-slate-600"}`}>
                        Personalized practice suggestions to target your weak areas and maximize improvement
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  className={`mt-8 w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${isDark
                    ? "bg-white/10 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/10"
                    : "bg-black/5 text-slate-900 hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-500/10"
                    }`}
                >
                  Try Now <ArrowRight size={20} />
                </button>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Coding Speed */}
              <div className={`rounded-3xl p-8 border transition-all hover:scale-[1.02] ${isDark
                ? "bg-white/5 border-white/10 hover:border-blue-500/30"
                : "bg-white border-blue-100 shadow-lg hover:shadow-xl hover:border-blue-300"
                }`}>
                <div className={`inline-flex p-3 rounded-xl mb-4 ${isDark
                  ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                  : "bg-gradient-to-br from-blue-100 to-purple-100"
                  }`}>
                  <Code size={28} className="text-blue-400" />
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"
                  }`}>
                  Coding Speed Improvement
                </h3>
                <p className={`${isDark ? "text-gray-400" : "text-slate-600"}`}>
                  Practice with real code fragments and programming syntax. Master typing efficiency for any programming language, from JavaScript to Python.
                </p>
                <ul className={`mt-4 space-y-2 text-sm ${isDark ? "text-gray-500" : "text-slate-600"}`}>
                  <li className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-cyan-400" : "bg-blue-500"
                      }`} />
                    Multi-language syntax highlighting
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-cyan-400" : "bg-blue-500"
                      }`} />
                    Real-world code snippets
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-cyan-400" : "bg-blue-500"
                      }`} />
                    Symbol and bracket practice
                  </li>
                </ul>
                <button
                  className={`mt-6 w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${isDark
                    ? "bg-white/10 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/10"
                    : "bg-black/5 text-slate-900 hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-500/10"
                    }`}
                >
                  Try Now <ArrowRight size={18} />
                </button>
              </div>

              {/* Multiplayer */}
              <div className={`rounded-3xl p-8 border transition-all hover:scale-[1.02] ${isDark
                ? "bg-white/5 border-white/10 hover:border-blue-500/30"
                : "bg-white border-blue-100 shadow-lg hover:shadow-xl hover:border-blue-300"
                }`}>
                <div className={`inline-flex p-3 rounded-xl mb-4 ${isDark
                  ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20"
                  : "bg-gradient-to-br from-cyan-100 to-blue-100"
                  }`}>
                  <Users size={28} className="text-cyan-400" />
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"
                  }`}>
                  Multiplayer Competition
                </h3>
                <p className={`${isDark ? "text-gray-400" : "text-slate-600"}`}>
                  Challenge friends or compete with typists worldwide in real-time typing races. Climb the leaderboards and prove your skills.
                </p>
                <ul className={`mt-4 space-y-2 text-sm ${isDark ? "text-gray-500" : "text-slate-600"}`}>
                  <li className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-cyan-400" : "bg-blue-500"
                      }`} />
                    Real-time multiplayer races
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-cyan-400" : "bg-blue-500"
                      }`} />
                    Global leaderboards
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-cyan-400" : "bg-blue-500"
                      }`} />
                    Private rooms for friends
                  </li>
                </ul>
                <button
                  className={`mt-6 w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${isDark
                    ? "bg-white/10 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/10"
                    : "bg-black/5 text-slate-900 hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-500/10"
                    }`}
                >
                  Try Now <ArrowRight size={18} />
                </button>
              </div>

              {/* Kids Learning */}
              <div className={`rounded-3xl p-8 border transition-all hover:scale-[1.02] ${isDark
                ? "bg-white/5 border-white/10 hover:border-blue-500/30"
                : "bg-white border-blue-100 shadow-lg hover:shadow-xl hover:border-blue-300"
                }`}>
                <div className={`inline-flex p-3 rounded-xl mb-4 ${isDark
                  ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20"
                  : "bg-gradient-to-br from-green-100 to-emerald-100"
                  }`}>
                  <GraduationCap size={28} className="text-green-400" />
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"
                  }`}>
                  Kids Learning Mode
                </h3>
                <p className={`${isDark ? "text-gray-400" : "text-slate-600"}`}>
                  A fun and engaging environment designed for children to learn alphabets, practice spelling, and build foundational typing skills.
                </p>
                <ul className={`mt-4 space-y-2 text-sm ${isDark ? "text-gray-500" : "text-slate-600"}`}>
                  <li className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-cyan-400" : "bg-blue-500"
                      }`} />
                    Alphabet recognition practice
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-cyan-400" : "bg-blue-500"
                      }`} />
                    Interactive spelling exercises
                  </li>
                  <li className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-cyan-400" : "bg-blue-500"
                      }`} />
                    Age-appropriate content
                  </li>
                </ul>
                <button
                  className={`mt-6 w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${isDark
                    ? "bg-white/10 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/10"
                    : "bg-black/5 text-slate-900 hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-500/10"
                    }`}
                >
                  Try Now <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="pb-24 md:pb-32"
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
              className={`rounded-3xl p-10 md:p-16 border backdrop-blur-xl shadow-2xl relative overflow-hidden ${isDark
                ? "bg-white/5 border-white/10"
                : "bg-white/80 border-blue-100 shadow-blue-500/10"
                }`}
            >
              {/* Decorative Background Blob */}
              <div className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 pointer-events-none ${isDark ? "bg-blue-500" : "bg-cyan-400"}`} />

              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2
                    className={`text-3xl md:text-5xl font-extrabold mb-6 tracking-tight ${isDark ? "text-white" : "text-slate-900"
                      }`}
                  >
                    Master the art of <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                      Typing
                    </span>
                  </h2>
                  <p
                    className={`text-lg leading-relaxed mb-6 ${isDark ? "text-gray-300" : "text-slate-700"
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

                <div className="grid gap-4">
                  <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${isDark ? "bg-black/20 border-white/10" : "bg-white border-blue-50 shadow-sm"}`}>
                    <h3 className={`font-bold text-lg mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>🚀 AI-Powered Growth</h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-600"}`}>Intelligent algorithms that customize practice content.</p>
                  </div>
                  <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${isDark ? "bg-black/20 border-white/10" : "bg-white border-blue-50 shadow-sm"}`}>
                    <h3 className={`font-bold text-lg mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>💻 Developer Friendly</h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-600"}`}>Practice with real code syntax for multiple languages.</p>
                  </div>
                  <div className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${isDark ? "bg-black/20 border-white/10" : "bg-white border-blue-50 shadow-sm"}`}>
                    <h3 className={`font-bold text-lg mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>🏆 Competitive Edge</h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-600"}`}>Challenge friends and track your global ranking.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer
          className={`transition-colors duration-500 border-t ${isDark
            ? "bg-gradient-to-r from-black/80 via-white/2 to-black/70 text-white border-white/10"
            : "bg-gradient-to-r from-blue-50 via-white to-cyan-50 text-[#0F172A] border-blue-100"
            }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              {/* Brand Column */}
              <div className="lg:col-span-1">
                <a href="/" className={`text-2xl font-black mb-6 inline-block ${isDark ? "text-white" : "text-slate-900"}`}>
                  KeebLab
                </a>
                <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                  High-fidelity typing practice for enthusiasts who demand precision and aesthetics.
                </p>
                <div className="flex gap-4">
                  <a href="#" className={`p-2 rounded-full transition-colors ${isDark ? "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900"}`}>
                    <Github size={18} />
                  </a>
                  <a href="#" className={`p-2 rounded-full transition-colors ${isDark ? "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900"}`}>
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>

              {/* Product Links */}
              <div>
                <h4 className={`font-bold mb-6 ${isDark ? "text-white" : "text-slate-900"}`}>Product</h4>
                <ul className="space-y-4 text-sm">
                  <li><a href="#" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-blue-600"}`}>Typing Test</a></li>
                  <li><a href="#features" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-blue-600"}`}>Features</a></li>
                  <li><a href="#" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-blue-600"}`}>Multiplayer</a></li>
                  <li><a href="#" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-blue-600"}`}>For Schools</a></li>
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h4 className={`font-bold mb-6 ${isDark ? "text-white" : "text-slate-900"}`}>Resources</h4>
                <ul className="space-y-4 text-sm">
                  <li><a href="#" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-blue-600"}`}>Blog</a></li>
                  <li><a href="#" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-blue-600"}`}>Help Center</a></li>
                  <li><a href="#" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-blue-600"}`}>Terms of Service</a></li>
                  <li><a href="#" className={`transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-blue-600"}`}>Privacy Policy</a></li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className={`font-bold mb-6 ${isDark ? "text-white" : "text-slate-900"}`}>Stay Updated</h4>
                <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                  Get the latest typing tips and feature updates directly to your inbox.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`flex-1 px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-gray-500"
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"}`}
                  />
                  <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${isDark ? "border-white/10" : "border-slate-200"}`}>
              <p className={`text-sm ${isDark ? "text-gray-500" : "text-slate-500"}`}>
                © {new Date().getFullYear()} KeebLab. All rights reserved.
              </p>
              <p className={`text-sm flex items-center gap-1 ${isDark ? "text-gray-500" : "text-slate-500"}`}>
                Built by <a href="https://www.linkedin.com/in/abdullah-parvez-565693246/" className={`hover:underline ${isDark ? "text-gray-400" : "text-slate-700"}`}>Abdullah Parvez</a>
              </p>
            </div>
          </div>
        </footer>
      </div >
    </>
  );
}
