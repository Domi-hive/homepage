"use client"

import { useState, useMemo } from "react"
import { Heart, Star, Clock, MapPin, DollarSign, Home, Search, CheckCircle2, History, Filter, X, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import FilterSidebar from "@/components/agent/filter-sidebar"
import Pagination from "@/components/ui/pagination"

interface Listing {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  image: string
  agentName: string
  agentRating: number
  agentImage: string
  referralEnabled: boolean
  updatedAt: string
  matchPercentage: number
  propertyType: "House" | "Condo" | "Townhouse" | "Multi-Family"
}

// Mock data based on the provided HTML
const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Modern Downtown Loft",
    location: "Downtown",
    price: 480000,
    bedrooms: 3,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUZ6gSVxKaGPjtzu6GoNpzOytznBG5vXJoZVyc1W_Cmtk9J2GgXn1LJnCM2rYh3RTojIvnbKQ7Zkn-NdRBY-8HTTa2gvvQ7gWiN-TMHWt-WA5ahXwPVtNhD_qX4exce-8Fn2qQaE35aEBaqfQoBhiG6VBYztugSHO3n9zZXPuNydntm_4ciWu5LxCskB4KDiFbllIlaxKE0VNrOqCUmUjzMJatmfIIfmuj2FcgQT9azNfnysUBpFxTwiWMsERMsMstsVM8UFXM1w",
    agentName: "John Doe",
    agentRating: 4.8,
    agentImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxU5gW3L98_D8ix80TO9-xq-cCEtjupMyGDuhwnrJjEd6mWActSl7sywFPK0XriA7R9EccXrMISaMZosv-Qzw9KXcLKvMif1G65fFwEhTIsFDrFrnE_9NpNKRUsp6T73ZSKwjfQvT5-lK7df61JOk7ffJJ0DQtjPU9JWj-zbyfE49Rg-rLgRPds7ZrVttUqze4rJUaYCrFvV5DbZlPMxurGxLRvB_6CeWBLT2-RsLptKwbZ0bgCipLMjvbWiD6DOGJx1Ts9jj0Ig",
    referralEnabled: true,
    updatedAt: "2 hours ago",
    matchPercentage: 92,
    propertyType: "Condo",
  },
  {
    id: "2",
    title: "Riverside Townhouse",
    location: "Riverside",
    price: 395000,
    bedrooms: 4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAx4vjUObzFDdsMUHhA8HWogI_VLggNbrHb92DZQpmrA9t-98REpRIyiQUXV-UzYCoIOMN_a76q0eXQmF0wCtMJiM83DxVwgJvYaj-kwSbkMsWeFFcqc1-Mdgy-rmOTbwzvN2XIbAsfmSkhEJDNBgzyMvn8P0S0bEk66AblxQtCEPCDlJuB_y3_ggX0rHDmnkOZd8XoLp-cEJyOnEslhgPhcs8qVxUjigeLSJ4SYH75x6jKEV2db8ziI2_OhWkNT56Bzf2SfBVrg",
    agentName: "Sarah Smith",
    agentRating: 4.6,
    agentImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5Sr_wAHztXBPR9AA1E9uNaLbSTiSD6TKCFin057w6FVk9RpRj1JhoKMhRqdyjMh_LLQCrH-qN2-HAv5Wn63tJxiNqEbdawAD3c69pOt8wmJ2lqR0ZMYd8W74iFZCy21d3hhtEHysx2ujlYdhCKjhiwRgYcFcdyfQBkxzscSxWmLzi5nj24e6H2JeSbF9Ntz3yiKhvUVRidpX2coSbbsZ4nowe4ktr1zuQpJzFSY6seSfOvs1sWI_3ZQslp25TkhTr_PEgusMiww",
    referralEnabled: true,
    updatedAt: "5 hours ago",
    matchPercentage: 88,
    propertyType: "Townhouse",
  },
  {
    id: "3",
    title: "Park View Apartment",
    location: "Central Park",
    price: 320000,
    bedrooms: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQTLa1u28nhu95bX9EUhKnBuebv9bKxeVdzwj5CFaZSYpC8AZMS9EHV0DqGR1ivHERPslQyywdeclkqc9_PsUTJIeK29-IvWxtccQ5lzSTCuVWs13wtZiPU5M_1MnvsN38cyW_OXm7OTy2e8QAw5D8CHKShSQhcfu_oTHUsECkSRQpTQDs3DqASJIlRI21wdG8rQqB_StxMcxaOSw3XvE8jcr0ZqCbaH-qA5olUSjqWeetoRf2gWmBMRMJEDmNT7MKP0wY6s4fjg",
    agentName: "Mike Johnson",
    agentRating: 4.9,
    agentImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOCDmAvnvyDqm0d04JkF4miJJDbfJu9cPIe8cTZz4yCymUKZkVdXSlexVuLU2vvgBPg_DJSeG3FCkVLzPNWEAIVCEuRAMGyzz6Y8zOLBwMpOVoTSNP55i-5w2tYur1QO2PVXuwCpmHEfviaOSad6Kq-Sc_Iq2Oe5tJmwlFW4AdPS67bUJkFBXraDa3ghwWNOcU96K2c22EtVmAJoN6P1yEvi8Oi9YrprVEB_vwWQ6x6Gl5RGXLUXO-tX83SNWY22XEdGb21-gyhA",
    referralEnabled: false,
    updatedAt: "12 hours ago",
    matchPercentage: 75,
    propertyType: "Condo",
  },
  {
    id: "4",
    title: "Luxury Garden Home",
    location: "Suburbs",
    price: 650000,
    bedrooms: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMT1vZ74s0e9_5CurlSf8yZkv037OHREphuv44dqTjHkgzOdhlSeIql7mmM9heErrSkgijOCa8J6OLtVL2IFuW3of-9-6sNSYql2C3mx4SdIMbxUDXMRzlGPwwGwDPXR2kr2n46YCVJaibAWBIO9WSjlePgQFYQ5wAsDX2ZGuNI0FuRmmAz9uz9cxhOyZFqUUAv2TVDNNgeJkRcMuTCB8LMy2bnka5bs1YI8bMnzBnNw7PH2BnNgyk7OhEyXTviMMSjLn5JAOcFw",
    agentName: "Emma Wilson",
    agentRating: 4.7,
    agentImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcpPazOTKvzu52QUS8zvFp-763vOSYx_XKJ4gdPwRvoDMzFEhi4HWW1UGyZ4dNPQt6nFcUw1qpORiZFW1S0TSrCxBIl0c-bH6kdVl6-2MYfj3kfv8a5bnldSFCBnVw-_8MMKwGv33ecYzpt2sjdiBcBKztSohLp15H32_DDTwjFhcx5gMX-QCI5Xsy6qNtm8Q0SqUQvvLhqj_ATOEpycyaDFpaYB7cAqorjCJgwul_u_EMONKtXRtxhQLVWBEMat5EHXqnLrtzyA",
    referralEnabled: true,
    updatedAt: "1 day ago",
    matchPercentage: 85,
    propertyType: "House",
  },
  {
    id: "5",
    title: "Heritage Manor Estate",
    location: "Historic District",
    price: 720000,
    bedrooms: 6,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-blFXUD5D0RFW9HZuESSvauYdUm4-oqc5Yx7me2tl8BqJDkU__PYvpZGwZwFA8LzYSA_mUyMGLagNf7kKKNyNH02_Cyw9K7D_klp-Q09ZJIomnXfXkANWY5E4cKG6FFDnKh6Su0yo9vNVew8fK3AGwMoE1JjAiYCL5VJFTgrCaf2Pq79SIDoA6t-E0BHmzYVG1k4hlqa9NSm3nc3IQEg4DHlIybG6oT7NRCQIUHmpHXSWlx_saWLu2AmwKdtaz64An2uw9NAK8Q",
    agentName: "David Brown",
    agentRating: 4.8,
    agentImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDa_9F9FNrCi5TOkpgm0PuwB7OPObYxKpY5WUTh8zcKP8j_Kc5cn1vwJYHde7s_jKEfmHfP9Si6pBTixzcxqFEnI4HxE7qGEDJ1FDqfRFqL9MRXOkF-c7Ye8jJipYRRE7H553qOZ2WsqokLKkp_nfPDrU5SK4VQqEDiaZ6ymLbySFLMrn3O1MMhFpPA-JOq1cAi2fCrYfQOxriYha6fCC0NIM_paQanVo8nUwB8iFngw35oC9hLZuXWwmbdcH055rRUEImDzMR3mg",
    referralEnabled: true,
    updatedAt: "3 days ago",
    matchPercentage: 79,
    propertyType: "House",
  },
]

const ITEMS_PER_PAGE = 12;

import { listingService } from "@/services/listing.service"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS) // Initial Mock, replace if API success
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await listingService.getAllListings();
        const mappedListings = data.map((item: any) => ({
          id: item.id || Math.random().toString(),
          title: item.title || 'Untitled Property',
          location: item.location || item.address || 'Unknown Location',
          price: Number(item.price) || 0,
          bedrooms: Number(item.bedrooms) || 0, // Fallback
          image: item.image || item.media?.[0]?.url || "https://images.unsplash.com/photo-1600596542815-2a4d04774c13?q=80&w=2000&auto=format&fit=crop", // Fallback image
          agentName: item.agent?.name || item.agentName || "Unknown Agent",
          agentRating: item.agent?.rating || 4.5, // Default/Mock
          agentImage: item.agent?.image || "https://ui-avatars.com/api/?name=" + (item.agentName || "Agent"),
          referralEnabled: item.referralEnabled || false,
          updatedAt: new Date(item.updatedAt || Date.now()).toLocaleDateString(),
          matchPercentage: 85, // Mock match %
          propertyType: item.propertyType || "House"
        }));

        if (mappedListings.length > 0) {
          setListings(mappedListings as Listing[]);
        }
      } catch (err) {
        console.error("Failed to fetch marketplace listings", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchListings();
  }, []);

  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState({
    updatedIn24h: false,
    referralOnly: false,
  })

  // Filter Sidebar State
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [sidebarFilters, setSidebarFilters] = useState({
    priority: "all" as "all" | "high" | "medium" | "low",
    location: null as string | null,
  })
  const [presets, setPresets] = useState<{ name: string; filters: any }[]>([])

  const handleSidebarFilterChange = (key: string, value: any) => {
    setSidebarFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSavePreset = (name: string) => {
    setPresets((prev) => [...prev, { name, filters: sidebarFilters }])
  }

  const handleApplyPreset = (presetFilters: any) => {
    setSidebarFilters(presetFilters)
  }

  // Mock counts and locations for sidebar
  const counts = {
    priority: { all: 5, high: 2, medium: 2, low: 1 },
    location: { "Downtown": 1, "Riverside": 1, "Central Park": 1, "Suburbs": 1, "Historic District": 1 }
  }
  const locations = ["Downtown", "Riverside", "Central Park", "Suburbs", "Historic District"]

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
    return listings.filter((listing) => {
      // Search query filter
      if (
        searchQuery &&
        !listing.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !listing.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Referral enabled filter
      if (filters.referralOnly && !listing.referralEnabled) {
        return false
      }

      // Updated in 24 hours filter
      if (filters.updatedIn24h) {
        if (listing.updatedAt.includes("day")) {
          return false
        }
        const hoursAgo = Number.parseInt(listing.updatedAt.split(" ")[0])
        if (listing.updatedAt.includes("hours") && hoursAgo > 24) {
          return false
        }
      }

      return true
    })
  }, [searchQuery, filters])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff] dark:bg-[#121826] flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-top opacity-75 pointer-events-none z-0"
        style={{ backgroundImage: 'url(/assets/full_page_background.png)' }}
      />

      {/* Mobile Secondary Header */}
      <div className="md:hidden sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          className="shrink-0 text-slate-600 dark:text-slate-400"
        >
          <Filter className="w-5 h-5" />
        </Button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white placeholder:text-slate-400"
            placeholder="Search..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Top Section: Header */}
      {/* Top Section: Header */}
      <div className="relative z-10 px-10 pt-10 pb-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white hidden md:block">Listings Marketplace</h1>
          </div>
          <div className="flex items-center gap-6 self-end md:self-auto">
            <div className="hidden md:flex items-center gap-6">
              <Link href="/agent/activity" className="w-6 h-[34px] border-none bg-transparent cursor-pointer flex items-center justify-center p-0 text-slate-600 hover:text-slate-900 transition-colors" aria-label="Notifications">
                <Bell className="w-6 h-6" />
              </Link>
              <ThemeToggle />
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Link href="/agent/profile">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity">
                  <span className="header-user-initials">U</span>
                </div>
              </Link>
              <div className="hidden md:flex flex-col">
                <div className="text-base font-semibold text-slate-900 leading-6">User</div>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className="flex flex-1 overflow-hidden relative z-10">
        <FilterSidebar
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          filters={sidebarFilters}
          onFilterChange={handleSidebarFilterChange}
          counts={counts}
          locations={locations}
          onSavePreset={handleSavePreset}
          presets={presets}
          onApplyPreset={handleApplyPreset}
        >
          <div className="space-y-3">
            <label className="font-medium text-slate-600 dark:text-slate-300">Marketplace Filters</label>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <input
                  className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  id="updated-24h"
                  type="checkbox"
                  checked={filters.updatedIn24h}
                  onChange={(e) => setFilters({ ...filters, updatedIn24h: e.target.checked })}
                />
                <label className="cursor-pointer" htmlFor="updated-24h">Updated in 24 hours</label>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <input
                  className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  id="referral-only"
                  type="checkbox"
                  checked={filters.referralOnly}
                  onChange={(e) => setFilters({ ...filters, referralOnly: e.target.checked })}
                />
                <label className="cursor-pointer" htmlFor="referral-only">Referral Only</label>
              </div>
            </div>
          </div>
        </FilterSidebar>

        <main className="flex-1 h-full overflow-y-auto flex flex-col">
          <div className="px-10 pb-20 pt-2 space-y-6">


            {/* Controls Bar */}
            <div className="hidden md:flex flex-row gap-4 justify-between items-center">
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
                  placeholder="Search by property name or location..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Active Filters Chips */}
            {(filters.updatedIn24h || filters.referralOnly || sidebarFilters.priority !== "all" || sidebarFilters.location) && (
              <div className="flex flex-wrap gap-2 items-center min-h-[32px]">
                {filters.updatedIn24h && (
                  <div className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 text-sm">
                    Updated in 24h
                    <button onClick={() => setFilters({ ...filters, updatedIn24h: false })} className="hover:bg-purple-200 dark:hover:bg-purple-500/30 rounded-full p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {filters.referralOnly && (
                  <div className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 text-sm">
                    Referral Only
                    <button onClick={() => setFilters({ ...filters, referralOnly: false })} className="hover:bg-blue-200 dark:hover:bg-blue-500/30 rounded-full p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {sidebarFilters.priority !== "all" && (
                  <div className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 text-sm">
                    Priority: {sidebarFilters.priority}
                    <button onClick={() => handleSidebarFilterChange("priority", "all")} className="hover:bg-emerald-200 dark:hover:bg-emerald-500/30 rounded-full p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {sidebarFilters.location && (
                  <div className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300 text-sm">
                    Location: {sidebarFilters.location}
                    <button onClick={() => handleSidebarFilterChange("location", null)} className="hover:bg-orange-200 dark:hover:bg-orange-500/30 rounded-full p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <button
                  onClick={() => {
                    setFilters({ updatedIn24h: false, referralOnly: false });
                    setSidebarFilters({ priority: "all", location: null });
                  }}
                  className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 underline"
                >
                  Clear all
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10 overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      alt={listing.title}
                      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                      src={listing.image}
                    />
                    <div className={`absolute top-4 left-4 text-white text-sm font-bold px-3 py-1 rounded-full backdrop-blur-sm ${listing.matchPercentage >= 90 ? 'bg-green-500/80' :
                      listing.matchPercentage >= 80 ? 'bg-green-500/80' :
                        'bg-yellow-500/80'
                      }`}>
                      {listing.matchPercentage}% match
                    </div>
                    <button
                      onClick={() => toggleFavorite(listing.id)}
                      className="absolute top-4 right-4 bg-white/50 dark:bg-slate-900/50 p-2 rounded-full text-slate-700 dark:text-slate-200 hover:text-red-500 dark:hover:text-red-500 transition-colors"
                    >
                      <Heart
                        className="w-5 h-5"
                        fill={favorites.has(listing.id) ? "currentColor" : "none"}
                        color={favorites.has(listing.id) ? "#ef4444" : "currentColor"}
                      />
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{listing.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {listing.location} • ${listing.price.toLocaleString()} • {listing.bedrooms} bed
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <img
                        alt={`Agent ${listing.agentName}`}
                        className="w-6 h-6 rounded-full object-cover"
                        src={listing.agentImage}
                      />
                      <span>Listed by {listing.agentName}</span>
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{listing.agentRating}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                      {listing.referralEnabled && (
                        <>
                          <CheckCircle2 className="w-4 h-4 bg-blue-100 dark:bg-blue-900/50 rounded-full p-0.5" />
                          <span className="font-medium">Referral Enabled</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 flex items-center gap-1">
                      <History className="w-3 h-3" />
                      Updated {listing.updatedAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalItems={filteredListings.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
