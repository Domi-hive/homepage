"use client"

import { useState } from "react"
import { MapPin, DollarSign, Home, Clock, ChevronDown, ChevronUp, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface RequestRowProps {
    request: {
        id: string
        clientName: string
        location: string
        budget: string
        bedrooms: string
        preferences: string
        timeline: string
        timestamp: string
        priority: "high" | "medium" | "low"
        respondentsCount: number
        status: "incoming" | "responded"
    }
    onRespond: (request: any) => void
}

export default function RequestRow({ request, onRespond }: RequestRowProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const priorityColor = {
        high: "bg-red-100 text-red-700 border-red-200 dark:bg-red-400/20 dark:text-red-300 dark:border-red-400/30",
        medium: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-400/20 dark:text-yellow-300 dark:border-yellow-400/30",
        low: "bg-green-100 text-green-700 border-green-200 dark:bg-green-400/20 dark:text-green-300 dark:border-green-400/30",
    }

    const priorityDot = {
        high: "bg-red-500 dark:bg-red-400",
        medium: "bg-yellow-500 dark:bg-yellow-400",
        low: "bg-green-500 dark:bg-green-400",
    }

    return (
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl shadow-[0_4px_16px_0_rgba(100,100,150,0.1)] border border-white/50 dark:border-white/10 overflow-hidden transition-all">
            {/* Main Row - Clickable to toggle expand */}
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/40 dark:hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-6 flex-1">
                    {/* Client & Priority */}
                    <div className="w-48">
                        <h3 className="font-bold text-slate-800 dark:text-white truncate">{request.clientName}</h3>
                        <Badge variant="outline" className={`mt-1 ${priorityColor[request.priority]} border-0 py-0.5 px-2 rounded-full inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${priorityDot[request.priority]}`}></div>
                            {request.priority}
                        </Badge>
                    </div>

                    {/* Key Details (Hidden on mobile) */}
                    <div className="hidden md:flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300 flex-1">
                        <div className="flex items-center gap-1.5 min-w-[120px]">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <span className="truncate">{request.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 min-w-[100px]">
                            <DollarSign className="h-4 w-4 text-slate-400" />
                            <span>{request.budget}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span>{request.timestamp}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Status/Responses */}
                    <div className="text-right mr-2">
                        {request.status === "responded" ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300">
                                Responded
                            </Badge>
                        ) : (
                            <div className="flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400">
                                <Users className="h-4 w-4" />
                                <span>{request.respondentsCount} responses</span>
                            </div>
                        )}
                    </div>

                    {/* Chevron */}
                    <div className={`p-1 rounded-full transition-transform duration-200 ${isExpanded ? "rotate-180 bg-slate-100 dark:bg-slate-800" : ""}`}>
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                    </div>
                </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
                <div className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-white/5 p-6 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Preferences</h4>
                                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed bg-white dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700/50">
                                    {request.preferences}
                                </p>
                            </div>

                            {/* Mobile-only details that were hidden in main row */}
                            <div className="md:hidden grid grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700/50">
                                    <p className="text-xs text-slate-500 mb-1">Location</p>
                                    <p className="font-medium text-slate-700 dark:text-slate-200">{request.location}</p>
                                </div>
                                <div className="bg-white dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700/50">
                                    <p className="text-xs text-slate-500 mb-1">Budget</p>
                                    <p className="font-medium text-slate-700 dark:text-slate-200">{request.budget}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700/50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Home className="h-3.5 w-3.5 text-slate-400" />
                                        <span className="text-xs text-slate-500">Bedrooms</span>
                                    </div>
                                    <p className="font-semibold text-slate-700 dark:text-slate-200">{request.bedrooms}</p>
                                </div>
                                <div className="bg-white dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700/50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                                        <span className="text-xs text-slate-500">Timeline</span>
                                    </div>
                                    <p className="font-semibold text-slate-700 dark:text-slate-200">{request.timeline}</p>
                                </div>
                            </div>

                            <Button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onRespond(request)
                                }}
                                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white shadow-lg shadow-purple-500/20"
                            >
                                {request.status === "responded" ? "View Response" : "Respond to Request"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
