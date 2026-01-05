import React, { useState, useRef, useEffect } from 'react';
import { Edit, MoreVertical, Trash2, AlertTriangle, Send, MapPin, Loader2, Eye } from "lucide-react"
import { Listing } from "@/types/api"

interface ListingCardProps {
    listing: Listing;
    isSelected?: boolean;
    onSelect?: (listingId: string, selected: boolean) => void;
    onStatusUpdate?: (listingId: string, isAvailable: boolean) => Promise<void>;
    onReferralToggle?: (listingId: string, referralsOn: boolean) => Promise<void>;
    onEdit?: (listing: Listing) => void;
    onDelete?: (listingId: string) => Promise<void>;
}

export default function ListingCard({
    listing,
    isSelected = false,
    onSelect,
    onStatusUpdate,
    onReferralToggle,
    onEdit,
    onDelete
}: ListingCardProps) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isTogglingReferral, setIsTogglingReferral] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleStatusToggle = async () => {
        if (!onStatusUpdate || isUpdating) return;

        setIsUpdating(true);
        try {
            await onStatusUpdate(listing.id, !listing.isAvailable);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleReferralToggle = async () => {
        if (!onReferralToggle || isTogglingReferral) return;

        setIsTogglingReferral(true);
        try {
            await onReferralToggle(listing.id, !listing.referralsOn);
        } finally {
            setIsTogglingReferral(false);
        }
    };

    const handleDelete = async () => {
        if (!onDelete || isDeleting) return;

        setIsDeleting(true);
        try {
            await onDelete(listing.id);
        } finally {
            setIsDeleting(false);
            setShowDeleteConfirm(false);
            setIsMenuOpen(false);
        }
    };

    return (
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-soft border border-white/50 dark:border-white/10 overflow-hidden flex flex-col transition-all hover:shadow-lg relative">
            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center p-4 rounded-2xl">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 max-w-xs w-full shadow-xl">
                        <h4 className="font-bold text-lg text-slate-800 dark:text-white mb-2">Delete Listing?</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                            This action cannot be undone. The listing will be permanently removed.
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={isDeleting}
                                className="flex-1 py-2 px-4 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 py-2 px-4 rounded-lg bg-red-500 text-white font-medium text-sm hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden group">
                <img
                    src={listing.image || listing.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80'}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm ${listing.isStale ? 'bg-orange-100/80 text-orange-800' : 'bg-white/80 text-slate-700'}`}>
                    {listing.isStale && <AlertTriangle className="w-4 h-4" />}
                    Last Updated: {listing.lastUpdated}
                </div>
                <input
                    className="absolute top-3 right-3 h-6 w-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 bg-white/50 backdrop-blur-sm cursor-pointer"
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onSelect?.(listing.id, e.target.checked)}
                />
                {listing.activeResponses && (
                    <div className="absolute bottom-3 left-3 bg-blue-100/80 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                        <Send className="w-4 h-4" /> Active in {listing.activeResponses} Responses
                    </div>
                )}
            </div>
            <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-slate-800 dark:text-white flex-1 pr-2">{listing.title}</h3>
                    <div className="flex-shrink-0">
                        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${listing.isAvailable ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                            {listing.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                    </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1.5 mb-3">
                    <MapPin className="w-4 h-4" /> {listing.location}
                </p>
                <div className="flex items-baseline gap-2 mb-3">
                    <p className="font-bold text-2xl text-blue-600 dark:text-blue-400">{listing.price}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">/year</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium mb-4">
                    {listing.beds} beds • {listing.baths} baths • {listing.sqft} sqm
                </p>
                <div className="mt-auto space-y-4">
                    <div
                        className={`flex justify-between items-center bg-slate-100/70 dark:bg-slate-800/50 p-2 rounded-lg cursor-pointer transition-opacity ${isTogglingReferral ? 'opacity-50' : ''}`}
                        onClick={handleReferralToggle}
                    >
                        <label className="flex items-center cursor-pointer">
                            <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">Referrals:</span>
                            <span className={`ml-2 font-bold text-sm ${listing.referralsOn ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {listing.referralsOn ? 'ON' : 'OFF'}
                            </span>
                        </label>
                        <div className="relative">
                            <input checked={listing.referralsOn} className="sr-only" type="checkbox" readOnly />
                            <div className={`block w-11 h-6 rounded-full transition-colors ${listing.referralsOn ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-700'}`}>
                                <div className={`absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform ${listing.referralsOn ? 'translate-x-full border-transparent' : ''}`}></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleStatusToggle}
                            disabled={isUpdating}
                            className="flex-1 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-sm text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isUpdating ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Updating...
                                </>
                            ) : listing.isAvailable ? (
                                'Mark Unavailable'
                            ) : (
                                'Mark Available'
                            )}
                        </button>

                        {/* Options Menu */}
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2.5 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 rounded-xl shadow-sm transition-colors"
                            >
                                <MoreVertical className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                            </button>

                            {isMenuOpen && (
                                <div className="absolute right-0 bottom-full mb-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-10">
                                    <button
                                        onClick={() => {
                                            onEdit?.(listing);
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
                                    >
                                        <Edit className="w-4 h-4" /> Edit Listing
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowDeleteConfirm(true);
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" /> Delete Listing
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

