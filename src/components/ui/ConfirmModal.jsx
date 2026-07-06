'use client';

import { AlertTriangle } from 'lucide-react';
import { Spinner } from '@/components/ui/Loading';

/**
 * Accessible confirmation dialog. Used before destructive actions such as
 * deleting a facility or cancelling a booking (assignment requires confirm).
 */
export default function ConfirmModal({
    open,
    title = 'Are you sure?',
    message = 'This action cannot be undone.',
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    loading = false,
    onConfirm,
    onCancel,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={loading ? undefined : onCancel}
            />
            <div className="relative z-10 w-full max-w-sm bg-base-100 border border-base-200 rounded-3xl shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-error/10 text-error flex items-center justify-center">
                        <AlertTriangle size={26} />
                    </div>
                    <h3 className="text-lg font-black tracking-tight text-base-content">
                        {title}
                    </h3>
                    <p className="text-sm text-base-content/60 leading-relaxed">
                        {message}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="btn btn-ghost border border-base-300 rounded-xl flex-1 font-bold"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="btn btn-error text-error-content rounded-xl flex-1 font-bold"
                    >
                        {loading ? <Spinner /> : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
