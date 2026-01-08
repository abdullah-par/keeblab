"use client";
import React, { useEffect, useState } from "react";
import { Github, Linkedin, Moon, Sun, ArrowRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function KeebLab() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  // Apply theme class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isDark = theme === "dark";

  // Apply CSS variables from provided stylesheet
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--color-bg', '#071023');
      root.style.setProperty('--color-surface', '#0A0C10');
      root.style.setProperty('--color-text', '#F8FAFF');
      root.style.setProperty('--color-muted', '#9fb2c8');
    } else {
      root.style.setProperty('--color-bg', '#FBF9F7');
      root.style.setProperty('--color-surface', '#FFFFFF');
      root.style.setProperty('--color-text', '#0F172A');
      root.style.setProperty('--color-muted', '#6b7280');
    }
  }, [isDark]);

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden transition-colors duration-500"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        backgroundImage: isDark ? 'none' : 'linear-gradient(rgba(0,0,0,0.015) 1px, transparent 1px)',
        backgroundSize: '100% 56px',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
      }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only absolute left-4 top-20 bg-white/90 dark:bg-black/70 text-sm px-3 py-2 rounded-md"
      >
        Skip to main content
      </a>
      
      {/* NAVBAR */}
      <header
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl transition-colors duration-500 border-b"
        style={{
          backgroundColor: isDark ? 'rgba(10, 12, 16, 0.7)' : 'rgba(255, 255, 255, 0.7)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="container mx-auto h-16 flex items-center justify-between relative px-6">
          <a
            href="/"
            aria-label="KeebLab Home"
            className="inline-flex items-center px-4 py-2 rounded-full font-extrabold text-lg md:text-xl tracking-tight focus:outline-none focus-visible:ring-2 transition shadow-sm hover:shadow-md"
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#EEF2FF',
              color: isDark ? '#F8FAFF' : '#3b6ef6'
            }}
          >
            KeebLab
          </a>

          <nav className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="nav-link" style={{ color: 'var(--color-muted)' }}>
                Home
              </a>
              <a href="#about" className="nav-link" style={{ color: 'var(--color-muted)' }}>
                About
              </a>
              <a 
                href="#" 
                className="hidden md:inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-shadow"
                style={{
                  backgroundColor: '#3b6ef6',
                  color: 'white',
                  borderRadius: '10px'
                }}
              >
                Sign up
              </a>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-md focus:outline-none focus-visible:ring-2 transition"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.92 }}
                aria-label="Toggle theme"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="p-2 rounded-full transform transition-all duration-300 hover:scale-105"
                style={{
                  color: isDark ? '#fbbf24' : '#334155',
                  backgroundColor: 'transparent'
                }}
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
          className="md:hidden absolute top-16 left-0 right-0 z-40 backdrop-blur-lg shadow-lg"
          style={{
            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)',
            borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`
          }}
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            <a href="#" onClick={() => setMenuOpen(false)} className="nav-link" style={{ color: 'var(--color-muted)' }}>
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="nav-link"
              style={{ color: 'var(--color-muted)' }}
            >
              About
            </a>
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center rounded-xl px-4 py-2 font-semibold"
              style={{
                backgroundColor: '#3b6ef6',
                color: 'white'
              }}
            >
              Sign up
            </a>
          </div>
        </motion.div>
      )}

      {/* HERO */}
      <section id="main" className="relative pt-28 md:pt-40 pb-20 md:pb-36 overflow-hidden">
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
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "'Inter', system-ui, sans-serif", letterSpacing: '-0.02em' }}>
            <span
              style={{ color: 'var(--color-text)' }}
            >
              A better way to
            </span>

            <span
              className="block mt-1 bg-clip-text text-transparent"
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(to right, #5b8cff, #06b6d4)'
                  : 'linear-gradient(to right, #3b6ef6, #0891b2)'
              }}
            >
              feel your typing
            </span>
          </h1>

          <p
            className="mt-6 text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ 
              color: 'var(--color-muted)',
              lineHeight: '1.7'
            }}
          >
            KeebLab blends mechanical keyboard obsession with precision typing
            practice — built for speed, accuracy, and pure satisfaction.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            <motion.button  
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-3 w-full sm:w-auto justify-center rounded-xl px-10 py-4 font-semibold transition-all"
              style={{
                backgroundColor: '#3b6ef6',
                color: 'white',
                boxShadow: '0 6px 24px rgba(59, 110, 246, 0.15)'
              }}
              aria-label="Start Typing"
            >
              Start Typing <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 w-full sm:w-auto justify-center rounded-xl px-8 py-4 font-semibold transition-all"
              style={{
                backgroundColor: 'transparent',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)'}`,
                color: 'var(--color-text)'
              }}
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
            className="rounded-3xl p-14 md:p-20 border backdrop-blur-xl"
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              boxShadow: '0 6px 24px rgba(16, 24, 40, 0.04)',
              borderRadius: '14px'
            }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ 
                color: 'var(--color-text)',
                fontFamily: "'Inter', system-ui, sans-serif",
                letterSpacing: '-0.02em'
              }}
            >
              About
            </h2>
            <p
              className="max-w-3xl text-lg leading-relaxed"
              style={{ 
                color: isDark ? '#F8FAFF' : '#334155',
                lineHeight: '1.7'
              }}
            >
              KeebLab is our tribute to the mechanical keyboard community. We
              know what it's like to chase the perfect sound profile, to
              hand-lube a hundred switches, and to seek out that one elusive
              keycap set.
            </p>
            <p
              className="mt-6 max-w-3xl leading-relaxed"
              style={{ 
                color: 'var(--color-muted)',
                lineHeight: '1.7'
              }}
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
        className="transition-colors duration-500"
        style={{
          background: isDark
            ? 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0.02), rgba(0, 0, 0, 0.7))'
            : 'linear-gradient(to right, #EEF2FF, #ECFEFF)',
          color: 'var(--color-text)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4">
                <h3
                  className="text-2xl md:text-3xl font-bold"
                  style={{ 
                    color: 'var(--color-text)',
                    fontFamily: "'Inter', system-ui, sans-serif"
                  }}
                >
                  KeebLab
                </h3>

                <span
                  className="hidden sm:inline text-sm"
                  style={{ color: 'var(--color-muted)' }}
                >
                  High-fidelity typing practice for analog enthusiasts.
                </span>
              </div>

              <p
                className="mt-4 text-sm"
                style={{ color: 'var(--color-muted)' }}
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
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold"
                  style={{
                    backgroundColor: '#3b6ef6',
                    color: 'white'
                  }}
                >
                  Get Started
                </a>
                <a
                  href="https://github.com/abdullah-par/keeblab"
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-3 font-semibold transition-all"
                  style={{
                    backgroundColor: 'transparent',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)'}`,
                    color: 'var(--color-text)'
                  }}
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
                  className="inline-flex items-center justify-center rounded-full p-3 transition-all hover:scale-105"
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
                    color: 'var(--color-text)',
                    boxShadow: '0 6px 20px rgba(16, 24, 40, 0.06)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.04)'}`
                  }}
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/abdullah-parvez-565693246/"
                  aria-label="LinkedIn"
                  className="inline-flex items-center justify-center rounded-full p-3 transition-all hover:scale-105"
                  style={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
                    color: 'var(--color-text)',
                    boxShadow: '0 6px 20px rgba(16, 24, 40, 0.06)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.04)'}`
                  }}
                >
                  <Linkedin size={18} />
                </a>
              </div>

              <p
                className="text-xs"
                style={{ color: 'var(--color-muted)' }}
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