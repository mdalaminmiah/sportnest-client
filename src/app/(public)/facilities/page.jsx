'use client';

import { useState, useEffect } from 'react';
import {
    Search,
    X,
    Sparkles,
    Activity,
    Layers,
    Compass,
    Zap,
    Flame,
    Trophy,
} from 'lucide-react';
import { getFacilities } from '@/lib/api';
import FacilityCard from '@/components/facility/FacilityCard';
import { Spinner } from '@/components/ui/Loading';

const categories = [
    { label: 'All', value: '', icon: <Layers size={14} /> },
    { label: 'Football Turf', value: 'Football Turf', icon: <Compass size={14} /> },
    { label: 'Tennis Court', value: 'Tennis Court', icon: <Trophy size={14} /> },
    { label: 'Swimming Lane', value: 'Swimming Lane', icon: <Zap size={14} /> },
    {
        label: 'Badminton Court',
        value: 'Badminton Court',
        icon: <Flame size={14} />,
    },
];

export default function FacilitiesPage() {
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);

    // Debounce the search box so we don't fire a request on every keystroke.
    useEffect(() => {
        const t = setTimeout(() => setSearch(searchInput.trim()), 400);
        return () => clearTimeout(t);
    }, [searchInput]);

    // Fetch from the backend whenever the search term or type filter changes.
    useEffect(() => {
        let active = true;
        setLoading(true);
        getFacilities({ search, type })
            .then((data) => {
                if (active) setFacilities(Array.isArray(data) ? data : []);
            })
            .catch(() => active && setFacilities([]))
            .finally(() => active && setLoading(false));
        return () => {
            active = false;
        };
    }, [search, type]);

    const resetFilters = () => {
        setSearchInput('');
        setSearch('');
        setType('');
    };

    return (
        <div className="w-full bg-base-100 min-h-screen pb-24 transition-colors duration-300 relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            {/* --- HEADER + SEARCH --- */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8 space-y-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                            <Sparkles size={11} /> All Venues
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black text-base-content tracking-tight">
                            Find Your Next{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Arena
                            </span>
                        </h1>
                        <p className="text-sm font-semibold text-base-content/50 max-w-xl">
                            Search and filter verified football turfs, tennis
                            courts, swimming lanes and badminton halls.
                        </p>
                    </div>

                    <div className="relative flex items-center w-full md:w-96 group shadow-sm rounded-2xl overflow-hidden border border-base-200 bg-base-100 focus-within:border-primary focus-within:shadow-md transition-all duration-300">
                        <span className="absolute left-4 text-base-content/30 group-focus-within:text-primary transition-colors">
                            <Search size={16} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search facilities by name..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="input w-full h-12 pl-12 pr-10 rounded-none bg-transparent border-none text-sm font-semibold focus:outline-none placeholder:text-base-content/30"
                        />
                        {searchInput && (
                            <button
                                onClick={() => setSearchInput('')}
                                className="absolute right-3 p-1 rounded-md text-base-content/40 hover:bg-base-200 transition-colors"
                                aria-label="Clear search"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Category filter pills */}
                <div className="w-full border-t border-base-200/60 pt-6">
                    <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
                        {categories.map((cat) => {
                            const isActive = type === cat.value;
                            return (
                                <button
                                    key={cat.label}
                                    onClick={() => setType(cat.value)}
                                    className={`h-11 px-4 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all duration-200 border whitespace-nowrap shrink-0 cursor-pointer ${
                                        isActive
                                            ? 'bg-primary border-primary text-primary-content shadow-lg shadow-primary/20'
                                            : 'bg-base-100 border-base-200 text-base-content/70 hover:border-base-300 hover:bg-base-200/20'
                                    }`}
                                >
                                    <span
                                        className={
                                            isActive
                                                ? 'text-primary-content'
                                                : 'text-base-content/40'
                                        }
                                    >
                                        {cat.icon}
                                    </span>
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- RESULTS --- */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex items-center justify-between text-[10px] font-bold text-base-content/40 uppercase tracking-widest border-b border-base-200/60 pb-3 mb-8">
                    <p>
                        {loading
                            ? 'Loading facilities...'
                            : `${facilities.length} ${
                                  facilities.length === 1
                                      ? 'facility'
                                      : 'facilities'
                              } found`}
                    </p>
                    {(search || type) && (
                        <button
                            onClick={resetFilters}
                            className="text-primary hover:underline"
                        >
                            Clear filters
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="flex items-center justify-center gap-3 py-24 text-base-content/50">
                        <Spinner size={26} />
                        <span className="font-semibold text-sm">
                            Fetching venues...
                        </span>
                    </div>
                ) : facilities.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {facilities.map((facility) => (
                            <FacilityCard
                                key={facility._id}
                                facility={facility}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="w-full text-center py-20 border border-dashed border-base-200 rounded-3xl bg-base-200/10 max-w-md mx-auto space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-base-200 text-base-content/30 flex items-center justify-center mx-auto">
                            <Activity size={18} />
                        </div>
                        <div className="space-y-1 px-4">
                            <h3 className="font-extrabold text-base-content text-sm">
                                No facilities found
                            </h3>
                            <p className="text-xs font-semibold text-base-content/40 max-w-xs mx-auto leading-normal">
                                Try a different search term or category. Reset
                                the filters to see everything.
                            </p>
                        </div>
                        <button
                            onClick={resetFilters}
                            className="btn btn-neutral btn-sm h-9 px-4 rounded-xl font-bold text-xs"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}
