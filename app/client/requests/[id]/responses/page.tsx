"use client"

import { useState } from "react"
import {
  ChevronDown,
  MessageCircle,
  Heart,
  MapPin,
  Bed,
  Bath,
  Ruler,
  ArrowLeft,
  Calendar,
  X,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

interface Agent {
  id: string
  name: string
  photo: string
  rating: number
  reviews: number
  specialty: string
  respondedAt: string
  propertyCount: number
  qas: number
}

interface Property {
  id: string
  title: string
  image: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  qas: number
  description: string
  amenities: string[]
}

export default function ResponsesPage() {
  const [selectedAgentId, setSelectedAgentId] = useState("1")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showAgentDropdown, setShowAgentDropdown] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showQADrawer, setShowQADrawer] = useState(false)
  const [showPropertySelectionModal, setShowPropertySelectionModal] = useState(false)
  const [selectedPropertiesForInspection, setSelectedPropertiesForInspection] = useState<Set<string>>(new Set())

  const agents: Agent[] = [
    {
      id: "1",
      name: "John Doe",
      photo: "/agent-photo.jpg",
      rating: 4.8,
      reviews: 124,
      specialty: "Luxury properties in Lekki & VI",
      respondedAt: "2 hours ago",
      propertyCount: 5,
      qas: 2,
    },
    {
      id: "2",
      name: "Jane Smith",
      photo: "/agent-photo.jpg",
      rating: 4.9,
      reviews: 156,
      specialty: "Waterfront properties",
      respondedAt: "1 hour ago",
      propertyCount: 4,
      qas: 1,
    },
    {
      id: "3",
      name: "Michael Johnson",
      photo: "/agent-photo.jpg",
      rating: 4.7,
      reviews: 98,
      specialty: "Family homes",
      respondedAt: "30 minutes ago",
      propertyCount: 6,
      qas: 3,
    },
  ]

  const properties: Record<string, Property[]> = {
    "1": [
      {
        id: "1",
        title: "3-Bedroom Duplex in Maitama",
        image: "/downtown-loft.jpg",
        location: "Maitama, Abuja",
        price: 3500000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 150,
        qas: 2,
        description:
          "Duplex in Maitama, Abuja. 2 matches found. Recently renovated with modern finishes and premium amenities. Perfect for families or professionals seeking luxury living in a prime location.",
        amenities: ["Air Conditioning", "24/7 Security", "Generator", "Parking Space"],
      },
      {
        id: "2",
        title: "Luxury Penthouse",
        image: "/luxury-penthouse.png",
        location: "Victoria Island",
        price: 5500000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 220,
        qas: 0,
        description: "Stunning penthouse with panoramic city views and high-end finishes throughout.",
        amenities: ["Rooftop Terrace", "Smart Home", "Wine Cellar", "Home Theatre"],
      },
      {
        id: "3",
        title: "Cozy Apartment",
        image: "/cozy-apartment.jpg",
        location: "Ikoyi",
        price: 2800000,
        bedrooms: 2,
        bathrooms: 1,
        sqft: 120,
        qas: 1,
        description: "Intimate apartment perfect for young professionals or couples.",
        amenities: ["Gym Access", "Pool", "Concierge", "Pet Friendly"],
      },
      {
        id: "4",
        title: "Garden Home",
        image: "/garden-home.jpg",
        location: "Lekki Phase 1",
        price: 4200000,
        bedrooms: 4,
        bathrooms: 2,
        sqft: 180,
        qas: 0,
        description: "Spacious home with beautiful garden and outdoor living spaces.",
        amenities: ["Garden", "BBQ Area", "Gate House", "Solar Power"],
      },
      {
        id: "5",
        title: "Studio Apartment",
        image: "/studio-apartment.jpg",
        location: "Downtown Lagos",
        price: 1800000,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 80,
        qas: 3,
        description: "Modern studio in the heart of Lagos with easy access to amenities.",
        amenities: ["Furnished", "WiFi", "Laundry", "Mini Kitchen"],
      },
    ],
    "2": [
      {
        id: "6",
        title: "Waterfront Villa",
        image: "/waterfront-villa.jpg",
        location: "Banana Island",
        price: 6800000,
        bedrooms: 5,
        bathrooms: 4,
        sqft: 300,
        qas: 1,
        description: "Exclusive waterfront villa with direct beach access and private jetty.",
        amenities: ["Beach Access", "Private Jetty", "Infinity Pool", "Cinema"],
      },
      {
        id: "7",
        title: "Beachfront Condo",
        image: "/beachfront-condo.jpg",
        location: "Ikoyi Beachfront",
        price: 4500000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 160,
        qas: 0,
        description: "Beautiful beachfront condo with sunset views.",
        amenities: ["Beach View", "Balcony", "Gym", "Concierge"],
      },
      {
        id: "8",
        title: "Riverside Townhouse",
        image: "/riverside-townhouse.jpg",
        location: "Lekki Waterfront",
        price: 3800000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 140,
        qas: 2,
        description: "Modern townhouse with river views and access to waterfront promenade.",
        amenities: ["River View", "Terrace", "Parking", "Security"],
      },
      {
        id: "9",
        title: "Ocean View Apartment",
        image: "/ocean-view-apartment.jpg",
        location: "VI Waterfront",
        price: 5200000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 200,
        qas: 0,
        description: "Luxury apartment with spectacular ocean views.",
        amenities: ["Ocean View", "Balcony", "Pool", "Gym"],
      },
    ],
    "3": [
      {
        id: "10",
        title: "Family Home",
        image: "/family-home.jpg",
        location: "Lekki",
        price: 3500000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 170,
        qas: 1,
        description: "Perfect family home with spacious rooms and modern amenities.",
        amenities: ["Large Kitchen", "Family Room", "Playground", "Study"],
      },
      {
        id: "11",
        title: "Suburban House",
        image: "/suburban-house.jpg",
        location: "Ikoyi",
        price: 2900000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 130,
        qas: 2,
        description: "Charming suburban home in quiet neighborhood.",
        amenities: ["Backyard", "Garage", "Garden", "Deck"],
      },
      {
        id: "12",
        title: "Heritage Manor",
        image: "/heritage-manor.jpg",
        location: "Banana Island",
        price: 5800000,
        bedrooms: 5,
        bathrooms: 4,
        sqft: 280,
        qas: 0,
        description: "Elegant manor with historic charm and modern upgrades.",
        amenities: ["Library", "Conservatory", "Ballroom", "Wine Cellar"],
      },
      {
        id: "13",
        title: "Contemporary Villa",
        image: "/contemporary-villa.jpg",
        location: "Victoria Island",
        price: 4800000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 190,
        qas: 3,
        description: "Sleek contemporary villa with minimalist design.",
        amenities: ["Glass Walls", "Open Plan", "Skylight", "Smart Tech"],
      },
      {
        id: "14",
        title: "Park View Cottage",
        image: "/park-view-cottage.jpg",
        location: "Lekki Phase 1",
        price: 2500000,
        bedrooms: 2,
        bathrooms: 1,
        sqft: 100,
        qas: 1,
        description: "Cozy cottage with views of the park.",
        amenities: ["Park View", "Terrace", "Kitchen Garden", "Patio"],
      },
      {
        id: "15",
        title: "Luxury Mansion",
        image: "/luxury-mansion.jpg",
        location: "Ikoyi",
        price: 7200000,
        bedrooms: 6,
        bathrooms: 5,
        sqft: 350,
        qas: 0,
        description: "Grand luxury mansion with every amenity imaginable.",
        amenities: ["Home Theatre", "Spa", "Gym", "Multiple Kitchens"],
      },
    ],
  }

  const selectedAgent = agents.find((a) => a.id === selectedAgentId)
  const selectedProperties = properties[selectedAgentId] || []
  const currentAgent = {
    properties: selectedProperties,
    ...selectedAgent,
  }

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-6 py-4 flex items-center gap-4">
          <Link
            href="/requests"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            2-3 bed in Lekki, Victoria Island, Ikoyi | Budget: ₦2-4M
          </h1>
        </div>
      </div>

      {/* Desktop Agent Tabs */}
      <div className="hidden md:block border-b border-border bg-background">
        <div className="overflow-x-auto px-6">
          <div className="flex gap-1 min-w-max py-4">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-t-lg border-b-2 transition-all whitespace-nowrap ${
                  selectedAgentId === agent.id
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <img
                  src={agent.photo || "/placeholder.svg"}
                  alt={agent.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="font-medium">{agent.name}</div>
                  <div className="flex items-center gap-1 text-xs">
                    <span>⭐ {agent.rating}</span>
                    <span className="text-primary bg-primary/10 px-2 rounded">{agent.propertyCount}</span>
                  </div>
                </div>
                {agent.qas > 0 && (
                  <div className="ml-2 flex items-center gap-1 text-primary bg-primary/10 px-2 py-1 rounded text-xs font-medium">
                    <MessageCircle className="h-3 w-3" />
                    {agent.qas}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Agent Dropdown */}
      <div className="md:hidden border-b border-border bg-background px-6 py-4">
        <div className="relative">
          <button
            onClick={() => setShowAgentDropdown(!showAgentDropdown)}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-border bg-card text-foreground hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <img
                src={selectedAgent?.photo || "/placeholder.svg"}
                alt={selectedAgent?.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="font-medium text-sm">{selectedAgent?.name}</div>
                <div className="text-xs text-muted-foreground">⭐ {selectedAgent?.rating}</div>
              </div>
            </div>
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </button>

          {showAgentDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 border border-border rounded-lg bg-card shadow-lg z-50">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => {
                    setSelectedAgentId(agent.id)
                    setShowAgentDropdown(false)
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 border-b border-border last:border-b-0 transition-colors ${
                    selectedAgentId === agent.id ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={agent.photo || "/placeholder.svg"}
                      alt={agent.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <div className="font-medium text-sm">{agent.name}</div>
                      <div className="text-xs text-muted-foreground">
                        ⭐ {agent.rating} ({agent.reviews})
                      </div>
                    </div>
                  </div>
                  {selectedAgentId === agent.id && (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Agent Info Bar */}
      {selectedAgent && (
        <div className="border-b border-border bg-card/50 px-6 py-4">
          <div className="flex items-start gap-4">
            <img
              src={selectedAgent.photo || "/placeholder.svg"}
              alt={selectedAgent.name}
              className="h-16 w-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">{selectedAgent.name}</h2>
                <span className="text-sm text-primary">⭐ {selectedAgent.rating}</span>
              </div>
              <p className="text-sm text-muted-foreground">({selectedAgent.reviews} reviews)</p>
              <p className="text-sm text-foreground mt-1">Responded {selectedAgent.respondedAt}</p>
              <p className="text-sm text-muted-foreground mt-1">{selectedAgent.specialty}</p>
            </div>
            <button
              onClick={() => setShowPropertySelectionModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium"
            >
              <Calendar className="h-5 w-5" />
              Schedule Inspection
            </button>
          </div>
        </div>
      )}

      {/* Properties Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedProperties.map((property) => (
            <div
              key={property.id}
              className="group rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Image Container */}
              <div
                className="relative aspect-video bg-muted overflow-hidden"
                onClick={() => {
                  setSelectedProperty(property)
                  setShowQADrawer(false)
                }}
              >
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                {/* Match Badge */}
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xs font-semibold">
                  92% match
                </div>
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(property.id)
                  }}
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${favorites.has(property.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                  />
                </button>
                {/* Q&A Badge */}
                {property.qas > 0 && (
                  <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {property.qas}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-foreground mb-2">{property.title}</h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </div>

                {/* Price */}
                <div className="text-2xl font-bold text-primary mb-3">₦{(property.price / 1000000).toFixed(1)}M</div>

                {/* Specs */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    {property.bedrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    {property.bathrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <Ruler className="h-4 w-4" />
                    {property.sqft} sqm
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => {
            setSelectedProperty(null)
            setShowQADrawer(false)
          }}
          onAskQuestion={() => setShowQADrawer(true)}
          showQADrawer={showQADrawer}
          onToggleQADrawer={() => setShowQADrawer(!showQADrawer)}
        />
      )}

      {/* This is handled in the agent info bar rendering above */}

      {showPropertySelectionModal && (
        <PropertySelectionModal
          agentName={agents.find((a) => a.id === selectedAgentId)?.name || "Agent"}
          agentRating={selectedAgent?.rating || 4.8}
          properties={currentAgent.properties}
          selectedProperties={selectedPropertiesForInspection}
          onSelectionChange={setSelectedPropertiesForInspection}
          onClose={() => setShowPropertySelectionModal(false)}
          onContinue={() => {
            // Handle proceed to next step
            console.log("[v0] Selected properties:", selectedPropertiesForInspection)
            setShowPropertySelectionModal(false)
          }}
        />
      )}
    </div>
  )
}

function PropertyDetailsModal({
  property,
  onClose,
  onAskQuestion,
  showQADrawer,
  onToggleQADrawer,
}: {
  property: Property
  onClose: () => void
  onAskQuestion: () => void
  showQADrawer: boolean
  onToggleQADrawer: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <h2 className="text-2xl font-bold text-foreground">{property.title}</h2>
            {property.qas > 0 && (
              <button
                onClick={onToggleQADrawer}
                className="flex items-center gap-1 text-primary hover:bg-primary/10 px-2 py-1 rounded"
              >
                <MessageCircle className="h-5 w-5" />
                {property.qas}
              </button>
            )}
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Status Badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-green-600">Available</span>
            </div>

            {/* Images */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="col-span-2 rounded-lg overflow-hidden bg-muted h-64">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden bg-yellow-100 h-32 flex items-center justify-center text-gray-600">
                Living Room
              </div>
              <div className="rounded-lg overflow-hidden bg-gray-100 h-32 flex items-center justify-center text-gray-600">
                Kitchen
              </div>
            </div>

            {/* Price and Location */}
            <div className="mb-6">
              <div className="text-3xl font-bold text-primary mb-2">
                ₦{(property.price / 1000000).toFixed(1)}M per year
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {property.location}
              </div>
            </div>

            {/* Specs */}
            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms} bed</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms} bath</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                <span>{property.sqft} sq ft</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground">{property.description}</p>
            </div>

            {/* Features & Amenities */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-foreground mb-3">Features & Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded border-2 border-green-500 flex items-center justify-center">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onAskQuestion}
                className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Ask a Question
              </button>
            </div>
          </div>

          {/* Q&A Drawer */}
          {showQADrawer && (
            <QADrawer
              questions={[
                { id: "1", status: "PENDING", author: "YOU", time: "20 min ago", text: "When was it last renovated?" },
                {
                  id: "2",
                  status: "ANSWERED",
                  author: "YOU",
                  time: "2h ago",
                  text: "Is parking included?",
                  answer: {
                    author: "Sarah Johnson",
                    time: "1h ago",
                    text: "Yes, one covered parking space is included with each unit.",
                  },
                },
                {
                  id: "3",
                  status: "ANSWERED",
                  author: "YOU",
                  time: "Yesterday",
                  text: "What's the generator situation?",
                  answer: {
                    author: "Sarah Johnson",
                    time: "Yesterday",
                    text: "24/7 backup generator covering all common areas",
                  },
                },
              ]}
              onClose={() => onToggleQADrawer()}
            />
          )}
        </div>
      </div>
    </div>
  )
}

function QADrawer({
  questions,
  onClose,
}: {
  questions: Array<{
    id: string
    status: "PENDING" | "ANSWERED"
    author: string
    time: string
    text: string
    answer?: { author: string; time: string; text: string }
  }>
  onClose: () => void
}) {
  const [showQuestionBuilder, setShowQuestionBuilder] = useState(false)

  return (
    <>
      <div className="w-96 border-l border-border bg-background flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-4 flex items-center justify-between">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Questions
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Question Count */}
        <div className="px-4 py-2 text-sm text-muted-foreground border-b border-border">1 pending · 2 answered</div>

        {/* Questions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="bg-card rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="text-xs font-bold uppercase px-2 py-1 rounded"
                    style={{
                      backgroundColor: q.status === "PENDING" ? "rgb(251 146 60 / 0.1)" : "rgb(34 197 94 / 0.1)",
                      color: q.status === "PENDING" ? "rgb(234 88 12)" : "rgb(22 163 74)",
                    }}
                  >
                    {q.status === "PENDING" ? "⏱️ PENDING" : "✓ ANSWERED"}
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-xs text-muted-foreground">
                  {q.author} · {q.time}
                </div>
                <p className="text-sm text-foreground mt-1">{q.text}</p>
              </div>
              {q.answer && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-1">
                    {q.answer.author} · {q.answer.time}
                  </div>
                  <p className="text-sm text-foreground">{q.answer.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Question Button */}
        <div className="border-t border-border p-4">
          <button
            onClick={() => setShowQuestionBuilder(true)}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 flex items-center justify-center gap-2"
          >
            + Ask New Question
          </button>
        </div>
      </div>

      {/* Question Builder Modal */}
      {showQuestionBuilder && <QuestionBuilderModal onClose={() => setShowQuestionBuilder(false)} />}
    </>
  )
}

function QuestionBuilderModal({ onClose }: { onClose: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [question, setQuestion] = useState("")

  const categories = [
    "About Property...",
    "Pricing and Fees...",
    "Neighbourhood and Location...",
    "Inspection/Viewing...",
    "Other",
  ]

  const handleSubmit = () => {
    if (selectedCategory && question.trim()) {
      // Handle submission
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background rounded-lg w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">Ask a Question</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 flex-1 overflow-y-auto">
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Question Category</label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
              >
                <option value="">Select a category...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Question Text */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Your Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-border p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedCategory || !question.trim()}
            className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

function PropertySelectionModal({
  agentName,
  agentRating,
  properties,
  selectedProperties,
  onSelectionChange,
  onClose,
  onContinue,
}: {
  agentName: string
  agentRating: number
  properties: Property[]
  selectedProperties: Set<string>
  onSelectionChange: (selected: Set<string>) => void
  onClose: () => void
  onContinue: () => void
}) {
  const getPricing = (count: number) => {
    if (count === 1) return 10000
    if (count === 2) return 15000
    if (count === 3) return 18000
    return 0
  }

  const toggleProperty = (id: string) => {
    if (selectedProperties.has(id)) {
      const newSelected = new Set(selectedProperties)
      newSelected.delete(id)
      onSelectionChange(newSelected)
    } else if (selectedProperties.size < 3) {
      const newSelected = new Set(selectedProperties)
      newSelected.add(id)
      onSelectionChange(newSelected)
    }
  }

  const totalPrice = getPricing(selectedProperties.size)
  const isMaxed = selectedProperties.size >= 3

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Schedule Inspection with {agentName}</h2>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
              Select up to 3 properties for this inspection
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs cursor-help"
                title="One inspection covers up to 3 properties from this agent"
              >
                ?
              </span>
            </p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Agent Info */}
        <div className="border-b border-border p-4 bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {agentName.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-foreground">{agentName}</div>
              <div className="text-sm text-muted-foreground">⭐ {agentRating} rating</div>
            </div>
          </div>
        </div>

        {/* Properties List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {properties.map((property) => (
            <div
              key={property.id}
              onClick={() => (!isMaxed || selectedProperties.has(property.id) ? toggleProperty(property.id) : null)}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedProperties.has(property.id)
                  ? "border-primary bg-primary/5"
                  : isMaxed
                    ? "border-border opacity-50 cursor-not-allowed"
                    : "border-border hover:border-primary hover:shadow-sm"
              }`}
              title={isMaxed && !selectedProperties.has(property.id) ? "Maximum 3 properties per inspection" : ""}
            >
              {/* Thumbnail */}
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <h4 className="font-bold text-foreground">{property.title}</h4>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                  <MapPin className="h-3 w-3" />
                  {property.location}
                </div>
                <div className="text-lg font-bold text-primary mb-1">₦{(property.price / 1000000).toFixed(1)}M</div>
                <div className="text-xs text-muted-foreground">
                  {property.bedrooms} beds • {property.bathrooms} baths • {property.sqft} sqm
                </div>
              </div>

              {/* Checkbox */}
              <div className="flex-shrink-0">
                <input
                  type="checkbox"
                  checked={selectedProperties.has(property.id)}
                  onChange={() => {}}
                  disabled={isMaxed && !selectedProperties.has(property.id)}
                  className="w-6 h-6 cursor-pointer accent-primary"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {selectedProperties.size} propert{selectedProperties.size === 1 ? "y" : "ies"} selected • ₦
              {totalPrice.toLocaleString()}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg border border-border text-foreground hover:bg-muted font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onContinue}
              disabled={selectedProperties.size === 0}
              className="flex-1 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors flex items-center justify-center gap-2"
            >
              Continue to Schedule Time <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
