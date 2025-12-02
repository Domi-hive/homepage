import React from 'react';
import { MapPin, Clock, MessageCircle, Calendar } from 'lucide-react';

interface Request {
    id: string;
    title: string;
    location: string;
    timeAgo: string;
    unreadCount: number;
    initial: string;
    newQas?: number;
    pendingInspections?: number;
}

interface RequestsSidebarProps {
    requests: Request[];
    selectedRequestId: string;
    onSelectRequest: (id: string) => void;
}

export default function RequestsSidebar({ requests, selectedRequestId, onSelectRequest }: RequestsSidebarProps) {
    return (
        <div className="w-full md:w-80 flex-shrink-0">
            <div className="flex flex-col gap-3">
                {requests.map((request) => (
                    <button
                        key={request.id}
                        onClick={() => onSelectRequest(request.id)}
                        className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl border transition-all text-left ${selectedRequestId === request.id
                            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent shadow-lg shadow-purple-500/30"
                            : "bg-white/60 border-white/50 text-slate-600 hover:bg-white/80 backdrop-blur-sm"
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 ${selectedRequestId === request.id
                            ? "bg-white/20 text-white border-2 border-white/30"
                            : "bg-gradient-to-br from-purple-100 to-blue-100 text-slate-700 border-2 border-white"
                            }`}>
                            {request.initial}
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className={`font-semibold text-sm truncate mb-1 ${selectedRequestId === request.id ? "text-white" : "text-slate-800"}`}>
                                {request.title}
                            </div>
                            <div className={`flex items-center gap-3 text-xs ${selectedRequestId === request.id ? "text-white/80" : "text-slate-500"}`}>
                                <div className="flex items-center gap-1 truncate">
                                    <MapPin className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">{request.location}</span>
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                    <Clock className="w-3 h-3" />
                                    <span>{request.timeAgo}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 items-end">

                            <div className="flex gap-1">
                                {request.newQas && request.newQas > 0 ? (
                                    <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${selectedRequestId === request.id
                                        ? "bg-white/20 text-white"
                                        : "bg-blue-100 text-blue-600"
                                        }`}>
                                        <MessageCircle className="w-3 h-3" />
                                        <span>{request.newQas}</span>
                                    </div>
                                ) : null}
                                {request.pendingInspections && request.pendingInspections > 0 ? (
                                    <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${selectedRequestId === request.id
                                        ? "bg-white/20 text-white"
                                        : "bg-amber-100 text-amber-600"
                                        }`}>
                                        <Calendar className="w-3 h-3" />
                                        <span>{request.pendingInspections}</span>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
