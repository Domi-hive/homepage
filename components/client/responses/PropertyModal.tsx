'use client';
import React, { useState } from 'react';
import { X, MessageCircle, MapPin, Bed, Bath, Ruler, CheckSquare, PlusCircle, CheckCircle, Clock, Heart, Share2, ChevronDown, ChevronRight, Calendar, Info } from 'lucide-react';
import AskQuestionModal from './AskQuestionModal';

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
    const [showAskQuestionModal, setShowAskQuestionModal] = useState(false);
    // The "drawer" concept is now the permanent right sidebar. 
    // We can keep specific state if we need to toggle between "Agent Info" and "Q/A", 
    // but the requirement is to default to Q/A. 
    // Let's assume the right bar IS the Q/A section + Agent header.

    if (!isOpen || !property) return null;

    const formatPrice = (price: number) => {
        return `₦${price.toLocaleString()}`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative z-50 w-full max-w-[1440px] h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-soft border border-white/50 dark:border-slate-800/50 flex flex-col overflow-hidden">

                {/* Close Button (Floating) */}
                <div className="absolute top-4 right-4 z-20">
                    <button
                        onClick={onClose}
                        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 rounded-full p-2 shadow-sm transition-colors border border-slate-200/50 dark:border-slate-700/50"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex h-full flex-col lg:flex-row">

                    {/* LEFT PANEL: Property Details (Scrollable) */}
                    <div className="flex-1 overflow-y-auto no-scrollbar pb-20 lg:pb-0 bg-white dark:bg-slate-900 custom-scrollbar">

                        {/* Main Details */}
                        <div className="flex-1 p-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">


                            {/* Image Gallery Section */}
                            <div className="space-y-4">
                                {/* Main Image View */}
                                <div className="relative aspect-video w-full overflow-hidden rounded-xl group bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-full h-full object-cover transition-transform duration-500"
                                    />

                                    {/* Image Overlay Controls */}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />



                                    <button className="absolute top-1/2 left-4 -translate-y-1/2 p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                                        <ChevronDown className="w-5 h-5 rotate-90" />
                                    </button>

                                    <button className="absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100 shadow-sm">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>

                                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-medium text-white">
                                        1 / 6
                                    </div>
                                </div>

                                {/* Thumbnail Strip */}
                                <div className="grid grid-cols-6 gap-2 sm:gap-4">
                                    {/* Using the main image repeated for demo purposes since we don't have multiple images in the prop yet */}
                                    {[property.image, property.image, property.image, property.image, property.image, property.image].map((img, idx) => (
                                        <div
                                            key={idx}
                                            className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${idx === 0 ? 'ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-slate-900' : 'opacity-70 hover:opacity-100 hover:scale-105'}`}
                                        >
                                            <img
                                                src={img}
                                                alt={`View ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            {idx === 0 && (
                                                <div className="absolute inset-0 bg-purple-500/10" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>




                        </div>

                        {/* Content Body */}
                        <div className="p-6 sm:p-8 space-y-8">

                            {/* Price & Primary Features */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                                        {formatPrice(property.price)}
                                    </h1>
                                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                                        <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg">
                                            <Bed className="w-4 h-4 text-blue-500" />
                                            <span className="font-semibold text-slate-800 dark:text-slate-200">{property.bedrooms}</span> Beds
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg">
                                            <Bath className="w-4 h-4 text-blue-500" />
                                            <span className="font-semibold text-slate-800 dark:text-slate-200">{property.bathrooms}</span> Baths
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg">
                                            <Ruler className="w-4 h-4 text-blue-500" />
                                            <span className="font-semibold text-slate-800 dark:text-slate-200">{property.sqft}</span> m²
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                        <Heart className="w-5 h-5" />
                                    </button>
                                    <button className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Description</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                    {property.description}
                                </p>
                                <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline flex items-center gap-1">
                                    Read more <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Amenities */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Features & Amenities</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4">
                                    {property.amenities.map((amenity, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <CheckSquare className="w-5 h-5 text-blue-500" />
                                            {amenity}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Property Details Grid */}
                            <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Property Details</h3>
                                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Property Type</p>
                                        <p className="font-medium text-slate-800 dark:text-white">Terrace Duplex</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Area</p>
                                        <p className="font-medium text-slate-800 dark:text-white">{property.sqft} m²</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Renovation</p>
                                        <p className="font-medium text-slate-800 dark:text-white">Newly Built</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Furnishing</p>
                                        <p className="font-medium text-slate-800 dark:text-white">Fully Furnished</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Year Built</p>
                                        <p className="font-medium text-slate-800 dark:text-white">2024</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Reference ID</p>
                                        <p className="font-medium text-slate-800 dark:text-white">DH-{property.id.padStart(5, '0')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Location</h3>
                                <div className="h-48 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl relative overflow-hidden group cursor-pointer border border-slate-200 dark:border-slate-700">
                                    <div className="absolute inset-0 opacity-40 dark:opacity-20" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg shadow-blue-500/40 animate-bounce">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-3 right-3 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg shadow-sm text-xs font-medium text-slate-600 dark:text-slate-300">
                                        Open in Google Maps
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4" />
                                    {property.location}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Q/A & Sidebar */}
                    <div className="w-full lg:w-96 bg-slate-50/80 dark:bg-slate-900/50 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6 lg:h-full lg:overflow-y-auto z-20 shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">

                        {/* Agent / Q&A Header */}
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="relative">
                                <img
                                    alt="Agent"
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuApwz1HzKfzmiTi2UQsUJcW888s0VDgItEm-xhw7ioi7hzA5iXKdTooAJNi23OxGQOc6EdcnvtCqsPqCQtjebd3RrTQ3rU70soZYB989rU0V2xwU10nXOPhJp5OauflT4w4YdPaLYgvCUKTcmK4ileUe50q8glR9EXw6QSKFjXo4SAzVB2v_Ww33PACuP1RMXVBUxYrJwx_w9fhdfO5zk7wDg-oMOyLfPFNKy9AS6x9TgXe8AO1vmZTW9s3Ba9EcmOU1xeAqW6q8A"
                                />
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-white text-sm">Domihive Agent</h4>
                                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                    <span>⭐ 4.9</span> • <span>12 reviews</span>
                                </div>
                            </div>
                        </div>

                        {/* Q/A List (Content Body) */}
                        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                            {/*  Questions & Answers Header Removed */}

                            {/* Pending Question */}
                            <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-white/50 dark:border-white/10 shadow-sm space-y-2">
                                <div className="flex items-center gap-2 text-xs">
                                    <Clock className="w-3 h-3 text-orange-500" />
                                    <span className="font-semibold text-orange-500">PENDING</span>
                                </div>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400">YOU • 20 min ago</p>
                                <p className="text-sm text-slate-700 dark:text-slate-300">When was it last renovated?</p>
                            </div>

                            {/* Answered Question */}
                            <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-white/50 dark:border-white/10 shadow-sm space-y-3">
                                <div className="flex items-center gap-2 text-xs">
                                    <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                                    <span className="font-semibold text-green-600 dark:text-green-400">ANSWERED</span>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">YOU • 2h ago</p>
                                    <p className="text-sm text-slate-700 dark:text-slate-300">Is parking included?</p>
                                </div>
                                <div className="border-t border-slate-200/80 dark:border-slate-700/80 pt-3">
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Sarah Johnson • 1h ago</p>
                                    <p className="text-sm text-slate-700 dark:text-slate-300">Yes, one covered parking space is included with each unit.</p>
                                </div>
                            </div>
                        </div>

                        {/* Q/A Actions */}
                        <div className="shrink-0 pt-4 border-t border-slate-200 dark:border-slate-800">
                            <button
                                onClick={() => setShowAskQuestionModal(true)}
                                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                            >
                                <PlusCircle className="w-5 h-5" />
                                <span>Ask a Question</span>
                            </button>
                        </div>

                        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50">
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 justify-center">
                                <CheckCircle className="w-3 h-3" />
                                Verified Listing • D-Hive Protected
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <AskQuestionModal
                isOpen={showAskQuestionModal}
                onClose={() => setShowAskQuestionModal(false)}
                onSubmit={(question, category) => {
                    console.log('Question submitted:', { question, category });
                    // Here you would typically send the question to the backend
                    setShowAskQuestionModal(false);
                }}
                property={{
                    title: property.title,
                    location: property.location,
                    image: property.image
                }}
            />
        </div>
    );
}
