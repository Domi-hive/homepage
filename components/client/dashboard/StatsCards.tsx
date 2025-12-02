import React from 'react';
import { ClipboardList, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function StatsCards() {
    return (
        <div className="grid grid-cols-2 gap-3 md:gap-5 mb-10">
            <div className="bg-white/60 border border-white/50 rounded-[20px] md:rounded-[32px] p-4 md:p-6 backdrop-blur-md">
                <div className="flex items-start justify-between mb-3 md:mb-5">
                    <div className="flex-1 min-w-0 pr-2">
                        <h3 className="text-xs md:text-base font-medium text-slate-600 leading-tight md:leading-6 m-0 mb-1 md:mb-2 truncate">Active Request</h3>
                        <div className="text-lg md:text-2xl font-bold text-slate-900 leading-tight md:leading-8 truncate">3-bed in Lekki</div>
                    </div>
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br from-orange-200 to-pink-200">
                        <ClipboardList className="w-4 h-4 md:w-6 md:h-6 text-slate-700" />
                    </div>
                </div>
                <a href="#" className="text-xs md:text-sm font-semibold text-[#1567c3] no-underline inline-block transition-colors hover:text-[#1567c3]/80">
                    View details →
                </a>
            </div>

            <div className="bg-white/60 border border-white/50 rounded-[20px] md:rounded-[32px] p-4 md:p-6 backdrop-blur-md">
                <div className="flex items-start justify-between mb-3 md:mb-5">
                    <div className="flex-1 min-w-0 pr-2">
                        <h3 className="text-xs md:text-base font-medium text-slate-600 leading-tight md:leading-6 m-0 mb-1 md:mb-2 truncate">Next inspection</h3>
                        <div className="text-lg md:text-2xl font-bold text-slate-900 leading-tight md:leading-8 truncate">Wed, 2 PM</div>
                    </div>
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br from-purple-200 to-indigo-200">
                        <Calendar className="w-4 h-4 md:w-6 md:h-6 text-slate-700" />
                    </div>
                </div>
                <Link href="/client/inspections?tab=upcoming" className="text-xs md:text-sm font-semibold text-[#1567c3] no-underline inline-block transition-colors hover:text-[#1567c3]/80">
                    See details →
                </Link>
            </div>
        </div>
    );
}
