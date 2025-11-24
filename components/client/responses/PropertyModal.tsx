'use client';

import React, { useState } from 'react';
import { X, MessageCircle, MapPin, Bed, Bath, Ruler, CheckSquare, Send, PlusCircle, CheckCircle, Clock } from 'lucide-react';

interface Property {
    id: string;
    title: string;
    image: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    qas: number;
    description: string;
    amenities: string[];
}

interface PropertyModalProps {
    property: Property | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function PropertyModal({ property, isOpen, onClose }: PropertyModalProps) {
    const [showDrawer, setShowDrawer] = useState(false);

    if (!isOpen || !property) return null;

    const formatPrice = (price: number) => {
        if (price >= 1000000) {
            return `₦${(price / 1000000).toFixed(1)}M`;
        }
        return `₦${price.toLocaleString()}`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-6xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-200/80 dark:border-slate-800/80 shrink-0">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">{property.title}</h2>
                        <button
                            onClick={() => setShowDrawer(!showDrawer)}
                            className={`flex items-center gap-2 font-medium text-sm transition-colors ${showDrawer ? 'text-purple-600 dark:text-purple-400' : 'text-blue-600 dark:text-blue-400'}`}
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>{property.qas}</span>
                        </button>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full p-2 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Main Details */}
                    <div className="flex-1 p-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Available</span>
                        </div>

                        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                            <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-yellow-100/60 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 p-4 rounded-xl text-center font-medium">
                                Living Room
                            </div>
                            <div className="bg-slate-100/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 p-4 rounded-xl text-center font-medium">
                                Kitchen
                            </div>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                                {formatPrice(property.price)} <span className="text-lg font-normal text-slate-500">/ year</span>
                            </h3>
                            <div className="flex items-center gap-2 mt-2 text-slate-500 dark:text-slate-400">
                                <MapPin className="w-5 h-5" />
                                <span>{property.location}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-slate-600 dark:text-slate-300 border-y border-slate-200/80 dark:border-slate-800/80 py-4">
                            <div className="flex items-center gap-2">
                                <Bed className="w-5 h-5" />
                                <span>{property.bedrooms} bed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Bath className="w-5 h-5" />
                                <span>{property.bathrooms} bath</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Ruler className="w-5 h-5" />
                                <span>{property.sqft} sq ft</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Description</h4>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {property.description}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">Features & Amenities</h4>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                                {property.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                        <CheckSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => setShowDrawer(true)}
                            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span>Ask a Question</span>
                        </button>
                    </div>

                    {/* Side Drawer (Questions) */}
                    <div
                        className={`border-l border-slate-200/80 dark:border-slate-800/80 flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${showDrawer ? 'w-96 opacity-100' : 'w-0 opacity-0'
                            }`}
                    >
                        <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/80 flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-3">
                                <MessageCircle className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                                <h3 className="font-bold text-slate-800 dark:text-white text-lg">Questions</h3>
                            </div>
                            <button
                                onClick={() => setShowDrawer(false)}
                                className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full p-2"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 p-6 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">1 pending • 2 answered</p>

                            {/* Pending Question */}
                            <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-white/50 dark:border-white/10 shadow-sm space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="w-4 h-4 text-orange-500" />
                                    <span className="font-semibold text-orange-500">PENDING</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">YOU • 20 min ago</p>
                                <p className="text-slate-700 dark:text-slate-300">When was it last renovated?</p>
                            </div>

                            {/* Answered Question */}
                            <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-white/50 dark:border-white/10 shadow-sm space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    <span className="font-semibold text-green-600 dark:text-green-400">ANSWERED</span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">YOU • 2h ago</p>
                                    <p className="text-slate-700 dark:text-slate-300">Is parking included?</p>
                                </div>
                                <div className="border-t border-slate-200/80 dark:border-slate-700/80 pt-3">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Sarah Johnson • 1h ago</p>
                                    <p className="text-slate-700 dark:text-slate-300">Yes, one covered parking space is included with each unit.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-200/80 dark:border-slate-800/80 shrink-0">
                            <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50">
                                <PlusCircle className="w-5 h-5" />
                                <span>Ask New Question</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
