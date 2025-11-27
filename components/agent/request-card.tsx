"use client"

import { MapPin, DollarSign, Home, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface RequestCardProps {
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
  }
  isSelected: boolean
  onSelect: (request: any) => void
  viewMode: "card" | "list"
}

export default function RequestCard({ request, isSelected, onSelect, viewMode }: RequestCardProps) {
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

  if (viewMode === "list") {
    return (
      <div
        onClick={() => onSelect(request)}
        className={`group cursor-pointer rounded-xl border transition-all p-4 ${isSelected
          ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-400/10"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:border-white/20"
          } backdrop-blur-sm`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-slate-900 dark:text-white">{request.clientName}</h3>
              <Badge variant="outline" className={`${priorityColor[request.priority]} border`}>
                <span className={`h-1.5 w-1.5 rounded-full ${priorityDot[request.priority]} mr-1.5`} />
                {request.priority}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-blue-200">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {request.location}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {request.budget}
              </div>
              <div className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                {request.bedrooms} bed
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {request.timestamp}
              </div>
            </div>
          </div>
          <div className="ml-4 text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{request.respondentsCount}</div>
            <div className="text-xs text-slate-500 dark:text-blue-200">responses</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card
      onClick={() => onSelect(request)}
      className={`group cursor-pointer transition-all border-0 shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] ${isSelected
        ? "bg-blue-50 ring-2 ring-blue-500/20 dark:bg-blue-400/10 dark:ring-blue-400/20"
        : "bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-900/80"
        } flex flex-col justify-between h-full`}
    >
      <div className="p-6 flex flex-col h-full justify-between">
        <div>
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">{request.clientName}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{request.timestamp}</p>
            </div>
            <Badge variant="outline" className={`${priorityColor[request.priority]} border-0 py-1 px-2.5 rounded-full flex items-center gap-1.5`}>
              <div className={`w-1.5 h-1.5 rounded-full ${priorityDot[request.priority]}`}></div>
              {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
            </Badge>
          </div>

          {/* Details */}
          <div className="mb-4 space-y-2 text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5" />
              <span>{request.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5" />
              <span>{request.budget}</span>
            </div>
            <div className="flex items-center gap-3">
              <Home className="h-5 w-5" />
              <span>{request.bedrooms} bedroom</span>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-slate-100/70 dark:bg-slate-800/50 p-4 rounded-xl mb-4">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Preferences</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{request.preferences}</p>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Timeline</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{request.timeline}</p>
        </div>
      </div>
    </Card>
  )
}
