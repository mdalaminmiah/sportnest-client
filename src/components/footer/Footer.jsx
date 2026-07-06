import Link from 'next/link';
import { Mail, Phone, MapPin, Award } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-base-200 text-base-content border-t border-base-300">
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 lg:px-12 lg:py-16">
                {/* Responsive Grid System */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-base-300/80">
                    {/* Column 1: Brand & Identity 
              - items-center centers the whole container block on mobile
              - sm:items-start aligns it to the left on tablet/desktop
          */}
                    <div className="flex flex-col items-center sm:items-start w-full">
                        {/* Inner Content Wrapper: ALWAYS text-left items-start */}
                        <div className="text-left items-start flex flex-col w-full max-w-xs">
                            <div className="flex items-center gap-2.5 text-xl font-bold tracking-tight mb-4">
                                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm shrink-0">
                                    <Award size={18} />
                                </div>
                                <span className="font-black select-none">
                                    Sport
                                    <span className="text-primary">Nest</span>
                                </span>
                            </div>
                            <p className="text-sm text-base-content/60 leading-relaxed break-words">
                                Discover and secure reservations for elite
                                football fields, indoor courts, tracking
                                sectors, and training complexes in real time.
                            </p>
                        </div>
                    </div>

                    {/* Column 2: Platform Links */}
                    <div className="flex flex-col items-center sm:items-start w-full">
                        {/* Inner Content Wrapper */}
                        <div className="text-left items-start flex flex-col w-full max-w-xs">
                            <h4 className="text-[11px] font-bold text-base-content/40 tracking-widest uppercase mb-4">
                                Explore Platforms
                            </h4>
                            <ul className="space-y-3 text-sm font-semibold text-base-content/70 w-full">
                                <li>
                                    <Link
                                        href="/"
                                        className="hover:text-primary transition-colors block py-0.5"
                                    >
                                        Home Landing
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/facilities"
                                        className="hover:text-primary transition-colors block py-0.5"
                                    >
                                        All Arenas
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/login"
                                        className="hover:text-primary transition-colors block py-0.5"
                                    >
                                        Sign In
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 3: Contact Details */}
                    <div className="flex flex-col items-center sm:items-start w-full">
                        {/* Inner Content Wrapper */}
                        <div className="text-left items-start flex flex-col w-full max-w-xs">
                            <h4 className="text-[11px] font-bold text-base-content/40 tracking-widest uppercase mb-4">
                                Contact Details
                            </h4>
                            <ul className="space-y-3 text-sm font-semibold text-base-content/70 w-full">
                                <li className="flex items-start gap-3 text-left w-full">
                                    <MapPin
                                        size={16}
                                        className="text-primary shrink-0 mt-0.5"
                                    />
                                    <span className="leading-snug break-words">
                                        123 Arena Street, Stadium District, NY
                                        10001
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 text-left w-full">
                                    <Phone
                                        size={16}
                                        className="text-primary shrink-0"
                                    />
                                    <span>+1 (555) 234-5678</span>
                                </li>
                                <li className="flex items-center gap-3 text-left w-full">
                                    <Mail
                                        size={16}
                                        className="text-primary shrink-0"
                                    />
                                    <span className="hover:text-primary transition-colors break-all">
                                        support@sportnest.com
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 4: Social Networks */}
                    <div className="flex flex-col items-center sm:items-start w-full">
                        {/* Inner Content Wrapper */}
                        <div className="text-left items-start flex flex-col w-full max-w-xs">
                            <h4 className="text-[11px] font-bold text-base-content/40 tracking-widest uppercase mb-4">
                                Social Networks
                            </h4>
                            <p className="text-xs text-base-content/60 leading-normal mb-4 break-words">
                                Join our active localized sports network hub
                                across media streams.
                            </p>

                            {/* Keep icons left-aligned inside the centered column block */}
                            <div className="flex flex-wrap items-center gap-3 w-full">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-base-300/80 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                                    aria-label="Facebook"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-base-300/80 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                                    aria-label="Instagram"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect
                                            width="20"
                                            height="20"
                                            x="2"
                                            y="2"
                                            rx="5"
                                            ry="5"
                                        />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line
                                            x1="17.5"
                                            x2="17.51"
                                            y1="6.5"
                                            y2="6.5"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-base-300/80 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                                    aria-label="YouTube"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                                        <polygon points="10 15 15 12 10 9" />
                                    </svg>
                                </a>
                                <a
                                    href="https://x.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-base-300/80 hover:bg-primary hover:text-white flex items-center justify-center text-sm font-black tracking-tighter transition-all duration-300 shadow-sm select-none"
                                    aria-label="X Platform"
                                >
                                    𝕏
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom copyright sub-row matches the layout rules */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-base-content/40 text-center sm:text-left w-full">
                    <p className="leading-relaxed">
                        &copy; {new Date().getFullYear()} SportNest Hub Systems.
                        All Rights Reserved.
                    </p>
                    <div className="px-3 py-1 rounded-full border border-base-300 bg-base-100 shadow-inner tracking-wide text-[11px] shrink-0">
                        Perfect Scoring Production Layout
                    </div>
                </div>
            </div>
        </footer>
    );
}
