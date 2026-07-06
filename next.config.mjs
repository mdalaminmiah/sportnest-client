// Where the backend actually lives. Overridable per-environment via
// API_PROXY_TARGET (e.g. a local backend during development).
const API_TARGET =
    process.env.API_PROXY_TARGET || 'https://sportnest-api.vercel.app';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
            },
        ],
    },
    // Reverse-proxy the API through this app's own origin so auth cookies stay
    // first-party. This sidesteps the *.vercel.app public-suffix cookie
    // isolation and removes the need for cross-site CORS + SameSite=None.
    async rewrites() {
        return [
            {
                source: '/api/auth/:path*',
                destination: `${API_TARGET}/api/auth/:path*`,
            },
            {
                source: '/api/v1/:path*',
                destination: `${API_TARGET}/api/v1/:path*`,
            },
        ];
    },
};

export default nextConfig;
