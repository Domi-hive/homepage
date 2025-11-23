"use client"

import { X, MapPin, DollarSign, Home, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

interface RequestDrawerProps {
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
  } | null
  isOpen: boolean
  onClose: () => void
  onRespond: () => void
}

export default function RequestDrawer({ request, isOpen, onClose, onRespond }: RequestDrawerProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(isOpen)
  }, [isOpen])

  if (!request) return null

  const priorityColor = {
    high: "bg-red-400/20 text-red-300 border-red-400/30",
    medium: "bg-yellow-400/20 text-yellow-300 border-yellow-400/30",
    low: "bg-green-400/20 text-green-300 border-green-400/30",
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
          style={{
            opacity: isAnimating ? 1 : 0,
          }}
        />
      )}

      <div
        className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-gradient-to-b from-slate-900 to-slate-800 border-l border-white/10 shadow-2xl transition-transform duration-300 overflow-y-auto"
        style={{
          transform: isAnimating ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div className="sticky top-0 border-b border-white/10 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Request Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="h-5 w-5 text-blue-200" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Client Info & Priority */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-2xl font-bold text-white">{request.clientName}</h3>
                <p className="text-blue-300 text-sm mt-1">Requested {request.timestamp}</p>
              </div>
              <Badge variant="outline" className={`${priorityColor[request.priority]} border whitespace-nowrap`}>
                <span
                  className={`h-2 w-2 rounded-full mr-2 ${
                    request.priority === "high"
                      ? "bg-red-400"
                      : request.priority === "medium"
                        ? "bg-yellow-400"
                        : "bg-green-400"
                  }`}
                />
                {request.priority}
              </Badge>
            </div>
          </div>

          {/* Property Specs */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-blue-200 uppercase tracking-wide">Property Specifications</h4>
            <div className="space-y-3">
              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-medium text-blue-300 mb-2">Location</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <p className="font-semibold text-white">{request.location}</p>
                </div>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-medium text-blue-300 mb-2">Budget</p>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-400" />
                  <p className="font-semibold text-white">{request.budget}</p>
                </div>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-medium text-blue-300 mb-2">Bedrooms</p>
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-blue-400" />
                  <p className="font-semibold text-white">{request.bedrooms}</p>
                </div>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-medium text-blue-300 mb-2">Timeline</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <p className="font-semibold text-white">{request.timeline}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h4 className="text-sm font-semibold text-blue-200 uppercase tracking-wide mb-3">Client Preferences</h4>
            <div className="rounded-lg bg-white/5 border border-white/10 p-4">
              <p className="text-blue-100 leading-relaxed">{request.preferences}</p>
            </div>
          </div>

          {/* Response Stats */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{request.respondentsCount}</p>
                  <p className="text-xs text-blue-300">agent responses</p>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-300">Response rate</span>
                <span className="font-semibold text-white">{Math.round((request.respondentsCount / 10) * 100)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions - Sticky */}
        <div className="sticky bottom-0 border-t border-white/10 bg-gradient-to-t from-slate-900 to-slate-900/95 backdrop-blur p-6 space-y-3">
          <Button
            onClick={onRespond}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 h-11"
          >
            Build Response
          </Button>
          <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent h-11">
            Save Request
          </Button>
        </div>
      </div>
    </>
  )
}
