import React, { useState, useEffect } from 'react';
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

interface ScheduleInspectionDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    agent: Agent;
    properties: Property[];
}

export default function ScheduleInspectionDrawer({ isOpen, onClose, agent, properties }: ScheduleInspectionDrawerProps) {
    const [selectedPropertyIds, setSelectedPropertyIds] = useState<Set<string>>(new Set());
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

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
        <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`relative w-full max-w-lg bg-slate-50 dark:bg-[#1a1829] h-full flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 p-6 bg-slate-50/80 dark:bg-[#1a1829]/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Schedule Inspection</h2>

                        </div>
                        <button
                            onClick={onClose}
                            className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Agent Info */}
                    <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                        <img
                            src={agent.photo}
                            alt={agent.name}
                            className="w-12 h-12 rounded-full bg-blue-500 object-cover"
                        />
                        <div>
                            <p className="font-semibold text-slate-800 dark:text-white">{agent.name}</p>
                            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span>{agent.rating} rating</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-slate-800 dark:text-white">Select Properties</h3>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                {selectedPropertyIds.size}/3 selected
                            </span>
                        </div>
                    </div>

                    {/* Properties List */}
                    <div className="space-y-3">
                        {properties.map((property) => {
                            const isSelected = selectedPropertyIds.has(property.id);
                            const isSelectionLimitReached = selectedPropertyIds.size >= 3;
                            const isDisabled = !isSelected && isSelectionLimitReached;

                            return (
                                <div
                                    key={property.id}
                                    onClick={() => !isDisabled && toggleProperty(property.id)}
                                    className={`
                                        p-4 rounded-xl border flex items-center gap-4 transition-all
                                        ${isDisabled ? 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-900' : 'cursor-pointer'}
                                        ${isSelected
                                            ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 shadow-sm'
                                            : !isDisabled && 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700'
                                        }
                                    `}
                                >
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-slate-800 dark:text-white truncate">{property.title}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                                            <MapPin className="w-3 h-3" />
                                            {property.location}
                                        </p>
                                        <p className="font-bold text-purple-600 dark:text-purple-400 text-sm mt-1">{formatPrice(property.price)}</p>
                                    </div>
                                    <div className={`
                                        w-6 h-6 rounded-full flex items-center justify-center transition-colors flex-shrink-0
                                        ${isSelected ? 'bg-purple-500 text-white' : 'border-2 border-slate-300 dark:border-slate-600'}
                                    `}>
                                        {isSelected && <Check className="w-4 h-4" />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 z-10 p-6 bg-slate-50/80 dark:bg-[#1a1829]/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800">
                    <button
                        className="w-full px-5 py-3 text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg shadow-purple-500/30 hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        disabled={selectedPropertyIds.size === 0}
                    >
                        <span>Continue to Schedule</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
