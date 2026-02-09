"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, Code2, ChevronDown, Zap, Sun, Moon } from 'lucide-react';
import BackgroundEffects from '@/components/BackgroundEffects';

const codeSnippets = {
    javascript: [
        `function greet(name) {\n  return "Hello, " + name;\n}`,
        `const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);`,
        `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
        `const fetchData = async () => {\n  const response = await fetch(url);\n  const data = await response.json();\n  return data;\n};`,
        `class EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n  on(event, listener) {\n    if (!this.events[event]) this.events[event] = [];\n    this.events[event].push(listener);\n  }\n}`,
    ],
    python: [
        `def greet(name):\n    return f"Hello, {name}"`,
        `numbers = [1, 2, 3, 4, 5]\ndoubled = [n * 2 for n in numbers]`,
        `def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)`,
        `class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def greet(self):\n        return f"Hi, I'm {self.name}"`,
        `def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)`,
    ],
    typescript: [
        `function greet(name: string): string {\n  return \`Hello, \${name}\`;\n}`,
        `const numbers: number[] = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);`,
        `function identity<T>(arg: T): T {\n  return arg;\n}\n\nconst output = identity<string>("myString");`,
        `interface Repository<T> {\n  find(id: string): Promise<T | null>;\n  save(entity: T): Promise<void>;\n  delete(id: string): Promise<boolean>;\n}`,
        `type DeepReadonly<T> = {\n  readonly [P in keyof T]: T[P] extends object\n    ? DeepReadonly<T[P]>\n    : T[P];\n};`,
    ],
    c: [
        `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}`,
        `int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}`,
        `void swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}`,
        `struct Node {\n    int data;\n    struct Node* next;\n};\n\nvoid insert(struct Node** head, int data) {\n    struct Node* new_node = malloc(sizeof(struct Node));\n    new_node->data = data;\n    new_node->next = *head;\n    *head = new_node;\n}`,
        `int binary_search(int arr[], int l, int r, int x) {\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (arr[m] == x) return m;\n        if (arr[m] < x) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}`,
    ],
    cpp: [
        `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
        `class Rectangle {\nprivate:\n    int width, height;\npublic:\n    Rectangle(int w, int h) : width(w), height(h) {}\n    int area() { return width * height; }\n};`,
        `template<typename T>\nT max(T a, T b) {\n    return (a > b) ? a : b;\n}`,
        `vector<int> merge(vector<int>& a, vector<int>& b) {\n    vector<int> result;\n    int i = 0, j = 0;\n    while (i < a.size() && j < b.size()) {\n        if (a[i] < b[j]) result.push_back(a[i++]);\n        else result.push_back(b[j++]);\n    }\n    return result;\n}`,
        `class Stack {\nprivate:\n    vector<int> data;\npublic:\n    void push(int x) { data.push_back(x); }\n    int pop() {\n        int top = data.back();\n        data.pop_back();\n        return top;\n    }\n    bool empty() { return data.empty(); }\n};`,
    ],
    java: [
        `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
        `public int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}`,
        `public class Rectangle {\n    private int width, height;\n    \n    public Rectangle(int w, int h) {\n        this.width = w;\n        this.height = h;\n    }\n    \n    public int area() {\n        return width * height;\n    }\n}`,
        `public static <T extends Comparable<T>> T max(T a, T b) {\n    return a.compareTo(b) > 0 ? a : b;\n}`,
        `public class BinarySearch {\n    public static int search(int[] arr, int x) {\n        int l = 0, r = arr.length - 1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (arr[m] == x) return m;\n            if (arr[m] < x) l = m + 1;\n            else r = m - 1;\n        }\n        return -1;\n    }\n}`,
    ],
};

export default function CodingPractice() {
    const [theme, setTheme] = useState("dark");
    const [language, setLanguage] = useState("javascript");
    const [difficulty, setDifficulty] = useState(0);
    const [currentSnippet, setCurrentSnippet] = useState('');
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [isActive, setIsActive] = useState(false);
    const [completedCount, setCompletedCount] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [streak, setStreak] = useState(0);
    const [particles, setParticles] = useState([]);
    const inputRef = useRef(null);
    const activeCharRef = useRef(null);
    const scrollContainerRef = useRef(null);

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
        loadRandomSnippet();
    }, [language]);

    useEffect(() => {
        if (activeCharRef.current && scrollContainerRef.current) {
            activeCharRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [userInput.length]);

    useEffect(() => {
        let interval;
        if (isActive && startTime) {
            interval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                setTimeElapsed(elapsed);

                const wordsTyped = userInput.trim().split(/\s+/).length;
                const minutes = elapsed / 60;
                if (minutes > 0) {
                    setWpm(Math.round(wordsTyped / minutes));
                }
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isActive, startTime, userInput]);

    useEffect(() => {
        if (userInput.length > 0) {
            const correctChars = userInput.split('').filter((char, i) => char === currentSnippet[i]).length;
            const acc = Math.round((correctChars / userInput.length) * 100);
            setAccuracy(acc);
        } else {
            setAccuracy(100);
        }
    }, [userInput, currentSnippet]);

    const createParticle = () => {
        const particle = {
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 100,
        };
        setParticles(prev => [...prev, particle]);
        setTimeout(() => { setParticles(prev => prev.filter(p => p.id !== particle.id)); }, 1000);
    };

    const loadRandomSnippet = () => {
        const snippets = codeSnippets[language];
        const snippetIndex = Math.min(difficulty, snippets.length - 1);
        setCurrentSnippet(snippets[snippetIndex]);
        setUserInput('');
        setStartTime(null);
        setIsActive(false);
        setTimeElapsed(0);
        inputRef.current?.focus();
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value.length > currentSnippet.length) return;

        if (!isActive && value.length > 0) {
            setIsActive(true);
            setStartTime(Date.now());
        }

        const lastChar = value[value.length - 1];
        const expectedChar = currentSnippet[value.length - 1];

        if (value.length > userInput.length) {
            if (lastChar === expectedChar) {
                setStreak(prev => prev + 1);
                if (streak > 0 && streak % 10 === 0) createParticle();
            } else {
                setStreak(0);
            }
        }

        setUserInput(value);

        if (value === currentSnippet) {
            setIsActive(false);
            setCompletedCount(prev => prev + 1);

            if ((completedCount + 1) % 3 === 0 && difficulty < codeSnippets[language].length - 1) {
                setDifficulty(prev => prev + 1);
            }

            setTimeout(() => {
                loadRandomSnippet();
            }, 1500);
        }
    };

    const handleReset = () => {
        setUserInput('');
        setStartTime(null);
        setIsActive(false);
        setWpm(0);
        setAccuracy(100);
        setTimeElapsed(0);
        setStreak(0);
        inputRef.current?.focus();
    };

    const getCharClass = (index) => {
        if (index >= userInput.length) {
            return isDark ? 'text-gray-600' : 'text-gray-400';
        }
        if (userInput[index] === currentSnippet[index]) {
            return isDark ? 'text-green-400' : 'text-green-600';
        }
        return isDark ? 'text-red-400' : 'text-red-600';
    };

    const getDifficultyLevel = () => {
        if (difficulty === 0) return 'easy';
        if (difficulty === 1) return 'medium';
        if (difficulty === 2) return 'hard';
        if (difficulty === 3) return 'expert';
        return 'master';
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#0A0C10]" : "bg-gray-50"}`}>
            <BackgroundEffects wpm={wpm} isActive={isActive} />

            {/* Streak Particles */}
            <AnimatePresence>
                {particles.map(particle => (
                    <motion.div
                        key={particle.id}
                        initial={{ opacity: 1, x: `${particle.x}vw`, y: `${particle.y}vh`, scale: 0 }}
                        animate={{ opacity: 0, y: '-20vh', scale: 2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="fixed text-4xl pointer-events-none z-50"
                    >
                        ⚡
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
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-100 text-blue-600"}`}>
                            <Code2 size={20} />
                            <span className="font-bold">Coding Excellence</span>
                        </div>
                        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                            Master Code Typing
                        </h1>
                        <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            Practice typing real code snippets - difficulty increases automatically
                        </p>
                    </motion.div>

                    {/* Stats Display */}
                    <div className="flex items-end justify-between mb-12 px-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Zap className={`${isDark ? "text-yellow-400" : "text-yellow-500"}`} size={24} />
                            <div className="flex flex-col">
                                <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-600"}`}>
                                    difficulty
                                </span>
                                <span className={`text-xl sm:text-2xl font-black uppercase ${getDifficultyLevel() === 'easy' ? (isDark ? 'text-green-400' : 'text-green-600') :
                                    getDifficultyLevel() === 'medium' ? (isDark ? 'text-yellow-400' : 'text-yellow-600') :
                                        getDifficultyLevel() === 'hard' ? (isDark ? 'text-orange-400' : 'text-orange-600') :
                                            getDifficultyLevel() === 'expert' ? (isDark ? 'text-red-400' : 'text-red-600') :
                                                (isDark ? 'text-purple-400' : 'text-purple-600')
                                    }`}>
                                    {getDifficultyLevel()}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-8 md:gap-12">
                            {[
                                { label: 'wpm', value: wpm },
                                { label: 'accuracy', value: `${accuracy}%` },
                                { label: 'completed', value: completedCount },
                            ].map((item) => (
                                <div key={item.label} className="flex flex-col">
                                    <span className={`text-sm font-bold uppercase tracking-widest mb-1 ${isDark ? "text-slate-500" : "text-slate-600"}`}>
                                        {item.label}
                                    </span>
                                    <span className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className={`font-mono text-lg md:text-xl ${isDark ? "text-slate-500" : "text-slate-600"}`}>
                            {timeElapsed}s
                        </div>
                    </div>

                    {/* Language Selector */}
                    <div className="flex gap-4 mb-8 justify-center">
                        <div className="relative">
                            <button
                                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                                className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isDark ? "bg-white/5 hover:bg-white/10 text-white border border-white/10" : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm"}`}
                            >
                                {language.charAt(0).toUpperCase() + language.slice(1)}
                                <ChevronDown size={16} />
                            </button>

                            {showLanguageMenu && (
                                <div className={`absolute top-full mt-2 rounded-xl overflow-hidden border z-10 ${isDark ? "bg-[#1a1d24] border-white/10" : "bg-white border-gray-200 shadow-lg"}`}>
                                    {Object.keys(codeSnippets).map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => {
                                                setLanguage(lang);
                                                setShowLanguageMenu(false);
                                                setDifficulty(0);
                                            }}
                                            className={`block w-full px-6 py-3 text-left transition-colors ${isDark ? "hover:bg-white/5 text-gray-300" : "hover:bg-gray-50 text-gray-700"} ${language === lang ? (isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600") : ""}`}
                                        >
                                            {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Typing Area with Overlay */}
                    <div
                        ref={scrollContainerRef}
                        className={`relative text-2xl md:text-3xl font-mono leading-relaxed mb-12 p-10 rounded-[2.5rem] border backdrop-blur-sm cursor-text transition-all duration-300 max-h-[350px] overflow-y-auto scroll-smooth scrollbar-hide ${isDark ? "border-white/5 bg-white/[0.02]" : "border-blue-200/50 bg-white/60 shadow-xl shadow-blue-500/5"}`}
                        style={{
                            boxShadow: isActive ? (isDark ? `0 0 ${Math.min(50, wpm / 2)}px rgba(59, 130, 246, 0.15)` : `0 0 ${Math.min(50, wpm / 2)}px rgba(59, 130, 246, 0.2)`) : 'none',
                            borderColor: isActive ? (isDark ? `rgba(255, 255, 255, ${Math.min(0.3, 0.1 + wpm / 500)})` : `rgba(59, 130, 246, ${Math.min(0.5, 0.3 + wpm / 500)})`) : undefined
                        }}
                        onClick={() => inputRef.current?.focus()}
                    >
                        {currentSnippet.split('').map((char, index) => (
                            <span
                                key={index}
                                ref={index === userInput.length ? activeCharRef : null}
                                className={`transition-all duration-75 ${getCharClass(index)} ${index === userInput.length ? `border-l-2 pl-0.5 animate-pulse ${isDark ? 'border-blue-400' : 'border-blue-500'}` : ''}`}
                                style={{ whiteSpace: 'pre-wrap' }}
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

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleReset}
                            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isDark ? "bg-white/5 hover:bg-white/10 text-white border border-white/10" : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-md"}`}
                        >
                            <RotateCcw size={20} />
                            Reset
                        </button>

                        <button
                            onClick={loadRandomSnippet}
                            className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                        >
                            Next Snippet
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
}
