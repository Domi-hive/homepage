'use client';

import {
    Calendar,
    Building,
    Settings,
    ChevronDown,
    Bell,
    HelpCircle,
    UserPlus,
    CalendarCheck,
    Banknote,
    FileEdit,
    ChevronUp,
    ArrowRight
} from 'lucide-react';
import { ThemeToggle } from "@/components/theme-toggle"
import Link from 'next/link';

export default function AgentActivityPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff]">
            <div
                className="absolute inset-0 bg-cover bg-top opacity-75 pointer-events-none z-0"
                style={{ backgroundImage: 'url(/assets/full_page_background.png)' }}
            />

            <div className="relative z-10 p-10 h-full overflow-y-auto">
                <header className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">Activity</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your tasks, updates, and client communications.</p>
                    </div>
                    <div className="flex items-center gap-6 self-end md:self-auto">
                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/agent/activity" className="w-6 h-[34px] border-none bg-transparent cursor-pointer flex items-center justify-center p-0 text-slate-600 hover:text-slate-900 transition-colors" aria-label="Notifications">
                                <Bell className="w-6 h-6" />
                            </Link>
                            <ThemeToggle />
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            <Link href="/agent/profile">
                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity">
                                    <span className="header-user-initials">U</span>
                                </div>
                            </Link>
                            <div className="hidden md:flex flex-col">
                                <div className="text-base font-semibold text-slate-900 leading-6">User</div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="mb-6">
                    <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700/80">
                        <div className="flex items-center gap-2">
                            <button className="px-4 py-3 text-slate-500 dark:text-slate-400 font-medium">All</button>
                            <button className="px-4 py-3 text-slate-800 dark:text-slate-100 font-semibold border-b-2 border-purple-500">Action Required</button>
                            <button className="px-4 py-3 text-slate-500 dark:text-slate-400 font-medium">Updates</button>
                            <button className="px-4 py-3 text-slate-500 dark:text-slate-400 font-medium">Archive</button>
                        </div>
                        <a className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition-colors" href="#">
                            <Settings className="w-5 h-5" />
                            <span>Notification Preferences</span>
                        </a>
                    </div>
                    <div className="py-4 flex items-center gap-3">
                        <button className="px-3 py-1 text-sm bg-white/70 dark:bg-slate-800/50 rounded-full flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 shadow-sm">
                            All Categories <ChevronDown className="w-4 h-4" />
                        </button>
                        <button className="px-3 py-1 text-sm bg-white/70 dark:bg-slate-800/50 rounded-full flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 shadow-sm">
                            All Properties <ChevronDown className="w-4 h-4" />
                        </button>
                        <button className="px-3 py-1 text-sm bg-white/70 dark:bg-slate-800/50 rounded-full flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 shadow-sm">
                            Last 7 days <ChevronDown className="w-4 h-4" />
                        </button>
                        <button className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center gap-1.5 text-purple-700 dark:text-purple-300 font-medium hover:bg-purple-200 dark:hover:bg-purple-900 shadow-sm">
                            Unread only
                        </button>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Today Section */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Today</h3>
                        <div className="space-y-4">
                            {/* New Lead */}
                            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border-2 border-red-300 dark:border-red-700/80 relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-400 dark:bg-red-600"></div>
                                <div className="p-5 flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center flex-shrink-0">
                                        <UserPlus className="text-red-600 dark:text-red-400 w-9 h-9" />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-sm font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300">New Lead</span>
                                                <p className="font-bold text-lg text-slate-800 dark:text-slate-100 mt-2">New client request from John Appleseed for a 2-bedroom apartment</p>
                                            </div>
                                            <button className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                                                <ChevronUp className="w-6 h-6" />
                                            </button>
                                        </div>
                                        <div className="mt-3 pr-8">
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">The client is looking for properties in the Lekki Phase 1 area with a budget of $2,500/month.</p>
                                            <div className="flex items-center gap-3">
                                                <button className="bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm text-sm">Dismiss</button>
                                                <button className="bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-opacity shadow-lg shadow-red-500/30 text-sm">
                                                    <span>View Request</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Response Needed */}
                            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10 relative overflow-hidden">
                                <div className="p-5 flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                                        <HelpCircle className="text-blue-600 dark:text-blue-400 w-8 h-8" />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-sm font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">Response Needed</span>
                                                <p className="font-semibold text-slate-800 dark:text-slate-100 mt-2">Client asked a question about "123, Queen Street"</p>
                                            </div>
                                            <button className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                                                <ChevronUp className="w-6 h-6" />
                                            </button>
                                        </div>
                                        <div className="mt-3 pr-8">
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">"Is it possible to schedule a viewing for this Saturday morning?" - Jane Doe</p>
                                            <div className="flex items-center gap-3">
                                                <button className="bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm text-sm">Mark as Read</button>
                                                <button className="bg-slate-700 hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-white">
                                                    <span>Reply Now</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Yesterday Section */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Yesterday</h3>
                        <div className="space-y-4">
                            {/* Inspection Confirmed */}
                            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border-2 border-green-300 dark:border-green-700/80 relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-400 dark:bg-green-600"></div>
                                <div className="p-5 flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
                                        <CalendarCheck className="text-green-600 dark:text-green-400 w-9 h-9" />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-sm font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">Inspection Confirmed</span>
                                                <p className="font-bold text-lg text-slate-800 dark:text-slate-100 mt-2">Inspection confirmed for 456, King Ave tomorrow at 2:00 PM</p>
                                            </div>
                                            <button className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                                                <ChevronUp className="w-6 h-6" />
                                            </button>
                                        </div>
                                        <div className="mt-3 pr-8">
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Client Jane Doe has confirmed the inspection time. Please prepare the property accordingly.</p>
                                            <div className="flex items-center gap-3">
                                                <button className="bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm text-sm">Mark as Done</button>
                                                <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-opacity shadow-lg shadow-purple-500/30 text-sm">
                                                    <span>View in Calendar</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* This Week Section */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">This Week</h3>
                        <div className="space-y-4">
                            {/* Payment Received */}
                            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10 relative overflow-hidden opacity-70">
                                <div className="p-4 flex items-center justify-between gap-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
                                            <Banknote className="text-green-600 dark:text-green-400 w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">Payment Received</span>
                                                <p className="font-medium text-sm text-slate-700 dark:text-slate-200">Payment received for inspection #4521</p>
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Client has paid the inspection fee for "Sunshine Villa".</p>
                                        </div>
                                    </div>
                                    <button className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                                        <ChevronDown className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Update Required */}
                            <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10 relative overflow-hidden opacity-70">
                                <div className="p-4 flex items-center justify-between gap-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center flex-shrink-0">
                                            <FileEdit className="text-orange-600 dark:text-orange-400 w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300">Update Required</span>
                                                <p className="font-medium text-sm text-slate-700 dark:text-slate-200">Listing "789 Bayview Dr" needs an update</p>
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">The property status has changed to "Rented".</p>
                                        </div>
                                    </div>
                                    <button className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                                        <ChevronDown className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-10 right-10 bg-slate-800 text-white py-3 px-5 rounded-xl shadow-2xl flex items-center gap-4">
                    <span>Item marked as complete.</span>
                    <button className="font-semibold text-purple-300 hover:text-white">Undo</button>
                </div>
            </div>
        </div>
    );
}
