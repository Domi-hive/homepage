import React from 'react';
import { Calendar, Star } from 'lucide-react';

interface Agent {
    id: string;
    name: string;
    photo: string;
    rating: number;
    reviews: number;
    specialty: string;
    respondedAt: string;
}

interface AgentInfoCardProps {
    agent: Agent;
    onScheduleInspection: () => void;
    hideAction?: boolean;
}

export default function AgentInfoCard({ agent, onScheduleInspection, hideAction }: AgentInfoCardProps) {
    return (
        <div className="mb-8 bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <img
                    src={agent.photo || "/placeholder.svg"}
                    alt={agent.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white"
                />
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-slate-800">{agent.name}</h2>
                        <div className="flex items-center gap-1 text-sm text-yellow-500 font-medium">
                            <Star className="w-4 h-4 fill-yellow-500" />
                            <span>{agent.rating}</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500">({agent.reviews} reviews)</p>
                    <p className="text-sm text-slate-600 mt-1">Responded {agent.respondedAt}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{agent.specialty}</p>
                </div>
            </div>
            {!hideAction && (
                <button
                    onClick={onScheduleInspection}
                    className="bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-5 rounded-xl flex items-center gap-2 transition-colors border border-slate-200 shadow-sm"
                >
                    <Calendar className="w-5 h-5" />
                    <span>Schedule Inspection</span>
                </button>
            )}
        </div>
    );
}
