'use client';

import { useMemo, useState, useEffect } from 'react';
import Modal from './Modal';

const heroBackdrop = '/landing/hero_background.jpg';

const featureBadges = [
    { id: 'verified', label: 'Verified Agents' },
    { id: 'secure', label: 'Secure Payments' },
    { id: 'tracking', label: 'Live Tracking' },
];

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
const BEDROOM_MIN = -1;
const BEDROOM_MAX = 11;

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

const budgetOptions = [
    { value: BUDGET_MIN, label: 'No Min' },
    { value: 250000, label: '₦250k' },
    { value: 500000, label: '₦500k' },
    { value: 750000, label: '₦750k' },
    { value: 1000000, label: '₦1M' },
    { value: 1500000, label: '₦1.5M' },
    { value: 2000000, label: '₦2M' },
    { value: 2500000, label: '₦2.5M' },
    { value: 3000000, label: '₦3M' },
    { value: 3500000, label: '₦3.5M' },
    { value: 4000000, label: '₦4M' },
    { value: 4500000, label: '₦4.5M' },
    { value: 5000000, label: '₦5M' },
    { value: 6000000, label: '₦6M' },
    { value: 7000000, label: '₦7M' },
    { value: 8000000, label: '₦8M' },
    { value: 9000000, label: '₦9M' },
    { value: 10000000, label: '₦10M' },
    { value: 12000000, label: '₦12M' },
    { value: 15000000, label: '₦15M' },
    { value: 20000000, label: '₦20M' },
    { value: 25000000, label: '₦25M' },
    { value: 30000000, label: '₦30M' },
    { value: 40000000, label: '₦40M' },
    { value: 50000000, label: '₦50M' },
    { value: 60000000, label: '₦60M' },
    { value: 70000000, label: '₦70M' },
    { value: 80000000, label: '₦80M' },
    { value: 90000000, label: '₦90M' },
    { value: 100000000, label: '₦100M' },
    { value: 120000000, label: '₦120M' },
    { value: 150000000, label: '₦150M' },
    { value: 200000000, label: '₦200M' },
    { value: 250000000, label: '₦250M' },
    { value: 300000000, label: '₦300M' },
    { value: 400000000, label: '₦400M' },
    { value: 500000000, label: '₦500M' },
    { value: 600000000, label: '₦600M' },
    { value: 700000000, label: '₦700M' },
    { value: 800000000, label: '₦800M' },
    { value: 900000000, label: '₦900M' },
    { value: 1000000000, label: '₦1B' },
];

const budgetMaxOptions = [
    ...budgetOptions.slice(1, -1), // Remove "No Min" and "₦1B"
    { value: BUDGET_MAX, label: 'No Max' }
];

function HeroSection() {
    const [location, setLocation] = useState('');
    const [budgetRange, setBudgetRange] = useState({ min: BUDGET_MIN, max: BUDGET_MAX });
    const [bedrooms, setBedrooms] = useState('');
    const [tenure, setTenure] = useState('');
    const [details, setDetails] = useState('');
    const [selectedTypes, setSelectedTypes] = useState(() => new Set());
    const [propertyTypeModalOpen, setPropertyTypeModalOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true); // Default to true for SSR match, update on mount

    useEffect(() => {
        // Initial check
        setIsDesktop(window.innerWidth > 768);

        const handleResize = () => {
            const newIsDesktop = window.innerWidth > 768;
            setIsDesktop(newIsDesktop);
            if (newIsDesktop && propertyTypeModalOpen) {
                setPropertyTypeModalOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [propertyTypeModalOpen]);

    const currencyFormatter = useMemo(
        () =>
            new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
                maximumFractionDigits: 0,
            }),
        []
    );

    const formatBudget = (value) => {
        if (value === BUDGET_MIN) return 'No min';
        if (value === BUDGET_MAX) return 'No max';
        return currencyFormatter.format(value);
    };


    const handleBudgetChange = (type) => (event) => {
        const value = Number(event.target.value);
        setBudgetRange((prev) => {
            if (type === 'min') {
                return { ...prev, min: Math.min(value, prev.max) };
            }
            return { ...prev, max: Math.max(value, prev.min) };
        });
    };


    const togglePropertyType = (id) => {
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


    const selectedTypesList = Array.from(selectedTypes)
        .map((id) => propertyTypeOptions.find((opt) => opt.id === id)?.label)
        .filter(Boolean);

    return (
        <>
            <section className="hero" style={{ '--hero-image': `url(${heroBackdrop})` }}>
                <div className="hero__inner">
                    <div className="hero__copy">
                        <div className="hero__heading">
                            <p className="hero__eyebrow">We Take Your</p>
                            <p className="hero__primary">Dream Home</p>
                            <p className="hero__tagline">&amp; It&apos;s Easy Peasy.</p>
                        </div>
                        <div className="hero__actions">
                            <button type="button" className="cta cta--primary">
                                Get Started
                            </button>
                        </div>

                        <div className="hero__features">
                            {featureBadges.map((feature) => (
                                <div key={feature.id} className="hero__feature">
                                    <span className="hero__feature-dot" />
                                    <span>{feature.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hero__panel">
                        <div className="search-card">
                            <p className="search-card__label">Create property Request</p>
                            <form className="search-form">
                                <label className="search-field">
                                    <span>Enter location</span>
                                    <input
                                        type="text"
                                        placeholder="e.g. Asokoro, Abuja"
                                        value={location}
                                        onChange={(event) => setLocation(event.target.value)}
                                    />
                                </label>

                                <div className="search-field">
                                    <span>Price range</span>
                                    {isDesktop ? (
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
                                    ) : (
                                        <div className="budget-buttons">
                                            <select
                                                className="budget-button"
                                                value={budgetRange.min}
                                                onChange={(e) => setBudgetRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                                            >
                                                {budgetOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <span className="budget-separator">to</span>
                                            <select
                                                className="budget-button"
                                                value={budgetRange.max}
                                                onChange={(e) => setBudgetRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                                            >
                                                {budgetMaxOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>

                                <div className="search-field-row">
                                    <div className="search-field">
                                        <span>Bedrooms</span>
                                        <select
                                            className="budget-button"
                                            value={bedrooms}
                                            onChange={(e) => setBedrooms(e.target.value === '' ? '' : Number(e.target.value))}
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
                                            className="budget-button"
                                            value={tenure}
                                            onChange={(e) => setTenure(e.target.value)}
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
                                    {isDesktop ? (
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
                                    ) : (
                                        <div className="property-types-mobile">
                                            <button
                                                type="button"
                                                className="property-types-trigger"
                                                onClick={() => setPropertyTypeModalOpen(true)}
                                            >
                                                {selectedTypesList.length > 0 ? (
                                                    <span className="property-types-trigger__count">{selectedTypesList.length} selected</span>
                                                ) : (
                                                    <span className="property-types-trigger__placeholder">Select property types</span>
                                                )}
                                            </button>
                                            {selectedTypesList.length > 0 && (
                                                <div className="property-types-selected">
                                                    {Array.from(selectedTypes).map((typeId) => {
                                                        const option = propertyTypeOptions.find(opt => opt.id === typeId);
                                                        return option ? (
                                                            <span key={typeId} className="property-types-selected__icon" title={option.label}>
                                                                {option.icon}
                                                            </span>
                                                        ) : null;
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    )}
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
                            </form>
                            <button type="button" className="cta cta--primary">
                                Create Request
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {!isDesktop && (
                <>
                    <Modal
                        isOpen={propertyTypeModalOpen}
                        onClose={() => setPropertyTypeModalOpen(false)}
                        title="Select Property Types"
                        className="property-types-modal"
                    >
                        <div className="property-types-grid">
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
                    </Modal>

                </>
            )}
        </>
    );
}

export default HeroSection;
