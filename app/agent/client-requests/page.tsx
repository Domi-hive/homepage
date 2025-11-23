"use client"

import { useState } from "react"
import { Bell, Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import RequestCard from "@/components/agent/request-card"
import RequestDrawer from "@/components/agent/request-drawer"
import ResponseModal from "@/components/agent/response-modal"

const MOCK_REQUESTS = [
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
  const [showResponseModal, setShowResponseModal] = useState(false)

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-30">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Client Requests</h1>
            <p className="text-muted-foreground mt-1">Incoming requests from clients looking for properties</p>
          </div>
          <button className="relative rounded-lg p-2 hover:bg-muted transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>
      </header>

      <main className="p-6">
        {/* Controls Section */}
        <div className="mb-8 flex flex-col gap-4">
          {/* Search and Filter */}
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by client name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Priority and Location Filters */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filterPriority === "all" ? "default" : "outline"}
                onClick={() => setFilterPriority("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterPriority === "high" ? "default" : "outline"}
                onClick={() => setFilterPriority("high")}
                size="sm"
              >
                <span className="h-2 w-2 rounded-full bg-red-400 mr-2" />
                High
              </Button>
              <Button
                variant={filterPriority === "medium" ? "default" : "outline"}
                onClick={() => setFilterPriority("medium")}
                size="sm"
              >
                <span className="h-2 w-2 rounded-full bg-yellow-400 mr-2" />
                Medium
              </Button>
              <Button
                variant={filterPriority === "low" ? "default" : "outline"}
                onClick={() => setFilterPriority("low")}
                size="sm"
              >
                <span className="h-2 w-2 rounded-full bg-green-400 mr-2" />
                Low
              </Button>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filterLocation === null ? "default" : "outline"}
                onClick={() => setFilterLocation(null)}
                size="sm"
              >
                <MapPin className="h-4 w-4 mr-2" />
                All Locations
              </Button>
              {locations.map((location) => (
                <Button
                  key={location}
                  variant={filterLocation === location ? "default" : "outline"}
                  onClick={() => setFilterLocation(location)}
                  size="sm"
                >
                  {location}
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "card" ? "default" : "outline"}
                onClick={() => setViewMode("card")}
                size="sm"
              >
                Cards
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
                size="sm"
              >
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Requests Grid/List */}
        {filteredRequests.length > 0 ? (
          <div className={viewMode === "card" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-3"}>
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
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-muted py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No requests found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Request Drawer */}
        <RequestDrawer
          request={selectedRequest}
          isOpen={selectedRequest !== null}
          onClose={() => setSelectedRequest(null)}
          onRespond={() => setShowResponseModal(true)}
        />

        {/* Response Modal */}
        {selectedRequest && (
          <ResponseModal
            isOpen={showResponseModal}
            onClose={() => setShowResponseModal(false)}
            request={selectedRequest}
          />
        )}
      </main>
    </div>
  )
}
