"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

interface Analytics {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    overdueTasks: number;
    completionRate: number;
    tasksByPriority: {
        high: number;
        medium: number;
        low: number;
    };
    tasksDueToday: number;
    tasksDueThisWeek: number;
    recentCompletions: number;
}

export default function AnalyticsPage() {
    const [analytics, setAnalytics] = useState<Analytics | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("todo_token");
        if (!token) {
            router.push("/signin");
            return;
        }

        fetchAnalytics();
    }, [router]);

    const fetchAnalytics = async () => {
        try {
            const token = localStorage.getItem("todo_token");
            const userId = localStorage.getItem("todo_user_id");

            const response = await fetch("/api/analytics", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-user-id": userId || "",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAnalytics(data);
            }
        } catch (error) {
            console.error("Failed to fetch analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-neutral-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-neutral-900 via-[#0a0a0a] to-neutral-900" />

            {/* Navbar */}
            <nav className="relative sticky top-0 z-10 backdrop-blur-xl bg-neutral-900/50 border-b border-neutral-800">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-black" />
                        </div>
                        <span className="font-semibold text-white">Mansoori Todo</span>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Tasks
                    </Link>
                </div>
            </nav>

            <main className="relative max-w-4xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-white mb-2">Analytics</h1>
                    <p className="text-neutral-500">Track your productivity and task completion</p>
                </div>

                {analytics ? (
                    <div className="space-y-6">
                        {/* Completion Rate */}
                        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-neutral-400 text-sm font-medium">Completion Rate</h3>
                                <span className="text-2xl font-semibold text-white">{analytics.completionRate}%</span>
                            </div>
                            <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                                    style={{ width: `${analytics.completionRate}%` }}
                                />
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard label="Total Tasks" value={analytics.totalTasks} />
                            <StatCard label="Completed" value={analytics.completedTasks} color="text-green-400" />
                            <StatCard label="Pending" value={analytics.pendingTasks} color="text-yellow-400" />
                            <StatCard label="Overdue" value={analytics.overdueTasks} color="text-red-400" />
                        </div>

                        {/* Priority Breakdown */}
                        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                            <h3 className="text-neutral-400 text-sm font-medium mb-4">Tasks by Priority</h3>
                            <div className="space-y-3">
                                <PriorityRow label="High" count={analytics.tasksByPriority.high} total={analytics.totalTasks} color="bg-red-500" />
                                <PriorityRow label="Medium" count={analytics.tasksByPriority.medium} total={analytics.totalTasks} color="bg-yellow-500" />
                                <PriorityRow label="Low" count={analytics.tasksByPriority.low} total={analytics.totalTasks} color="bg-green-500" />
                            </div>
                        </div>

                        {/* Upcoming */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                                <p className="text-neutral-500 text-sm mb-1">Due Today</p>
                                <p className="text-2xl font-semibold text-orange-400">{analytics.tasksDueToday}</p>
                            </div>
                            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                                <p className="text-neutral-500 text-sm mb-1">Due This Week</p>
                                <p className="text-2xl font-semibold text-blue-400">{analytics.tasksDueThisWeek}</p>
                            </div>
                            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                                <p className="text-neutral-500 text-sm mb-1">Completed (7 days)</p>
                                <p className="text-2xl font-semibold text-green-400">{analytics.recentCompletions}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16 border border-neutral-800 rounded-xl">
                        <p className="text-neutral-500">No analytics data available. Start adding tasks!</p>
                    </div>
                )}
            </main>
        </div>
    );
}

function StatCard({ label, value, color = "text-white" }: { label: string; value: number; color?: string }) {
    return (
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
            <p className="text-neutral-500 text-sm mb-1">{label}</p>
            <p className={`text-2xl font-semibold ${color}`}>{value}</p>
        </div>
    );
}

function PriorityRow({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
    const percentage = total > 0 ? (count / total) * 100 : 0;

    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-neutral-400">{label}</span>
                <span className="text-neutral-500">{count}</span>
            </div>
            <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color} rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
