'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Building2,
    MapPin,
    DollarSign,
    Users,
    Clock,
    FileText,
    ArrowLeft,
    Save,
    Image as ImageIcon,
    Eye,
    Star,
    ShieldCheck,
    CheckCircle2,
    AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { createFacility } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import {
    FACILITY_TYPES,
    FALLBACK_FACILITY_IMAGE,
    DEFAULT_SLOTS,
} from '@/lib/constants';

const inputClass =
    'w-full h-11 pl-10 pr-4 rounded-xl bg-base-200/50 border border-base-300 text-sm font-semibold focus:bg-base-100 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none';

// Small tick/alert indicator shown next to a field label.
function ValidIndicator({ valid }) {
    return valid ? (
        <CheckCircle2 size={12} className="text-success" />
    ) : (
        <AlertCircle size={12} className="text-warning" />
    );
}

export default function AddFacilityPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        facility_type: FACILITY_TYPES[0],
        location: '',
        price_per_hour: '',
        capacity: '',
        available_slots: DEFAULT_SLOTS,
        description: '',
        image_url: '',
    });

    const isNameValid = formData.name.trim().length >= 3;
    const isLocationValid = formData.location.trim().length >= 5;
    const isPriceValid = Number(formData.price_per_hour) > 0;
    const isCapacityValid = Number(formData.capacity) > 0;
    const isDescriptionValid = formData.description.trim().length >= 10;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (
            !isNameValid ||
            !isLocationValid ||
            !isPriceValid ||
            !isCapacityValid ||
            !isDescriptionValid
        ) {
            toast.error('Please complete all fields correctly before saving.');
            return;
        }

        setLoading(true);
        const payload = {
            name: formData.name.trim(),
            facility_type: formData.facility_type,
            location: formData.location.trim(),
            price_per_hour: Number(formData.price_per_hour),
            capacity: Number(formData.capacity),
            available_slots: formData.available_slots
                .split(',')
                .map((slot) => slot.trim())
                .filter(Boolean),
            description: formData.description.trim(),
            image: formData.image_url.trim() || FALLBACK_FACILITY_IMAGE,
        };

        try {
            await createFacility(payload);
            toast.success('Facility added successfully!');
            router.push('/manage-facilities');
        } catch (error) {
            toast.error(error.message || 'Failed to add facility.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-base-200/40 text-base-content p-4 sm:p-6 lg:p-10 transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="w-10 h-10 border border-base-300 hover:border-primary rounded-xl flex items-center justify-center text-base-content/70 hover:text-primary transition-all bg-base-100"
                            aria-label="Go back"
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <div className="space-y-0.5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                                Add Facility
                            </p>
                            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                                List a New Facility
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Form */}
                    <form
                        onSubmit={handleFormSubmit}
                        className="lg:col-span-7 space-y-6 bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-200 shadow-sm"
                    >
                        <div className="pb-2 border-b border-base-200">
                            <h2 className="text-sm font-black uppercase tracking-wider text-base-content/80">
                                Facility Details
                            </h2>
                            <p className="text-xs text-base-content/50 font-medium mt-0.5">
                                Fill in the information players will see when
                                booking.
                            </p>
                        </div>

                        {/* Name + type */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <span className="text-[10px] font-black uppercase text-base-content/60 tracking-wider mb-2 flex items-center justify-between">
                                    Facility Name
                                    <ValidIndicator valid={isNameValid} />
                                </span>
                                <div className="relative flex items-center">
                                    <span className="absolute left-3.5 text-base-content/40">
                                        <Building2 size={14} />
                                    </span>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="e.g., Riverside Football Turf"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <span className="text-[10px] font-black uppercase text-base-content/60 tracking-wider mb-2 block">
                                    Facility Type
                                </span>
                                <select
                                    name="facility_type"
                                    value={formData.facility_type}
                                    onChange={handleInputChange}
                                    className="w-full h-11 px-3 rounded-xl bg-base-200/50 border border-base-300 text-sm font-bold focus:bg-base-100 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none cursor-pointer"
                                >
                                    {FACILITY_TYPES.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Location + image */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <span className="text-[10px] font-black uppercase text-base-content/60 tracking-wider mb-2 flex items-center justify-between">
                                    Location
                                    <ValidIndicator valid={isLocationValid} />
                                </span>
                                <div className="relative flex items-center">
                                    <span className="absolute left-3.5 text-base-content/40">
                                        <MapPin size={14} />
                                    </span>
                                    <input
                                        type="text"
                                        name="location"
                                        required
                                        placeholder="e.g., 52 Wall Street, New York"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <span className="text-[10px] font-black uppercase text-base-content/60 tracking-wider mb-2 block">
                                    Image URL (imgbb / postimage)
                                </span>
                                <div className="relative flex items-center">
                                    <span className="absolute left-3.5 text-base-content/40">
                                        <ImageIcon size={14} />
                                    </span>
                                    <input
                                        type="url"
                                        name="image_url"
                                        placeholder="https://i.ibb.co/..."
                                        value={formData.image_url}
                                        onChange={handleInputChange}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Price + capacity */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <span className="text-[10px] font-black uppercase text-base-content/60 tracking-wider mb-2 flex items-center justify-between">
                                    Price Per Hour (USD)
                                    <ValidIndicator valid={isPriceValid} />
                                </span>
                                <div className="relative flex items-center">
                                    <span className="absolute left-3.5 text-base-content/40">
                                        <DollarSign size={14} />
                                    </span>
                                    <input
                                        type="number"
                                        name="price_per_hour"
                                        required
                                        min="1"
                                        placeholder="50"
                                        value={formData.price_per_hour}
                                        onChange={handleInputChange}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <span className="text-[10px] font-black uppercase text-base-content/60 tracking-wider mb-2 flex items-center justify-between">
                                    Capacity
                                    <ValidIndicator valid={isCapacityValid} />
                                </span>
                                <div className="relative flex items-center">
                                    <span className="absolute left-3.5 text-base-content/40">
                                        <Users size={14} />
                                    </span>
                                    <input
                                        type="number"
                                        name="capacity"
                                        required
                                        min="1"
                                        placeholder="16"
                                        value={formData.capacity}
                                        onChange={handleInputChange}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Slots */}
                        <div>
                            <span className="text-[10px] font-black uppercase text-base-content/60 tracking-wider mb-2 block">
                                Available Time Slots (comma separated)
                            </span>
                            <div className="relative flex items-center">
                                <span className="absolute left-3.5 text-base-content/40">
                                    <Clock size={14} />
                                </span>
                                <input
                                    type="text"
                                    name="available_slots"
                                    required
                                    placeholder="08:00 - 10:00, 16:00 - 18:00"
                                    value={formData.available_slots}
                                    onChange={handleInputChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <span className="text-[10px] font-black uppercase text-base-content/60 tracking-wider mb-2 flex items-center justify-between">
                                Description
                                <ValidIndicator valid={isDescriptionValid} />
                            </span>
                            <div className="relative flex items-start">
                                <span className="absolute left-3.5 top-3.5 text-base-content/40">
                                    <FileText size={14} />
                                </span>
                                <textarea
                                    name="description"
                                    required
                                    rows="4"
                                    placeholder="Describe the facility — surface type, lighting, amenities, parking, and anything players should know."
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full p-3.5 pl-10 rounded-xl bg-base-200/50 border border-base-300 text-sm font-semibold focus:bg-base-100 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none leading-relaxed"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 border-t border-base-200 flex flex-col sm:flex-row items-center gap-3">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="btn btn-ghost w-full sm:w-auto border border-base-300 rounded-xl font-bold uppercase tracking-wider text-xs"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-full sm:flex-1 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-sm" />
                                ) : (
                                    <>
                                        <Save size={14} /> Save Facility
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Live preview */}
                    <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                        <div className="bg-base-100 p-6 rounded-3xl border border-base-200 shadow-sm space-y-4">
                            <div className="space-y-1">
                                <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                                    <Eye size={14} /> Live Preview
                                </h3>
                                <p className="text-[11px] text-base-content/50 font-semibold">
                                    This is how your facility card will look to
                                    players.
                                </p>
                            </div>

                            <div className="w-full border border-base-300 rounded-2xl overflow-hidden shadow-md">
                                <div className="relative h-48 w-full bg-base-200 overflow-hidden">
                                    {/* Preview uses a plain img so any URL renders instantly */}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={
                                            formData.image_url ||
                                            FALLBACK_FACILITY_IMAGE
                                        }
                                        alt="Facility preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                FALLBACK_FACILITY_IMAGE;
                                        }}
                                    />
                                    <span className="absolute top-3 left-3 bg-base-100/95 backdrop-blur-xs text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-xl border border-base-300">
                                        {formData.facility_type}
                                    </span>
                                </div>

                                <div className="p-5 space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between text-[10px] font-bold text-base-content/40 uppercase tracking-wider">
                                            <span className="flex items-center gap-1 max-w-[75%] line-clamp-1">
                                                <MapPin
                                                    size={11}
                                                    className="text-primary shrink-0"
                                                />
                                                {formData.location ||
                                                    'Location'}
                                            </span>
                                            <span className="flex items-center gap-0.5 text-base-content font-black shrink-0">
                                                <Users
                                                    size={11}
                                                    className="text-primary"
                                                />
                                                {formData.capacity || '0'}
                                            </span>
                                        </div>
                                        <h4 className="font-black text-base text-base-content tracking-tight line-clamp-1">
                                            {formData.name || 'Facility Name'}
                                        </h4>
                                    </div>

                                    <p className="text-xs font-medium text-base-content/50 line-clamp-2 leading-relaxed h-8">
                                        {formData.description ||
                                            'Your facility description will appear here as you type.'}
                                    </p>

                                    <div className="pt-4 border-t border-base-200 flex items-center justify-between gap-2">
                                        <div>
                                            <span className="text-lg font-black">
                                                ${formData.price_per_hour || '0'}
                                            </span>
                                            <span className="text-[10px] font-bold text-base-content/40">
                                                {' '}
                                                / hour
                                            </span>
                                        </div>
                                        <span className="text-[10px] uppercase font-black tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-xl">
                                            Book Now
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Owner info */}
                            <div className="border border-base-200 bg-base-200/40 p-4 rounded-xl space-y-2 text-[11px] font-semibold text-base-content/60">
                                <div className="flex items-center gap-1.5 text-base-content/80 font-bold border-b border-base-300 pb-2 mb-1">
                                    <ShieldCheck
                                        size={14}
                                        className="text-success"
                                    />
                                    Owner Details
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <span>Owner Email</span>
                                    <span className="font-mono text-base-content bg-base-100 px-2 py-0.5 border border-base-200 rounded-md truncate max-w-[60%]">
                                        {user?.email || '—'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Initial Bookings</span>
                                    <span className="flex items-center gap-1 text-warning font-bold">
                                        <Star size={11} className="fill-warning" />
                                        0
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
