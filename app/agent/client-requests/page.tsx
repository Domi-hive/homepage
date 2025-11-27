"use client"

import { useState } from "react"
import { Bell, Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import RequestCard from "@/components/agent/request-card"
import RequestDrawer from "@/components/agent/request-drawer"


type Request = {
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

const MOCK_REQUESTS: Request[] = [
  {
    id: "1",
    clientName: "Sarah Johnson",
    location: "Downtown District",
    budget: "450k - 550k",
    bedrooms: "3-4",
    preferences: "Modern, near schools",
    timeline: "2 weeks",
    timestamp: "5 minutes ago",
    priority: "high",
    respondentsCount: 3,
  },
  {
    id: "2",
    clientName: "Michael Chen",
    location: "Riverside Area",
    budget: "600k - 750k",
    bedrooms: "4-5",
    preferences: "Waterfront, garden",
    timeline: "1 month",
    timestamp: "25 minutes ago",
    priority: "medium",
    respondentsCount: 5,
  },
  {
    id: "3",
    clientName: "Emma Rodriguez",
    location: "Tech Park District",
    budget: "350k - 450k",
    bedrooms: "2-3",
    preferences: "Investment property, quiet",
    timeline: "ASAP",
    timestamp: "1 hour ago",
    priority: "high",
    respondentsCount: 7,
  },
  {
    id: "4",
    clientName: "David Kim",
    location: "Suburban Heights",
    budget: "700k - 900k",
    bedrooms: "4+",
    preferences: "Large lot, family home",
    timeline: "3 weeks",
    timestamp: "2 hours ago",
    priority: "medium",
    respondentsCount: 2,
  },
  {
    id: "5",
    clientName: "Lisa Wang",
    location: "Heritage Village",
    budget: "500k - 650k",
    bedrooms: "3",
    preferences: "Historic charm, walkable",
    timeline: "1 month",
    timestamp: "3 hours ago",
    priority: "low",
    respondentsCount: 1,
  },
]

export default function ClientRequests() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPriority, setFilterPriority] = useState<"all" | "high" | "medium" | "low">("all")
  const [filterLocation, setFilterLocation] = useState<string | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<(typeof MOCK_REQUESTS)[0] | null>(null)
  const [viewMode, setViewMode] = useState<"card" | "list">("card")


  const filteredRequests = MOCK_REQUESTS.filter((request) => {
    const matchesSearch =
      request.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = filterPriority === "all" || request.priority === filterPriority
    const matchesLocation = !filterLocation || request.location === filterLocation
    return matchesSearch && matchesPriority && matchesLocation
  })

  const locations = Array.from(new Set(MOCK_REQUESTS.map((r) => r.location)))

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff] dark:bg-[#121826]">
      <div
        className="absolute inset-0 bg-cover bg-top opacity-75 pointer-events-none z-0"
        style={{ backgroundImage: 'url(/assets/full_page_background.png)' }}
      />

      <main className="relative z-10 p-10 h-full overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white">Client Requests</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Incoming requests from clients looking for properties</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <img
                alt="User avatar"
                className="w-11 h-11 rounded-full object-cover ring-2 ring-white dark:ring-slate-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApwz1HzKfzmiTi2UQsUJcW888s0VDgItEm-xhw7ioi7hzA5iXKdTooAJNi23OxGQOc6EdcnvtCqsPqCQtjebd3RrTQ3rU70soZYB989rU0V2xwU10nXOPhJp5OauflT4w4YdPaLYgvCUKTcmK4ileUe50q8glR9EXw6QSKFjXo4SAzVB2v_Ww33PACuP1RMXVBUxYrJwx_w9fhdfO5zk7wDg-oMOyLfPFNKy9AS6x9TgXe8AO1vmZTW9s3Ba9EcmOU1xeAqW6q8A"
              />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-100 block leading-tight">User</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">Agent</p>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-6">
          {/* Search and View Toggle */}
          <div className="flex justify-between items-center">
            <div className="relative w-1/3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl border-0 focus:ring-2 focus:ring-purple-500 shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] placeholder:text-slate-400 dark:text-white"
                placeholder="Search by client name or location..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
              <button
                onClick={() => setViewMode("card")}
                className={`px-4 py-1.5 rounded-md font-semibold shadow-sm transition-all ${viewMode === "card" ? "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200" : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-1.5 rounded-md font-medium transition-all ${viewMode === "list" ? "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}
              >
                List
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterPriority("all")}
                className={`px-4 py-2 rounded-xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] font-semibold transition-all ${filterPriority === "all" ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-purple-500/30" : "bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm text-slate-600 dark:text-slate-300 hover:bg-white/80"}`}
              >
                All
              </button>
              <button
                onClick={() => setFilterPriority("high")}
                className={`px-4 py-2 rounded-xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] font-medium transition-all ${filterPriority === "high" ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-purple-500/30" : "bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm text-slate-600 dark:text-slate-300 hover:bg-white/80"}`}
              >
                High
              </button>
              <button
                onClick={() => setFilterPriority("medium")}
                className={`px-4 py-2 rounded-xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] font-medium transition-all ${filterPriority === "medium" ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-purple-500/30" : "bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm text-slate-600 dark:text-slate-300 hover:bg-white/80"}`}
              >
                Medium
              </button>
              <button
                onClick={() => setFilterPriority("low")}
                className={`px-4 py-2 rounded-xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] font-medium transition-all ${filterPriority === "low" ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-purple-500/30" : "bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm text-slate-600 dark:text-slate-300 hover:bg-white/80"}`}
              >
                Low
              </button>
            </div>
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 hidden md:block"></div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setFilterLocation(null)}
                className={`px-4 py-2 rounded-xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] font-semibold transition-all ${filterLocation === null ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-purple-500/30" : "bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm text-slate-600 dark:text-slate-300 hover:bg-white/80"}`}
              >
                All Locations
              </button>
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => setFilterLocation(location)}
                  className={`px-4 py-2 rounded-xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] font-medium transition-all ${filterLocation === location ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-purple-500/30" : "bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm text-slate-600 dark:text-slate-300 hover:bg-white/80"}`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          {/* Requests Grid/List */}
          {filteredRequests.length > 0 ? (
            <div className={viewMode === "card" ? "grid gap-8 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"}>
              {filteredRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  isSelected={selectedRequest?.id === request.id}
                  onSelect={setSelectedRequest}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/30 dark:bg-slate-900/30 py-12">
              <Search className="h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">No requests found</h3>
              <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Request Drawer */}
        <RequestDrawer
          request={selectedRequest}
          isOpen={selectedRequest !== null}
          onClose={() => setSelectedRequest(null)}
        />


      </main>
    </div>
  )
}
