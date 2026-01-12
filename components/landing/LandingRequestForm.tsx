'use client';

import { useState, useMemo, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { requestService } from '@/services/request.service';
import { propertyService } from '@/services/property.service';
import { PropertyType } from '@/types/api';
import Link from 'next/link';

// Fallback options while loading or if error
const FALLBACK_PROPERTY_TYPES = [
    { id: 'detached', label: 'Detached', icon: 'home' },
    { id: 'semi-detached', label: 'Semi-detached', icon: 'home' },
    { id: 'terraced', label: 'Terraced', icon: 'holiday_village' },
    { id: 'bungalow', label: 'Bungalow', icon: 'bungalow' },
    { id: 'flats', label: 'Flats / apartments', icon: 'apartment' },
    { id: 'farms', label: 'Land', icon: 'grass' },
];

const BUDGET_MIN = 0;
const BUDGET_MAX = 10_000_000;
const BUDGET_STEP = 100_000;

const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4+' },
];

const bathroomOptions = [
    { value: '', label: 'Any' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4+' },
];

const offerTypeOptions = [
    { value: '', label: 'Any' },
    { value: 'buy', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' },
    { value: 'shortlet', label: 'Short Let' },
];

export default function LandingRequestForm() {
    const [location, setLocation] = useState('');
    const [budgetRange, setBudgetRange] = useState({ min: BUDGET_MIN, max: BUDGET_MAX });
    const [bedrooms, setBedrooms] = useState<string | number>('');
    const [bathrooms, setBathrooms] = useState<string | number>('');
    const [offerType, setOfferType] = useState('');
    const [details, setDetails] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);

    // Unused loading state kept for API compatibility structures if needed later
    // const [isLoadingTypes, setIsLoadingTypes] = useState(false);

    useEffect(() => {
        const fetchTypes = async () => {
            // setIsLoadingTypes(true);
            try {
                const types = await propertyService.getPropertyTypes();
                setPropertyTypes(types);
            } catch (err) {
                console.warn('Failed to fetch property types, using fallback', err);
                setPropertyTypes(FALLBACK_PROPERTY_TYPES);
            } finally {
                // setIsLoadingTypes(false);
            }
        };
        fetchTypes();
    }, []);

    // Helper to get options to display
    const displayOptions = propertyTypes.length > 0 ? propertyTypes : FALLBACK_PROPERTY_TYPES;

    // Helper to get icon (since API might not return it)
    const getIcon = (id: string) => {
        // Try to match by ID strictly first
        const match = FALLBACK_PROPERTY_TYPES.find(t => t.id === id);
        if (match) return match.icon;

        // Heuristic matching
        const lowerId = id.toLowerCase();
        if (lowerId.includes('flat') || lowerId.includes('apartment')) return 'apartment';
        if (lowerId.includes('land') || lowerId.includes('farm')) return 'grass';
        if (lowerId.includes('holiday') || lowerId.includes('terrace')) return 'holiday_village';
        if (lowerId.includes('bungalow')) return 'bungalow';

        return 'home';
    };

    // Mock state for the "1 of 3 locations selected" UI from reference
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

    const currencyFormatter = useMemo(
        () =>
            new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
                maximumFractionDigits: 0,
            }),
        []
    );

    const formatBudget = (value: number) => {
        if (value >= BUDGET_MAX) return '₦10,000,000+';
        return currencyFormatter.format(value);
    };

    const handleBudgetChange = (type: 'min' | 'max') => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        setBudgetRange((prev) => {
            if (type === 'min') {
                return { ...prev, min: Math.min(value, prev.max) };
            }
            return { ...prev, max: Math.max(value, prev.min) };
        });
    };

    const togglePropertyType = (id: string) => {
        setSelectedTypes((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const handleAddLocation = () => {
        if (location && !selectedLocations.includes(location) && selectedLocations.length < 3) {
            setSelectedLocations([...selectedLocations, location]);
            setLocation('');
        }
    };

    const removeLocation = (loc: string) => {
        setSelectedLocations(selectedLocations.filter(l => l !== loc));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (bedrooms === '' || !offerType) {
                throw new Error('Please fill in all required fields.');
            }

            // Note: Manual token check logic can be added here if needed for landing page
            // For now, we assume user might create request which prompts login/signup flow if not auth'd
            // dependent on requestService implementation.

            const testPayload = {
                bedrooms: Number(bedrooms),
                bathrooms: Number(bathrooms),
                cities: selectedLocations.length > 0 ? selectedLocations : (location ? [location] : []),
                state: "Lagos", // Defaulting to simple logic for now
                minPrice: budgetRange.min,
                maxPrice: budgetRange.max
            };

            await requestService.createPropertyRequest(testPayload as any);

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                // Reset form
                setLocation('');
                setSelectedLocations([]);
                setBudgetRange({ min: BUDGET_MIN, max: BUDGET_MAX });
                setBedrooms('');
                setBathrooms('');
                setOfferType('');
                setDetails('');
                setSelectedTypes(new Set());
            }, 3000);

        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Start Your Request</h2>
                <p className="text-sm text-slate-500">Tell us what you need, and we'll find the perfect match.</p>
            </div>

            {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">✅</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Request Created!</h3>
                    <p className="text-slate-600">Your property request has been successfully submitted.</p>
                </div>
            ) : (
                <form id="landing-request-form" onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Location */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider text-xs">
                            Neighbourhood(s) <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-slate-500">
                            You can add up to 3 neighbourhoods.
                            {selectedLocations.length < 3 ? (
                                <span className="text-coral ml-1 font-medium">({3 - selectedLocations.length} remaining)</span>
                            ) : (
                                <span className="text-green-600 ml-1 font-medium">Max reached</span>
                            )}
                        </p>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <select className="w-full bg-slate-50 border-slate-200 rounded-xl shadow-sm focus:ring-navy-900 focus:border-navy-900 py-3 pl-4 pr-10 text-slate-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center]">
                                    <option>Select State</option>
                                    <option>Abuja (FCT)</option>
                                    <option>Lagos</option>
                                </select>
                            </div>
                            <div className="relative flex gap-2">
                                <div className="relative flex-1">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddLocation();
                                            }
                                        }}
                                        disabled={selectedLocations.length >= 3}
                                        className="w-full bg-slate-50 border-slate-200 rounded-xl shadow-sm focus:ring-navy-900 focus:border-navy-900 pl-10 p-3 text-slate-900 placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder={selectedLocations.length >= 3 ? "Max locations added" : "Search neighbourhoods..."}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddLocation}
                                    disabled={!location || selectedLocations.length >= 3}
                                    className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        {selectedLocations.length > 0 && (
                            <div className="pt-3 space-y-2">
                                <p className="text-sm font-medium text-slate-500">
                                    {selectedLocations.length} of 3 neighbourhoods selected
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedLocations.map((loc, index) => (
                                        <div key={index} className="bg-navy-50 border border-navy-100 text-navy-800 text-sm font-medium px-3 py-1.5 rounded-lg flex items-center gap-2">
                                            <span>{loc}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeLocation(loc)}
                                                className="text-navy-400 hover:text-navy-700"
                                            >
                                                <span className="material-symbols-outlined text-sm">close</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Price Range */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider text-xs">
                            Price range
                        </label>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <input
                                type="range"
                                min={BUDGET_MIN}
                                max={BUDGET_MAX}
                                step={BUDGET_STEP}
                                value={budgetRange.max}
                                onChange={handleBudgetChange('max')}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-navy-900"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
                                <span>{formatBudget(budgetRange.min)}</span>
                                <span>{formatBudget(budgetRange.max)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bedrooms, Bathrooms & Tenure */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="bedrooms" className="block text-sm font-bold text-slate-700 uppercase tracking-wider text-xs">
                                Bedrooms
                            </label>
                            <select
                                id="bedrooms"
                                value={bedrooms}
                                onChange={(e) => setBedrooms(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full bg-slate-50 border-slate-200 rounded-xl shadow-sm focus:ring-navy-900 focus:border-navy-900 py-3 pl-3 pr-8 text-slate-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center]"
                                required
                            >
                                {bedroomOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="offerType" className="block text-sm font-bold text-slate-700 uppercase tracking-wider text-xs">
                                Offer Type
                            </label>
                            <select
                                id="offerType"
                                value={offerType}
                                onChange={(e) => setOfferType(e.target.value)}
                                className="w-full bg-slate-50 border-slate-200 rounded-xl shadow-sm focus:ring-navy-900 focus:border-navy-900 py-3 pl-3 pr-8 text-slate-900 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center]"
                                required
                            >
                                {offerTypeOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Property Types */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider text-xs">
                            Property types
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {displayOptions.map((type) => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => togglePropertyType(type.id)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all border ${selectedTypes.has(type.id)
                                        ? 'bg-navy-900 text-white border-navy-900 font-medium shadow-md'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-base leading-none">{getIcon(type.id)}</span>
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-2">
                        <Link
                            href="/signup"
                            className="w-full px-6 py-4 text-white font-bold rounded-xl bg-coral hover:bg-coral-hover hover:shadow-lg hover:shadow-coral/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            Create Request
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                    </div>
                </form>
            )}
        </div>
    );
}
