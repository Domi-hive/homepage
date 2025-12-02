import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import RequestFormDrawer from './RequestFormDrawer';

export default function WelcomeCard() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Night';
    };

    return (
        <>
            <div className="bg-gradient-to-br from-purple-100/80 to-blue-100/80 border border-white/50 rounded-[32px] p-6 md:p-10 mb-10 flex flex-col md:flex-row md:items-center justify-between backdrop-blur-md gap-4 md:gap-0">
                <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight md:leading-9 m-0 mb-4 md:mb-2 text-center md:text-left">
                        {getGreeting()}, User! 👋
                    </h2>

                    {/* Mobile Layout: Question + Button Side-by-Side */}
                    <div className="flex md:hidden items-center justify-between gap-3">
                        <p className="text-sm text-slate-600 leading-tight m-0 max-w-[50%]">Looking for anything new today?</p>
                        <button
                            type="button"
                            onClick={() => setIsDrawerOpen(true)}
                            className="bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30 border-none rounded-2xl px-4 py-2.5 text-white text-sm font-semibold cursor-pointer flex items-center gap-1.5 whitespace-nowrap hover:opacity-90 transition-opacity"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Create Request</span>
                        </button>
                    </div>

                    {/* Desktop Layout: Question Only */}
                    <p className="hidden md:block text-base text-slate-600 leading-6 m-0">Looking for anything new today?</p>
                </div>

                {/* Desktop Button */}
                <button
                    type="button"
                    onClick={() => setIsDrawerOpen(true)}
                    className="hidden md:flex bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30 border-none rounded-3xl px-6 py-3 text-white text-base font-semibold cursor-pointer items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-purple-500/40"
                >
                    <Plus className="w-4 h-4" />
                    <span className="whitespace-nowrap">Create Property Request</span>
                </button>
            </div>

            <RequestFormDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </>
    );
}
