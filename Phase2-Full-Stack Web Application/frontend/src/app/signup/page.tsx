'use client';

import { useState } from 'react';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Loader2, UserPlus } from 'lucide-react';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            await authService.signup({ email, password });
            router.push('/');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Registration failed. Email might already be taken.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-[#0b0f19]">
            <div className="w-full max-w-md animate-fade-in">
                <div className="bg-[#161e2c] p-8 rounded-[32px] shadow-2xl border border-white/5">
                    <div className="flex flex-col items-center mb-8">
                        <div className="p-4 bg-indigo-500 rounded-2xl mb-4 shadow-lg shadow-indigo-500/20">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Create Account</h1>
                        <p className="text-slate-400 mt-2 text-center font-medium">
                            Join us to start managing your tasks efficiently.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-400 ml-1" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors font-bold">
                                    <Mail className="w-5 h-5" />
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-[#0b0f19] border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all font-medium text-white placeholder:text-slate-600"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-400 ml-1" htmlFor="password">
                                Password
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </span>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-[#0b0f19] border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all font-medium text-white placeholder:text-slate-600"
                                    placeholder="At least 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-400 ml-1" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                                    <Lock className="w-5 h-5" />
                                </span>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-[#0b0f19] border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all font-medium text-white placeholder:text-slate-600"
                                    placeholder="Re-type your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 text-red-400 p-4 rounded-2xl text-sm border border-red-500/20 font-bold animate-fade-in">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-70 active:scale-[0.98]"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-slate-500 text-sm font-bold">
                        Already have an account?{' '}
                        <Link href="/signin" className="text-indigo-400 font-black hover:text-indigo-300 underline underline-offset-4 decoration-2 transition-all">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
