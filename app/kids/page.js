"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, Star, Heart, Sparkles, Sun, Moon } from 'lucide-react';
import BackgroundEffects from '@/components/BackgroundEffects';

const wordCategories = {
    animals: {
        emoji: '🐾',
        words: ['cat', 'dog', 'bird', 'fish', 'lion', 'bear', 'frog', 'duck', 'cow', 'pig']
    },
    colors: {
        emoji: '🎨',
        words: ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'brown', 'black', 'white']
    },
    numbers: {
        emoji: '🔢',
        words: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
    },
    food: {
        emoji: '🍎',
        words: ['apple', 'banana', 'pizza', 'cake', 'bread', 'milk', 'juice', 'cookie', 'candy', 'ice cream']
    },
    nature: {
        emoji: '🌳',
        words: ['sun', 'moon', 'star', 'tree', 'flower', 'rain', 'cloud', 'wind', 'snow', 'rainbow']
    }
};

const encouragements = [
    "Amazing! 🎉",
    "Fantastic! ⭐",
    "You're a star! 🌟",
    "Great job! 🎊",
    "Wonderful! 🎈",
    "Perfect! 💫",
    "Awesome! 🚀",
    "Super! 🦸",
    "Brilliant! 💎",
    "Excellent! 🏆"
];

export default function LearningWorld() {
    const [theme, setTheme] = useState("dark");
    const [category, setCategory] = useState('animals');
    const [currentWord, setCurrentWord] = useState('');
    const [userInput, setUserInput] = useState('');
    const [stars, setStars] = useState(0);
    const [level, setLevel] = useState(1);
    const [wordsCompleted, setWordsCompleted] = useState(0);
    const [showEncouragement, setShowEncouragement] = useState(false);
    const [encouragementText, setEncouragementText] = useState('');
    const [particles, setParticles] = useState([]);
    const [streak, setStreak] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef(null);
    const activeCharRef = useRef(null);

    const isDark = theme === "dark";

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

    useEffect(() => {
        loadNewWord();
    }, [category]);

    useEffect(() => {
        if (isActive && startTime) {
            const interval = setInterval(() => {
                const elapsed = (Date.now() - startTime) / 1000 / 60;
                const wordsTyped = userInput.length / 5;
                setWpm(Math.round(wordsTyped / elapsed) || 0);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [isActive, startTime, userInput]);

    const loadNewWord = () => {
        const words = wordCategories[category].words;
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setCurrentWord(randomWord);
        setUserInput('');
        setStartTime(null);
        setIsActive(false);
        inputRef.current?.focus();
    };

    const handleInputChange = (e) => {
        const value = e.target.value.toLowerCase();
        if (value.length > currentWord.length) return;

        if (!isActive && value.length > 0) {
            setIsActive(true);
            setStartTime(Date.now());
        }

        setUserInput(value);

        if (value === currentWord) {
            setIsActive(false);
            const newStars = stars + 1;
            const newStreak = streak + 1;
            setStars(newStars);
            setStreak(newStreak);
            setWordsCompleted(prev => prev + 1);

            if ((wordsCompleted + 1) % 10 === 0) {
                setLevel(prev => prev + 1);
            }

            const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
            setEncouragementText(encouragement);
            setShowEncouragement(true);

            createParticles();

            setTimeout(() => {
                setShowEncouragement(false);
                loadNewWord();
            }, 1500);
        }
    };

    const createParticles = () => {
        const newParticles = [];
        for (let i = 0; i < 20; i++) {
            newParticles.push({
                id: Date.now() + i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                emoji: ['⭐', '✨', '🎉', '🎊', '💫'][Math.floor(Math.random() * 5)]
            });
        }
        setParticles(newParticles);
        setTimeout(() => setParticles([]), 2000);
    };

    const handleReset = () => {
        setUserInput('');
        setStartTime(null);
        setIsActive(false);
        inputRef.current?.focus();
    };

    const getCharClass = (index) => {
        if (index >= userInput.length) {
            return isDark ? 'text-gray-600' : 'text-gray-400';
        }
        if (userInput[index] === currentWord[index]) {
            return isDark ? 'text-green-400' : 'text-green-600';
        }
        return isDark ? 'text-red-400' : 'text-red-600';
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#0A0C10]" : "bg-gray-50"}`}>
            <BackgroundEffects wpm={wpm} isActive={isActive} />

            {/* Celebration Particles */}
            <AnimatePresence>
                {particles.map(particle => (
                    <motion.div
                        key={particle.id}
                        initial={{ opacity: 1, x: `${particle.x}vw`, y: `${particle.y}vh`, scale: 0 }}
                        animate={{ opacity: 0, y: '-100vh', scale: 1.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }}
                        className="fixed text-6xl pointer-events-none z-50"
                    >
                        {particle.emoji}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Navbar - Exact copy from typing page */}
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

            {/* Main Content */}
            <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6 ${isDark ? "bg-yellow-400/20 text-yellow-300" : "bg-yellow-100 text-yellow-700"}`}>
                            <Sparkles size={28} />
                            <span className="font-bold text-2xl">Learning World</span>
                        </div>
                        <h1 className={`text-6xl md:text-7xl font-black mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                            Let's Learn to Type! 🎈
                        </h1>
                        <p className={`text-2xl ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            Type the words and collect stars!
                        </p>
                    </motion.div>

                    {/* Stats Display */}
                    <div className="flex justify-center gap-8 mb-12">
                        <div className={`px-8 py-4 rounded-3xl ${isDark ? "bg-white/10 backdrop-blur-xl" : "bg-white shadow-lg"}`}>
                            <div className="flex items-center gap-3">
                                <Star className={`${isDark ? "text-yellow-400" : "text-yellow-500"}`} size={36} fill="currentColor" />
                                <div>
                                    <div className={`text-sm font-bold ${isDark ? "text-gray-400" : "text-gray-600"}`}>Stars</div>
                                    <div className={`text-4xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>{stars}</div>
                                </div>
                            </div>
                        </div>

                        <div className={`px-8 py-4 rounded-3xl ${isDark ? "bg-white/10 backdrop-blur-xl" : "bg-white shadow-lg"}`}>
                            <div className="flex items-center gap-3">
                                <Heart className={`${isDark ? "text-pink-400" : "text-pink-500"}`} size={36} fill="currentColor" />
                                <div>
                                    <div className={`text-sm font-bold ${isDark ? "text-gray-400" : "text-gray-600"}`}>Level</div>
                                    <div className={`text-4xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>{level}</div>
                                </div>
                            </div>
                        </div>

                        <div className={`px-8 py-4 rounded-3xl ${isDark ? "bg-white/10 backdrop-blur-xl" : "bg-white shadow-lg"}`}>
                            <div className="flex items-center gap-3">
                                <Sparkles className={`${isDark ? "text-cyan-400" : "text-cyan-500"}`} size={36} />
                                <div>
                                    <div className={`text-sm font-bold ${isDark ? "text-gray-400" : "text-gray-600"}`}>Streak</div>
                                    <div className={`text-4xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>{streak}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Category Selector */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {Object.entries(wordCategories).map(([key, cat]) => (
                            <button
                                key={key}
                                onClick={() => setCategory(key)}
                                className={`px-6 py-3 rounded-2xl font-bold text-xl transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${category === key
                                    ? isDark
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "bg-blue-500 text-white shadow-lg"
                                    : isDark
                                        ? "bg-white/10 text-white hover:bg-white/20"
                                        : "bg-white text-gray-900 hover:bg-gray-50 shadow-md"
                                    }`}
                            >
                                <span className="mr-2 text-2xl">{cat.emoji}</span>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Word Display with Emoji */}
                    <motion.div
                        key={currentWord}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`text-center mb-8 p-8 rounded-3xl ${isDark ? "bg-white/10 backdrop-blur-xl border border-white/20" : "bg-white shadow-2xl"}`}
                    >
                        <div className="text-9xl mb-4">
                            {wordCategories[category].emoji}
                        </div>
                    </motion.div>

                    {/* Overlay Typing Area */}
                    <div
                        className={`relative text-6xl md:text-7xl font-black leading-relaxed mb-12 p-12 rounded-[2.5rem] border backdrop-blur-sm cursor-text transition-all duration-300 text-center ${isDark ? "border-white/5 bg-white/[0.02]" : "border-blue-200/50 bg-white/60 shadow-xl shadow-blue-500/5"}`}
                        style={{
                            boxShadow: isActive ? (isDark ? `0 0 ${Math.min(50, wpm / 2)}px rgba(59, 130, 246, 0.15)` : `0 0 ${Math.min(50, wpm / 2)}px rgba(59, 130, 246, 0.2)`) : 'none',
                        }}
                        onClick={() => inputRef.current?.focus()}
                    >
                        {currentWord.toUpperCase().split('').map((char, index) => (
                            <span
                                key={index}
                                ref={index === userInput.length ? activeCharRef : null}
                                className={`transition-all duration-75 ${getCharClass(index)} ${index === userInput.length ? `border-l-4 pl-1 animate-pulse ${isDark ? 'border-blue-400' : 'border-blue-500'}` : ''}`}
                            >
                                {char}
                            </span>
                        ))}

                        <textarea
                            ref={inputRef}
                            value={userInput}
                            onChange={handleInputChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-default resize-none"
                            autoFocus
                            spellCheck={false}
                        />
                    </div>

                    {/* Encouragement Message */}
                    <AnimatePresence>
                        {showEncouragement && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
                            >
                                <div className={`text-9xl font-black ${isDark ? "text-yellow-300" : "text-yellow-500"}`}>
                                    {encouragementText}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={handleReset}
                            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-xl transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-white hover:bg-gray-50 text-gray-900 shadow-lg"}`}
                        >
                            <RotateCcw size={28} />
                            Clear
                        </button>

                        <button
                            onClick={loadNewWord}
                            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-xl transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                        >
                            Next Word
                            <ArrowRight size={28} />
                        </button>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-12 text-center">
                        <div className={`text-sm font-bold uppercase tracking-widest mb-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            Words Completed
                        </div>
                        <div className={`text-5xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
                            {wordsCompleted}
                        </div>
                        <div className={`mt-4 h-4 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(wordsCompleted % 10) * 10}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                        <div className={`mt-2 text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            {10 - (wordsCompleted % 10)} more words to level up!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
