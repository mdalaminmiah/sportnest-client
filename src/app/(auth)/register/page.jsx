'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Lock,
    Image as ImageIcon,
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { startGoogleLogin } from '@/lib/api';
import { Spinner } from '@/components/ui/Loading';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photoUrl: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [feedback, setFeedback] = useState({ text: '', isError: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleInputChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleGoogle = async () => {
        setGoogleLoading(true);
        try {
            await startGoogleLogin('/');
        } catch (err) {
            toast.error(err.message || 'Google sign-in failed.');
            setGoogleLoading(false);
        }
    };

    const validatePassword = (pw) => {
        if (pw.length < 6) return 'Password must be at least 6 characters long.';
        if (!/[A-Z]/.test(pw))
            return 'Password must contain at least one uppercase letter.';
        if (!/[a-z]/.test(pw))
            return 'Password must contain at least one lowercase letter.';
        return '';
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFeedback({ text: '', isError: false });

        const pwError = validatePassword(formData.password);
        if (pwError) {
            setFeedback({ text: pwError, isError: true });
            toast.error(pwError);
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    image: formData.photoUrl,
                }),
            });
            const result = await response.json();

            if (!response.ok || result.success === false) {
                throw new Error(result.message || 'Registration failed.');
            }

            toast.success('Account created! Please sign in.');
            setFeedback({
                text: 'Account registered successfully! Redirecting to sign in...',
                isError: false,
            });
            setFormData({ name: '', email: '', photoUrl: '', password: '' });
            setTimeout(() => router.push('/login'), 1500);
        } catch (error) {
            toast.error(error.message);
            setFeedback({ text: error.message, isError: true });
        } finally {
            setIsSubmitting(false);
        }
    };

    const field =
        'input input-bordered w-full h-12 pl-12 rounded-xl text-sm bg-base-200/20';

    return (
        <div className="flex justify-center items-center min-h-[80vh] w-full">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-base-100 border border-base-200 shadow-2xl rounded-3xl p-6 sm:p-10 relative z-10 mx-4"
            >
                <div className="text-center space-y-2 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                        Create Your Account
                    </h1>
                    <p className="text-sm font-semibold text-base-content/50">
                        Join SportNest and start booking facilities.
                    </p>
                </div>

                {feedback.text && (
                    <div
                        className={`alert ${
                            feedback.isError ? 'alert-error' : 'alert-success'
                        } shadow-sm text-xs font-semibold py-3 mb-5 rounded-xl flex items-start gap-2`}
                    >
                        {feedback.isError ? (
                            <AlertCircle size={16} />
                        ) : (
                            <CheckCircle2 size={16} />
                        )}
                        <span>{feedback.text}</span>
                    </div>
                )}

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
                    or register with email
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="relative flex items-center">
                        <User
                            className="absolute left-4 text-base-content/40"
                            size={16}
                        />
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className={field}
                        />
                    </div>

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
                            placeholder="Email Address"
                            className={field}
                        />
                    </div>

                    <div className="relative flex items-center">
                        <ImageIcon
                            className="absolute left-4 text-base-content/40"
                            size={16}
                        />
                        <input
                            type="url"
                            name="photoUrl"
                            value={formData.photoUrl}
                            onChange={handleInputChange}
                            placeholder="Photo URL (optional)"
                            className={field}
                        />
                    </div>

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
                            placeholder="Password"
                            className={`${field} pr-12`}
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

                    <p className="text-[11px] font-medium text-base-content/40 pl-1">
                        At least 6 characters with one uppercase and one
                        lowercase letter.
                    </p>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary w-full h-12 rounded-xl font-bold uppercase"
                    >
                        {isSubmitting ? <Spinner /> : 'Register'}
                    </button>
                </form>

                <div className="mt-8 text-center text-xs font-semibold text-base-content/50">
                    <p>
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary font-bold">
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
