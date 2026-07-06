// Centralised API client for the SportNest backend.
// Every request includes credentials so the HTTPOnly JWT cookie flows through.
//
// All requests are SAME-ORIGIN relative paths. This Next.js app reverse-proxies
// `/api/*` to the backend (see next.config.mjs), which keeps the auth cookie
// first-party and removes any need for cross-site CORS. We deliberately do NOT
// read NEXT_PUBLIC_API_URL here — a stray absolute value would break the proxy
// and re-introduce CORS. To point at a different backend, change
// API_PROXY_TARGET in next.config.mjs instead.

const SPORTS = '/api/v1/sports';

async function request(url, options = {}) {
    const res = await fetch(url, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

    let body = null;
    try {
        body = await res.json();
    } catch {
        body = null;
    }

    if (!res.ok || (body && body.success === false)) {
        const message =
            body?.message || `Request failed with status ${res.status}`;
        const error = new Error(message);
        error.status = res.status;
        throw error;
    }

    // Backend envelope: { success, message, data }
    return body?.data ?? body;
}

/* ---------------------------- Facilities ---------------------------- */

export function getFacilities({ search = '', type = '' } = {}) {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (type) params.set('type', type);
    const qs = params.toString();
    return request(`${SPORTS}/all${qs ? `?${qs}` : ''}`);
}

export function getFacility(id) {
    return request(`${SPORTS}/facility/${id}`);
}

export function getMyFacilities() {
    return request(`${SPORTS}/my-facilities`);
}

export function createFacility(payload) {
    return request(`${SPORTS}/create`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export function updateFacility(id, payload) {
    return request(`${SPORTS}/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
}

export function deleteFacility(id) {
    return request(`${SPORTS}/delete/${id}`, { method: 'DELETE' });
}

/* ----------------------------- Bookings ----------------------------- */

export function createBooking(payload) {
    return request(`${SPORTS}/book`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export function getMyBookings() {
    return request(`${SPORTS}/my-bookings`);
}

export function cancelBooking(id) {
    return request(`${SPORTS}/cancel/${id}`, { method: 'PATCH' });
}

/* --------------------------- Google OAuth --------------------------- */

// Kicks off Better Auth's Google flow and redirects the browser to Google.
// Same-origin so the OAuth state cookies stay first-party through the proxy.
export async function startGoogleLogin(callbackPath = '/') {
    const callbackURL = `${window.location.origin}${callbackPath}`;
    const res = await fetch('/api/auth/sign-in/social', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'google', callbackURL }),
    });
    const data = await res.json();
    if (data?.url) {
        window.location.href = data.url;
        return;
    }
    throw new Error('Unable to start Google sign-in. Please try again.');
}
