"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export default function BackgroundEffects({ wpm = 0, isActive = false }) {
    const { isDark } = useTheme();

    return (
        <>
            {/* Background Grid Pattern & Floating Keys */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className={`absolute inset-0 bg-[radial-gradient(${isDark ? '#ffffff15' : '#00000010'}_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]`} />
            </div>

            {/* Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div
                    className={`absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-1000 ${isDark ? "bg-blue-500/10" : "bg-blue-400/20"}`}
                    style={{
                        animation: `float ${Math.max(4, 10 - wpm / 15)}s infinite ease-in-out 0s`
                    }}
                />
                <div
                    className={`absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-1000 ${isDark ? "bg-purple-500/10" : "bg-purple-400/20"}`}
                    style={{
                        animation: `float ${Math.max(4, 10 - wpm / 15)}s infinite ease-in-out 2s`
                    }}
                />
                {isActive && (
                    <div
                        className={`absolute top-[40%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[100px] transition-all duration-1000 ${isDark ? "bg-cyan-500/10" : "bg-cyan-400/15"}`}
                        style={{
                            animation: `pulse-glow ${Math.max(2, 5 - wpm / 30)}s infinite ease-in-out`
                        }}
                    />
                )}
            </div>

            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
      `}</style>
        </>
    );
}
