'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { startGoogleLogin } from '@/lib/api';
import { Spinner } from '@/components/ui/Loading';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/';
    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleInputChange = (e) =>
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(formData),
                },
            );
            const result = await res.json();

            if (result.success) {
                login(result);
                toast.success('Welcome back!');
                router.push(redirectTo);
            } else {
                const msg = result.message || 'Invalid email or password.';
                toast.error(msg);
                setError(msg);
            }
        } catch (err) {
            const msg = 'Could not reach the server. Please try again.';
            toast.error(msg);
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);
        try {
            await startGoogleLogin(redirectTo);
        } catch (err) {
            toast.error(err.message || 'Google sign-in failed.');
            setGoogleLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] w-full">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-base-100 border border-base-200 shadow-2xl rounded-3xl p-6 sm:p-10 relative z-10 mx-4"
            >
                <div className="text-center space-y-2 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="text-sm font-semibold text-base-content/50">
                        Sign in to book and manage your facilities.
                    </p>
                </div>

                {error && (
                    <div className="alert alert-error shadow-sm text-xs font-semibold py-3 mb-5 rounded-xl flex items-start gap-2">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                {/* Google */}
                <button
                    type="button"
                    onClick={handleGoogle}
                    disabled={googleLoading}
                    className="btn btn-outline w-full h-12 rounded-xl border-base-300 hover:bg-base-200 hover:text-base-content gap-2 normal-case font-bold"
                >
                    {googleLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#EA4335"
                                    d="M12.24 10.285V14.4h6.887c-.315 1.886-2.135 5.542-6.887 5.542-4.09 0-7.43-3.39-7.43-7.57s3.34-7.57 7.43-7.57c2.33 0 3.89.97 4.78 1.83l3.3-3.17C18.24 1.57 15.53 1 12.24 1 6.13 1 1.16 5.97 1.16 12s4.97 11 11.08 11c6.38 0 10.61-4.48 10.61-10.8 0-.73-.08-1.28-.17-1.915H12.24z"
                                />
                            </svg>
                            Continue with Google
                        </>
                    )}
                </button>

                <div className="divider text-xs text-base-content/40 uppercase tracking-wider font-semibold my-6">
                    or sign in with email
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="form-control w-full">
                        <label className="label text-[11px] font-bold uppercase text-base-content/40">
                            Email
                        </label>
                        <div className="relative flex items-center">
                            <Mail
                                className="absolute left-4 text-base-content/40"
                                size={16}
                            />
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="you@example.com"
                                className="input input-bordered w-full h-12 pl-12 rounded-xl text-sm bg-base-200/20"
                            />
                        </div>
                    </div>

                    <div className="form-control w-full">
                        <label className="label text-[11px] font-bold uppercase text-base-content/40">
                            Password
                        </label>
                        <div className="relative flex items-center">
                            <Lock
                                className="absolute left-4 text-base-content/40"
                                size={16}
                            />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                className="input input-bordered w-full h-12 pl-12 pr-12 rounded-xl text-sm bg-base-200/20"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 text-base-content/40"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full h-12 rounded-xl font-bold uppercase"
                    >
                        {loading ? <Spinner /> : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center text-xs font-semibold text-base-content/50">
                    <p>
                        New to SportNest?{' '}
                        <Link
                            href="/register"
                            className="text-primary font-bold"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<Spinner />}>
            <LoginForm />
        </Suspense>
    );
}
