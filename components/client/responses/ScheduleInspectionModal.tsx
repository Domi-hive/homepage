import React, { useState } from 'react';
import { X, HelpCircle, Star, MapPin, Check, ArrowRight } from 'lucide-react';

interface Agent {
    id: string;
    name: string;
    photo: string;
    rating: number;
}

interface Property {
    id: string;
    title: string;
    image: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
}

interface ScheduleInspectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    agent: Agent;
    properties: Property[];
}

export default function ScheduleInspectionModal({ isOpen, onClose, agent, properties }: ScheduleInspectionModalProps) {
    const [selectedPropertyIds, setSelectedPropertyIds] = useState<Set<string>>(new Set());

    if (!isOpen) return null;

    const toggleProperty = (id: string) => {
        const newSelected = new Set(selectedPropertyIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            if (newSelected.size < 3) {
                newSelected.add(id);
            }
        }
        setSelectedPropertyIds(newSelected);
    };

    const formatPrice = (price: number) => {
        return `₦${(price / 1000000).toFixed(1)}M`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-soft border border-white/50 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-slate-200/80">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Schedule Inspection with {agent.name}</h2>
                            <p className="text-slate-500 mt-1 flex items-center gap-2">
                                Select up to 3 properties for this inspection
                                <HelpCircle className="w-4 h-4 text-slate-400 cursor-help" />
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-slate-500 hover:bg-slate-100 rounded-full p-1.5 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 overflow-y-auto">
                    {/* Agent Info */}
                    <div className="flex items-center gap-4 p-4 bg-slate-100/50 rounded-xl">
                        <img
                            src={agent.photo}
                            alt={agent.name}
                            className="w-12 h-12 rounded-full bg-blue-500 object-cover"
                        />
                        <div>
                            <p className="font-semibold text-slate-800">{agent.name}</p>
                            <div className="flex items-center gap-1 text-sm text-slate-500">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span>{agent.rating} rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Properties List */}
                    <div className="space-y-3">
                        {properties.map((property) => {
                            const isSelected = selectedPropertyIds.has(property.id);
                            return (
                                <div
                                    key={property.id}
                                    onClick={() => toggleProperty(property.id)}
                                    className={`
                                        p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all
                                        ${isSelected
                                            ? 'bg-white border-blue-500 shadow-soft'
                                            : 'bg-white/60 border-slate-200/80 hover:bg-white'
                                        }
                                    `}
                                >
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-24 h-20 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-slate-800">{property.title}</h3>
                                        <p className="text-sm text-slate-500 flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {property.location}
                                        </p>
                                        <p className="font-bold text-blue-600 text-lg mt-1">{formatPrice(property.price)}</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {property.bedrooms} beds • {property.bathrooms} baths • {property.sqft} sqm
                                        </p>
                                    </div>
                                    <div className={`
                                        w-6 h-6 rounded-md flex items-center justify-center transition-colors
                                        ${isSelected ? 'bg-blue-500 text-white' : 'border-2 border-slate-300'}
                                    `}>
                                        {isSelected && <Check className="w-4 h-4" />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-200/80 bg-slate-50/50 rounded-b-2xl">
                    <div className="flex justify-between items-center">
                        <div className="text-sm">
                            <span className="font-semibold text-slate-700">
                                {selectedPropertyIds.size} propert{selectedPropertyIds.size !== 1 ? 'ies' : 'y'} selected
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={onClose}
                                className="bg-white/80 hover:bg-white text-slate-700 font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-opacity shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={selectedPropertyIds.size === 0}
                            >
                                <span>Continue to Schedule Time</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
