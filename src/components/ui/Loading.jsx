import { Loader2 } from 'lucide-react';

// Full-viewport loading spinner used while data or the session is resolving.
export default function Loading({ label = 'Loading...' }) {
    return (
        <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-4 text-base-content/60">
            <Loader2 className="animate-spin text-primary" size={40} />
            <p className="text-sm font-semibold tracking-wide">{label}</p>
        </div>
    );
}

// Small inline spinner for buttons and compact areas.
export function Spinner({ size = 18 }) {
    return <Loader2 className="animate-spin" size={size} />;
}
