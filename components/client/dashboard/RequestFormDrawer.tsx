'use client';

import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { requestService } from '@/services/request.service';


const propertyTypeOptions = [
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

const tenureOptions = [
    { value: '', label: 'Any' },
    { value: 'buy', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' },
];

interface RequestFormDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RequestFormDrawer({ isOpen, onClose }: RequestFormDrawerProps) {
    const [location, setLocation] = useState('');
    const [budgetRange, setBudgetRange] = useState({ min: BUDGET_MIN, max: BUDGET_MAX });
    const [bedrooms, setBedrooms] = useState<string | number>('');
    const [tenure, setTenure] = useState('');
    const [details, setDetails] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [show, setShow] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Mock state for the "1 of 3 locations selected" UI from reference
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            // Small timeout to ensure component is mounted and DOM is ready for transition
            const timer = setTimeout(() => {
                setShow(true);
                document.body.style.overflow = 'hidden';
            }, 10);
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
            const formattedBudgetRange = `₦${budgetRange.min.toLocaleString()} - ₦${budgetRange.max.toLocaleString()}`;
            const propertyTypeString = Array.from(selectedTypes)
                .map(id => propertyTypeOptions.find(opt => opt.id === id)?.label)
                .filter(Boolean)
                .join(', ');

            // Use selectedLocations if available, otherwise check if user typed one but didn't add it
            const finalLocations = selectedLocations.length > 0 ? selectedLocations : (location ? [location] : []);
            const locationString = finalLocations.join(', ');

            if (!locationString || !propertyTypeString || bedrooms === '' || !tenure) {
                throw new Error('Please fill in all required fields.');
            }

            // Note: Manual token check removed as API client handles Auth header, 
            // but we can leave a check if we want immediate feedback.
            if (!localStorage.getItem('authToken')) {
                throw new Error('You must be logged in to create a request.');
            }

            await requestService.createPropertyRequest({
                location: locationString,
                propertyType: propertyTypeString,
                bedrooms,
                tenure,
                budgetRange: formattedBudgetRange,
                additionalInfo: details,
                furnishing: 'Unfurnished',
                propertyStructure: 'Standard',
                locationType: 'Urban',
                moveInDate: new Date().toISOString().split('T')[0],
            });

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
                // Reset form
                setLocation('');
                setSelectedLocations([]);
                setBudgetRange({ min: BUDGET_MIN, max: BUDGET_MAX });
                setBedrooms('');
                setTenure('');
                setDetails('');
                setSelectedTypes(new Set());
            }, 2000);

        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    if (!isVisible && !isOpen) return null;

    return createPortal(
        <div className={`fixed inset-0 z-[100] flex justify-end ${show ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 h-[100dvh] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${show ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`relative w-full md:max-w-lg bg-slate-50 dark:bg-[#1a1829] h-[100dvh] flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${show ? 'translate-x-0 delay-100' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="p-6 bg-slate-50/80 dark:bg-[#1a1829]/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Create Property Request</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Specify your property needs to find the perfect match.</p>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {success ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl">✅</span>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Request Created!</h3>
                            <p className="text-slate-600 dark:text-slate-300">Your property request has been successfully submitted.</p>
                        </div>
                    ) : (
                        <form id="request-form" onSubmit={handleSubmit} className="space-y-8">
                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Location */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Location(s) <span className="text-red-500">*</span>
                                </label>
                                <p className="text-xs text-slate-500 dark:text-slate-400">You can add up to 3 locations.</p>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <select className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 py-2.5 pl-3 pr-10 text-slate-900 dark:text-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center]">
                                            <option>Select State</option>
                                            <option>Abia</option>
                                            <option>Abuja (FCT)</option>
                                            <option>Lagos</option>
                                            <option>Rivers</option>
                                        </select>
                                    </div>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xl">search</span>
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
                                            className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 pl-10 p-2.5 text-slate-900 dark:text-white"
                                            placeholder="Search locations in Lagos"
                                        />
                                    </div>
                                </div>

                                {selectedLocations.length > 0 && (
                                    <div className="pt-3 space-y-2">
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                            {selectedLocations.length} of 3 locations selected
                                        </p>
                                        {selectedLocations.map((loc, index) => (
                                            <div key={index} className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-2 rounded-lg flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-lg text-blue-500">location_on</span>
                                                    <span>{loc}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeLocation(loc)}
                                                    className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300"
                                                >
                                                    <span className="material-symbols-outlined text-lg">close</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Price Range */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Price range
                                </label>
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                                    <input
                                        type="range"
                                        min={BUDGET_MIN}
                                        max={BUDGET_MAX}
                                        step={BUDGET_STEP}
                                        value={budgetRange.max}
                                        onChange={handleBudgetChange('max')}
                                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-purple-500"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                                        <span>{formatBudget(budgetRange.min)}</span>
                                        <span>{formatBudget(budgetRange.max)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bedrooms & Tenure */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="bedrooms" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Bedrooms
                                    </label>
                                    <select
                                        id="bedrooms"
                                        value={bedrooms}
                                        onChange={(e) => setBedrooms(e.target.value === '' ? '' : Number(e.target.value))}
                                        className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 py-2.5 pl-3 pr-10 text-slate-900 dark:text-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center]"
                                        required
                                    >
                                        {bedroomOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="tenure" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Tenure
                                    </label>
                                    <select
                                        id="tenure"
                                        value={tenure}
                                        onChange={(e) => setTenure(e.target.value)}
                                        className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 py-2.5 pl-3 pr-10 text-slate-900 dark:text-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center]"
                                        required
                                    >
                                        {tenureOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Property Types */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Property types
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {propertyTypeOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => togglePropertyType(option.id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors ${selectedTypes.has(option.id)
                                                ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-semibold border-2 border-purple-500'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-base">{option.icon}</span>
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Specific Details */}
                            <div className="space-y-2">
                                <label htmlFor="specific-details" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Specific details
                                </label>
                                <textarea
                                    id="specific-details"
                                    rows={4}
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 p-3 text-slate-900 dark:text-white placeholder-slate-400"
                                    placeholder="Add notes about preferred finishes, timelines, amenities, or accessibility needs."
                                />
                            </div>
                        </form>
                    )}
                </div>

                {/* Footer */}
                {!success && (
                    <div className="p-6 bg-slate-50/80 dark:bg-[#1a1829]/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800">
                        <button
                            type="submit"
                            form="request-form"
                            disabled={isLoading}
                            className="w-full px-5 py-3 text-base font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl shadow-lg shadow-purple-500/30 hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Request'
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}
