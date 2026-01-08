"use client"

import React, { useEffect, useState } from "react";
import { Github, Linkedin, Moon, Sun, ArrowRight, Menu, X } from "lucide-react";

export default function KeebLab() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
        className={`min-h-screen w-full transition-colors duration-500 ${
          isDark
            ? "bg-[#0A0C10] text-white"
            : "bg-gradient-to-br from-[#F8FAFC] to-[#EEF2F7] text-[#0F172A]"
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
      `}</style>
      <a
        href="#main"
        className="sr-only focus:not-sr-only absolute left-4 top-20 bg-white/90 dark:bg-black/70 text-sm px-3 py-2 rounded-md"
      >
        Skip to main content
      </a>
      
      <header
        className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl transition-colors duration-500 border-b ${
          isDark
            ? "bg-[#0A0C10]/70 border-white/10"
            : "bg-white/70 border-black/10"
        }`}
      >
        <div className="container mx-auto h-16 flex items-center justify-between relative px-6">
          <a
            href="/"
            aria-label="KeebLab Home"
            className={`inline-flex items-center px-4 py-2 rounded-full font-extrabold text-lg md:text-xl tracking-tight focus:outline-none focus-visible:ring-2 transition shadow-sm hover:shadow-md ${
              isDark
                ? "bg-white/10 text-white hover:bg-white/16"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }`}
          >
            KeebLab
          </a>

          <nav className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              <a 
                href="/" 
                className={`px-3 py-2 rounded-lg transition-all hover:scale-105 ${
                  isDark 
                    ? "text-gray-400 hover:text-white hover:bg-white/10" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Home
              </a>
              <a 
                href="#about" 
                className={`px-3 py-2 rounded-lg transition-all hover:scale-105 ${
                  isDark 
                    ? "text-gray-400 hover:text-white hover:bg-white/10" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                About
              </a>
              <a 
                href="#" 
                className="hidden md:inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all hover:scale-105 bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50"
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
                className={`p-2 rounded-full bg-transparent transform transition-all duration-300 hover:scale-105 ${
                  isDark
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
          className={`md:hidden absolute top-16 left-0 right-0 z-40 ${
            isDark
              ? "bg-black/70 border-b border-white/5"
              : "bg-white/90 border-b border-black/5"
          } backdrop-blur-lg shadow-lg`}
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            <a 
              href="#" 
              onClick={() => setMenuOpen(false)} 
              className={`hover:opacity-80 transition ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className={`hover:opacity-80 transition ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              About
            </a>
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center rounded-xl px-4 py-2 font-semibold bg-blue-600 text-white hover:bg-blue-700"
            >
              Sign up
            </a>
          </div>
        </div>
      )}

      <section 
        id="main"
        className="relative pt-28 md:pt-40 pb-20 md:pb-36 overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute -top-32 md:-top-44 left-1/2 -translate-x-1/2 w-[700px] md:w-[1100px] h-[700px] md:h-[1100px] rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-400/10 blur-[220px] animate-pulse"
            style={{
              animation: "pulse 8s ease-in-out infinite, float 20s ease-in-out infinite"
            }}
          />
          <div 
            className="absolute -bottom-32 md:-bottom-44 right-6 md:right-1/4 w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full bg-rose-500/8 blur-[160px] rotate-12"
            style={{
              animation: "float 15s ease-in-out infinite reverse"
            }}
          />
        </div>

        <div 
          className="max-w-5xl mx-auto px-6 text-center"
          style={{
            animation: "fadeInUp 1s ease-out"
          }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight">
            <span
              className={`block ${
                isDark ? "text-slate-100" : "text-[#0F172A]"
              }`}
              style={{
                animation: "fadeInUp 1s ease-out 0.2s both"
              }}
            >
              A better way to
            </span>

            <span
              className={`block mt-1 bg-clip-text text-transparent ${
                isDark
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
            className={`mt-6 text-base md:text-lg max-w-3xl mx-auto leading-relaxed ${
              isDark ? "text-gray-400" : "text-slate-600"
            }`}
            style={{
              animation: "fadeInUp 1s ease-out 0.6s both"
            }}
          >
            KeebLab blends mechanical keyboard obsession with precision typing
            practice — built for speed, accuracy, and pure satisfaction.
          </p>
          
          <div 
            className="mt-12 flex flex-col sm:flex-row justify-center gap-4 flex-wrap"
            style={{
              animation: "fadeInUp 1s ease-out 0.8s both"
            }}
          >
            <button  
              onClick={() => window.location.href = '/type'}
              className="inline-flex items-center gap-3 w-full sm:w-auto justify-center rounded-xl px-10 py-4 font-semibold transition-all hover:scale-105 bg-blue-600 text-white shadow-lg shadow-blue-500/20"
              aria-label="Start Typing"
            >
              Start Typing <ArrowRight size={18} />
            </button>
            <button
              className={`inline-flex items-center gap-2 w-full sm:w-auto justify-center rounded-xl px-8 py-4 font-semibold transition-all hover:scale-105 ${
                isDark
                  ? "border border-white/20 hover:bg-white/10"
                  : "border border-black/20 hover:bg-black/5"
              }`}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="pb-32">
        <div 
          className="max-w-6xl mx-auto px-6"
          style={{
            opacity: scrollY > 200 ? 1 : 0,
            transform: scrollY > 200 ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out"
          }}
        >
          <div
            className={`rounded-3xl p-14 md:p-20 border backdrop-blur-xl ${
              isDark ? "bg-white/5 border-white/10" : "bg-white border-black/10"
            }`}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              About
            </h2>
            <p
              className={`max-w-3xl text-lg leading-relaxed ${
                isDark ? "text-gray-300" : "text-slate-700"
              }`}
            >
              KeebLab is our tribute to the mechanical keyboard community. We
              know what it's like to chase the perfect sound profile, to
              hand-lube a hundred switches, and to seek out that one elusive
              keycap set.
            </p>
            <p
              className={`mt-6 max-w-3xl leading-relaxed ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              We felt the existing tools didn't respect the hardware we love.
              So, we engineered KeebLab to be the ultimate companion to your
              analog passion. It is a high-fidelity environment where precision
              meets poetry—a place where your typing isn't just measured, it's
              celebrated.
            </p>
          </div>
        </div>
      </section>

      <footer
        className={`transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-r from-black/80 via-white/2 to-black/70 text-white"
            : "bg-gradient-to-r from-blue-50 to-cyan-50 text-[#0F172A]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4">
                <h3
                  className={`text-2xl md:text-3xl font-bold ${
                    isDark ? "text-white drop-shadow-sm" : "text-[#0F172A]"
                  }`}
                >
                  KeebLab
                </h3>

                <span
                  className={`hidden sm:inline text-sm ${
                    isDark ? "text-gray-300" : "text-slate-600"
                  }`}
                >
                  High-fidelity typing practice for analog enthusiasts.
                </span>
              </div>

              <p
                className={`mt-4 text-sm ${
                  isDark ? "text-gray-300" : "text-slate-700"
                }`}
              >
                Built with care by{" "}
                <a
                  href="https://www.linkedin.com/in/abdullah-parvez-565693246/"
                  className="underline hover:opacity-80"
                >
                  Abdullah Parvez
                </a>{" "}
                — crafting tools that respect the hardware you love.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold bg-blue-600 text-white hover:bg-blue-700"
                >
                  Get Started
                </a>
                <a
                  href="https://github.com/abdullah-par/keeblab"
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 font-semibold transition-all ${
                    isDark
                      ? "border border-white/20 hover:bg-white/10"
                      : "border border-black/20 hover:bg-black/5"
                  }`}
                >
                  <Github size={16} /> Contribute
                </a>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/abdullah-par/keeblab"
                  aria-label="GitHub"
                  className={`inline-flex items-center justify-center rounded-full p-3 transition-all hover:scale-105 shadow-md ${
                    isDark 
                      ? "bg-white/3 text-white border border-white/5" 
                      : "bg-white text-[#0F172A] border border-black/5"
                  }`}
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/abdullah-parvez-565693246/"
                  aria-label="LinkedIn"
                  className={`inline-flex items-center justify-center rounded-full p-3 transition-all hover:scale-105 shadow-md ${
                    isDark 
                      ? "bg-white/3 text-white border border-white/5" 
                      : "bg-white text-[#0F172A] border border-black/5"
                  }`}
                >
                  <Linkedin size={18} />
                </a>
              </div>

              <p
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-slate-500"
                }`}
              >
                © {new Date().getFullYear()} KeebLab — Crafted with keyboards in
                mind.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}