import React from 'react';
import { MapPin, Edit, MoreVertical, Send, AlertTriangle } from 'lucide-react';

interface Listing {
    id: string;
    title: string;
    image: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    sqft: number;
    lastUpdated: string;
    isStale: boolean;
    isAvailable: boolean;
    referralsOn: boolean;
    activeResponses?: number;
}

interface ListingCardProps {
    listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
    return (
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-soft border border-white/50 dark:border-white/10 overflow-hidden flex flex-col transition-all hover:shadow-lg">
            <div className="relative">
                <img
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                    src={listing.image}
                />
                <div className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm ${listing.isStale ? 'bg-orange-100/80 text-orange-800' : 'bg-white/80 text-slate-700'}`}>
                    {listing.isStale && <AlertTriangle className="w-4 h-4" />}
                    Last Updated: {listing.lastUpdated}
                </div>
                <input className="absolute top-3 right-3 h-6 w-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 bg-white/50 backdrop-blur-sm" type="checkbox" />
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
                    <div className="flex justify-between items-center bg-slate-100/70 dark:bg-slate-800/50 p-2 rounded-lg">
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
                        <button className="flex-1 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-sm text-sm">
                            {listing.isAvailable ? 'Update Status' : 'View Details'}
                        </button>
                        <button className="p-2.5 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 rounded-xl shadow-sm transition-colors">
                            <Edit className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                        </button>
                        <button className="p-2.5 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 rounded-xl shadow-sm transition-colors">
                            <MoreVertical className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
