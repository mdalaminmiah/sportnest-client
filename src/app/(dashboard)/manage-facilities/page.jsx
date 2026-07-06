'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Pencil,
    Trash2,
    Plus,
    MapPin,
    Users,
    DollarSign,
    X,
    Save,
    Building2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
    getMyFacilities,
    updateFacility,
    deleteFacility,
} from '@/lib/api';
import Loading, { Spinner } from '@/components/ui/Loading';
import ConfirmModal from '@/components/ui/ConfirmModal';
import {
    FACILITY_TYPES,
    FALLBACK_FACILITY_IMAGE as FALLBACK_IMAGE,
} from '@/lib/constants';

function EditModal({ facility, onClose, onSaved }) {
    const [form, setForm] = useState({
        name: facility.name,
        facility_type: facility.facility_type,
        location: facility.location,
        price_per_hour: facility.price_per_hour,
        capacity: facility.capacity,
        available_slots: (facility.available_slots || []).join(', '),
        description: facility.description,
        image: facility.image,
    });
    const [saving, setSaving] = useState(false);

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const updated = await updateFacility(facility._id, {
                name: form.name,
                facility_type: form.facility_type,
                location: form.location,
                price_per_hour: Number(form.price_per_hour),
                capacity: Number(form.capacity),
                available_slots: form.available_slots
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                description: form.description,
                image: form.image,
            });
            toast.success('Facility updated successfully!');
            onSaved(updated);
        } catch (err) {
            toast.error(err.message || 'Failed to update facility.');
        } finally {
            setSaving(false);
        }
    };

    const field =
        'w-full h-11 px-4 rounded-xl bg-base-200/40 border border-base-300 text-sm font-semibold focus:bg-base-100 focus:border-primary outline-none transition-all';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={saving ? undefined : onClose}
            />
            <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-base-100 border border-base-200 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black tracking-tight text-base-content">
                        Edit Facility
                    </h3>
                    <button
                        onClick={onClose}
                        disabled={saving}
                        className="btn btn-ghost btn-circle btn-sm"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-[11px] font-black uppercase tracking-wider text-base-content/50">
                                Facility Name
                            </label>
                            <input
                                name="name"
                                required
                                value={form.name}
                                onChange={handleChange}
                                className={field}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-wider text-base-content/50">
                                Type
                            </label>
                            <select
                                name="facility_type"
                                value={form.facility_type}
                                onChange={handleChange}
                                className={`${field} cursor-pointer`}
                            >
                                {FACILITY_TYPES.map((t) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-wider text-base-content/50">
                                Location
                            </label>
                            <input
                                name="location"
                                required
                                value={form.location}
                                onChange={handleChange}
                                className={field}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-wider text-base-content/50">
                                Price / hour ($)
                            </label>
                            <input
                                type="number"
                                name="price_per_hour"
                                min="1"
                                required
                                value={form.price_per_hour}
                                onChange={handleChange}
                                className={field}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-wider text-base-content/50">
                                Capacity
                            </label>
                            <input
                                type="number"
                                name="capacity"
                                min="1"
                                required
                                value={form.capacity}
                                onChange={handleChange}
                                className={field}
                            />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-[11px] font-black uppercase tracking-wider text-base-content/50">
                                Image URL
                            </label>
                            <input
                                type="url"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                className={field}
                            />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-[11px] font-black uppercase tracking-wider text-base-content/50">
                                Available Slots (comma separated)
                            </label>
                            <input
                                name="available_slots"
                                required
                                value={form.available_slots}
                                onChange={handleChange}
                                className={field}
                            />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-[11px] font-black uppercase tracking-wider text-base-content/50">
                                Description
                            </label>
                            <textarea
                                name="description"
                                required
                                rows="3"
                                value={form.description}
                                onChange={handleChange}
                                className="w-full p-3.5 rounded-xl bg-base-200/40 border border-base-300 text-sm font-semibold focus:bg-base-100 focus:border-primary outline-none transition-all leading-relaxed"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="btn btn-ghost border border-base-300 rounded-xl flex-1 font-bold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="btn btn-primary rounded-xl flex-1 font-bold flex items-center gap-2"
                        >
                            {saving ? (
                                <Spinner />
                            ) : (
                                <>
                                    <Save size={16} /> Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function ManageFacilitiesPage() {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const load = () => {
        setLoading(true);
        getMyFacilities()
            .then((data) => setFacilities(Array.isArray(data) ? data : []))
            .catch((err) => toast.error(err.message || 'Failed to load facilities.'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        load();
    }, []);

    const handleSaved = (updated) => {
        setFacilities((prev) =>
            prev.map((f) => (f._id === updated._id ? updated : f)),
        );
        setEditing(null);
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await deleteFacility(deleteTarget._id);
            setFacilities((prev) =>
                prev.filter((f) => f._id !== deleteTarget._id),
            );
            toast.success('Facility deleted.');
            setDeleteTarget(null);
        } catch (err) {
            toast.error(err.message || 'Failed to delete facility.');
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-base-content tracking-tight">
                        Manage My Facilities
                    </h1>
                    <p className="text-sm font-semibold text-base-content/50">
                        Update details or remove the facilities you own.
                    </p>
                </div>
                <Link
                    href="/add-facility"
                    className="btn btn-primary rounded-xl font-bold flex items-center gap-2 self-start"
                >
                    <Plus size={16} /> Add Facility
                </Link>
            </div>

            {loading ? (
                <Loading label="Loading your facilities..." />
            ) : facilities.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-base-200 rounded-3xl bg-base-100 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-base-200 text-base-content/40 flex items-center justify-center mx-auto">
                        <Building2 size={24} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-extrabold text-base-content">
                            No facilities yet
                        </h3>
                        <p className="text-sm text-base-content/50">
                            Add your first facility to start accepting bookings.
                        </p>
                    </div>
                    <Link
                        href="/add-facility"
                        className="btn btn-primary btn-sm rounded-xl font-bold"
                    >
                        <Plus size={15} /> Add Facility
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {facilities.map((facility) => (
                        <div
                            key={facility._id}
                            className="bg-base-100 border border-base-200 rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-all"
                        >
                            <div className="relative h-40 sm:h-auto sm:w-40 shrink-0 bg-base-200">
                                <Image
                                    src={facility.image || FALLBACK_IMAGE}
                                    alt={facility.name}
                                    fill
                                    sizes="160px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-5 flex flex-col flex-grow gap-3">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                                        {facility.facility_type}
                                    </span>
                                    <h3 className="font-extrabold text-base-content tracking-tight line-clamp-1 mt-1.5">
                                        {facility.name}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-base-content/50">
                                        <span className="flex items-center gap-1">
                                            <MapPin size={12} className="text-primary" />
                                            <span className="line-clamp-1">
                                                {facility.location}
                                            </span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <DollarSign size={12} className="text-primary" />
                                            {facility.price_per_hour}/hr
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users size={12} className="text-primary" />
                                            {facility.capacity}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-auto pt-2">
                                    <button
                                        onClick={() => setEditing(facility)}
                                        className="btn btn-sm rounded-xl font-bold flex-1 border border-base-300 bg-base-100 hover:bg-base-200 flex items-center gap-1.5"
                                    >
                                        <Pencil size={14} /> Edit
                                    </button>
                                    <button
                                        onClick={() => setDeleteTarget(facility)}
                                        className="btn btn-sm rounded-xl font-bold flex-1 border border-error/30 text-error bg-error/5 hover:bg-error/10 flex items-center gap-1.5"
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {editing && (
                <EditModal
                    facility={editing}
                    onClose={() => setEditing(null)}
                    onSaved={handleSaved}
                />
            )}

            <ConfirmModal
                open={!!deleteTarget}
                title="Delete this facility?"
                message={`"${deleteTarget?.name}" will be permanently removed. This action cannot be undone.`}
                confirmLabel="Delete"
                loading={deleting}
                onConfirm={handleDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </div>
    );
}
