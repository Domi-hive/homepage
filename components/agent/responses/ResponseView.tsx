"use client"

import { useState } from "react"
import { ArrowLeft, ChevronDown, MessageCircle, X, Eye, MessageSquare, User, Calendar, CheckCircle, Clock, ArrowRight, MapPin, DollarSign, Home } from "lucide-react"
import Link from "next/link"

import PropertyCard from "@/components/client/responses/PropertyCard"
import RequestsSidebar from "@/components/agent/responses/RequestsSidebar"
import PropertyModal from "@/components/client/responses/PropertyModal"
import ScheduleInspectionModal from "@/components/client/responses/ScheduleInspectionModal"

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

export default function ResponseView() {
    const [selectedAgentId, setSelectedAgentId] = useState("1")
    const [favorites, setFavorites] = useState<Set<string>>(new Set())
    const [showAgentDropdown, setShowAgentDropdown] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
    const [showQADrawer, setShowQADrawer] = useState(false)
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
    const [selectedRequestId, setSelectedRequestId] = useState("1")

    const requests = [
        {
            id: "1",
            title: "2-3 bed in Lekki",
            location: "Lekki Phase 1",
            timeAgo: "2h ago",
            unreadCount: 3,
            initial: "U",
            newQas: 2,
            pendingInspections: 1
        },
        {
            id: "2",
            title: "Luxury Penthouse",
            location: "Victoria Island",
            timeAgo: "5h ago",
            unreadCount: 0,
            initial: "J",
            newQas: 0,
            pendingInspections: 0
        },
        {
            id: "3",
            title: "Cozy Apartment",
            location: "Ikoyi",
            timeAgo: "1d ago",
            unreadCount: 1,
            initial: "M",
            newQas: 1,
            pendingInspections: 0
        }
    ]

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

    return (
        <div className="flex flex-col h-full">


            <div className="flex flex-col md:flex-row gap-6 px-10 pb-10 h-full overflow-hidden">
                <RequestsSidebar
                    requests={requests}
                    selectedRequestId={selectedRequestId}
                    onSelectRequest={setSelectedRequestId}
                />

                {/* Main Content Area */}
                <div className="flex-1 h-full overflow-y-auto custom-scrollbar">
                    <div className="space-y-8">
                        {/* Client Request Details Card */}
                        <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-soft-light border border-slate-200/80 dark:border-white/10">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Emma Rodriguez</h2>

                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="h-4 w-4 text-slate-400" />
                                                <span>Tech Park District</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <DollarSign className="h-4 w-4 text-slate-400" />
                                                <span>350k - 450k</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="h-4 w-4 text-slate-400" />
                                                <span>1 hour ago</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
                                                <MessageSquare className="h-4 w-4" />
                                                <span>3 Questions</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Preferences</h4>
                                        <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700/50">
                                            Investment property close to tech hubs. Looking for high rental yield potential. Preferably with existing tenants or ready to lease.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col gap-4 min-w-[200px]">
                                    <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700/50">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Home className="h-3.5 w-3.5 text-slate-400" />
                                            <span className="text-xs text-slate-500">Bedrooms</span>
                                        </div>
                                        <p className="font-semibold text-slate-700 dark:text-slate-200">2</p>
                                    </div>
                                    <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700/50">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                                            <span className="text-xs text-slate-500">Timeline</span>
                                        </div>
                                        <p className="font-semibold text-slate-700 dark:text-slate-200">Immediate</p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Inspection Request Pending Card */}
                        <div className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-soft-light border border-slate-200/80 dark:border-white/10 flex flex-col gap-4">
                            <p className="text-yellow-600 dark:text-yellow-400 font-semibold text-sm">INSPECTION REQUEST PENDING</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Property</p>
                                    <p className="font-semibold text-slate-700 dark:text-slate-200">3-Bedroom Duplex in Maitama</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Date & Time</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        <p className="font-semibold text-slate-700 dark:text-slate-200">Oct 24, 2025 • 10:00 AM</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Location</p>
                                    <p className="font-semibold text-slate-700 dark:text-slate-200">123 Maitama St, Abuja</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mt-2">
                                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Confirm Time</span>
                                </button>
                                <button className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600/50 text-slate-700 dark:text-slate-200 font-semibold py-2.5 px-4 rounded-lg flex items-center gap-2 transition-colors border border-slate-200 dark:border-slate-600 shadow-sm">
                                    <Clock className="w-5 h-5" />
                                    <span>Suggest Different Time</span>
                                </button>
                                <a href="#" className="text-blue-600 dark:text-blue-400 font-semibold text-sm ml-auto flex items-center gap-1">
                                    <span>Details</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>



                        {/* Property Grid */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Property Grid</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    </div>
                </div>
            </div>

            <PropertyModal
                property={selectedProperty}
                isOpen={!!selectedProperty}
                onClose={() => setSelectedProperty(null)}
            />

            {selectedAgent && (
                <ScheduleInspectionModal
                    isOpen={isScheduleModalOpen}
                    onClose={() => setIsScheduleModalOpen(false)}
                    agent={selectedAgent}
                    properties={selectedProperties}
                />
            )}
        </div >
    )
}
