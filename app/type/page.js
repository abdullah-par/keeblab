"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';

const paragraphs = [
  "The quick brown fox jumps over the lazy dog near the riverbank. Technology continues to evolve at an unprecedented pace, transforming how we live and work.",
  "Programming is both an art and a science that requires creativity and logical thinking. Modern developers use various tools and frameworks to build amazing applications.",
  "Nature provides us with countless wonders, from the depths of the ocean to the peaks of mountains. Every ecosystem plays a vital role in maintaining balance.",
  "Music has the power to evoke emotions and bring people together across cultures. Different genres reflect the diversity of human expression and creativity.",
  "Reading opens doors to new worlds and perspectives we might never otherwise encounter. Books have been humanity's way of preserving knowledge for centuries."
];

export default function TypingTest() {
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
    if (index >= userInput.length) return 'text-slate-500'; 
    return userInput[index] === currentParagraph[index] 
      ? 'text-white' 
      : 'text-rose-500 bg-rose-500/10 rounded-sm';
  };

  return (
    <div className="min-h-screen bg-[#071023] text-[#F8FAFF] flex flex-col items-center justify-center p-8 relative overflow-hidden font-sans">
      {/* Background Glows matching KeebLab Hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
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
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">{item.label}</span>
                <span className="text-6xl font-black text-white">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="text-slate-500 font-mono text-xl">{timeElapsed}s</div>
        </div>

        {/* Typing Area with the "Advanced" feel */}
        <div 
          className="text-3xl font-mono leading-relaxed mb-12 p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm cursor-text transition-all"
          onClick={() => inputRef.current?.focus()}
        >
          {currentParagraph.split('').map((char, index) => (
            <span
              key={index}
              className={`transition-all duration-75 ${getCharClass(index)} ${
                index === userInput.length ? 'border-l-2 border-[#5b8cff] pl-0.5 animate-pulse' : ''
              }`}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-12">
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
            className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 font-bold py-5 rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} /> Reset Session
          </button>
          <button
            onClick={loadNewParagraph}
            className="flex-1 bg-[#3b6ef6] hover:bg-[#5b8cff] text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
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
              className="text-center mt-10 text-[#06b6d4] font-black tracking-widest text-2xl uppercase"
            >
              🔥 {streak} streak
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
