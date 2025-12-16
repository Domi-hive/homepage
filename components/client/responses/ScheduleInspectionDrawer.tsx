import React, { useState, useEffect } from 'react';
import { X, Star, MapPin, Check, ArrowRight, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';

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

// Mock availability status for 'Soft Warning' logic
type AvailabilityStatus = 'available' | 'busy' | 'full';

interface DayAvailability {
    date: Date;
    status: AvailabilityStatus;
    inspectionCount: number;
}

export default function ScheduleInspectionDrawer({ isOpen, onClose, agent, properties }: ScheduleInspectionDrawerProps) {
    const [selectedPropertyIds, setSelectedPropertyIds] = useState<Set<string>>(new Set());
    const [show, setShow] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [step, setStep] = useState<'selection' | 'date'>('selection');
    const [inspectionType, setInspectionType] = useState<'in-person' | 'video'>('in-person');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Generate next 7 days with mock availability
    const [availableDays, setAvailableDays] = useState<DayAvailability[]>([]);

    useEffect(() => {
        // Generate next 7 days
        const days: DayAvailability[] = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i + 1); // Start from tomorrow

            // Randomly assign status for demo purposes
            const rand = Math.random();
            let status: AvailabilityStatus = 'available';
            let count = 0;

            // Force the 3rd day to be busy for demo purposes, or random
            if (i === 2 || rand > 0.8) {
                status = 'busy';
                count = Math.floor(Math.random() * 3) + 1; // 1-3 existing inspections
            }

            return { date, status, inspectionCount: count };
        });
        setAvailableDays(days);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setShow(true);
                document.body.style.overflow = 'hidden';
            }, 10);
            setStep('selection'); // Reset step on open
            return () => clearTimeout(timer);
        } else {
            setShow(false);
            const timer = setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflow = 'unset';
            }, 300);
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

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    };

    const handleBack = () => {
        if (step === 'date') {
            setStep('selection');
        } else {
            onClose();
        }
    };

    const handleConfirm = () => {
        // Here you would submit the booking
        console.log('Booking Confirmed', {
            properties: Array.from(selectedPropertyIds),
            date: selectedDate,
            type: inspectionType
        });
        onClose();
    };

    return (
        <div className={`fixed inset-0 z-50 flex justify-end ${show ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${show ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`relative w-full max-w-lg bg-slate-50 dark:bg-[#1a1829] h-full flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${show ? 'translate-x-0 delay-100' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 p-6 bg-slate-50/80 dark:bg-[#1a1829]/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                                {step === 'selection' ? 'Schedule Inspection' : 'Select a Day'}
                            </h2>
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
                    {step === 'selection' ? (
                        <>
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
                        </>
                    ) : (
                        // Date Selection Step (Simpler, Outcome-Based)
                        <div className="space-y-6">
                            {/* Selected Properties Summary */}
                            <div className="space-y-3">
                                {properties.filter(p => selectedPropertyIds.has(p.id)).map(property => (
                                    <div key={property.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60">
                                        <img
                                            src={property.image}
                                            alt={property.title}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-slate-800 dark:text-white text-base truncate">{property.title}</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {property.location}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>



                            {/* Date Selection List */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-slate-500" />
                                    Select a Day
                                </h3>

                                <div className="space-y-3">
                                    {availableDays.map((day, idx) => {
                                        const isSelected = selectedDate?.toDateString() === day.date.toDateString();
                                        const isBusy = day.status === 'busy';

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedDate(day.date)}
                                                className={`
                                                    w-full p-4 rounded-xl text-left border transition-all relative overflow-hidden
                                                    ${isSelected
                                                        ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 shadow-md z-10'
                                                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700'
                                                    }
                                                `}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <span className={`block text-lg font-bold ${isSelected ? 'text-purple-700 dark:text-purple-300' : 'text-slate-800 dark:text-white'}`}>
                                                            {formatDate(day.date)}
                                                        </span>

                                                        {isBusy && (
                                                            <div className="flex items-center gap-1.5 mt-1 text-amber-600 dark:text-amber-400 text-sm font-medium">
                                                                <AlertTriangle className="w-4 h-4" />
                                                                <span>Agent has {day.inspectionCount} inspections</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className={`
                                                        w-6 h-6 rounded-full border-2 flex items-center justify-center
                                                        ${isSelected ? 'border-purple-500 bg-purple-500 text-white' : 'border-slate-300 dark:border-slate-600'}
                                                    `}>
                                                        {isSelected && <Check className="w-3.5 h-3.5" />}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800 text-sm text-blue-700 dark:text-blue-300">
                                <p className="flex gap-2">
                                    <span className="text-xl">💡</span>
                                    <span>
                                        After booking, the agent will contact you to coordinate the exact meeting time.
                                    </span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 z-10 p-6 bg-slate-50/80 dark:bg-[#1a1829]/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800">
                    {step === 'selection' ? (
                        <button
                            onClick={() => setStep('date')}
                            className="w-full px-5 py-3 text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg shadow-purple-500/30 hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            disabled={selectedPropertyIds.size === 0}
                        >
                            <span>Continue to Day Selection</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                onClick={handleBack}
                                className="px-5 py-3 text-base font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 px-5 py-3 text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg shadow-purple-500/30 hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                disabled={!selectedDate}
                            >
                                <span>Confirm Booking</span>
                                <Check className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
