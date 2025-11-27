"use client"

import { X, MapPin, DollarSign, Home, Clock, Users, Search, Plus, Trash2, AlertCircle, MessageSquare } from "lucide-react"
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
}

export default function RequestDrawer({ request, isOpen, onClose }: RequestDrawerProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedProperties, setSelectedProperties] = useState<any[]>([])
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<"my-listings" | "marketplace" | "selected">("my-listings")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setIsAnimating(isOpen)
    if (!isOpen) {
      // Reset state when closed
      setTimeout(() => {
        setSelectedProperties([])
        setMessage("")
        setActiveTab("my-listings")
        setSearchQuery("")
      }, 300)
    }
  }, [isOpen])

  if (!request) return null

  // Mock Data from ResponseModal
  const myListings = [
    {
      id: 1,
      title: "Modern Downtown Loft",
      location: "Downtown District",
      price: "$480k",
      image: "/modern-loft.jpg",
      matchScore: 92,
      agent: "You",
      isOwn: true,
    },
    {
      id: 2,
      title: "Riverside Townhouse",
      location: "Riverside Area",
      price: "$650k",
      image: "/riverside-townhouse.jpg",
      matchScore: 88,
      agent: "You",
      isOwn: true,
    },
    {
      id: 3,
      title: "Park View Apartment",
      location: "Downtown District",
      price: "$520k",
      image: "/park-view.jpg",
      matchScore: 85,
      agent: "You",
      isOwn: true,
    },
  ]

  const marketplaceListings = [
    {
      id: 101,
      title: "Garden Home",
      location: "Suburban Heights",
      price: "$750k",
      image: "/garden-home.jpg",
      matchScore: 91,
      agent: "Sarah Chen",
      isOwn: false,
      referralEnabled: true,
      timesReferred: 0,
    },
    {
      id: 102,
      title: "Heritage Manor",
      location: "Heritage Village",
      price: "$580k",
      image: "/heritage-manor.jpg",
      matchScore: 87,
      agent: "Michael Rodriguez",
      isOwn: false,
      referralEnabled: true,
      timesReferred: 1,
    },
    {
      id: 103,
      title: "Coastal Villa",
      location: "Beachfront District",
      price: "$920k",
      image: "/coastal-villa-luxury-beachfront.jpg",
      matchScore: 89,
      agent: "Emma Thompson",
      isOwn: false,
      referralEnabled: true,
      timesReferred: 0,
    },
    {
      id: 104,
      title: "Mountain Retreat",
      location: "Alpine Heights",
      price: "$680k",
      image: "/secluded-mountain-cabin.png",
      matchScore: 84,
      agent: "James Wilson",
      isOwn: false,
      referralEnabled: false,
      timesReferred: 0,
    },
  ]

  const getFilteredProperties = (properties: any[], isMarketplace: boolean) => {
    return properties.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
      if (isMarketplace) {
        return matchesSearch && p.referralEnabled && p.timesReferred < 2
      }
      return matchesSearch
    })
  }

  const filteredMyListings = getFilteredProperties(myListings, false)
  const filteredMarketplace = getFilteredProperties(marketplaceListings, true)

  const toggleProperty = (property: any) => {
    setSelectedProperties((prev) => {
      const exists = prev.find((p) => p.id === property.id)
      if (exists) {
        return prev.filter((p) => p.id !== property.id)
      } else if (prev.length < 5) {
        return [...prev, property]
      }
      return prev
    })
  }

  const removeProperty = (propertyId: number) => {
    setSelectedProperties((prev) => prev.filter((p) => p.id !== propertyId))
  }

  const handleSubmit = async () => {
    if (selectedProperties.length === 0) return
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    onClose()
  }

  const PropertyCard = ({ property, canAdd = true }: { property: any; canAdd?: boolean }) => {
    const isSelected = selectedProperties.find((p) => p.id === property.id)
    const cannotAdd = canAdd && selectedProperties.length >= 5 && !isSelected

    return (
      <div
        className={`flex items-center gap-3 p-3 rounded-lg border transition-colors group ${cannotAdd
          ? "bg-slate-50 border-slate-100 opacity-50 cursor-not-allowed dark:bg-white/5 dark:border-white/5"
          : "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 cursor-pointer dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10"
          }`}
        onClick={() => !cannotAdd && toggleProperty(property)}
      >
        <img
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          className="w-16 h-12 rounded-md object-cover"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate">{property.title}</h4>
          <p className="text-xs text-slate-500 dark:text-blue-300 truncate">
            {property.location} • {property.price}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{property.matchScore}%</p>
        </div>
        {canAdd && (
          <button
            className={`p-1.5 rounded-md transition-colors ${isSelected
              ? "bg-blue-100 text-blue-600 dark:bg-blue-500/30 dark:text-blue-300"
              : "hover:bg-blue-50 text-blue-500 opacity-0 group-hover:opacity-100 dark:hover:bg-blue-500/20 dark:text-blue-400"
              }`}
            onClick={(e) => {
              e.stopPropagation()
              if (!cannotAdd) toggleProperty(property)
            }}
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={onClose}
          style={{
            opacity: isAnimating ? 1 : 0,
          }}
        />
      )}

      <div
        className="fixed right-0 top-0 h-full w-full md:w-[900px] z-50 bg-[#F7F5FF] dark:bg-[#1a1829] shadow-2xl transition-transform duration-300 flex flex-col"
        style={{
          transform: isAnimating ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-lg z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Request & Response</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Review request details and build your response</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Left Column: Request Details */}
          <div className="flex-1 overflow-y-auto p-6 border-b md:border-b-0 md:border-r border-slate-200/80 dark:border-slate-800/80">
            {/* Client Info */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{request.clientName}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Requested {request.timestamp}</p>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${request.priority === "high"
                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                : request.priority === "medium"
                  ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                  : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                }`}>
                <div className={`w-2 h-2 rounded-full ${request.priority === "high"
                  ? "bg-red-500"
                  : request.priority === "medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                  }`}></div>
                <span className="capitalize">{request.priority}</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Property Specifications */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Property Specifications</h4>
                <div className="space-y-3">
                  <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-3 rounded-xl shadow-[0_4px_16px_0_rgba(100,100,150,0.1)] border border-white/50 dark:border-white/10">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Location</p>
                    <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
                      <MapPin className="text-purple-500 h-4 w-4" />
                      <span>{request.location}</span>
                    </div>
                  </div>
                  <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-3 rounded-xl shadow-[0_4px_16px_0_rgba(100,100,150,0.1)] border border-white/50 dark:border-white/10">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Budget</p>
                    <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
                      <DollarSign className="text-purple-500 h-4 w-4" />
                      <span>{request.budget}</span>
                    </div>
                  </div>
                  <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-3 rounded-xl shadow-[0_4px_16px_0_rgba(100,100,150,0.1)] border border-white/50 dark:border-white/10">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Bedrooms</p>
                    <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
                      <Home className="text-purple-500 h-4 w-4" />
                      <span>{request.bedrooms}</span>
                    </div>
                  </div>
                  <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-3 rounded-xl shadow-[0_4px_16px_0_rgba(100,100,150,0.1)] border border-white/50 dark:border-white/10">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Timeline</p>
                    <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
                      <Clock className="text-purple-500 h-4 w-4" />
                      <span>{request.timeline}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Client Preferences */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Client Preferences</h4>
                <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-4 rounded-xl shadow-[0_4px_16px_0_rgba(100,100,150,0.1)] border border-white/50 dark:border-white/10">
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {request.preferences}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Build Response */}
          <div className="flex-1 overflow-y-auto p-6 bg-white/40 dark:bg-black/20">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Select Properties</h3>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-4 border-b border-slate-200 dark:border-white/10 overflow-x-auto">
              <button
                onClick={() => {
                  setActiveTab("my-listings")
                  setSearchQuery("")
                }}
                className={`px-3 py-2 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${activeTab === "my-listings"
                  ? "text-blue-600 border-blue-600 dark:text-blue-300 dark:border-blue-400"
                  : "text-slate-500 border-transparent hover:text-slate-700 dark:text-blue-300/60 dark:hover:text-blue-300"
                  }`}
              >
                My Listings
              </button>
              <button
                onClick={() => {
                  setActiveTab("marketplace")
                  setSearchQuery("")
                }}
                className={`px-3 py-2 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${activeTab === "marketplace"
                  ? "text-blue-600 border-blue-600 dark:text-blue-300 dark:border-blue-400"
                  : "text-slate-500 border-transparent hover:text-slate-700 dark:text-blue-300/60 dark:hover:text-blue-300"
                  }`}
              >
                Marketplace
              </button>
              <button
                onClick={() => setActiveTab("selected")}
                className={`px-3 py-2 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${activeTab === "selected"
                  ? "text-blue-600 border-blue-600 dark:text-blue-300 dark:border-blue-400"
                  : "text-slate-500 border-transparent hover:text-slate-700 dark:text-blue-300/60 dark:hover:text-blue-300"
                  }`}
              >
                Selected
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-200 dark:border-blue-400/30 h-5 px-1.5 text-[10px]">
                  {selectedProperties.length}/5
                </Badge>
              </button>
            </div>

            {/* Search Bar */}
            {(activeTab === "my-listings" || activeTab === "marketplace") && (
              <div className="mb-4 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-blue-300/50" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === "my-listings" ? "your listings" : "marketplace"}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-blue-300/50 dark:focus:border-blue-400/50"
                />
              </div>
            )}

            {/* Property List */}
            <div className="space-y-3 mb-6 min-h-[200px]">
              {activeTab === "my-listings" && (
                <>
                  {filteredMyListings.length === 0 ? (
                    <p className="text-center text-slate-500 dark:text-blue-300/60 py-8 text-sm">
                      {searchQuery ? "No listings match your search" : "No listings available"}
                    </p>
                  ) : (
                    filteredMyListings.map((property) => (
                      <PropertyCard key={property.id} property={property} canAdd={true} />
                    ))
                  )}
                </>
              )}

              {activeTab === "marketplace" && (
                <>
                  {filteredMarketplace.length === 0 ? (
                    <p className="text-center text-slate-500 dark:text-blue-300/60 py-8 text-sm">
                      {searchQuery ? "No listings match your search" : "No referral-enabled listings available"}
                    </p>
                  ) : (
                    filteredMarketplace.map((property) => (
                      <PropertyCard key={property.id} property={property} canAdd={true} />
                    ))
                  )}
                </>
              )}

              {activeTab === "selected" && (
                <>
                  {selectedProperties.length === 0 ? (
                    <p className="text-center text-slate-500 dark:text-blue-300/60 py-8 text-sm">No properties selected yet</p>
                  ) : (
                    selectedProperties.map((property) => (
                      <div
                        key={property.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200 group dark:bg-blue-500/10 dark:border-blue-400/30"
                      >
                        <img
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          className="w-16 h-12 rounded-md object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate">{property.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-blue-300 truncate">
                            {property.location} • {property.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeProperty(property.id)}
                          className="p-1.5 hover:bg-red-100 rounded-md transition-colors opacity-0 group-hover:opacity-100 dark:hover:bg-red-500/20"
                        >
                          <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400" />
                        </button>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>

            {/* Message Input */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 dark:text-blue-300 uppercase tracking-wide mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Personal Message
              </h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                placeholder="Introduce yourself and explain why these properties match their needs..."
                className="w-full h-32 rounded-lg bg-white border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-blue-300/50 dark:focus:border-blue-400/50"
              />
              <p className="text-xs text-slate-500 dark:text-blue-300 mt-2 text-right">{message.length}/500</p>
            </div>

            {/* Warning if no properties selected */}
            {selectedProperties.length === 0 && (
              <div className="mt-4 rounded-lg bg-yellow-50 border border-yellow-200 p-3 flex items-start gap-3 dark:bg-yellow-500/10 dark:border-yellow-400/30">
                <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-800 dark:text-yellow-200 text-xs">Select at least one property</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-lg">
          <div className="flex gap-4 justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:bg-transparent h-11 px-8"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={selectedProperties.length === 0 || isSubmitting}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white font-semibold h-11 px-8 rounded-xl transition-opacity shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Response"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
