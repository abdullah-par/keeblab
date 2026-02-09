"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, Trophy, Users, Zap, Sun, Moon } from 'lucide-react';
import BackgroundEffects from '@/components/BackgroundEffects';

const raceParagraphs = [
    "The quick brown fox jumps over the lazy dog while racing through the forest at incredible speed.",
    "Programming is the art of telling another human what one wants the computer to do in a clear and precise manner.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts in this amazing journey.",
    "The only way to do great work is to love what you do and put your heart into every single project.",
    "Innovation distinguishes between a leader and a follower in the competitive world of modern technology.",
];

const playerNames = ['SpeedDemon', 'TypeMaster', 'KeyboardNinja', 'SwiftTyper', 'CodeRacer', 'FastFingers'];
const avatarColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];

export default function MultiplayerArena() {
    const [theme, setTheme] = useState("dark");
    const [currentParagraph, setCurrentParagraph] = useState('');
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [raceStarted, setRaceStarted] = useState(false);
    const [raceFinished, setRaceFinished] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [userProgress, setUserProgress] = useState(0);
    const [opponents, setOpponents] = useState([]);
    const [position, setPosition] = useState(4);
    const [timeElapsed, setTimeElapsed] = useState(0);
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
        loadNewRace();
    }, []);

    useEffect(() => {
        if (countdown > 0 && countdown < 4) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && !raceStarted) {
            setRaceStarted(true);
            setStartTime(Date.now());
            setIsActive(true);
            inputRef.current?.focus();
        }
    }, [countdown, raceStarted]);

    useEffect(() => {
        let interval;
        if (isActive && startTime && !raceFinished) {
            interval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                setTimeElapsed(elapsed);

                const wordsTyped = userInput.trim().split(/\s+/).length;
                const minutes = elapsed / 60;
                if (minutes > 0) {
                    setWpm(Math.round(wordsTyped / minutes));
                }

                setOpponents(prev => prev.map(opp => ({
                    ...opp,
                    progress: Math.min(100, opp.progress + (Math.random() * 0.5 + 0.3))
                })));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isActive, startTime, userInput, raceFinished]);

    useEffect(() => {
        const progress = (userInput.length / currentParagraph.length) * 100;
        setUserProgress(progress);

        const allRacers = [{ name: 'You', progress }, ...opponents];
        const sorted = allRacers.sort((a, b) => b.progress - a.progress);
        const userPos = sorted.findIndex(r => r.name === 'You') + 1;
        setPosition(userPos);

        if (userInput === currentParagraph && !raceFinished) {
            setRaceFinished(true);
            setIsActive(false);
        }
    }, [userInput, currentParagraph, opponents, raceFinished]);

    const loadNewRace = () => {
        const randomParagraph = raceParagraphs[Math.floor(Math.random() * raceParagraphs.length)];
        setCurrentParagraph(randomParagraph);
        setUserInput('');
        setStartTime(null);
        setIsActive(false);
        setRaceStarted(false);
        setRaceFinished(false);
        setCountdown(3);
        setUserProgress(0);
        setWpm(0);
        setTimeElapsed(0);
        setPosition(4);

        const numOpponents = 3;
        const selectedNames = [];
        while (selectedNames.length < numOpponents) {
            const name = playerNames[Math.floor(Math.random() * playerNames.length)];
            if (!selectedNames.includes(name)) selectedNames.push(name);
        }

        setOpponents(selectedNames.map((name, i) => ({
            name,
            progress: 0,
            wpm: Math.floor(Math.random() * 30) + 60,
            avatar: avatarColors[i % avatarColors.length]
        })));
    };

    const handleInputChange = (e) => {
        if (!raceStarted) return;
        const value = e.target.value;
        if (value.length > currentParagraph.length) return;
        setUserInput(value);
    };

    const handleReset = () => {
        loadNewRace();
    };

    const getCharClass = (index) => {
        if (index >= userInput.length) {
            return isDark ? 'text-gray-600' : 'text-gray-400';
        }
        if (userInput[index] === currentParagraph[index]) {
            return isDark ? 'text-green-400' : 'text-green-600';
        }
        return isDark ? 'text-red-400' : 'text-red-600';
    };

    const getPositionEmoji = (pos) => {
        switch (pos) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return `${pos}th`;
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#0A0C10]" : "bg-gray-50"}`}>
            <BackgroundEffects wpm={wpm} isActive={isActive} />

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
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${isDark ? "bg-cyan-500/10 text-cyan-400" : "bg-cyan-100 text-cyan-600"}`}>
                            <Users size={20} />
                            <span className="font-bold">Global Arena</span>
                        </div>
                        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                            Race Against the World
                        </h1>
                        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            Compete in real-time typing races with players worldwide
                        </p>
                    </motion.div>

                    {/* Race Stats */}
                    <div className="flex items-end justify-between mb-12 px-4">
                        <div className="flex gap-8">
                            <div className="flex flex-col">
                                <span className={`text-sm font-bold uppercase tracking-widest mb-1 ${isDark ? "text-slate-500" : "text-slate-600"}`}>
                                    Position
                                </span>
                                <span className={`text-5xl font-black ${isDark ? "text-cyan-400" : "text-cyan-600"}`}>
                                    {getPositionEmoji(position)}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-sm font-bold uppercase tracking-widest mb-1 ${isDark ? "text-slate-500" : "text-slate-600"}`}>
                                    WPM
                                </span>
                                <span className={`text-5xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                                    {wpm}
                                </span>
                            </div>
                        </div>
                        <div className={`font-mono text-xl ${isDark ? "text-slate-500" : "text-slate-600"}`}>
                            {timeElapsed}s
                        </div>
                    </div>

                    {/* Countdown */}
                    <AnimatePresence>
                        {countdown > 0 && countdown < 4 && (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.5, opacity: 0 }}
                                className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
                            >
                                <div className={`text-9xl font-black ${isDark ? "text-cyan-400" : "text-cyan-600"}`}>
                                    {countdown}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Race Progress Bars */}
                    <div className={`mb-8 p-6 rounded-3xl border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"}`}>
                        <div className="space-y-4">
                            {/* User */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                                            You
                                        </div>
                                        <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>You</span>
                                    </div>
                                    <span className={`text-sm font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                        {Math.round(userProgress)}%
                                    </span>
                                </div>
                                <div className={`h-3 rounded-full overflow-hidden ${isDark ? "bg-white/5" : "bg-gray-200"}`}>
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${userProgress}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>

                            {/* Opponents */}
                            {opponents.map((opponent) => (
                                <div key={opponent.name}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full ${opponent.avatar} flex items-center justify-center text-white font-bold text-sm`}>
                                                {opponent.name[0]}
                                            </div>
                                            <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{opponent.name}</span>
                                        </div>
                                        <span className={`text-sm font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                            {Math.round(opponent.progress)}%
                                        </span>
                                    </div>
                                    <div className={`h-3 rounded-full overflow-hidden ${isDark ? "bg-white/5" : "bg-gray-200"}`}>
                                        <motion.div
                                            className={`h-full ${opponent.avatar}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${opponent.progress}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Overlay Typing Area */}
                    <div
                        className={`relative font-mono text-2xl leading-relaxed mb-8 p-8 rounded-3xl border backdrop-blur-sm cursor-text transition-all duration-300 ${isDark ? "border-white/5 bg-white/[0.02]" : "border-cyan-200/50 bg-white/60 shadow-xl shadow-cyan-500/5"}`}
                        style={{
                            boxShadow: isActive ? (isDark ? `0 0 ${Math.min(50, wpm / 2)}px rgba(34, 211, 238, 0.15)` : `0 0 ${Math.min(50, wpm / 2)}px rgba(34, 211, 238, 0.2)`) : 'none',
                        }}
                        onClick={() => inputRef.current?.focus()}
                    >
                        {currentParagraph.split('').map((char, index) => (
                            <span
                                key={index}
                                ref={index === userInput.length ? activeCharRef : null}
                                className={`transition-all duration-75 ${getCharClass(index)} ${index === userInput.length ? `border-l-2 pl-0.5 animate-pulse ${isDark ? 'border-cyan-400' : 'border-cyan-500'}` : ''}`}
                                style={{ whiteSpace: 'pre-wrap' }}
                            >
                                {char}
                            </span>
                        ))}

                        <textarea
                            ref={inputRef}
                            value={userInput}
                            onChange={handleInputChange}
                            disabled={!raceStarted || raceFinished}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-default resize-none"
                            spellCheck={false}
                        />
                    </div>

                    {/* Victory Message */}
                    <AnimatePresence>
                        {raceFinished && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mt-8 p-8 rounded-3xl border text-center ${position === 1 ? (isDark ? "bg-yellow-500/10 border-yellow-500/30" : "bg-yellow-50 border-yellow-200") : (isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200")}`}
                            >
                                <div className="text-6xl mb-4">
                                    {position === 1 ? '🏆' : position === 2 ? '🥈' : position === 3 ? '🥉' : '🎯'}
                                </div>
                                <h2 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                                    {position === 1 ? 'Victory!' : `${position}${position === 2 ? 'nd' : position === 3 ? 'rd' : 'th'} Place`}
                                </h2>
                                <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                    You finished with {wpm} WPM in {timeElapsed} seconds
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-8">
                        <button
                            onClick={handleReset}
                            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${isDark ? "bg-white/5 hover:bg-white/10 text-white border border-white/10" : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-md"}`}
                        >
                            <RotateCcw size={20} />
                            New Race
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
