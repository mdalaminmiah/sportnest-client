'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
    MapPin,
    Users,
    Clock,
    DollarSign,
    CalendarDays,
    ArrowLeft,
    Tag,
    CheckCircle2,
    Mail,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getFacility, createBooking } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Loading, { Spinner } from '@/components/ui/Loading';
import { FALLBACK_FACILITY_IMAGE as FALLBACK_IMAGE } from '@/lib/constants';

function FacilityDetails() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuth();

    const [facility, setFacility] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        booking_date: '',
        time_slot: '',
        hours: 1,
    });

    useEffect(() => {
        let active = true;
        getFacility(id)
            .then((data) => {
                if (!active) return;
                setFacility(data);
                setForm((prev) => ({
                    ...prev,
                    time_slot: data?.available_slots?.[0] || '',
                }));
            })
            .catch(() => active && setNotFound(true))
            .finally(() => active && setLoading(false));
        return () => {
            active = false;
        };
    }, [id]);

    if (loading) return <Loading label="Loading facility details..." />;

    if (notFound || !facility) {
        return (
            <div className="max-w-lg mx-auto text-center py-24 px-6 space-y-4">
                <h2 className="text-2xl font-black text-base-content">
                    Facility not found
                </h2>
                <p className="text-sm text-base-content/60">
                    This facility may have been removed or the link is invalid.
                </p>
                <Link
                    href="/facilities"
                    className="btn btn-primary rounded-xl font-bold"
                >
                    Browse All Facilities
                </Link>
            </div>
        );
    }

    const totalPrice = Number(form.hours || 0) * facility.price_per_hour;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.booking_date || !form.time_slot || !form.hours) {
            toast.error('Please complete every booking field.');
            return;
        }
        if (Number(form.hours) < 1) {
            toast.error('Hours must be at least 1.');
            return;
        }

        setSubmitting(true);
        try {
            await createBooking({
                facility_id: facility._id,
                booking_date: form.booking_date,
                time_slot: form.time_slot,
                hours: Number(form.hours),
                total_price: totalPrice,
            });
            toast.success('Booking confirmed! Redirecting to your bookings...');
            setTimeout(() => router.push('/my-bookings'), 1200);
        } catch (err) {
            toast.error(err.message || 'Could not create your booking.');
        } finally {
            setSubmitting(false);
        }
    };

    // Minimum selectable date = today.
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="w-full bg-base-100 min-h-screen pb-24 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-10 space-y-8">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 text-sm font-bold text-base-content/60 hover:text-primary transition-colors"
                >
                    <ArrowLeft size={16} /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* --- LEFT: DETAILS --- */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden bg-base-200 shadow-lg">
                            <Image
                                src={facility.image || FALLBACK_IMAGE}
                                alt={facility.name}
                                fill
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                className="object-cover"
                            />
                            <span className="absolute top-4 left-4 bg-base-100/90 backdrop-blur-md text-base-content text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm border border-base-200 flex items-center gap-1.5">
                                <Tag size={12} className="text-primary" />
                                {facility.facility_type}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
                                {facility.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-base-content/60">
                                <span className="flex items-center gap-1.5">
                                    <MapPin size={16} className="text-primary" />
                                    {facility.location}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Users size={16} className="text-primary" />
                                    Capacity {facility.capacity}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Mail size={16} className="text-primary" />
                                    {facility.owner_email}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="bg-base-200/40 border border-base-200 rounded-2xl p-4">
                                <p className="text-[10px] font-black uppercase tracking-wider text-base-content/40">
                                    Price / hour
                                </p>
                                <p className="text-xl font-black text-base-content mt-1">
                                    ${facility.price_per_hour}
                                </p>
                            </div>
                            <div className="bg-base-200/40 border border-base-200 rounded-2xl p-4">
                                <p className="text-[10px] font-black uppercase tracking-wider text-base-content/40">
                                    Capacity
                                </p>
                                <p className="text-xl font-black text-base-content mt-1">
                                    {facility.capacity}
                                </p>
                            </div>
                            <div className="bg-base-200/40 border border-base-200 rounded-2xl p-4">
                                <p className="text-[10px] font-black uppercase tracking-wider text-base-content/40">
                                    Total Bookings
                                </p>
                                <p className="text-xl font-black text-base-content mt-1">
                                    {facility.booking_count || 0}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-extrabold text-base-content">
                                About this facility
                            </h3>
                            <p className="text-sm text-base-content/60 leading-relaxed">
                                {facility.description}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-extrabold text-base-content">
                                Available time slots
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {facility.available_slots?.map((slot) => (
                                    <span
                                        key={slot}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20"
                                    >
                                        <Clock size={12} /> {slot}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT: BOOKING FORM --- */}
                    <div className="lg:col-span-5 lg:sticky lg:top-24">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-base-100 border border-base-200 rounded-3xl shadow-lg p-6 sm:p-8 space-y-5"
                        >
                            <div className="space-y-1">
                                <h2 className="text-lg font-black text-base-content tracking-tight">
                                    Book This Facility
                                </h2>
                                <p className="text-xs font-semibold text-base-content/50">
                                    Reserve your slot in a few clicks.
                                </p>
                            </div>

                            {/* Facility name (read-only) */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black uppercase tracking-wider text-base-content/50">
                                    Facility Name
                                </label>
                                <div className="w-full h-11 px-4 rounded-xl bg-base-200/60 border border-base-200 text-sm font-bold text-base-content flex items-center">
                                    {facility.name}
                                </div>
                            </div>

                            {/* Booking date */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black uppercase tracking-wider text-base-content/50">
                                    Booking Date
                                </label>
                                <div className="relative flex items-center">
                                    <CalendarDays
                                        size={15}
                                        className="absolute left-3.5 text-base-content/40"
                                    />
                                    <input
                                        type="date"
                                        name="booking_date"
                                        min={today}
                                        required
                                        value={form.booking_date}
                                        onChange={handleChange}
                                        className="w-full h-11 pl-10 pr-3 rounded-xl bg-base-200/40 border border-base-300 text-sm font-semibold focus:bg-base-100 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Time slot */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black uppercase tracking-wider text-base-content/50">
                                    Time Slot
                                </label>
                                <div className="relative flex items-center">
                                    <Clock
                                        size={15}
                                        className="absolute left-3.5 text-base-content/40 z-10"
                                    />
                                    <select
                                        name="time_slot"
                                        required
                                        value={form.time_slot}
                                        onChange={handleChange}
                                        className="w-full h-11 pl-10 pr-3 rounded-xl bg-base-200/40 border border-base-300 text-sm font-semibold focus:bg-base-100 focus:border-primary outline-none transition-all cursor-pointer"
                                    >
                                        {facility.available_slots?.map((slot) => (
                                            <option key={slot} value={slot}>
                                                {slot}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black uppercase tracking-wider text-base-content/50">
                                    Number of Hours
                                </label>
                                <input
                                    type="number"
                                    name="hours"
                                    min="1"
                                    max="12"
                                    required
                                    value={form.hours}
                                    onChange={handleChange}
                                    className="w-full h-11 px-4 rounded-xl bg-base-200/40 border border-base-300 text-sm font-semibold focus:bg-base-100 focus:border-primary outline-none transition-all"
                                />
                            </div>

                            {/* Total price */}
                            <div className="flex items-center justify-between rounded-2xl bg-primary/5 border border-primary/20 px-4 py-3">
                                <span className="text-xs font-black uppercase tracking-wider text-base-content/60 flex items-center gap-1.5">
                                    <DollarSign
                                        size={14}
                                        className="text-primary"
                                    />
                                    Total Price
                                </span>
                                <span className="text-2xl font-black text-primary">
                                    ${totalPrice || 0}
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn btn-primary w-full h-12 rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-2"
                            >
                                {submitting ? (
                                    <Spinner />
                                ) : (
                                    <>
                                        <CheckCircle2 size={18} /> Confirm
                                        Booking
                                    </>
                                )}
                            </button>

                            <p className="text-[11px] text-center font-semibold text-base-content/40">
                                Booking as{' '}
                                <span className="text-base-content/60">
                                    {user?.email}
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FacilityDetailsPage() {
    return (
        <ProtectedRoute>
            <FacilityDetails />
        </ProtectedRoute>
    );
}
