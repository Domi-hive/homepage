"use client"

import { X, MapPin, DollarSign, Home, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface RequestPreviewProps {
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
  onClose: () => void
}

export default function RequestPreview({ request, onClose }: RequestPreviewProps) {
  const priorityColor = {
    high: "#ef4444",
    medium: "#eab308",
    low: "#22c55e",
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 overflow-hidden">
      {/* Close button */}
      <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
        <X className="h-5 w-5 text-blue-200" />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-3xl font-bold text-white">{request.clientName}</h2>
              <Badge variant="outline" className="border-white/20 bg-white/10 text-white">
                {request.priority}
              </Badge>
            </div>
            <p className="text-blue-200 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Requested {request.timestamp}
            </p>
          </div>

          {/* Specifications */}
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-medium text-blue-200 mb-2">Location</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <p className="font-semibold text-white">{request.location}</p>
                </div>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-medium text-blue-200 mb-2">Budget</p>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-400" />
                  <p className="font-semibold text-white">{request.budget}</p>
                </div>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-medium text-blue-200 mb-2">Bedrooms</p>
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-blue-400" />
                  <p className="font-semibold text-white">{request.bedrooms}</p>
                </div>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-medium text-blue-200 mb-2">Timeline</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <p className="font-semibold text-white">{request.timeline}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Client Preferences</h3>
            <div className="rounded-lg bg-white/5 border border-white/10 p-4">
              <p className="text-blue-100 leading-relaxed">{request.preferences}</p>
            </div>
          </div>
        </div>

        {/* Sidebar - Response Stats */}
        <div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur sticky top-8">
            <h3 className="text-sm font-semibold text-blue-200 mb-4">Response Stats</h3>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-400/20">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{request.respondentsCount}</p>
                  <p className="text-xs text-blue-200">agent responses</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-6 pb-6 border-b border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-blue-200">Response rate</span>
                <span className="font-semibold text-white">{Math.round((request.respondentsCount / 10) * 100)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-200">Time since posted</span>
                <span className="font-semibold text-white">{request.timestamp}</span>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 mb-3">
              Build Response
            </Button>
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent">
              Save Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
