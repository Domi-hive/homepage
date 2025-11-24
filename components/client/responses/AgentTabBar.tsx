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

export default function AgentTabBar({ agents, selectedAgentId, onSelectAgent }: AgentTabBarProps) {
    return (
        <div className="w-full overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
                {agents.map((agent) => (
                    <button
                        key={agent.id}
                        onClick={() => onSelectAgent(agent.id)}
                        className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all whitespace-nowrap ${selectedAgentId === agent.id
                                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent shadow-lg shadow-purple-500/30"
                                : "bg-white/60 border-white/50 text-slate-600 hover:bg-white/80 backdrop-blur-sm"
                            }`}
                    >
                        <img
                            src={agent.photo || "/placeholder.svg"}
                            alt={agent.name}
                            className={`h-10 w-10 rounded-full object-cover border-2 ${selectedAgentId === agent.id ? "border-white/30" : "border-white"
                                }`}
                        />
                        <div className="text-left">
                            <div className={`font-semibold text-sm ${selectedAgentId === agent.id ? "text-white" : "text-slate-800"}`}>
                                {agent.name}
                            </div>
                            <div className={`flex items-center gap-2 text-xs ${selectedAgentId === agent.id ? "text-white/80" : "text-slate-500"}`}>
                                <div className="flex items-center gap-0.5">
                                    <Star className={`h-3 w-3 ${selectedAgentId === agent.id ? "fill-white text-white" : "fill-yellow-400 text-yellow-400"}`} />
                                    <span>{agent.rating}</span>
                                </div>
                                <span>•</span>
                                <span>{agent.propertyCount} properties</span>
                            </div>
                        </div>
                        {agent.qas > 0 && (
                            <div className={`ml-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${selectedAgentId === agent.id
                                    ? "bg-white/20 text-white"
                                    : "bg-purple-100 text-purple-600"
                                }`}>
                                <MessageCircle className="h-3 w-3" />
                                {agent.qas}
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
