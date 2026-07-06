'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    CalendarDays,
    Clock,
    DollarSign,
    XCircle,
    Ticket,
    CheckCircle2,
    Ban,
    Hourglass,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getMyBookings, cancelBooking } from '@/lib/api';
import Loading from '@/components/ui/Loading';
import ConfirmModal from '@/components/ui/ConfirmModal';

const STATUS_STYLES = {
    pending: {
        label: 'Pending',
        icon: <Hourglass size={13} />,
        className: 'bg-warning/10 text-warning border-warning/20',
    },
    confirmed: {
        label: 'Confirmed',
        icon: <CheckCircle2 size={13} />,
        className: 'bg-success/10 text-success border-success/20',
    },
    cancelled: {
        label: 'Cancelled',
        icon: <Ban size={13} />,
        className: 'bg-error/10 text-error border-error/20',
    },
};

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelTarget, setCancelTarget] = useState(null);
    const [cancelling, setCancelling] = useState(false);

    useEffect(() => {
        setLoading(true);
        getMyBookings()
            .then((data) => setBookings(Array.isArray(data) ? data : []))
            .catch((err) => toast.error(err.message || 'Failed to load bookings.'))
            .finally(() => setLoading(false));
    }, []);

    const handleCancel = async () => {
        if (!cancelTarget) return;
        setCancelling(true);
        try {
            await cancelBooking(cancelTarget._id);
            setBookings((prev) =>
                prev.map((b) =>
                    b._id === cancelTarget._id
                        ? { ...b, status: 'cancelled' }
                        : b,
                ),
            );
            toast.success('Booking cancelled.');
            setCancelTarget(null);
        } catch (err) {
            toast.error(err.message || 'Failed to cancel booking.');
        } finally {
            setCancelling(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-10 space-y-8">
            <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black text-base-content tracking-tight">
                    My Bookings
                </h1>
                <p className="text-sm font-semibold text-base-content/50">
                    Track and manage all your facility reservations.
                </p>
            </div>

            {loading ? (
                <Loading label="Loading your bookings..." />
            ) : bookings.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-base-200 rounded-3xl bg-base-100 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-base-200 text-base-content/40 flex items-center justify-center mx-auto">
                        <Ticket size={24} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-extrabold text-base-content">
                            No bookings yet
                        </h3>
                        <p className="text-sm text-base-content/50">
                            Browse facilities and reserve your first slot.
                        </p>
                    </div>
                    <Link
                        href="/facilities"
                        className="btn btn-primary btn-sm rounded-xl font-bold"
                    >
                        Explore Facilities
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => {
                        const facility = booking.facility_id;
                        const status =
                            STATUS_STYLES[booking.status] ||
                            STATUS_STYLES.pending;
                        const isCancelled = booking.status === 'cancelled';

                        return (
                            <div
                                key={booking._id}
                                className="bg-base-100 border border-base-200 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-md transition-all"
                            >
                                <div className="flex-grow space-y-2">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="font-extrabold text-base-content tracking-tight">
                                            {facility?.name ||
                                                'Facility (removed)'}
                                        </h3>
                                        <span
                                            className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${status.className}`}
                                        >
                                            {status.icon} {status.label}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-base-content/60">
                                        <span className="flex items-center gap-1.5">
                                            <CalendarDays
                                                size={14}
                                                className="text-primary"
                                            />
                                            {booking.booking_date}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock
                                                size={14}
                                                className="text-primary"
                                            />
                                            {booking.time_slot} ·{' '}
                                            {booking.hours}h
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <DollarSign
                                                size={14}
                                                className="text-primary"
                                            />
                                            <span className="text-base-content font-black">
                                                ${booking.total_price}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                <div className="shrink-0">
                                    {isCancelled ? (
                                        <span className="text-xs font-bold text-base-content/40">
                                            Cancelled
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                setCancelTarget(booking)
                                            }
                                            className="btn btn-sm rounded-xl font-bold border border-error/30 text-error bg-error/5 hover:bg-error/10 flex items-center gap-1.5"
                                        >
                                            <XCircle size={15} /> Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <ConfirmModal
                open={!!cancelTarget}
                title="Cancel this booking?"
                message={`Your reservation for "${
                    cancelTarget?.facility_id?.name || 'this facility'
                }" on ${cancelTarget?.booking_date} will be cancelled.`}
                confirmLabel="Cancel Booking"
                cancelLabel="Keep It"
                loading={cancelling}
                onConfirm={handleCancel}
                onCancel={() => setCancelTarget(null)}
            />
        </div>
    );
}
