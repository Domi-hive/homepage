"use client"

import { useState, useMemo } from "react"
import { Heart, Star, Clock, MapPin, DollarSign, Home, Search, CheckCircle2, History } from "lucide-react"
import { Button } from "@/components/ui/button"

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

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState({
    updatedIn24h: false,
    referralOnly: false,
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

      <main className="flex-1 p-10 overflow-y-auto relative z-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white hidden md:block">Listings Marketplace</h1>

          </div>
          <div className="flex items-center gap-6">
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

        <div className="space-y-8">
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                className="w-full bg-slate-100/50 dark:bg-slate-800/50 border-none rounded-xl pl-12 pr-4 py-3.5 text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Search by property name or location..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <input
                  className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  id="updated-24h"
                  type="checkbox"
                  checked={filters.updatedIn24h}
                  onChange={(e) => setFilters({ ...filters, updatedIn24h: e.target.checked })}
                />
                <label className="font-medium cursor-pointer" htmlFor="updated-24h">Updated in 24 hours</label>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <input
                  className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  id="referral-only"
                  type="checkbox"
                  checked={filters.referralOnly}
                  onChange={(e) => setFilters({ ...filters, referralOnly: e.target.checked })}
                />
                <label className="font-medium cursor-pointer" htmlFor="referral-only">Referral Only</label>
              </div>
            </div>
          </div>

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

          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10 overflow-hidden flex items-center justify-center p-5 text-slate-400 dark:text-slate-500">
            <span>More listings coming soon...</span>
          </div>
        </div>
      </main>
    </div>
  )
}
