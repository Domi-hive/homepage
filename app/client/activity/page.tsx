'use client';

import { useState } from 'react';
import ClientHeader from '@/components/client/ClientHeader';
import {
    Settings,
    ChevronDown,
    Bell,
    HelpCircle,
    Home,
    CheckCircle2,
    Gavel,
    ChevronUp,
    ArrowRight
} from 'lucide-react';

export default function ClientActivityPage() {
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [activeTab, setActiveTab] = useState('All');

    const categories = ['All Categories', 'Q&A', 'Inspections', 'Request responses'];

    return (
        <div
            className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff] flex flex-col"
        >
            <div
                className="absolute inset-0 bg-cover bg-top opacity-75 pointer-events-none z-0"
                style={{ backgroundImage: 'url(/assets/full_page_background.png)' }}
            />
            <div className="hidden md:block relative z-10 px-4 md:px-10 pt-6 md:pt-10 pb-0">
                <ClientHeader
                    title="Activity"
                    subtitle="Review all notifications and updates on your journey."
                />
            </div>

            <div className="flex flex-1 overflow-hidden relative z-10">
                <main className="flex-1 h-full overflow-y-auto flex flex-col">
                    <div className="px-4 md:px-10 pb-20 pt-2 space-y-6">

                        <div className="mb-6">
                            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700/80">
                                <div className="flex items-center gap-2">
                                    {['All', 'Action Required', 'Updates'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-4 py-3 font-medium transition-colors ${activeTab === tab
                                                ? 'text-slate-800 dark:text-slate-100 font-semibold border-b-2 border-purple-500'
                                                : 'text-slate-500 dark:text-slate-400'
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                <a className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition-colors" href="#">
                                    <Settings className="w-5 h-5" />
                                    <span>Notification Preferences</span>
                                </a>
                            </div>
                            <div className="py-4 flex items-center gap-3">
                                <div className="relative">
                                    <button
                                        onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                        className="px-3 py-1 text-sm bg-white/70 dark:bg-slate-800/50 rounded-full flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 shadow-sm transition-colors"
                                    >
                                        {selectedCategory} <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isCategoryDropdownOpen && (
                                        <div className="absolute top-full left-0 mt-2 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl shadow-lg border border-white/20 dark:border-white/10 overflow-hidden z-50">
                                            {categories.map((category) => (
                                                <button
                                                    key={category}
                                                    onClick={() => {
                                                        setSelectedCategory(category);
                                                        setIsCategoryDropdownOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors ${selectedCategory === category ? 'text-purple-600 dark:text-purple-400 font-medium' : 'text-slate-600 dark:text-slate-300'}`}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
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
                                    {/* Inspection Reminder */}
                                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border-2 border-red-300 dark:border-red-700/80 relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-400 dark:bg-red-600"></div>
                                        <div className="p-5 flex items-start gap-5">
                                            <div className="w-14 h-14 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center flex-shrink-0">
                                                <Bell className="text-red-600 dark:text-red-400 w-9 h-9" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-sm font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300">Action Needed</span>
                                                        <p className="font-bold text-lg text-slate-800 dark:text-slate-100 mt-2">Inspection Reminder: Your inspection is in 2 hours</p>
                                                    </div>
                                                    <button className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                                                        <ChevronUp className="w-6 h-6" />
                                                    </button>
                                                </div>
                                                <div className="mt-3 pr-8">
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Location: 123, Queen Street, Lekki Phase 1 for "Sunshine Villa". Please be on time.</p>
                                                    <div className="flex items-center gap-3">
                                                        <button className="bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm text-sm">Reschedule</button>
                                                        <button className="bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-opacity shadow-lg shadow-red-500/30 text-sm">
                                                            <span>View Inspection Details</span>
                                                            <ArrowRight className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Agent Reply */}
                                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10 relative overflow-hidden">
                                        <div className="p-5 flex items-start gap-5">
                                            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0">
                                                <HelpCircle className="text-purple-600 dark:text-purple-400 w-8 h-8" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-sm font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">New Update</span>
                                                        <p className="font-semibold text-slate-800 dark:text-slate-100 mt-2">Agent replied to your question about "Sunshine Villa"</p>
                                                    </div>
                                                    <button className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                                                        <ChevronUp className="w-6 h-6" />
                                                    </button>
                                                </div>
                                                <div className="mt-3 pr-8">
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">"Yes, the apartment comes with a washing machine."</p>
                                                    <div className="flex items-center gap-3">
                                                        <button className="bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm text-sm">Mark as Read</button>
                                                        <button className="bg-slate-700 hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-white">
                                                            <span>View Conversation</span>
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
                                    {/* New Properties */}
                                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border-2 border-blue-300 dark:border-blue-700/80 relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-400 dark:bg-blue-600"></div>
                                        <div className="p-5 flex items-start gap-5">
                                            <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                                                <Home className="text-blue-600 dark:text-blue-400 w-9 h-9" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-sm font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">New Properties</span>
                                                        <p className="font-bold text-lg text-slate-800 dark:text-slate-100 mt-2">5 new properties recommended for you!</p>
                                                    </div>
                                                    <button className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                                                        <ChevronUp className="w-6 h-6" />
                                                    </button>
                                                </div>
                                                <div className="mt-3 pr-8">
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">An agent has responded to your request with 5 new properties that match your criteria.</p>
                                                    <div className="flex items-center gap-3">
                                                        <button className="bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm text-sm">Dismiss</button>
                                                        <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-opacity shadow-lg shadow-purple-500/30 text-sm">
                                                            <span>View Properties</span>
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
                                    {/* Payment Confirmed */}
                                    <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10 relative overflow-hidden opacity-70">
                                        <div className="p-4 flex items-center justify-between gap-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle2 className="text-green-600 dark:text-green-400 w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm text-slate-700 dark:text-slate-200">Payment confirmed for "Sunshine Villa"</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Your payment has been successfully processed.</p>
                                                </div>
                                            </div>
                                            <button className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                                                <ChevronDown className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Dispute Resolution */}
                                    <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10 relative overflow-hidden opacity-70">
                                        <div className="p-4 flex items-center justify-between gap-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center flex-shrink-0">
                                                    <Gavel className="text-orange-600 dark:text-orange-400 w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm text-slate-700 dark:text-slate-200">Dispute Resolution Update</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Update regarding your dispute for "Sunshine Villa".</p>
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
                </main>
            </div>
        </div>
    );
}
