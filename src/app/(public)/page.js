'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Award,
    ShieldCheck,
    Zap,
    ArrowRight,
    Activity,
    Search,
    CalendarCheck,
    Star,
    Quote,
} from 'lucide-react';
import { getFacilities } from '@/lib/api';
import FacilityCard from '@/components/facility/FacilityCard';
import { Spinner } from '@/components/ui/Loading';

const valueProps = [
    {
        icon: <Zap size={22} className="text-primary" />,
        title: 'Instant Confirmation',
        desc: 'Reserve any turf, court, or lane in seconds — no waiting for the owner to confirm your slot.',
    },
    {
        icon: <ShieldCheck size={22} className="text-secondary" />,
        title: 'Secure Bookings',
        desc: 'Your session is protected with HTTPOnly cookie authentication, so every reservation stays private.',
    },
    {
        icon: <Activity size={22} className="text-accent" />,
        title: 'Verified Venues',
        desc: 'Every facility is listed by real owners with full details on capacity, pricing, and time slots.',
    },
];

const steps = [
    {
        icon: <Search size={22} />,
        title: 'Browse Facilities',
        desc: 'Explore football turfs, tennis courts, swimming lanes and badminton halls near you.',
    },
    {
        icon: <CalendarCheck size={22} />,
        title: 'Pick a Slot',
        desc: 'Choose your date, time slot, and number of hours — the price updates automatically.',
    },
    {
        icon: <Award size={22} />,
        title: 'Play & Enjoy',
        desc: 'Get your booking confirmed instantly and show up ready to play at your reserved arena.',
    },
];

const testimonials = [
    {
        name: 'Rakib Hasan',
        role: 'Amateur Footballer',
        quote: 'Booking a turf for our weekly match used to take endless phone calls. With SportNest it takes 30 seconds.',
    },
    {
        name: 'Nadia Islam',
        role: 'Tennis Coach',
        quote: 'I list all my club courts here and manage every reservation from one clean dashboard. Absolutely brilliant.',
    },
    {
        name: 'Tanvir Ahmed',
        role: 'Swimming Enthusiast',
        quote: 'The available time slots and pricing are crystal clear, so I always know exactly what I am paying for.',
    },
];

export default function Home() {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        getFacilities()
            .then((data) => {
                if (active) setFacilities(Array.isArray(data) ? data : []);
            })
            .catch(() => active && setFacilities([]))
            .finally(() => active && setLoading(false));
        return () => {
            active = false;
        };
    }, []);

    const featured = facilities.slice(0, 8);

    return (
        <div className="w-full bg-base-100 min-h-screen pb-20 transition-colors duration-300">
            {/* --- HERO --- */}
            <section className="relative overflow-hidden bg-base-200/50 border-b border-base-200 py-20 lg:py-28">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
                    <div className="absolute -top-40 left-10 w-96 h-96 rounded-full bg-primary blur-[120px]" />
                    <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-secondary blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-7 space-y-6 max-w-2xl mx-auto lg:mx-0"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold tracking-wide">
                            <Award size={14} /> The Ultimate Sports Booking
                            Platform
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-base-content leading-none">
                            Book Your Perfect{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-tr from-primary to-secondary">
                                Sports Facility
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg text-base-content/70 font-medium leading-relaxed">
                            Discover and reserve football turfs, tennis courts,
                            swimming lanes and badminton halls in your city.
                            Real-time availability for players and teams who
                            never want to miss a game.
                        </p>
                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link
                                href="/facilities"
                                className="btn btn-primary rounded-xl px-8 font-bold shadow-md shadow-primary/20 w-full sm:w-auto h-12 min-h-0 flex items-center justify-center gap-2 tracking-wide group"
                            >
                                Explore Facilities
                                <ArrowRight
                                    size={16}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </Link>
                            <Link
                                href="/register"
                                className="btn btn-ghost border border-base-300 hover:bg-base-200 rounded-xl px-8 font-bold w-full sm:w-auto h-12 min-h-0"
                            >
                                Create Free Account
                            </Link>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-5 hidden lg:block relative">
                        <div className="w-full h-96 rounded-3xl bg-gradient-to-tr from-primary/20 to-secondary/20 p-3 shadow-2xl relative group">
                            <Image
                                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80"
                                alt="SportNest premium sports facility"
                                fill
                                sizes="40vw"
                                className="object-cover rounded-2xl shadow-inner select-none p-3 transition-transform duration-500 group-hover:scale-[1.01]"
                            />
                            <div className="absolute -bottom-5 -left-5 bg-base-100 border border-base-200 rounded-2xl p-4 shadow-xl flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center font-bold">
                                    ✓
                                </div>
                                <div>
                                    <p className="text-xs font-black text-base-content leading-none">
                                        Booking Confirmed
                                    </p>
                                    <p className="text-[10px] text-base-content/50 font-bold mt-1">
                                        Real-time reservation
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- VALUE PROPS --- */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {valueProps.map((prop, idx) => (
                    <div
                        key={idx}
                        className="bg-base-200/40 border border-base-200/60 p-6 rounded-2xl flex flex-col items-center text-center sm:items-start sm:text-left gap-4 hover:border-base-300 transition-colors"
                    >
                        <div className="p-3 bg-base-100 rounded-xl border border-base-200 shadow-xs shrink-0">
                            {prop.icon}
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-extrabold text-base-content tracking-tight">
                                {prop.title}
                            </h3>
                            <p className="text-xs font-medium text-base-content/60 leading-relaxed">
                                {prop.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </section>

            {/* --- FEATURED FACILITIES (DYNAMIC / DATABASE) --- */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-center sm:text-left">
                    <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-black text-base-content tracking-tight">
                            Featured Facilities
                        </h2>
                        <p className="text-sm font-semibold text-base-content/50 max-w-md">
                            Top venues and multi-sport complexes open for booking
                            right now.
                        </p>
                    </div>
                    <Link
                        href="/facilities"
                        className="link link-primary font-bold text-sm flex items-center justify-center gap-1.5 no-underline hover:underline self-center sm:self-end"
                    >
                        View All Facilities <ArrowRight size={14} />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center gap-3 py-20 text-base-content/50">
                        <Spinner size={26} />
                        <span className="font-semibold text-sm">
                            Loading featured facilities...
                        </span>
                    </div>
                ) : featured.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featured.map((facility) => (
                            <FacilityCard
                                key={facility._id}
                                facility={facility}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 border border-dashed border-base-200 rounded-3xl bg-base-200/10">
                        <p className="text-sm font-semibold text-base-content/50">
                            No facilities are available yet. Please check back
                            soon or add your own facility.
                        </p>
                    </div>
                )}
            </section>

            {/* --- EXTRA SECTION 1: HOW IT WORKS --- */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 space-y-10">
                <div className="text-center space-y-2 max-w-xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-black text-base-content tracking-tight">
                        How SportNest Works
                    </h2>
                    <p className="text-sm font-semibold text-base-content/50">
                        Three simple steps between you and your next game.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className="relative bg-base-100 border border-base-200 rounded-2xl p-8 flex flex-col items-center text-center gap-4 hover:shadow-lg transition-all"
                        >
                            <span className="absolute top-4 right-5 text-5xl font-black text-base-200 select-none">
                                {idx + 1}
                            </span>
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                {step.icon}
                            </div>
                            <h3 className="font-extrabold text-lg text-base-content tracking-tight">
                                {step.title}
                            </h3>
                            <p className="text-sm font-medium text-base-content/60 leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- EXTRA SECTION 2: TESTIMONIALS --- */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 space-y-10">
                <div className="text-center space-y-2 max-w-xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-black text-base-content tracking-tight">
                        Loved by Players & Owners
                    </h2>
                    <p className="text-sm font-semibold text-base-content/50">
                        Thousands of athletes book and manage their facilities on
                        SportNest.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <div
                            key={idx}
                            className="bg-base-200/40 border border-base-200/60 rounded-2xl p-6 flex flex-col gap-4"
                        >
                            <Quote size={28} className="text-primary/40" />
                            <p className="text-sm font-medium text-base-content/70 leading-relaxed flex-grow">
                                “{t.quote}”
                            </p>
                            <div className="flex items-center gap-3 pt-3 border-t border-base-200">
                                <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-black text-sm">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-base-content">
                                        {t.name}
                                    </p>
                                    <p className="text-xs font-semibold text-base-content/40">
                                        {t.role}
                                    </p>
                                </div>
                                <div className="ml-auto flex items-center gap-0.5 text-warning">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={13}
                                            className="fill-warning"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- CTA BANNER --- */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-24">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-primary to-secondary p-10 sm:p-14 text-center shadow-xl">
                    <div className="relative z-10 space-y-5 max-w-2xl mx-auto">
                        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                            Own a Sports Facility?
                        </h2>
                        <p className="text-sm sm:text-base text-white/80 font-medium">
                            List your turf, court, or lane on SportNest and start
                            accepting bookings from players today.
                        </p>
                        <Link
                            href="/add-facility"
                            className="btn bg-white text-primary hover:bg-white/90 border-none rounded-xl px-8 font-bold h-12 min-h-0 inline-flex items-center gap-2"
                        >
                            List Your Facility <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
