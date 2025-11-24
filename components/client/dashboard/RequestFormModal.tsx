'use client';

import { useState, useMemo } from 'react';
import Modal from '@/components/landing/Modal';
import { Loader2 } from 'lucide-react';

const propertyTypeOptions = [
    { id: 'detached', label: 'Detached', icon: '🏡' },
    { id: 'semi-detached', label: 'Semi-detached', icon: '🏘️' },
    { id: 'terraced', label: 'Terraced', icon: '🏠' },
    { id: 'bungalow', label: 'Bungalow', icon: '🏚️' },
    { id: 'flats', label: 'Flats / apartments', icon: '🏢' },
    { id: 'farms', label: 'Land', icon: '🌾' },
];

const BUDGET_MIN = 0;
const BUDGET_MAX = 1_000_000_000;
const BUDGET_STEP = 100_000;

const bedroomOptions = [
    { value: '', label: 'Select', disabled: true },
    { value: 0, label: 'Studio' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 11, label: '10+' },
];

const tenureOptions = [
    { value: '', label: 'Select', disabled: true },
    { value: 'buy', label: 'Buy' },
    { value: 'rent', label: 'Rent' },
    { value: 'shortlet', label: 'Shortlet' },
];

interface RequestFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RequestFormModal({ isOpen, onClose }: RequestFormModalProps) {
    const [location, setLocation] = useState('');
    const [budgetRange, setBudgetRange] = useState({ min: BUDGET_MIN, max: BUDGET_MAX });
    const [bedrooms, setBedrooms] = useState<string | number>('');
    const [tenure, setTenure] = useState('');
    const [details, setDetails] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

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
        if (value === BUDGET_MIN) return 'No min';
        if (value === BUDGET_MAX) return 'No max';
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('You must be logged in to create a request.');
            }

            const formattedBudgetRange = `₦${budgetRange.min.toLocaleString()} - ₦${budgetRange.max.toLocaleString()}`;
            const propertyTypeString = Array.from(selectedTypes)
                .map(id => propertyTypeOptions.find(opt => opt.id === id)?.label)
                .filter(Boolean)
                .join(', ');

            if (!location || !propertyTypeString || bedrooms === '' || !tenure) {
                throw new Error('Please fill in all required fields.');
            }

            const payload = {
                location,
                propertyType: propertyTypeString,
                bedrooms,
                tenure,
                budgetRange: formattedBudgetRange,
                additionalInfo: details,
                // Default values for required fields not in form
                furnishing: 'Unfurnished', // Default or add field
                propertyStructure: 'Standard', // Default or add field
                locationType: 'Urban', // Default or add field
                moveInDate: new Date().toISOString().split('T')[0], // Default to today or add field
            };

            const response = await fetch('https://s-dev.domihive.com/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to create request');
            }

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
                // Reset form
                setLocation('');
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

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Property Request"
            className="modal--center"
        >
            {success ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">✅</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Request Created!</h3>
                    <p className="text-gray-300">Your property request has been successfully submitted.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="search-form">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    <label className="search-field">
                        <span>Enter location</span>
                        <input
                            type="text"
                            placeholder="e.g. Asokoro, Abuja"
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                            required
                        />
                    </label>

                    <div className="search-field">
                        <span>Price range</span>
                        <div className="range-field">
                            <div className="range-track">
                                <input
                                    type="range"
                                    min={BUDGET_MIN}
                                    max={BUDGET_MAX}
                                    step={BUDGET_STEP}
                                    value={budgetRange.min}
                                    onChange={handleBudgetChange('min')}
                                />
                                <input
                                    type="range"
                                    min={BUDGET_MIN}
                                    max={BUDGET_MAX}
                                    step={BUDGET_STEP}
                                    value={budgetRange.max}
                                    onChange={handleBudgetChange('max')}
                                />
                            </div>
                            <div className="range-values">
                                <span>{formatBudget(budgetRange.min)}</span>
                                <span>{formatBudget(budgetRange.max)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="search-field-row">
                        <div className="search-field">
                            <span>Bedrooms</span>
                            <select
                                className="budget-button w-full rounded-xl border border-white/20 bg-[#0307178c] p-3 text-[#f8fbff]"
                                value={bedrooms}
                                onChange={(e) => setBedrooms(e.target.value === '' ? '' : Number(e.target.value))}
                                required
                            >
                                {bedroomOptions.map((option) => (
                                    <option key={option.value} value={option.value} disabled={option.disabled}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="search-field">
                            <span>Tenure</span>
                            <select
                                className="budget-button w-full rounded-xl border border-white/20 bg-[#0307178c] p-3 text-[#f8fbff]"
                                value={tenure}
                                onChange={(e) => setTenure(e.target.value)}
                                required
                            >
                                {tenureOptions.map((option) => (
                                    <option key={option.value} value={option.value} disabled={option.disabled}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="search-field">
                        <span>Property types</span>
                        <div className="property-types">
                            {propertyTypeOptions.map((option) => (
                                <button
                                    type="button"
                                    key={option.id}
                                    className={`property-type ${selectedTypes.has(option.id) ? 'property-type--active' : ''}`}
                                    onClick={() => togglePropertyType(option.id)}
                                >
                                    <span aria-hidden="true">{option.icon}</span>
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <label className="search-field">
                        <span>Specific details</span>
                        <textarea
                            rows={3}
                            placeholder="Add notes about preferred finishes, timelines, amenities, or accessibility needs."
                            value={details}
                            onChange={(event) => setDetails(event.target.value)}
                        />
                    </label>

                    <button
                        type="submit"
                        className="cta cta--primary w-full flex items-center justify-center gap-2"
                        disabled={isLoading}
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
                </form>
            )}
        </Modal>
    );
}
