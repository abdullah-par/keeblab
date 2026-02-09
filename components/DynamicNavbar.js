"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

export default function DynamicNavbar() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-2xl ${isDark ? "bg-white/5 border-white/10 shadow-black/20" : "bg-white/90 border-gray-200/50 shadow-slate-200/50"}`}
        >
            <div className="flex items-center gap-4">
                <Link
                    href="/"
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ${isDark ? "text-slate-300 hover:text-white hover:bg-white/10" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}
                >
                    <Home size={16} />
                    <span className="text-sm font-semibold">Home</span>
                </Link>

                <div className={`w-px h-4 ${isDark ? "bg-white/10" : "bg-slate-300"}`} />

                <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${isDark ? "text-yellow-400 hover:bg-yellow-400/10" : "text-slate-700 hover:bg-slate-100"}`}
                    aria-label="Toggle theme"
                >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
            </div>
        </motion.nav>
    );
}
