'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import {
    Menu,
    X,
    LogOut,
    Calendar,
    Settings,
    Award,
    ChevronDown,
    Sun,
    Moon,
    Grid,
    PlusCircle,
} from 'lucide-react';

const publicLinks = [
    { href: '/', label: 'Home' },
    { href: '/facilities', label: 'All Facilities' },
];

const privateLinks = [
    { href: '/my-bookings', label: 'My Bookings', icon: Calendar },
    { href: '/add-facility', label: 'Add Facility', icon: PlusCircle },
    { href: '/manage-facilities', label: 'Manage Facilities', icon: Settings },
];

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const { user, logout, loading } = useAuth();

    useEffect(() => setMobileMenuOpen(false), [pathname]);
    useEffect(() => setMounted(true), []);

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : 'U');

    const linkClass = (href) =>
        `hover:text-primary transition-colors ${
            pathname === href ? 'text-primary' : 'text-base-content/80'
        }`;

    if (!mounted)
        return (
            <div className="h-20 w-full bg-base-100 border-b border-base-200" />
        );

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-base-200/60 bg-base-100/75 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                {/* Brand */}
                <Link
                    href="/"
                    className="flex items-center gap-2 font-black text-xl select-none"
                >
                    <span className="w-9 h-9 rounded-xl bg-primary text-primary-content flex items-center justify-center shadow-sm">
                        <Award size={18} />
                    </span>
                    Sport<span className="text-primary -ml-2">Nest</span>
                </Link>

                {/* Desktop links */}
                <div className="hidden lg:flex items-center gap-6 font-semibold text-sm tracking-wide">
                    {publicLinks.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className={linkClass(l.href)}
                        >
                            {l.label}
                        </Link>
                    ))}
                    {user &&
                        privateLinks.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className={linkClass(l.href)}
                            >
                                {l.label}
                            </Link>
                        ))}
                </div>

                {/* Right tray */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        onClick={toggleTheme}
                        className="btn btn-ghost btn-circle btn-sm sm:btn-md"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <Moon size={18} />
                        ) : (
                            <Sun size={18} />
                        )}
                    </button>

                    {loading ? (
                        <div className="skeleton w-9 h-9 rounded-full" />
                    ) : user ? (
                        <div className="dropdown dropdown-end">
                            <button
                                tabIndex={0}
                                className="flex items-center gap-1.5 btn btn-ghost btn-sm sm:btn-md rounded-full px-1.5"
                            >
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name || 'User'}
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm">
                                        {getInitials(user.name)}
                                    </span>
                                )}
                                <ChevronDown size={14} className="opacity-60" />
                            </button>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-2xl w-60 border border-base-200 z-50"
                            >
                                <li className="px-4 py-2">
                                    <div className="flex flex-col gap-0 pointer-events-none">
                                        <span className="font-black text-sm text-base-content truncate">
                                            {user.name}
                                        </span>
                                        <span className="text-[11px] font-medium text-base-content/50 truncate">
                                            {user.email}
                                        </span>
                                    </div>
                                </li>
                                <div className="divider my-1 opacity-60" />
                                {privateLinks.map((l) => {
                                    const Icon = l.icon;
                                    return (
                                        <li key={l.href}>
                                            <Link
                                                href={l.href}
                                                className="py-2.5"
                                            >
                                                <Icon size={16} /> {l.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                                <div className="divider my-1 opacity-60" />
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-error hover:bg-error/10 py-2.5 font-semibold"
                                    >
                                        <LogOut size={16} /> Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="btn btn-primary btn-sm rounded-xl px-4 font-bold uppercase tracking-wider text-[11px]"
                        >
                            Login
                        </Link>
                    )}

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="btn btn-ghost btn-circle btn-sm lg:hidden"
                        aria-label="Toggle navigation menu"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            {mobileMenuOpen && (
                <div className="lg:hidden w-full bg-base-100 border-t border-base-200 absolute left-0 top-20 shadow-2xl p-4 z-40 animate-fadeIn">
                    <ul className="menu bg-base-200/40 rounded-2xl p-2 gap-1 font-semibold text-sm">
                        <li>
                            <Link href="/">
                                <Grid size={16} /> Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/facilities">
                                <Award size={16} /> All Facilities
                            </Link>
                        </li>
                        {user && (
                            <>
                                <div className="divider my-1 opacity-40" />
                                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-base-content/40">
                                    Private
                                </span>
                                {privateLinks.map((l) => {
                                    const Icon = l.icon;
                                    return (
                                        <li key={l.href}>
                                            <Link href={l.href}>
                                                <Icon size={16} /> {l.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}
