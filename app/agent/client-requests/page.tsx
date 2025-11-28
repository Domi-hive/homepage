"use client"

import { useState, useMemo } from "react"
import { Bell, Search, MapPin, Filter, X, Zap } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import RequestRow from "@/components/agent/request-row"
import RequestDrawer from "@/components/agent/request-drawer"
import FilterSidebar from "@/components/agent/filter-sidebar"


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
  status: "incoming" | "responded"
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
    status: "incoming",
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
    status: "incoming",
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
    status: "responded",
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
    status: "responded",
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
    status: "responded",
  },
]

export default function ClientRequests() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<(typeof MOCK_REQUESTS)[0] | null>(null)
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)

  // Filter State
  const [activeTab, setActiveTab] = useState<"incoming" | "responded">("incoming")

  // Filter State
  const [filters, setFilters] = useState({
    priority: "all" as "all" | "high" | "medium" | "low",
    location: null as string | null,
  })

  // Presets State
  const [presets, setPresets] = useState<{ name: string; filters: any }[]>([])

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSavePreset = (name: string) => {
    setPresets((prev) => [...prev, { name, filters }])
  }

  const handleApplyPreset = (presetFilters: any) => {
    setFilters(presetFilters)
  }



  const filteredRequests = useMemo(() => {
    return MOCK_REQUESTS.filter((request) => {
      const matchesSearch =
        request.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPriority = filters.priority === "all" || request.priority === filters.priority
      const matchesLocation = !filters.location || request.location === filters.location
      const matchesStatus = request.status === activeTab
      return matchesSearch && matchesPriority && matchesLocation && matchesStatus
    })
  }, [searchQuery, filters, activeTab])

  // Calculate counts for sidebar
  const counts = useMemo(() => {
    const priorityCounts: Record<string, number> = { all: 0, high: 0, medium: 0, low: 0 }
    const locationCounts: Record<string, number> = {}
    const statusCounts: Record<string, number> = { incoming: 0, responded: 0 }

    MOCK_REQUESTS.forEach((req) => {
      priorityCounts.all++
      priorityCounts[req.priority]++

      locationCounts[req.location] = (locationCounts[req.location] || 0) + 1

      statusCounts[req.status]++
    })

    return { priority: priorityCounts, location: locationCounts }
  }, [])

  const locations = Array.from(new Set(MOCK_REQUESTS.map((r) => r.location)))

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff] dark:bg-[#121826] flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-top opacity-75 pointer-events-none z-0"
        style={{ backgroundImage: 'url(/assets/full_page_background.png)' }}
      />

      {/* Top Section: Header & Tabs */}
      <div className="relative z-10 px-10 pt-10 pb-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 dark:text-white">Client Requests</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Incoming requests from clients looking for properties</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <button className="relative text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <img
              alt="User avatar"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuApwz1HzKfzmiTi2UQsUJcW888s0VDgItEm-xhw7ioi7hzA5iXKdTooAJNi23OxGQOc6EdcnvtCqsPqCQtjebd3RrTQ3rU70soZYB989rU0V2xwU10nXOPhJp5OauflT4w4YdPaLYgvCUKTcmK4ileUe50q8glR9EXw6QSKFjXo4SAzVB2v_Ww33PACuP1RMXVBUxYrJwx_w9fhdfO5zk7wDg-oMOyLfPFNKy9AS6x9TgXe8AO1vmZTW9s3Ba9EcmOU1xeAqW6q8A"
            />
          </div>
        </header>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("incoming")}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "incoming"
              ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-sm"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
          >
            Incoming Requests
          </button>
          <button
            onClick={() => setActiveTab("responded")}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "responded"
              ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-sm"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
          >
            Responded
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative z-10">
        <FilterSidebar
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          counts={counts}
          locations={locations}
          onSavePreset={handleSavePreset}
          presets={presets}
          onApplyPreset={handleApplyPreset}
        />

        <main className="flex-1 h-full overflow-y-auto flex flex-col">
          <div className="px-10 pb-20 pt-2 space-y-6">
            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Quick Shortcuts */}
                <Button
                  variant="outline"
                  onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                  className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/40"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl border-0 focus:ring-2 focus:ring-purple-500 shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] placeholder:text-slate-400 dark:text-white"
                  placeholder="Search by client name or location..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Active Filters Chips */}
            <div className="flex flex-wrap gap-2 items-center min-h-[32px]">

              {filters.priority !== "all" && (
                <Badge variant="secondary" className="gap-1 pl-2 pr-1 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-500/20 dark:text-blue-300">
                  Priority: {filters.priority}
                  <button onClick={() => handleFilterChange("priority", "all")} className="hover:bg-blue-200 dark:hover:bg-blue-500/30 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.location && (
                <Badge variant="secondary" className="gap-1 pl-2 pr-1 py-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300">
                  Location: {filters.location}
                  <button onClick={() => handleFilterChange("location", null)} className="hover:bg-emerald-200 dark:hover:bg-emerald-500/30 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {(filters.priority !== "all" || filters.location) && (
                <button
                  onClick={() => setFilters({ priority: "all", location: null })}
                  className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Requests List */}
            {filteredRequests.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredRequests.map((request) => (
                  <RequestRow
                    key={request.id}
                    request={request}
                    onRespond={setSelectedRequest}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/30 dark:bg-slate-900/30 py-12">
                <Search className="h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">No requests found</h3>
                <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters</p>
                <Button
                  variant="link"
                  onClick={() => setFilters({ priority: "all", location: null })}
                  className="mt-2 text-purple-600 dark:text-purple-400"
                >
                  Clear all filters
                </Button>
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
    </div>
  )
}
