'use client';

import { Bell } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AgentResponsesPage() {
    return (
        <div className="flex-1 p-10 overflow-y-auto">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white hidden md:block">Responses</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">View your responses to client requests.</p>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <ThemeToggle />
                    <button className="relative text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <Link href="/agent/profile" className="hover:opacity-80 transition-opacity">
                        <img
                            alt="Jessica's avatar"
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-700"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuApwz1HzKfzmiTi2UQsUJcW888s0VDgItEm-xhw7ioi7hzA5iXKdTooAJNi23OxGQOc6EdcnvtCqsPqCQtjebd3RrTQ3rU70soZYB989rU0V2xwU10nXOPhJp5OauflT4w4YdPaLYgvCUKTcmK4ileUe50q8glR9EXw6QSKFjXo4SAzVB2v_Ww33PACuP1RMXVBUxYrJwx_w9fhdfO5zk7wDg-oMOyLfPFNKy9AS6x9TgXe8AO1vmZTW9s3Ba9EcmOU1xeAqW6q8A"
                        />
                    </Link>
                </div>
            </header>
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/50 dark:border-white/10">
                <p className="text-slate-600 dark:text-slate-300">No responses yet.</p>
            </div>
        </div>
    );
}
