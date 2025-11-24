import React from 'react';
import { Plus } from 'lucide-react';

export default function WelcomeCard() {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Night';
    };

    return (
        <div className="bg-gradient-to-br from-purple-100/80 to-blue-100/80 border border-white/50 rounded-[32px] p-10 mb-10 flex items-center justify-between backdrop-blur-md">
            <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900 leading-9 m-0 mb-2">
                    {getGreeting()}, User! 👋
                </h2>
                <p className="text-base text-slate-600 leading-6 m-0">Looking for anything new today?</p>
            </div>
            <button type="button" className="bg-gradient-to-br from-purple-500 to-blue-500 border-none rounded-3xl px-6 py-3 text-white text-base font-semibold cursor-pointer flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/30">
                <Plus className="w-4 h-4" />
                <span className="whitespace-nowrap">Create Property Request</span>
            </button>
        </div>
    );
}
