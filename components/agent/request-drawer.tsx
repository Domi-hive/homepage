"use client"

import { X, MapPin, DollarSign, Home, Clock, Users, Search, Plus, Trash2, AlertCircle, MessageSquare, ExternalLink, Loader2, RefreshCcw } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import MarketplaceOverlay from "./marketplace-overlay"
import { requestService } from "@/services/request.service"
import { listingService } from "@/services/listing.service"

interface RequestDrawerProps {
  request: {
    id: string
    clientName: string
    location: string
    locationDetails?: string
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
  onSuccess?: () => void
}

export default function RequestDrawer({ request, isOpen, onClose, onSuccess }: RequestDrawerProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedProperties, setSelectedProperties] = useState<any[]>([])
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"my-listings" | "selected">("my-listings")
  const [searchQuery, setSearchQuery] = useState("")
  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false)

  const [show, setShow] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsAnimating(isOpen)
    if (isOpen) {
      setIsVisible(true)
      // Small timeout to ensure component is mounted and DOM is ready for transition
      const timer = setTimeout(() => {
        setShow(true)
      }, 10)
      return () => clearTimeout(timer)
    } else {
      setShow(false)
      // Reset state when closed
      setTimeout(() => {
        setIsVisible(false)
        setSelectedProperties([])
        setMessage("")
        setActiveTab("my-listings")
        setSearchQuery("")
        setIsMarketplaceOpen(false)
      }, 300)
    }
  }, [isOpen])



  // Mock Data from ResponseModal
  const [myListings, setMyListings] = useState<any[]>([])

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listings = await listingService.getMyListings()
        const formattedListings = listings.map(l => ({
          id: l.id,
          title: l.title,
          location: l.location,
          price: l.price,
          image: l.image || "/placeholder.svg",
          beds: l.beds,
          baths: l.baths,
          sqft: l.sqft,
          matchScore: undefined,
          agent: "You",
          isOwn: true
        }))
        setMyListings(formattedListings)
      } catch (error) {
        console.error("Failed to fetch listings:", error)
        toast.error("Failed to load your listings")
      }
    }

    if (isOpen) {
      fetchListings()
    }
  }, [isOpen])

  const getFilteredProperties = (properties: any[]) => {
    return properties.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
  }

  const filteredMyListings = getFilteredProperties(myListings)

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

  const removeProperty = (propertyId: number | string) => {
    setSelectedProperties((prev) => prev.filter((p) => p.id !== propertyId))
  }

  const handleMarketplaceConfirm = (properties: any[]) => {
    // Merge new properties with existing ones, avoiding duplicates, up to limit of 5
    setSelectedProperties((prev) => {
      const currentIds = new Set(prev.map(p => p.id))
      const newProperties = properties.filter(p => !currentIds.has(p.id))
      const combined = [...prev, ...newProperties]
      return combined.slice(0, 5)
    })
    setActiveTab("selected")
  }



  const handleSubmit = async () => {
    if (selectedProperties.length === 0 || !request) return
    setIsSubmitting(true)
    setError(null)

    try {
      const payload = {
        listingIds: selectedProperties.map(p => p.id.toString()),
        message: message
      }

      await requestService.sendRequestResponse(request.id, payload)

      toast.success(`Response sent to ${request.clientName}!`)

      if (onSuccess) onSuccess()
      onClose()
    } catch (error) {
      console.error("Failed to send response:", error)
      setError("Failed to send response. Please try again.")
      toast.error("Failed to send response")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen && !isVisible) return null


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
          {property.matchScore && <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{property.matchScore}%</p>}
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
      <MarketplaceOverlay
        isOpen={isMarketplaceOpen}
        onClose={() => setIsMarketplaceOpen(false)}
        onConfirmSelection={handleMarketplaceConfirm}
        initialSelectedProperties={selectedProperties.filter(p => p.id > 100)} // Assuming marketplace IDs are > 100
        myListings={myListings}
      />

      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 h-full w-full md:max-w-lg z-50 bg-[#F7F5FF] dark:bg-[#1a1829] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${show ? "translate-x-0 delay-100" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur-lg z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Response</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Select properties and send your response</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Response Form */}
          <div className="flex-1 overflow-y-auto p-6 bg-white/40 dark:bg-black/20">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Select Properties</h3>

            {/* Select Properties Header */}
            <div className="flex justify-between items-center mb-4 border-b border-slate-200 dark:border-white/10 pb-2">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-blue-300 uppercase tracking-wide">
                Selected Properties
                <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-200 dark:border-blue-400/30 h-5 px-1.5 text-[10px]">
                  {selectedProperties.length}/5
                </Badge>
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMarketplaceOpen(true)}
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20 gap-1"
              >
                <Search className="h-4 w-4" />
                Select Properties
              </Button>
            </div>

            {/* Property List */}
            <div className="space-y-3 mb-6 min-h-[200px]">
              {selectedProperties.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-500 dark:text-blue-300/60 text-sm mb-3">No properties selected yet</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMarketplaceOpen(true)}
                    className="text-purple-600 border-purple-200 hover:bg-purple-50 dark:text-purple-400 dark:border-purple-500/30 dark:hover:bg-purple-500/10"
                  >
                    Select Properties
                  </Button>
                </div>
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
