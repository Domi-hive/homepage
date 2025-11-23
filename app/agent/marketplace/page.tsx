"use client"

import { useState, useMemo } from "react"
import { Heart, Star, Clock, MapPin, DollarSign, Home } from "lucide-react"

interface Listing {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  image: string
  agentName: string
  agentRating: number
  referralEnabled: boolean
  updatedAt: string
  propertyType: "House" | "Condo" | "Townhouse" | "Multi-Family"
  matchPercentage: number
}

// Mock data - replace with real API calls
const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Modern Downtown Loft",
    location: "Downtown",
    price: 480000,
    bedrooms: 3,
    image: "/modern-loft.jpg",
    agentName: "John Doe",
    agentRating: 4.8,
    referralEnabled: true,
    updatedAt: "2 hours ago",
    propertyType: "Condo",
    matchPercentage: 92,
  },
  {
    id: "2",
    title: "Riverside Townhouse",
    location: "Riverside",
    price: 395000,
    bedrooms: 4,
    image: "/riverside-townhouse.jpg",
    agentName: "Sarah Smith",
    agentRating: 4.6,
    referralEnabled: true,
    updatedAt: "5 hours ago",
    propertyType: "Townhouse",
    matchPercentage: 88,
  },
  {
    id: "3",
    title: "Park View Apartment",
    location: "Central Park",
    price: 320000,
    bedrooms: 2,
    image: "/park-view.jpg",
    agentName: "Mike Johnson",
    agentRating: 4.9,
    referralEnabled: false,
    updatedAt: "12 hours ago",
    propertyType: "Condo",
    matchPercentage: 75,
  },
  {
    id: "4",
    title: "Luxury Garden Home",
    location: "Suburbs",
    price: 650000,
    bedrooms: 5,
    image: "/garden-home.jpg",
    agentName: "Emma Wilson",
    agentRating: 4.7,
    referralEnabled: true,
    updatedAt: "1 day ago",
    propertyType: "House",
    matchPercentage: 85,
  },
  {
    id: "5",
    title: "Heritage Manor Estate",
    location: "Historic District",
    price: 720000,
    bedrooms: 6,
    image: "/heritage-manor.jpg",
    agentName: "David Brown",
    agentRating: 4.5,
    referralEnabled: true,
    updatedAt: "3 days ago",
    propertyType: "House",
    matchPercentage: 79,
  },
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState({
    location: "",
    priceMin: 200000,
    priceMax: 800000,
    bedrooms: 0,
    propertyType: "",
    referralOnly: false,
    updatedIn24h: false,
  })

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((listing) => {
      // Search query filter
      if (
        searchQuery &&
        !listing.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !listing.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Location filter
      if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }

      // Price range filter
      if (listing.price < filters.priceMin || listing.price > filters.priceMax) {
        return false
      }

      // Bedrooms filter
      if (filters.bedrooms > 0 && listing.bedrooms < filters.bedrooms) {
        return false
      }

      // Property type filter
      if (filters.propertyType && listing.propertyType !== filters.propertyType) {
        return false
      }

      // Referral enabled filter
      if (filters.referralOnly && !listing.referralEnabled) {
        return false
      }

      // Updated in 24 hours filter
      if (filters.updatedIn24h) {
        const hoursAgo = Number.parseInt(listing.updatedAt.split(" ")[0])
        if (listing.updatedAt.includes("day")) {
          return false
        }
        if (listing.updatedAt.includes("hours") && hoursAgo > 24) {
          return false
        }
      }

      return true
    })
  }, [searchQuery, filters])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="mb-6 text-3xl font-bold text-foreground">Listing Marketplace</h1>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by property name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filters */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
            <input
              type="text"
              placeholder="Location"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">Min Price</label>
              <input
                type="range"
                min="200000"
                max="800000"
                step="10000"
                value={filters.priceMin}
                onChange={(e) => setFilters({ ...filters, priceMin: Number.parseInt(e.target.value) })}
                className="w-full"
              />
              <span className="text-xs text-muted-foreground">${(filters.priceMin / 1000).toFixed(0)}k</span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">Max Price</label>
              <input
                type="range"
                min="200000"
                max="800000"
                step="10000"
                value={filters.priceMax}
                onChange={(e) => setFilters({ ...filters, priceMax: Number.parseInt(e.target.value) })}
                className="w-full"
              />
              <span className="text-xs text-muted-foreground">${(filters.priceMax / 1000).toFixed(0)}k</span>
            </div>

            <select
              value={filters.bedrooms}
              onChange={(e) => setFilters({ ...filters, bedrooms: Number.parseInt(e.target.value) })}
              className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="0">Any Bedrooms</option>
              <option value="1">1+ Bed</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
              <option value="5">5+ Beds</option>
            </select>

            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
              className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Types</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Multi-Family">Multi-Family</option>
            </select>

            <div className="flex items-end gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={filters.referralOnly}
                  onChange={(e) => setFilters({ ...filters, referralOnly: e.target.checked })}
                  className="rounded border-border"
                />
                <span className="text-foreground">Referral Only</span>
              </label>
            </div>
          </div>

          <div className="mt-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={filters.updatedIn24h}
                onChange={(e) => setFilters({ ...filters, updatedIn24h: e.target.checked })}
                className="rounded border-border"
              />
              <span className="text-foreground">Updated in 24 hours</span>
            </label>
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {filteredListings.length === 0 ? (
          <div className="flex h-96 items-center justify-center rounded-lg border border-border bg-card">
            <p className="text-muted-foreground">No listings found matching your criteria</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
              >
                {/* Image Container */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />

                  {/* Match Percentage Badge */}
                  <div className="absolute top-3 left-3 rounded-lg bg-primary/90 px-3 py-1 text-sm font-semibold text-primary-foreground">
                    {listing.matchPercentage}% match
                  </div>

                  {/* Heart Button */}
                  <button
                    onClick={() => toggleFavorite(listing.id)}
                    className="absolute top-3 right-3 rounded-lg bg-background/80 p-2 text-muted-foreground transition-all hover:bg-background hover:text-destructive"
                  >
                    <Heart
                      className="h-5 w-5"
                      fill={favorites.has(listing.id) ? "currentColor" : "none"}
                      color={favorites.has(listing.id) ? "#ef4444" : "currentColor"}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Title */}
                  <h3 className="mb-2 font-semibold text-foreground text-lg">{listing.title}</h3>

                  {/* Details */}
                  <div className="mb-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {listing.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />${listing.price.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      {listing.bedrooms} bed
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mb-3 h-px bg-border" />

                  {/* Agent Info */}
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Listed by {listing.agentName}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">{listing.agentRating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="mb-3 space-y-2">
                    {listing.referralEnabled && (
                      <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        ✓ Referral Enabled
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Updated {listing.updatedAt}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
