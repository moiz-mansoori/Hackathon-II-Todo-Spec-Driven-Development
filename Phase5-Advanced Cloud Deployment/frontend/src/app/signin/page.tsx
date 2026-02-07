'use client';

import { useState } from 'react';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.signin({ email, password });
            router.push('/dashboard');
        } catch (err: unknown) {
            console.error('Signin error:', err);

            // Handle different error types
            let message = 'No account found with this email. Please sign up first!';

            if (err && typeof err === 'object') {
                const axiosError = err as { response?: { data?: { error?: string }, status?: number }, message?: string };

                if (axiosError.response?.data?.error) {
                    message = axiosError.response.data.error;
                } else if (axiosError.response?.status === 401) {
                    message = 'No account found with this email. Please sign up first!';
                } else if (axiosError.response?.status === 500) {
                    message = 'Server error. Please try again later.';
                } else if (axiosError.message) {
                    message = 'Connection failed. Is the server running?';
                }
            }

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-[#0a0a0a] to-neutral-900" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-neutral-800/20 rounded-full blur-3xl" />

            <div className="relative w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl mb-4">
                        <CheckCircle2 className="w-6 h-6 text-black" />
                    </div>
                    <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
                    <p className="text-neutral-500 mt-1 text-sm">Sign in to your Mansoori Todo account</p>
                </div>

                {/* Form Card */}
                <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2" htmlFor="email">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600" />
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-neutral-700 transition-all text-white placeholder:text-neutral-600 text-sm"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600" />
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-neutral-700 transition-all text-white placeholder:text-neutral-600 text-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Error Message Box */}
                        {error && (
                            <div className="flex items-start gap-3 bg-red-500/10 text-red-400 px-4 py-3 rounded-lg text-sm border border-red-500/20">
                                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p>{error}</p>
                                    {error.includes('sign up') && (
                                        <Link
                                            href="/signup"
                                            className="inline-block mt-2 text-white font-medium underline underline-offset-2 hover:text-neutral-300"
                                        >
                                            Create an account →
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-white hover:bg-neutral-200 text-black font-medium rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-neutral-800">
                        <p className="text-center text-neutral-500 text-sm">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-white hover:text-neutral-300 font-medium transition-colors">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-neutral-600 text-xs mt-6">
                    Mansoori Todo • Built with Next.js
                </p>
            </div>
        </div>
    );
}
