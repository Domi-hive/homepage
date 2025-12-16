import React from 'react';
import { Search, Plus } from 'lucide-react';

interface EmptyRequestsCardProps {
    onCreateRequest: () => void;
}

export default function EmptyRequestsCard({ onCreateRequest }: EmptyRequestsCardProps) {
    return (
        <div className="bg-white/60 border border-white/50 rounded-[32px] p-10 backdrop-blur-md flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-slate-400" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">No Active Request</h3>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
                Create a property request to start receiving recommendations from agents
            </p>

            <button
                onClick={onCreateRequest}
                className="bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30 border-none rounded-2xl px-8 py-3.5 text-white text-base font-semibold cursor-pointer flex items-center gap-2 transition-all hover:scale-105 hover:shadow-purple-500/40"
            >
                <Plus className="w-5 h-5" />
                <span>Create Request</span>
            </button>
        </div>
    );
}
