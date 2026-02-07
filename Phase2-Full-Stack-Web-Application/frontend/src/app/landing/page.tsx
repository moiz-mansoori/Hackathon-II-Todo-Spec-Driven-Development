'use client';

import Link from 'next/link';
import { CheckCircle2, Server, Database, Lock, Github, Linkedin, ArrowRight } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-neutral-900 via-[#0a0a0a] to-neutral-900" />
            <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
            <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />

            {/* Navbar */}
            <nav className="relative z-10 border-b border-neutral-800/50">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-black" />
                        </div>
                        <span className="font-semibold">Mansoori Todo</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/signin"
                            className="px-4 py-2 text-neutral-400 hover:text-white transition-colors text-sm"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/signup"
                            className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-all text-sm"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10">
                <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs text-emerald-400 mb-8">
                        <Server className="w-3 h-3" />
                        Phase 2 - Full-Stack Application
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Full-Stack
                        <br />
                        <span className="text-neutral-500">Todo App.</span>
                    </h1>

                    <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        A complete todo application with separate frontend and backend, JWT authentication,
                        SQLite database, and beautiful responsive UI.
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <Link
                            href="/signup"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-all"
                        >
                            Start for free
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/signin"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-700 text-white rounded-lg hover:bg-neutral-800 transition-all"
                        >
                            Sign in
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section className="max-w-6xl mx-auto px-6 py-20">
                    <h2 className="text-2xl font-semibold text-center mb-12">Features</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={<Server className="w-5 h-5" />}
                            title="FastAPI Backend"
                            description="High-performance Python backend with automatic API documentation."
                        />
                        <FeatureCard
                            icon={<Lock className="w-5 h-5" />}
                            title="JWT Authentication"
                            description="Secure user authentication with JSON Web Tokens."
                        />
                        <FeatureCard
                            icon={<Database className="w-5 h-5" />}
                            title="SQLite Database"
                            description="Lightweight, serverless database for efficient data storage."
                        />
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="max-w-6xl mx-auto px-6 py-16">
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 text-center">
                        <h3 className="text-sm text-neutral-500 uppercase tracking-wider mb-4">Built with</h3>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {['Next.js', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'SQLite', 'Python'].map((tech) => (
                                <span key={tech} className="px-4 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg text-sm text-neutral-300">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-neutral-800/50 mt-16">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-black" />
                            </div>
                            <div>
                                <p className="font-semibold">Mansoori Todo</p>
                                <p className="text-xs text-neutral-500">Built by Moiz Ahmed Mansoori</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <a
                                href="https://www.linkedin.com/in/moiz-mansoori/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-neutral-800/50 hover:bg-neutral-700/50 border border-neutral-700 rounded-lg transition-all text-sm"
                            >
                                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                                LinkedIn
                            </a>
                            <a
                                href="https://github.com/moiz-mansoori"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-neutral-800/50 hover:bg-neutral-700/50 border border-neutral-700 rounded-lg transition-all text-sm"
                            >
                                <Github className="w-4 h-4" />
                                GitHub
                            </a>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-500">
                        <p>© 2026 Mansoori Todo. Part of GIAIC Hackathon II - Spec-Driven Development</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-all">
            <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center mb-4 text-neutral-400">
                {icon}
            </div>
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <p className="text-sm text-neutral-500">{description}</p>
        </div>
    );
}
