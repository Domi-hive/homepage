import React from 'react';
import { ClipboardList, Calendar } from 'lucide-react';

export default function StatsCards() {
    return (
        <div className="grid grid-cols-2 gap-5 mb-10">
            <div className="bg-white/60 border border-white/50 rounded-[32px] p-6 backdrop-blur-md">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex-1">
                        <h3 className="text-base font-medium text-slate-600 leading-6 m-0 mb-2">Active Requests</h3>
                        <div className="text-5xl font-bold text-slate-900 leading-[48px]">2</div>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br from-orange-200 to-pink-200">
                        <ClipboardList className="w-6 h-6 text-slate-700" />
                    </div>
                </div>
                <a href="#" className="text-sm font-semibold text-[#1567c3] no-underline inline-block transition-colors hover:text-[#1567c3]/80">
                    View all →
                </a>
            </div>

            <div className="bg-white/60 border border-white/50 rounded-[32px] p-6 backdrop-blur-md">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex-1">
                        <h3 className="text-base font-medium text-slate-600 leading-6 m-0 mb-2">Next inspection scheduled</h3>
                        <div className="text-5xl font-bold text-slate-900 leading-[48px]">Wed, 2 PM</div>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br from-purple-200 to-indigo-200">
                        <Calendar className="w-6 h-6 text-slate-700" />
                    </div>
                </div>
                <a href="#" className="text-sm font-semibold text-[#1567c3] no-underline inline-block transition-colors hover:text-[#1567c3]/80">
                    See details →
                </a>
            </div>
        </div>
    );
}
