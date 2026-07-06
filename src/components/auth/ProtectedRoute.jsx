'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Loading from '@/components/ui/Loading';

/**
 * Guards a private route. While the session is being verified we show a spinner
 * (this is what prevents a logged-in user from being kicked to /login on reload).
 * Only once loading has settled and there is still no user do we redirect.
 */
export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
    }, [loading, user, router, pathname]);

    if (loading) {
        return <Loading label="Verifying your session..." />;
    }

    if (!user) {
        return <Loading label="Redirecting to sign in..." />;
    }

    return children;
}
