'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, ArrowUpRight, Flame } from 'lucide-react';
import { FALLBACK_FACILITY_IMAGE as FALLBACK_IMAGE } from '@/lib/constants';

// Reusable facility card used on Home, All Facilities and Manage pages.
export default function FacilityCard({ facility }) {
    const id = facility._id || facility.id;

    return (
        <div className="group bg-base-100 border border-base-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-base-300 transition-all duration-300 flex flex-col h-full">
            {/* Image */}
            <div className="relative h-52 w-full bg-base-200 overflow-hidden shrink-0">
                <Image
                    src={facility.image || FALLBACK_IMAGE}
                    alt={facility.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                />
                <span className="absolute top-3 left-3 bg-base-100/90 backdrop-blur-md text-base-content text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm border border-base-200">
                    {facility.facility_type}
                </span>
                {facility.booking_count > 0 && (
                    <span className="absolute bottom-3 right-3 bg-secondary text-secondary-content text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                        <Flame size={10} className="fill-current" />
                        {facility.booking_count} Booked
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow justify-between gap-5">
                <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-base-content/50">
                        <div className="flex items-center gap-1 max-w-[65%]">
                            <MapPin size={13} className="text-primary shrink-0" />
                            <span className="line-clamp-1">
                                {facility.location}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                            <Users size={13} className="text-primary" />
                            <span className="text-base-content font-black">
                                {facility.capacity}
                            </span>
                        </div>
                    </div>
                    <h3 className="font-extrabold text-lg text-base-content tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                        {facility.name}
                    </h3>
                    <p className="text-xs font-medium text-base-content/50 line-clamp-2 leading-relaxed">
                        {facility.description}
                    </p>
                </div>

                <div className="pt-4 border-t border-base-200 flex items-center justify-between gap-2 mt-auto">
                    <div>
                        <span className="text-xl font-black text-base-content">
                            ${facility.price_per_hour}
                        </span>
                        <span className="text-xs font-semibold text-base-content/40">
                            {' '}
                            / hour
                        </span>
                    </div>
                    <Link
                        href={`/facilities/${id}`}
                        className="btn btn-primary btn-sm rounded-xl font-bold tracking-wide shadow-xs px-4 flex items-center gap-1.5 group/btn"
                    >
                        Book Now
                        <ArrowUpRight
                            size={14}
                            className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}
