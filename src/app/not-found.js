'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function NotFound() {
    const [mounted, setMounted] = useState(false);

    // Prevent hydration flashes on server-rendered layouts
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        /* The main wrapper uses bg-base-100 to respond instantly to light/dark themes */
        <div className="min-h-[calc(100vh-5rem)] bg-base-100 flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden transition-colors duration-300">
            {/* --- 1. Responsive Theme-Aware Background Blobs --- */}
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 md:w-[30rem] md:h-[30rem] bg-primary rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-72 h-72 sm:w-[28rem] sm:h-[28rem] bg-secondary rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"
            />

            {/* --- 2. Main Structural Layout Block --- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 text-center w-full max-w-2xl mx-auto flex flex-col items-center"
            >
                {/* 404 Header Text utilizing your custom Primary to Secondary Brand Gradient */}
                <motion.h1
                    drag
                    dragConstraints={{
                        left: -20,
                        right: 20,
                        top: -20,
                        bottom: 20,
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-grab active:cursor-grabbing leading-none text-[6.5rem] sm:text-[9.5rem] md:text-[12rem] lg:text-[14rem] font-black text-transparent bg-clip-text bg-gradient-to-tr from-primary to-secondary drop-shadow-xl select-none tracking-tight"
                >
                    404
                </motion.h1>

                {/* Typography Block */}
                <div className="mt-2 sm:mt-6 space-y-3 px-2">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-base-content tracking-tight">
                        Whoops! Missing Playground.
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-base-content/60 font-medium leading-relaxed max-w-md mx-auto">
                        It looks like the arena panel, matching route, or
                        requested workspace layer does not exist yet or has been
                        moved elsewhere.
                    </p>
                </div>

                {/* --- 3. Full Fluid Button Matrix Group --- */}
                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none mx-auto">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto"
                    >
                        <Link
                            href="/"
                            className="btn btn-primary w-full sm:w-auto rounded-xl px-6 py-3 h-auto min-h-0 font-bold shadow-md shadow-primary/10 flex items-center justify-center gap-2 group text-sm sm:text-base tracking-wide"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to Home
                        </Link>
                    </motion.div>

                    <Link
                        href="/facilities"
                        className="btn btn-ghost w-full sm:w-auto border border-base-300 hover:bg-base-200/60 rounded-xl px-6 py-3 h-auto min-h-0 font-bold text-sm sm:text-base"
                    >
                        Browse Arenas
                    </Link>
                </div>
            </motion.div>

            {/* --- 4. Premium SportNest Logo Floating Elements (No Book Icons) --- */}
            {/* Top-Right Floating Brand Icon */}
            <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute top-24 right-[12%] lg:right-[22%] text-primary/30 p-3 bg-base-200/40 rounded-2xl hidden md:block select-none backdrop-blur-xs border border-base-300/30"
            >
                <Award size={36} />
            </motion.div>

            {/* Bottom-Left Floating Brand Icon (Replaced Book with SportNest Logo Icon) */}
            <motion.div
                animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                }}
                className="absolute bottom-24 left-[12%] lg:left-[22%] text-secondary/30 p-3 bg-base-200/40 rounded-2xl hidden md:block select-none backdrop-blur-xs border border-base-300/30"
            >
                <Award size={36} />
            </motion.div>
        </div>
    );
}
