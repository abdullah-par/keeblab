"use client";
import React, { useEffect, useState } from "react";
import { Github, Linkedin, Moon, Sun, ArrowRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function KeebLab() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [uiTheme, setUiTheme] = useState("paper");
  const [view, setView] = useState("landing");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }

    const savedUi = localStorage.getItem("uiTheme");
    if (savedUi === "modern" || savedUi === "paper") {
      setUiTheme(savedUi);
    }
  }, []);

  // Apply theme class and persist preference
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply UI theme class (theme-modern or theme-paper)
  useEffect(() => {
    document.documentElement.classList.remove("theme-modern", "theme-paper");
    document.documentElement.classList.add(`theme-${uiTheme}`);
    localStorage.setItem("uiTheme", uiTheme);
  }, [uiTheme]);

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden transition-colors duration-500 ${
        isDark
          ? "bg-[#0A0C10] text-white"
          : "bg-gradient-to-br from-[#F8FAFC] to-[#EEF2F7] text-[#0F172A]"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only absolute left-4 top-20 bg-white/90 dark:bg-black/70 text-sm px-3 py-2 rounded-md"
      >
        Skip to main content
      </a>
      {/* NAVBAR */}
      <header
        className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl transition-colors duration-500 border-b ${
          isDark
            ? "bg-[#0A0C10]/70 border-white/10"
            : "bg-white/70 border-black/10"
        }`}
      >
        <div className="container h-16 flex items-center justify-between relative">
          <a
            href="/"
            aria-label="KeebLab Home"
            className={`inline-flex items-center px-4 py-2 rounded-full font-extrabold text-lg md:text-xl tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 transition shadow-sm hover:shadow-md ${
              isDark
                ? "bg-white/10 text-white hover:bg-white/16"
                : "bg-primary-50 text-primary-600 hover:bg-primary-100"
            }`}
          >
            KeebLab
          </a>

          <nav className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="nav-link">
                Home
              </a>
              <a href="#about" className="nav-link">
                About
              </a>
              <a href="#" className="hidden md:inline-flex btn btn-primary">
                Sign up
              </a>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 transition"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.92 }}
                aria-label="Toggle theme"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={`p-2 rounded-full bg-transparent transform transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? "text-yellow-400 hover:bg-white/10"
                    : "text-slate-700 hover:bg-black/5"
                }`}
              >
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -10, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </motion.span>
              </motion.button>
            </div>
          </nav>
        </div>
      </header>

      {menuOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:hidden absolute top-16 left-0 right-0 z-40 ${
            isDark
              ? "bg-black/70 border-b border-white/5"
              : "bg-white/90 border-b border-black/5"
          } backdrop-blur-lg shadow-lg`}
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            <a href="#" onClick={() => setMenuOpen(false)} className="nav-link">
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="nav-link"
            >
              About
            </a>
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary w-full text-center"
            >
              Sign up
            </a>
          </div>
        </motion.div>
      )}

      {/* HERO */}
      <section className="relative pt-28 md:pt-40 pb-20 md:pb-36 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute -top-32 md:-top-44 left-1/2 -translate-x-1/2 w-[700px] md:w-[1100px] h-[700px] md:h-[1100px] rounded-full bg-gradient-to-tr from-primary-500/20 to-cyan-400/10 blur-[220px]" />
          <div className="absolute -bottom-32 md:-bottom-44 right-6 md:right-1/4 w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full bg-rose-500/8 blur-[160px] rotate-12" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto px-6 text-center"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight">
            <span
              className={`block ${
                isDark ? "text-slate-100" : "text-[#0F172A]"
              }`}
            >
              A better way to
            </span>

            <span
              className={`block mt-1 bg-clip-text text-transparent ${
                isDark
                  ? "bg-gradient-to-r from-primary-400 to-cyan-400"
                  : "bg-gradient-to-r from-primary-500 to-cyan-500"
              }`}
            >
              feel your typing
            </span>
          </h1>

          <p
            className={`mt-6 text-base md:text-lg max-w-3xl mx-auto leading-relaxed ${
              isDark ? "text-gray-400" : "text-slate-600"
            }`}
          >
            KeebLab blends mechanical keyboard obsession with precision typing
            practice — built for speed, accuracy, and pure satisfaction.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            <Link href={"/type"}>
            <motion.button  
              whileHover={{ scale: 1.03 }}
              className="btn btn-primary px-10 py-4 rounded-xl flex items-center gap-3 w-full sm:w-auto justify-center"
              aria-label="Start Typing"
              onClick={() => setView("test")}
            >
              Start Typing <ArrowRight size={18} />
            </motion.button></Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className={`btn btn-ghost px-8 py-4 rounded-xl font-semibold w-full sm:w-auto transition ${
                isDark
                  ? "border-white/20 hover:bg-white/10"
                  : "border-black/20 hover:bg-black/5"
              }`}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="pb-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6"
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
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer
        className={`transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-r from-black/80 via-white/2 to-black/70 text-white"
            : "bg-gradient-to-r from-primary-50 to-cyan-50 text-[#0F172A]"
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
                <a href="#" className="btn btn-primary px-5 py-3">
                  Get Started
                </a>
                <a
                  href="https://github.com/abdullah-par/keeblab"
                  className="btn btn-ghost px-4 py-3 inline-flex items-center gap-2"
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
                  className={`social-btn ${
                    isDark ? "bg-white/3 text-white" : "bg-white text-[#0F172A]"
                  }`}
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/abdullah-parvez-565693246/"
                  aria-label="LinkedIn"
                  className={`social-btn ${
                    isDark ? "bg-white/3 text-white" : "bg-white text-[#0F172A]"
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
  );
}
