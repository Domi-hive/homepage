"use client"

import { useState } from "react"
import { ArrowLeft, ChevronDown, MessageCircle, X, Bell } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import AgentSidebar from "@/components/client/responses/AgentSidebar"
import AgentInfoCard from "@/components/client/responses/AgentInfoCard"
import PropertyCard from "@/components/client/responses/PropertyCard"
import PropertyModal from "@/components/client/responses/PropertyModal"
import ScheduleInspectionDrawer from "@/components/client/responses/ScheduleInspectionDrawer"
import RecommendedPropertiesTab from "@/components/client/responses/RecommendedPropertiesTab"

// ... (imports)

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
  const [activeTab, setActiveTab] = useState<"responses" | "recommendations">("responses")
  const [selectedAgentId, setSelectedAgentId] = useState("1")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [recommendationFavorites, setRecommendationFavorites] = useState<Set<number>>(new Set())
  const [showAgentDropdown, setShowAgentDropdown] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showQADrawer, setShowQADrawer] = useState(false)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)

  const agents: Agent[] = [
    {
      id: "1",
      name: "John Doe",
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-k2rexJ46kuUgtoTwnnGLtQ-TgSjVW0eflv0jKEuihkVo2gM2g5ryxZKplfaX7h0PM4wmPNrS4zCg801ev9LnrrnDXbgmPrqcz9huy_fJKUcUby6FMLxkb0v0A0QNw-f2_GIMa7FrqEiVvUQNbg_ek29sJp-yCNbmPef7daNyMqgBlK-_U0oBPTSXVPFz2HOM6oC4Fn2ji0HA_1M49EA2xEAN2D40p-JF0FiqY0nMHvLHfBmEs1gGpR3tpCH_ScwGqoDHaKmUGA",
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
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmv9NHx6HTb5k2CIE4jVFkU9UYVFJA8xwEqmeqA9YGvJE2bx0Do9JwduvfHXnwNHiDRpFTNfWuN009vayDKFNwIJ5J_MNyU9wHJp9P6WGWdX0eLEguvNKSIvio9vGi7Q0sNDoyqUoK78ALBb0DsTJw24zcKYuQkWrZI-svssYFCQLqyxeAouLnewmhmuxHco2Ar2QR63AcQMeBU5uShTCt6gx39CIzTuTwndn38OUKJEp8IkRlS_mHhg57dlf_4t-w0uSULfOmgA",
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
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuApwz1HzKfzmiTi2UQsUJcW888s0VDgItEm-xhw7ioi7hzA5iXKdTooAJNi23OxGQOc6EdcnvtCqsPqCQtjebd3RrTQ3rU70soZYB989rU0V2xwU10nXOPhJp5OauflT4w4YdPaLYgvCUKTcmK4ileUe50q8glR9EXw6QSKFjXo4SAzVB2v_Ww33PACuP1RMXVBUxYrJwx_w9fhdfO5zk7wDg-oMOyLfPFNKy9AS6x9TgXe8AO1vmZTW9s3Ba9EcmOU1xeAqW6q8A",
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
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeWUGzqGBYCfM-jQAcmRwVKfBbPwXNwCTW1tZgMQUB3phLaZjYejyYa7g1mAJ-QRS67sClRP60c9sDvQe1zdoI3lCT8YflVvuMjjoV5PGpKgy00M04mm5DICtkIbhGcEyhB51RlKOIWhNJl5ctiDpHnXnz2bSBXzftNjEsrr1VE_Dyg9GW346VwFDFGMl1u94ZXGUW0jHJ5B4pkLJj2OYndjssyNbdzSh5bo_ot_Q6abu3fA3GWsDSOetSDfXTYBhgLP7xFhu_Vg",
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
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVDx9PQM_FTiyrf3Br30k5xAOYzgxVXTTOcKj7iXp0gPUnf1pWMNayJWfr7j4MmAunTVHoTy6qLXjHV_UkKU2k1qpP_0VSm9CSKT3no3PF4G7UkKJs8xs26g3_5f7WBFJsGn4Z7Y43Au3rFhRjy-35M0hE6Qcl38V9tpR3ywZ8Kv0SYG4T36pBAWlX0GSrLbWO4EWeJmHT9LsaHYoSIcNIuVpSvfmfPTGMqznttQxcYfQX21ZR-D3Mnnr7zc3gTLW5JsZYCM2zcQ",
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
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4Rq8dE8yALqfjM2qssKX6GEbEtWlXddD9VKgW2SYbaTgjtcwOFFxzwYrf-_ud76MFbF9mwvAmz79NJN6nLass0mCCg-Tv1np6gXqNJHm44JsUrSs0sBfxsT5m4VYgsd-LShdlB8PNFigPHq85IC_oJNHDwLPF13KXdZ9MI8rkKn5UlqlDfbssMAz_8LTaB4iFxYx7ygYmys5F_hHmI6CWMiln5FE9S4oDM4NwUrc9OemS7AdVC9GZTRbbJ20wpYfB1H1-nTCulw",
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
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNRGjOyVNKHJNtg_Gsdfkyx0LH4FbuhUTVprtfjh5gvIvcSmFVMUYeCU25WlR4NOJrAEONK9HJbV46GLpFMKye4PEdmuMO11ryohyZkLwAkfFfBqNxV5lGgIhGC3ZM0CtArkhfLe-s_w4usneo79TWX90PQ2dBYLILP-TcSwHI_bDOMxKl0OisGDX5BTFK0Ag_CM4Xs6wtakV1ZaRxr1AwK9cZ4ZFgeWYvIohcfbeZDvjk38osCjBavnUrdOKZzNKZWJ0IYrX2Cg",
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
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf7ApyftcnbSARo_6exCIa_-5pV6pfoDFfi8dgh6Lbm6Lg27BnBbFn_StXrDyyoYA0PvbFSOwoKmmGs-Ca-6tOx6JIt4dhnYtKbRojlZLDTEqHsS8KaWCCijgq1psomQe9aoFhlPKi7lkANmYvI0xEOnv_PZPz4vpJjcxak7-7gt6hfIUK8dvMslliumxBqqrcGzN30NnoXKHXRdJdunbEbZceXpPYJutYsjr1bJnf2q7x1rZStB_24qkqWhrlLTJC_6GFkp8-6Q",
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
    "2": [],
    "3": [],
  }

  const selectedAgent = agents.find((a) => a.id === selectedAgentId)
  const selectedProperties = properties[selectedAgentId] || []

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  const toggleRecommendationFavorite = (id: number) => {
    const newFavorites = new Set(recommendationFavorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setRecommendationFavorites(newFavorites)
  }

  const handleExpressInterest = (propertyTitle: string) => {
    console.log(`Expressed interest in: ${propertyTitle}`)
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-75 pointer-events-none z-0"
        style={{ backgroundImage: 'url(/assets/full_page_background.png)' }}
      />

      <main className="relative z-10 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-10 pt-8 pb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/client/requests"
              className="w-10 h-10 rounded-full bg-white/60 hover:bg-white flex items-center justify-center text-slate-600 transition-colors backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                2-3 bed in Lekki, Victoria Island, Ikoyi
              </h1>
              <p className="text-sm text-slate-500">Budget: ₦2-4M</p>
            </div>
          </div>

          <div className="flex items-center gap-6 self-end md:self-auto">
            <div className="hidden md:flex items-center gap-6">
              <Link href="/client/activity" className="w-6 h-[34px] border-none bg-transparent cursor-pointer flex items-center justify-center p-0 text-slate-600 hover:text-slate-900 transition-colors" aria-label="Notifications">
                <Bell className="w-6 h-6" />
              </Link>
              <ThemeToggle />
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Link href="/client/profile">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity">
                  <span className="header-user-initials">U</span>
                </div>
              </Link>
              <div className="hidden md:flex flex-col">
                <div className="text-base font-semibold text-slate-900 leading-6">User</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-10 mb-6">
          <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-700/80">
            <button
              onClick={() => setActiveTab("responses")}
              className={`px-4 py-3 font-medium transition-colors ${activeTab === "responses"
                ? "text-slate-800 dark:text-slate-100 font-semibold border-b-2 border-purple-500"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
            >
              Responses
            </button>
            <button
              onClick={() => setActiveTab("recommendations")}
              className={`px-4 py-3 font-medium transition-colors ${activeTab === "recommendations"
                ? "text-slate-800 dark:text-slate-100 font-semibold border-b-2 border-purple-500"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
            >
              Recommendations
            </button>
          </div>
        </div>

        {activeTab === "responses" ? (
          <div className="flex flex-col md:flex-row gap-6 px-10 pb-[50px] h-full overflow-hidden">
            {/* Desktop Agent Sidebar */}
            <div className="hidden md:block h-full overflow-y-auto pr-2 custom-scrollbar">
              <AgentSidebar
                agents={agents}
                selectedAgentId={selectedAgentId}
                onSelectAgent={setSelectedAgentId}
              />
            </div>

            {/* Mobile Agent Dropdown */}
            <div className="md:hidden pb-4">
              <div className="relative">
                <button
                  onClick={() => setShowAgentDropdown(!showAgentDropdown)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-white/50 bg-white/60 backdrop-blur-sm text-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedAgent?.photo || "/placeholder.svg"}
                      alt={selectedAgent?.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <div className="font-medium text-sm">{selectedAgent?.name}</div>
                      <div className="text-xs text-slate-500">⭐ {selectedAgent?.rating}</div>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-slate-500" />
                </button>

                {showAgentDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 border border-white/50 rounded-lg bg-white/90 backdrop-blur-md shadow-lg z-50 overflow-hidden">
                    {agents.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => {
                          setSelectedAgentId(agent.id)
                          setShowAgentDropdown(false)
                        }}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-100 last:border-b-0 transition-colors ${selectedAgentId === agent.id ? "bg-purple-50 text-purple-700" : "text-slate-800 hover:bg-slate-50"
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
                            <div className="text-xs text-slate-500">
                              ⭐ {agent.rating} ({agent.reviews})
                            </div>
                          </div>
                        </div>
                        {selectedAgentId === agent.id && (
                          <div className="h-2 w-2 rounded-full bg-purple-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 h-full overflow-y-auto custom-scrollbar">
              {agents.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">No responses yet</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mt-1">
                      Agents haven't responded to your request yet. Check out our recommended properties in the meantime!
                    </p>
                  </div>
                  <Button
                    onClick={() => setActiveTab("recommendations")}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    View Recommendations
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {selectedAgent && (
                    <AgentInfoCard
                      agent={selectedAgent}
                      onScheduleInspection={() => setIsScheduleModalOpen(true)}
                    />
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {selectedProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isFavorite={favorites.has(property.id)}
                        onToggleFavorite={toggleFavorite}
                        onClick={() => {
                          setSelectedProperty(property)
                          setShowQADrawer(false)
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-10 pb-10">
            <RecommendedPropertiesTab
              favorites={recommendationFavorites}
              toggleFavorite={toggleRecommendationFavorite}
              onExpressInterest={handleExpressInterest}
            />
          </div>
        )}
      </main>

      <PropertyModal
        property={selectedProperty}
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />

      {selectedAgent && (
        <ScheduleInspectionDrawer
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          agent={selectedAgent}
          properties={selectedProperties}
        />
      )}
    </div >
  )
}
