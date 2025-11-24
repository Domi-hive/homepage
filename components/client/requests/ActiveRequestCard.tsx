import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

export default function ActiveRequestCard() {
    const stats = [
        { value: '5', label: 'Agents Responded' },
        { value: '18', label: 'Properties' },
        { value: '3', label: 'Active Q&As' },
        { value: '4', label: 'In Basket' },
    ];

    return (
        <div className="bg-white/60 border border-white/50 rounded-[32px] p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
                <div className="relative w-3 h-3 flex items-center justify-center">
                    <div className="absolute w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></div>
                    <div className="relative w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-sm font-bold text-green-600 uppercase tracking-wider m-0">Active Request</p>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 leading-8 m-0 mb-2">
                2-3 bed in Lekki, VI, Ikoyi | Budget: N2-4M
            </h2>
            <p className="flex items-center gap-2 text-sm text-slate-600 leading-5 m-0 mb-6">
                <Clock className="w-4 h-4" />
                Created 2 days ago
            </p>
            <div className="grid grid-cols-4 gap-4 mb-8 p-4 bg-white/50 rounded-2xl border border-white/50">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col gap-1">
                        <p className="text-2xl font-bold text-slate-900 leading-8 m-0">{stat.value}</p>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide m-0">{stat.label}</p>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-3">
                <button type="button" className="bg-gradient-to-br from-purple-500 to-blue-500 border-none rounded-xl px-6 py-3 text-white text-base font-semibold cursor-pointer flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/30">
                    <span>View Responses</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
                <button type="button" className="bg-white border border-slate-200 rounded-xl px-6 py-3 text-slate-700 text-base font-medium cursor-pointer transition-colors hover:bg-slate-50 hover:text-slate-900">
                    Edit
                </button>
                <button type="button" className="bg-white border border-slate-200 rounded-xl px-6 py-3 text-slate-700 text-base font-medium cursor-pointer transition-colors hover:bg-slate-50 hover:text-slate-900">
                    Archive
                </button>
            </div>
        </div>
    );
}
