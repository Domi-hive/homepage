'use client';

import { useState } from 'react';
import { Bell, MessageSquare, ChevronDown } from 'lucide-react';
import ProfileTab from '@/components/agent/profile/ProfileTab';
import KYCTab from '@/components/agent/profile/KYCTab';
import WalletTab from '@/components/agent/profile/WalletTab';
import BusinessTab from '@/components/agent/profile/BusinessTab';

export default function AgentProfilePage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'kyc' | 'wallet' | 'business'>('profile');

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff] dark:from-[#1a1829] dark:to-[#1e294e] p-10 overflow-y-auto">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-bold text-slate-800 dark:text-white">Profile Settings</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your account information and preferences</p>
                </div>
                <div className="flex items-center gap-6">
                    <button className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                        <Bell className="w-6 h-6" />
                    </button>
                    <button className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                        <MessageSquare className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3">
                        <img
                            alt="User avatar"
                            className="w-11 h-11 rounded-full"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuApwz1HzKfzmiTi2UQsUJcW888s0VDgItEm-xhw7ioi7hzA5iXKdTooAJNi23OxGQOc6EdcnvtCqsPqCQtjebd3RrTQ3rU70soZYB989rU0V2xwU10nXOPhJp5OauflT4w4YdPaLYgvCUKTcmK4ileUe50q8glR9EXw6QSKFjXo4SAzVB2v_Ww33PACuP1RMXVBUxYrJwx_w9fhdfO5zk7wDg-oMOyLfPFNKy9AS6x9TgXe8AO1vmZTW9s3Ba9EcmOU1xeAqW6q8A"
                        />
                        <div>
                            <span className="font-semibold text-slate-800 dark:text-slate-100 block leading-tight">User</span>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Agent</p>
                        </div>
                        <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    </div>
                </div>
            </header>

            <div className="space-y-8">
                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-2 rounded-xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10 w-fit">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'profile'
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md shadow-purple-500/20'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
                            }`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('kyc')}
                        className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'kyc'
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md shadow-purple-500/20'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
                            }`}
                    >
                        KYC Verification
                    </button>
                    <button
                        onClick={() => setActiveTab('wallet')}
                        className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'wallet'
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md shadow-purple-500/20'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
                            }`}
                    >
                        Wallet & Payments
                    </button>
                    <button
                        onClick={() => setActiveTab('business')}
                        className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'business'
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md shadow-purple-500/20'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
                            }`}
                    >
                        Business Details
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'profile' && <ProfileTab />}
                {activeTab === 'kyc' && <KYCTab />}
                {activeTab === 'wallet' && <WalletTab />}
                {activeTab === 'business' && <BusinessTab />}

            </div>
        </div>
    );
}
