import React from 'react';
import { MessageCircle, Star } from 'lucide-react';

interface Agent {
    id: string;
    name: string;
    photo: string;
    rating: number;
    reviews: number;
    propertyCount: number;
    qas: number;
}

interface AgentTabBarProps {
    agents: Agent[];
    selectedAgentId: string;
    onSelectAgent: (id: string) => void;
}

export default function AgentSidebar({ agents, selectedAgentId, onSelectAgent }: AgentTabBarProps) {
    return (
        <div className="w-full md:w-72 flex-shrink-0">
            <div className="flex flex-col gap-3">
                {agents.map((agent) => (
                    <button
                        key={agent.id}
                        onClick={() => onSelectAgent(agent.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${selectedAgentId === agent.id
                            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent shadow-lg shadow-purple-500/30"
                            : "bg-white/60 border-white/50 text-slate-600 hover:bg-white/80 backdrop-blur-sm"
                            }`}
                    >
                        <img
                            src={agent.photo || "/placeholder.svg"}
                            alt={agent.name}
                            className={`h-10 w-10 rounded-full object-cover border-2 flex-shrink-0 ${selectedAgentId === agent.id ? "border-white/30" : "border-white"
                                }`}
                        />
                        <div className="min-w-0 flex-1">
                            <div className={`font-semibold text-sm truncate ${selectedAgentId === agent.id ? "text-white" : "text-slate-800"}`}>
                                {agent.name}
                            </div>
                            <div className={`flex items-center gap-2 text-xs ${selectedAgentId === agent.id ? "text-white/80" : "text-slate-500"}`}>
                                <div className="flex items-center gap-0.5">
                                    <Star className={`h-3 w-3 ${selectedAgentId === agent.id ? "fill-white text-white" : "fill-yellow-400 text-yellow-400"}`} />
                                    <span>{agent.rating}</span>
                                </div>
                                <span>•</span>
                                <span className="truncate">{agent.propertyCount} props</span>
                            </div>
                        </div>
                        {agent.qas > 0 && (
                            <div className={`flex items-center justify-center h-5 min-w-[1.25rem] px-1 rounded-full text-[10px] font-bold ${selectedAgentId === agent.id
                                ? "bg-white/20 text-white"
                                : "bg-purple-100 text-purple-600"
                                }`}>
                                {agent.qas}
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
