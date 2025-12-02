'use client';

import { useState, useRef } from 'react';
import { Settings, Bell } from 'lucide-react';
import ClientHeader from '@/components/client/ClientHeader';

export default function ClientProfilePage() {
    const [profileImage, setProfileImage] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuApwz1HzKfzmiTi2UQsUJcW888s0VDgItEm-xhw7ioi7hzA5iXKdTooAJNi23OxGQOc6EdcnvtCqsPqCQtjebd3RrTQ3rU70soZYB989rU0V2xwU10nXOPhJp5OauflT4w4YdPaLYgvCUKTcmK4ileUe50q8glR9EXw6QSKFjXo4SAzVB2v_Ww33PACuP1RMXVBUxYrJwx_w9fhdfO5zk7wDg-oMOyLfPFNKy9AS6x9TgXe8AO1vmZTW9s3Ba9EcmOU1xeAqW6q8A");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    return (
        <div
            className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff] flex flex-col"
        >
            <div
                className="absolute inset-0 bg-cover bg-top opacity-75 pointer-events-none z-0"
                style={{ backgroundImage: 'url(/assets/full_page_background.png)' }}
            />
            <div className="relative z-10 px-4 md:px-10 pt-6 md:pt-10 pb-6">
                <ClientHeader
                    title="Profile Settings"
                    subtitle="Manage your account information and preferences"
                />
            </div>

            <div className="flex flex-1 overflow-hidden relative z-10">
                <main className="flex-1 h-full overflow-y-auto flex flex-col">
                    <div className="px-4 md:px-10 pb-20 pt-2 space-y-6">

                        <div className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                                {/* Profile Picture Card */}
                                <div className="col-span-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10 flex flex-col items-center">
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 self-start">Profile Picture</h2>
                                    <img
                                        alt="User avatar"
                                        className="w-40 h-40 rounded-full mb-6 object-cover"
                                        src={profileImage}
                                    />
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2 px-5 rounded-lg transition-colors shadow-sm w-full border border-slate-200 dark:border-slate-700"
                                    >
                                        Change Photo
                                    </button>
                                </div>

                                {/* Personal Information Card */}
                                <div className="col-span-1 lg:col-span-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10">
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Personal Information</h2>
                                    <form className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="first-name">First Name</label>
                                                <input
                                                    className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                                                    id="first-name"
                                                    type="text"
                                                    defaultValue="User"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="last-name">Last Name</label>
                                                <input
                                                    className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                                                    id="last-name"
                                                    type="text"
                                                    defaultValue="Name"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="email">Email Address</label>
                                            <input
                                                className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                                                id="email"
                                                type="email"
                                                defaultValue="user.name@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="phone">Phone Number</label>
                                            <input
                                                className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                                                id="phone"
                                                type="tel"
                                                defaultValue="+234 802 123 4567"
                                            />
                                        </div>

                                        <div className="pt-2">
                                            <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-opacity shadow-lg shadow-purple-500/30" type="submit">
                                                <span>Save Changes</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Notification Preferences Card */}
                            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Bell className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Notification Preferences</h2>
                                </div>
                                <div className="space-y-5">
                                    <label className="flex items-start justify-between cursor-pointer group">
                                        <div>
                                            <p className="font-semibold text-slate-700 dark:text-slate-200">New Agent Responses</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Get notified when agents respond to your requests</p>
                                        </div>
                                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer" />
                                    </label>
                                    <label className="flex items-start justify-between cursor-pointer group">
                                        <div>
                                            <p className="font-semibold text-slate-700 dark:text-slate-200">Inspection Reminders</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Receive reminders before scheduled inspections</p>
                                        </div>
                                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer" />
                                    </label>
                                    <label className="flex items-start justify-between cursor-pointer group">
                                        <div>
                                            <p className="font-semibold text-slate-700 dark:text-slate-200">Price Alerts</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Get notified about price changes on saved properties</p>
                                        </div>
                                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer" />
                                    </label>
                                    <label className="flex items-start justify-between cursor-pointer group">
                                        <div>
                                            <p className="font-semibold text-slate-700 dark:text-slate-200">Marketing Emails</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Receive updates about new features and promotions</p>
                                        </div>
                                        <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer" />
                                    </label>
                                </div>
                            </div>

                            {/* Security Card */}
                            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <Settings className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Security</h2>
                                </div>
                                <form className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="current-password">Current Password</label>
                                        <input
                                            className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                                            id="current-password"
                                            type="password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="new-password">New Password</label>
                                        <input
                                            className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                                            id="new-password"
                                            type="password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="confirm-password">Confirm New Password</label>
                                        <input
                                            className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                                            id="confirm-password"
                                            type="password"
                                        />
                                    </div>
                                    <div className="md:col-start-3">
                                        <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white font-semibold py-3 w-full rounded-xl flex items-center justify-center gap-2 transition-opacity shadow-lg shadow-purple-500/30" type="submit">
                                            Update Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
