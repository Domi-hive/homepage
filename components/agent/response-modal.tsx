"use client"

import { useState } from "react"
import { X, Plus, Trash2, AlertCircle, MessageSquare, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ResponseModalProps {
  isOpen: boolean
  onClose: () => void
  request: {
    id: string
    clientName: string
    location: string
    budget: string
    bedrooms: string
    timeline: string
    priority: "high" | "medium" | "low"
  }
}

export default function ResponseModal({ isOpen, onClose, request }: ResponseModalProps) {
  const [selectedProperties, setSelectedProperties] = useState<any[]>([])
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<"my-listings" | "marketplace" | "selected">("my-listings")
  const [searchQuery, setSearchQuery] = useState("")

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
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    onClose()
    setSelectedProperties([])
    setMessage("")
  }

  const PropertyCard = ({ property, canAdd = true }: { property: any; canAdd?: boolean }) => {
    const isSelected = selectedProperties.find((p) => p.id === property.id)
    const cannotAdd = canAdd && selectedProperties.length >= 5 && !isSelected

    return (
      <div
        className={`flex items-center gap-4 p-4 rounded-lg border transition-colors group ${
          cannotAdd
            ? "bg-white/3 border-white/5 opacity-50 cursor-not-allowed"
            : "bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer"
        }`}
        onClick={() => !cannotAdd && toggleProperty(property)}
      >
        <img
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          className="w-20 h-16 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white truncate">{property.title}</h4>
          <p className="text-sm text-blue-300">
            {property.location} • {property.price}
          </p>
          {!property.isOwn && <p className="text-xs text-blue-400 mt-1">Agent: {property.agent}</p>}
        </div>
        <div className="text-right mr-4">
          <p className="text-sm font-semibold text-blue-400">{property.matchScore}%</p>
          <p className="text-xs text-blue-300">match</p>
        </div>
        {canAdd && (
          <button
            className={`p-2 rounded-lg transition-colors ${
              isSelected
                ? "bg-blue-500/30 text-blue-300"
                : "hover:bg-blue-500/20 text-blue-400 opacity-0 group-hover:opacity-100"
            }`}
            onClick={(e) => {
              e.stopPropagation()
              if (!cannotAdd) toggleProperty(property)
            }}
          >
            <Plus className="h-5 w-5" />
          </button>
        )}
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="border-b border-white/10 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Build Response</h2>
            <p className="text-blue-300 text-sm mt-1">for {request.clientName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="h-6 w-6 text-blue-200" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="overflow-y-auto flex-1">
            <div className="p-8 space-y-8">
              {/* Request Summary */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                <h3 className="text-sm font-semibold text-blue-300 uppercase tracking-wide mb-4">Request Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-blue-300 mb-1">Location</p>
                    <p className="font-semibold text-white">{request.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-300 mb-1">Budget</p>
                    <p className="font-semibold text-white">{request.budget}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-300 mb-1">Bedrooms</p>
                    <p className="font-semibold text-white">{request.bedrooms}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-300 mb-1">Timeline</p>
                    <p className="font-semibold text-white">{request.timeline}</p>
                  </div>
                </div>
              </div>

              <div>
                {/* Tab Navigation */}
                <div className="flex gap-2 mb-6 border-b border-white/10">
                  <button
                    onClick={() => {
                      setActiveTab("my-listings")
                      setSearchQuery("")
                    }}
                    className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 ${
                      activeTab === "my-listings"
                        ? "text-blue-300 border-blue-400"
                        : "text-blue-300/60 border-transparent hover:text-blue-300"
                    }`}
                  >
                    My Listings ({myListings.length})
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("marketplace")
                      setSearchQuery("")
                    }}
                    className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 ${
                      activeTab === "marketplace"
                        ? "text-blue-300 border-blue-400"
                        : "text-blue-300/60 border-transparent hover:text-blue-300"
                    }`}
                  >
                    Browse Marketplace
                  </button>
                  <button
                    onClick={() => setActiveTab("selected")}
                    className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
                      activeTab === "selected"
                        ? "text-blue-300 border-blue-400"
                        : "text-blue-300/60 border-transparent hover:text-blue-300"
                    }`}
                  >
                    Selected
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-400/30">
                      {selectedProperties.length}/5
                    </Badge>
                  </button>
                </div>

                {/* Search Bar (for My Listings and Marketplace tabs) */}
                {(activeTab === "my-listings" || activeTab === "marketplace") && (
                  <div className="mb-6 relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-blue-300/50" />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab === "my-listings" ? "your listings" : "marketplace"}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-blue-300/50 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-colors"
                    />
                  </div>
                )}

                {/* Tab Content */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {activeTab === "my-listings" && (
                    <>
                      {filteredMyListings.length === 0 ? (
                        <p className="text-center text-blue-300/60 py-8">
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
                        <p className="text-center text-blue-300/60 py-8">
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
                        <p className="text-center text-blue-300/60 py-8">No properties selected yet</p>
                      ) : (
                        selectedProperties.map((property) => (
                          <div
                            key={property.id}
                            className="flex items-center gap-4 p-4 rounded-lg bg-blue-500/10 border border-blue-400/30 group"
                          >
                            <img
                              src={property.image || "/placeholder.svg"}
                              alt={property.title}
                              className="w-20 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-white">{property.title}</h4>
                              <p className="text-sm text-blue-300">
                                {property.location} • {property.price}
                              </p>
                              {!property.isOwn && (
                                <p className="text-xs text-blue-400 mt-1">Referral from {property.agent}</p>
                              )}
                            </div>
                            <div className="text-right mr-4">
                              <p className="text-sm font-semibold text-blue-400">{property.matchScore}%</p>
                              <p className="text-xs text-blue-300">match</p>
                            </div>
                            <button
                              onClick={() => removeProperty(property.id)}
                              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="h-5 w-5 text-red-400" />
                            </button>
                          </div>
                        ))
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Message Box */}
              <div>
                <h3 className="text-sm font-semibold text-blue-300 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Personal Message
                </h3>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                  placeholder="Introduce yourself and explain why these properties match their needs..."
                  className="w-full h-24 rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-blue-300 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-colors"
                />
                <p className="text-xs text-blue-300 mt-2 text-right">{message.length}/500</p>
              </div>

              {/* Warning if no properties selected */}
              {selectedProperties.length === 0 && (
                <div className="rounded-lg bg-yellow-500/10 border border-yellow-400/30 p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-200 text-sm">Select at least one property</p>
                    <p className="text-xs text-yellow-300 mt-1">You must add properties before sending your response</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-white/10 bg-gradient-to-t from-slate-900 to-slate-900/95 backdrop-blur px-8 py-6 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent h-11"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedProperties.length === 0 || isSubmitting}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed h-11"
          >
            {isSubmitting ? "Sending..." : "Send Response"}
          </Button>
        </div>
      </div>
    </div>
  )
}
