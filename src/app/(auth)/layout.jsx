'use client';

import { LayoutGroup } from 'framer-motion';
import Link from 'next/link';
import { Award } from 'lucide-react';

export default function AuthLayout({ children }) {
    return (
        /* LayoutGroup orchestrates fluid transition metrics strictly inside the auth view scope */
        <LayoutGroup id="sportnest-isolated-auth">
            <div className="min-h-screen bg-base-100 flex flex-col justify-between transition-colors duration-300">
                {/* Isolated Auth Navigation Banner */}
                <header className="w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-base-200/60 relative z-20">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-black text-xl text-base-content tracking-tight group"
                    >
                        <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
                            <Award size={18} />
                        </div>
                        <span>SportNest</span>
                    </Link>
                    <Link
                        href="/"
                        className="text-xs font-bold text-base-content/60 hover:text-base-content transition-colors"
                    >
                        Exit to Home Layout
                    </Link>
                </header>

                {/* Dynamic Inner Form Slot Target (Login/Register Views) */}
                <main className="flex-grow flex items-center justify-center relative py-12">
                    {children}
                </main>

                {/* Minimalist Context-Specific Footer Signature */}
                <footer className="w-full text-center py-6 border-t border-t-base-200/40 text-[11px] font-bold text-base-content/40 tracking-wider">
                    © {new Date().getFullYear()} SPORTNEST AUTHENTICATION VAULT.
                    PROTECTED CONNECTION ACTIVE.
                </footer>
            </div>
        </LayoutGroup>
    );
}
