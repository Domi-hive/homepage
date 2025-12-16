"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { Bell, PlusCircle, ChevronLeft, ChevronRight, Filter, Search, X, ToggleRight, ToggleLeft, RefreshCw } from 'lucide-react';
import StatsBanner from '@/components/agent/my-listings/StatsBanner';
import ListingCard from '@/components/agent/my-listings/ListingCard';
import MyListingsFilterSidebar from '@/components/agent/my-listings/MyListingsFilterSidebar';
import AddPropertyDrawer from '@/components/agent/my-listings/AddPropertyDrawer';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { listingService } from "@/services/listing.service"
import { Listing } from "@/types/api"

// Placeholder for MOCK_LISTINGS. In a real app, this would be defined elsewhere or removed.
const MOCK_LISTINGS: Listing[] = [
    {
        id: "1",
        title: "Luxury Villa with Ocean View",
        location: "Malibu, CA",
        price: 15000000,
        image: "https://images.unsplash.com/photo-1568605114243-e209b1292591?q=80&w=2000&auto=format&fit=crop",
        status: "active",
        createdAt: new Date().toISOString(),
        agentId: "me",
        bedrooms: 5,
        bathrooms: 6,
        views: 1234,
        inquiries: 56,
        dailyViews: 120,
        lastUpdated: "2023-10-26",
        isStale: false,
        isAvailable: true,
        beds: 5,
        baths: 6,
        sqft: 8000,
        referralsOn: true,
        activeResponses: 12
    },
    {
        id: "2",
        title: "Modern Downtown Apartment",
        location: "New York, NY",
        price: 2500000,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000&auto=format&fit=crop",
        status: "draft", // Changed from pending to match type
        createdAt: new Date().toISOString(),
        agentId: "me",
        bedrooms: 2,
        bathrooms: 2,
        views: 876,
        inquiries: 32,
        dailyViews: 80,
        lastUpdated: "2023-10-20",
        isStale: true,
        isAvailable: true,
        beds: 2,
        baths: 2,
        sqft: 1200,
        referralsOn: false,
        activeResponses: 5
    },
    {
        id: "3",
        title: "Cozy Suburban Home",
        location: "Austin, TX",
        price: 750000,
        image: "https://images.unsplash.com/photo-1580582932707-5205c5f491af?q=80&w=2000&auto=format&fit=crop",
        status: "active",
        createdAt: new Date().toISOString(),
        agentId: "me",
        bedrooms: 4,
        bathrooms: 3,
        views: 2345,
        inquiries: 89,
        dailyViews: 200,
        lastUpdated: "2023-10-28",
        isStale: false,
        isAvailable: false,
        beds: 4,
        baths: 3,
        sqft: 2500,
        referralsOn: true,
        activeResponses: 20
    }
];

export default function MyListingsPage() {
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
    const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("active") // New state for active tab
    const [filters, setFilters] = useState({
        referralStatus: "all" as "all" | "on" | "off",
        updateStatus: "all" as "all" | "up-to-date" | "stale",
        availability: "all" as "all" | "available" | "unavailable",
        location: null as string | null,
        sortBy: "last-updated" as "last-updated" | "price-high-low" | "price-low-high",
    })
    const [presets, setPresets] = useState<{ name: string; filters: any }[]>([])

    // New state for fetched listings and loading
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch listings on component mount
    useEffect(() => {
        const fetchListings = async () => {
            try {
                // TODO: Get actual logged in agent ID. For now using 'me' or a placeholder if API supports it, 
                // or we'd need to decode info from local storage
                const agentId = 'me';
                const data = await listingService.getAgentListings(agentId);
                setListings(data);
            } catch (error: any) {
                if (!error.message?.includes('Unauthorized')) {
                    console.error("Failed to fetch listings", error);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, []); // Empty dependency array means this runs once on mount

    const handleFilterChange = (key: string, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const handleSavePreset = (name: string) => {
        setPresets((prev) => [...prev, { name, filters }])
    }

    const handleApplyPreset = (presetFilters: any) => {
        setFilters(presetFilters)
    }

    const filteredListings = useMemo(() => {
        return listings.filter((listing) => {
            const matchesSearch =
                listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                listing.location.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesReferral = filters.referralStatus === "all" || (filters.referralStatus === "on" ? listing.referralsOn : !listing.referralsOn)
            const matchesUpdate = filters.updateStatus === "all" || (filters.updateStatus === "up-to-date" ? !listing.isStale : listing.isStale)
            const matchesAvailability = filters.availability === "all" || (filters.availability === "available" ? listing.isAvailable : !listing.isAvailable)
            const matchesLocation = !filters.location || listing.location.includes(filters.location)

            return matchesSearch && matchesReferral && matchesUpdate && matchesAvailability && matchesLocation
        })
    }, [searchQuery, filters, listings])

    const counts = useMemo(() => {
        const referralCounts: Record<string, number> = { all: 0, on: 0, off: 0 }
        const updateCounts: Record<string, number> = { all: 0, "up-to-date": 0, stale: 0 }
        const availabilityCounts: Record<string, number> = { all: 0, available: 0, unavailable: 0 }
        const locationCounts: Record<string, number> = {}

        listings.forEach((listing) => {
            referralCounts.all++
            referralCounts[listing.referralsOn ? "on" : "off"]++

            updateCounts.all++
            updateCounts[listing.isStale ? "stale" : "up-to-date"]++

            availabilityCounts.all++
            availabilityCounts[listing.isAvailable ? "available" : "unavailable"]++

            const loc = listing.location.split(',')[0].trim()
            locationCounts[loc] = (locationCounts[loc] || 0) + 1
        })

        return { referralStatus: referralCounts, updateStatus: updateCounts, availability: availabilityCounts, location: locationCounts }
    }, [listings])

    const locations = Array.from(new Set(listings.map((l) => l.location.split(',')[0].trim())))

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
            <div className="relative z-10 px-10 pt-10 pb-6">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 dark:text-white hidden md:block">My Listings</h1>
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

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden relative z-10">
                <MyListingsFilterSidebar
                    isOpen={isFilterPanelOpen}
                    onClose={() => setIsFilterPanelOpen(false)}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    counts={counts}
                    locations={locations}
                    onSavePreset={handleSavePreset}
                    presets={presets}
                    onApplyPreset={handleApplyPreset}
                />

                <AddPropertyDrawer
                    isOpen={isAddPropertyOpen}
                    onClose={() => setIsAddPropertyOpen(false)}
                />

                <main className="flex-1 h-full overflow-y-auto flex flex-col">
                    <div className="px-10 pb-20 pt-2 space-y-6">
                        <StatsBanner />

                        {/* Controls Bar */}
                        <div className="hidden md:flex flex-row gap-4 justify-between items-center">
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                                    className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/40"
                                >
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filters
                                </Button>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="relative w-full md:w-96">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                                    <input
                                        className="w-full pl-12 pr-4 py-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl border-0 focus:ring-2 focus:ring-purple-500 shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] placeholder:text-slate-400 dark:text-white"
                                        placeholder="Search by title or address..."
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button
                                    onClick={() => setIsAddPropertyOpen(true)}
                                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-opacity shadow-lg shadow-purple-500/30 shrink-0"
                                >
                                    <PlusCircle className="w-5 h-5" />
                                    <span>Add New Property</span>
                                </button>
                            </div>
                        </div>

                        {/* Active Filters Chips */}
                        {(filters.referralStatus !== "all" || filters.updateStatus !== "all" || filters.availability !== "all" || filters.location) && (
                            <div className="flex flex-wrap gap-2 items-center min-h-[32px]">
                                {filters.referralStatus !== "all" && (
                                    <Badge variant="secondary" className="gap-1 pl-2 pr-1 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-500/20 dark:text-blue-300">
                                        Referrals: {filters.referralStatus}
                                        <button onClick={() => handleFilterChange("referralStatus", "all")} className="hover:bg-blue-200 dark:hover:bg-blue-500/30 rounded-full p-0.5">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </Badge>
                                )}
                                {filters.updateStatus !== "all" && (
                                    <Badge variant="secondary" className="gap-1 pl-2 pr-1 py-1 bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-500/20 dark:text-orange-300">
                                        Status: {filters.updateStatus}
                                        <button onClick={() => handleFilterChange("updateStatus", "all")} className="hover:bg-orange-200 dark:hover:bg-orange-500/30 rounded-full p-0.5">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </Badge>
                                )}
                                {filters.availability !== "all" && (
                                    <Badge variant="secondary" className="gap-1 pl-2 pr-1 py-1 bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-500/20 dark:text-green-300">
                                        Availability: {filters.availability}
                                        <button onClick={() => handleFilterChange("availability", "all")} className="hover:bg-green-200 dark:hover:bg-green-500/30 rounded-full p-0.5">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </Badge>
                                )}
                                {filters.location && (
                                    <Badge variant="secondary" className="gap-1 pl-2 pr-1 py-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300">
                                        Location: {filters.location}
                                        <button onClick={() => handleFilterChange("location", null)} className="hover:bg-emerald-200 dark:hover:bg-emerald-500/30 rounded-full p-0.5">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </Badge>
                                )}
                                <button
                                    onClick={() => setFilters({ referralStatus: "all", updateStatus: "all", availability: "all", location: null, sortBy: "last-updated" })}
                                    className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 underline"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}

                        {/* Bulk Actions (from original design) */}
                        <div className="flex flex-wrap items-center gap-4">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input className="h-5 w-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500" type="checkbox" />
                                <span className="font-semibold text-slate-600 dark:text-slate-300">Select All</span>
                            </label>
                            <button className="flex items-center gap-2 text-sm font-semibold bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-xl transition-colors shadow-sm">
                                <ToggleRight className="w-5 h-5 text-green-500" /> Enable Referrals
                            </button>
                            <button className="flex items-center gap-2 text-sm font-semibold bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-xl transition-colors shadow-sm">
                                <ToggleLeft className="w-5 h-5 text-red-500" /> Disable Referrals
                            </button>
                            <button className="flex items-center gap-2 text-sm font-semibold bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-xl transition-colors shadow-sm">
                                <RefreshCw className="w-5 h-5" /> Update Selected
                            </button>
                            <p className="ml-auto text-sm font-semibold text-slate-500 dark:text-slate-400">
                                Showing {filteredListings.length} of {listings.length} properties
                            </p>
                        </div>

                        {/* Listings Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredListings.map((listing) => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-8 flex justify-center items-center gap-2">
                            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-lg bg-blue-500 text-white font-semibold text-sm shadow">1</button>
                            <button className="w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-sm transition-colors">2</button>
                            <button className="w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-sm transition-colors">3</button>
                            <span className="text-slate-500 dark:text-slate-400">...</span>
                            <button className="w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-sm transition-colors">8</button>
                            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
