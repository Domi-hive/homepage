"use client"

import { useState } from "react"
import { X, ChevronUp, ChevronDown, Save, Filter, Check, Search, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FilterSidebarProps {
    isOpen: boolean
    onClose: () => void
    filters: {
        priority: "all" | "high" | "medium" | "low"
        location: string | null
    }
    onFilterChange: (key: string, value: any) => void
    counts: {
        priority: Record<string, number>
        location: Record<string, number>
    }
    locations: string[]
    onSavePreset: (name: string) => void
    presets: { name: string; filters: any }[]
    onApplyPreset: (filters: any) => void
    children?: React.ReactNode
}

export default function FilterSidebar({
    isOpen,
    onClose,
    filters,
    onFilterChange,
    counts,
    locations,
    onSavePreset,
    presets,
    onApplyPreset,
    children,
}: FilterSidebarProps) {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        priority: true,
        location: true,
        presets: true,
    })
    const [newPresetName, setNewPresetName] = useState("")
    const [isSavingPreset, setIsSavingPreset] = useState(false)
    const [locationSearch, setLocationSearch] = useState("")

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
    }

    const handleSavePreset = () => {
        if (newPresetName.trim()) {
            onSavePreset(newPresetName)
            setNewPresetName("")
            setIsSavingPreset(false)
        }
    }

    const handleReset = () => {
        onFilterChange("priority", "all")
        onFilterChange("location", null)
    }

    const filteredLocations = locations.filter(loc =>
        loc.toLowerCase().includes(locationSearch.toLowerCase())
    )

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:relative top-0 left-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 w-80 transition-transform duration-300 ease-in-out flex flex-col md:m-4 md:rounded-2xl md:h-[calc(100%-2rem)] h-full ${isOpen ? "translate-x-0" : "-translate-x-full md:hidden"
                    }`}
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center flex-shrink-0">
                    <h3 className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Advanced Filters
                    </h3>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleReset}
                            className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                        >
                            <RotateCcw className="w-3 h-3" />
                            Reset
                        </button>
                        <button
                            onClick={onClose}
                            className="md:hidden p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-500" />
                        </button>
                    </div>
                </div>

                <ScrollArea className="flex-1">
                    <div className="p-6 space-y-8">
                        {/* Custom Filters (Children) */}
                        {children && (
                            <>
                                <div className="space-y-3">
                                    {children}
                                </div>
                                <div className="h-px bg-slate-200 dark:bg-slate-800" />
                            </>
                        )}

                        {/* Presets Section */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="font-medium text-slate-600 dark:text-slate-300">Saved Presets</label>
                                <button
                                    onClick={() => setIsSavingPreset(!isSavingPreset)}
                                    className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                                >
                                    <Save className="w-3 h-3" />
                                    Save Current
                                </button>
                            </div>

                            {isSavingPreset && (
                                <div className="flex gap-2 mb-2 animate-in fade-in slide-in-from-top-2">
                                    <input
                                        type="text"
                                        value={newPresetName}
                                        onChange={(e) => setNewPresetName(e.target.value)}
                                        placeholder="Preset name..."
                                        className="flex-1 bg-slate-100 dark:bg-slate-700/60 rounded-lg py-2 px-3 text-sm border-transparent focus:ring-2 focus:ring-purple-400 outline-none"
                                    />
                                    <Button size="sm" onClick={handleSavePreset} disabled={!newPresetName.trim()} className="h-9 px-3 bg-purple-500 hover:bg-purple-600">
                                        <Check className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2">
                                {presets.map((preset, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => onApplyPreset(preset.filters)}
                                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors border border-purple-100 dark:border-purple-800"
                                    >
                                        {preset.name}
                                    </button>
                                ))}
                                {presets.length === 0 && (
                                    <p className="text-xs text-slate-400 italic">No saved presets</p>
                                )}
                            </div>
                        </div>

                        <div className="h-px bg-slate-200 dark:bg-slate-800" />

                        {/* Status Section */}


                        {/* Priority Section */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("priority")}>
                                <label className="font-medium text-slate-600 dark:text-slate-300">Priority</label>
                                {expandedSections.priority ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                            </div>

                            {expandedSections.priority && (
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { value: "all", label: "All" },
                                        { value: "high", label: "High" },
                                        { value: "medium", label: "Medium" },
                                        { value: "low", label: "Low" },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => onFilterChange("priority", option.value)}
                                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${filters.priority === option.value
                                                ? "bg-purple-500 text-white shadow-md shadow-purple-500/30"
                                                : "bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                                }`}
                                        >
                                            {option.label}
                                            {option.value !== 'all' && (
                                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${filters.priority === option.value
                                                    ? "bg-white/20 text-white"
                                                    : "bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-400"
                                                    }`}>
                                                    {counts.priority[option.value] || 0}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Location Section */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("location")}>
                                <label className="font-medium text-slate-600 dark:text-slate-300">Location</label>
                                {expandedSections.location ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                            </div>

                            {expandedSections.location && (
                                <div className="space-y-3">
                                    <div className="relative">
                                        <input
                                            className="w-full bg-slate-100 dark:bg-slate-700/60 rounded-lg py-2 pl-9 pr-3 text-sm border-transparent focus:ring-2 focus:ring-purple-400 placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                                            placeholder="Search locations..."
                                            type="text"
                                            value={locationSearch}
                                            onChange={(e) => setLocationSearch(e.target.value)}
                                        />
                                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 h-4 w-4" />
                                    </div>

                                    <div className="space-y-1 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                                        <label
                                            className={`flex items-center justify-between group cursor-pointer p-2 rounded-lg transition-colors ${filters.location === null
                                                ? "bg-purple-50 dark:bg-purple-900/20"
                                                : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.location === null
                                                    ? "bg-purple-500 border-purple-500"
                                                    : "border-slate-300 dark:border-slate-600 group-hover:border-purple-400"
                                                    }`}>
                                                    {filters.location === null && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="location"
                                                    className="hidden"
                                                    checked={filters.location === null}
                                                    onChange={() => onFilterChange("location", null)}
                                                />
                                                <span className={`text-sm ${filters.location === null ? "text-purple-700 dark:text-purple-300 font-medium" : "text-slate-600 dark:text-slate-400"}`}>
                                                    All Locations
                                                </span>
                                            </div>
                                            <span className="text-xs text-slate-400">
                                                {Object.values(counts.location).reduce((a, b) => a + b, 0)}
                                            </span>
                                        </label>

                                        {filteredLocations.map((loc) => (
                                            <label
                                                key={loc}
                                                className={`flex items-center justify-between group cursor-pointer p-2 rounded-lg transition-colors ${filters.location === loc
                                                    ? "bg-purple-50 dark:bg-purple-900/20"
                                                    : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.location === loc
                                                        ? "bg-purple-500 border-purple-500"
                                                        : "border-slate-300 dark:border-slate-600 group-hover:border-purple-400"
                                                        }`}>
                                                        {filters.location === loc && <Check className="w-3 h-3 text-white" />}
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        name="location"
                                                        className="hidden"
                                                        checked={filters.location === loc}
                                                        onChange={() => onFilterChange("location", loc)}
                                                    />
                                                    <span className={`text-sm ${filters.location === loc ? "text-purple-700 dark:text-purple-300 font-medium" : "text-slate-600 dark:text-slate-400"}`}>
                                                        {loc}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-slate-400">
                                                    {counts.location[loc] || 0}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </ScrollArea>
            </aside>
        </>
    )
}
