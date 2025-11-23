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
    high: "bg-red-400/20 text-red-300 border-red-400/30",
    medium: "bg-yellow-400/20 text-yellow-300 border-yellow-400/30",
    low: "bg-green-400/20 text-green-300 border-green-400/30",
  }

  const priorityDot = {
    high: "bg-red-400",
    medium: "bg-yellow-400",
    low: "bg-green-400",
  }

  if (viewMode === "list") {
    return (
      <div
        onClick={() => onSelect(request)}
        className={`group cursor-pointer rounded-xl border transition-all p-4 ${
          isSelected
            ? "border-blue-400 bg-blue-400/10"
            : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
        } backdrop-blur`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-white">{request.clientName}</h3>
              <Badge variant="outline" className={`${priorityColor[request.priority]} border`}>
                <span className={`h-1.5 w-1.5 rounded-full ${priorityDot[request.priority]} mr-1.5`} />
                {request.priority}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200">
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
            <div className="text-2xl font-bold text-blue-400">{request.respondentsCount}</div>
            <div className="text-xs text-blue-200">responses</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card
      onClick={() => onSelect(request)}
      className={`group cursor-pointer transition-all border backdrop-blur ${
        isSelected
          ? "border-blue-400 bg-blue-400/10 ring-2 ring-blue-400/20"
          : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-white">{request.clientName}</h3>
            <p className="text-sm text-blue-200">{request.timestamp}</p>
          </div>
          <Badge variant="outline" className={`${priorityColor[request.priority]} border whitespace-nowrap`}>
            <span className={`h-1.5 w-1.5 rounded-full ${priorityDot[request.priority]} mr-1.5`} />
            {request.priority}
          </Badge>
        </div>

        {/* Details */}
        <div className="mb-5 space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-blue-300 flex-shrink-0" />
            <span className="text-blue-100">{request.location}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <DollarSign className="h-4 w-4 text-blue-300 flex-shrink-0" />
            <span className="text-blue-100">{request.budget}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Home className="h-4 w-4 text-blue-300 flex-shrink-0" />
            <span className="text-blue-100">{request.bedrooms} bedroom</span>
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-5 rounded-lg bg-white/5 p-3 border border-white/10">
          <p className="text-xs font-medium text-blue-200 mb-1">Preferences</p>
          <p className="text-sm text-blue-100">{request.preferences}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-xs text-blue-200">Timeline</p>
            <p className="font-semibold text-white">{request.timeline}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
