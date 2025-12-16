"use client"

import React, { useState } from 'react';
import { X, Upload, MapPin, CheckCircle, ChevronRight, ChevronLeft, Calendar, DollarSign, Edit3, Image as ImageIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface AddPropertyDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddPropertyDrawer({ isOpen, onClose }: AddPropertyDrawerProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        propertyType: '',
        currency: '₦',
        price: '',
        address: '',
        state: '',
        neighborhood: '',
        beds: '',
        baths: '',
        sqm: '',
        description: '',
        referralEnabled: false,
    });

    const isLastStep = currentStep === 4;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        // Handle select elements that might use name instead of id if needed, but HTML uses id
        const key = id || e.target.name;
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-slate-50 dark:bg-slate-900 h-full flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="sticky top-0 z-10 p-6 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Add New Property</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Complete the steps below to list a new property.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={onClose} className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200">
                                <X className="w-6 h-6" />
                            </button>
                            <button className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors hidden md:block">
                                Save as Draft
                            </button>
                            <button
                                className={`px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-lg shadow-purple-500/30 transition-opacity ${!isLastStep ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
                                disabled={!isLastStep}
                            >
                                Publish
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(currentStep / 4) * 100}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs font-medium text-slate-500 mt-1.5">
                            <span className={currentStep >= 1 ? "text-purple-600 dark:text-purple-400" : ""}>Basic Information</span>
                            <span className={currentStep >= 2 ? "text-purple-600 dark:text-purple-400" : ""}>Property Details</span>
                            <span className={currentStep >= 3 ? "text-purple-600 dark:text-purple-400" : ""}>Media</span>
                            <span className={currentStep >= 4 ? "text-purple-600 dark:text-purple-400" : ""}>Publish</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-3">
                                <Edit3 className="w-5 h-5 text-purple-500" />
                                Basic Information
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="title">
                                    Property Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white"
                                    id="title"
                                    placeholder="e.g. Modern 3-Bedroom Duplex"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="propertyType">
                                        Property Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center] pr-10 text-slate-900 dark:text-white"
                                        id="propertyType"
                                        value={formData.propertyType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select property type</option>
                                        <option value="apartment">Apartment</option>
                                        <option value="duplex">Duplex</option>
                                        <option value="penthouse">Penthouse</option>
                                        <option value="bungalow">Bungalow</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="price">
                                        Price <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex">
                                        <select
                                            className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 border-r-0 rounded-l-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-2 outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center] pr-10"
                                            id="currency"
                                            value={formData.currency}
                                            onChange={handleInputChange}
                                        >
                                            <option value="₦">₦</option>
                                            <option value="$">$</option>
                                        </select>
                                        <input
                                            className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-r-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white"
                                            id="price"
                                            placeholder="3,500,000"
                                            type="text"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="address">
                                    Location / Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white"
                                    id="address"
                                    placeholder="Enter street address"
                                    type="text"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="state">
                                        State <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center] pr-10"
                                        id="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select State</option>
                                        <option value="Lagos">Lagos</option>
                                        <option value="Abuja">Abuja (FCT)</option>
                                        <option value="Rivers">Rivers</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="neighborhood">
                                        Neighborhood <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center] pr-10"
                                        id="neighborhood"
                                        value={formData.neighborhood}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Neighborhood</option>
                                        <option value="Ikoyi">Ikoyi</option>
                                        <option value="Victoria Island">Victoria Island</option>
                                        <option value="Maitama">Maitama</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Property Details */}
                    {currentStep === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-purple-500" />
                                Property Details
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="beds">Bedrooms</label>
                                    <input
                                        type="number"
                                        id="beds"
                                        value={formData.beds}
                                        onChange={handleInputChange}
                                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="baths">Bathrooms</label>
                                    <input
                                        type="number"
                                        id="baths"
                                        value={formData.baths}
                                        onChange={handleInputChange}
                                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="sqm">Size (sqm)</label>
                                    <input
                                        type="number"
                                        id="sqm"
                                        value={formData.sqm}
                                        onChange={handleInputChange}
                                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    placeholder="Describe the key features and selling points..."
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 py-2 outline-none text-slate-900 dark:text-white resize-none"
                                />
                            </div>
                        </div>
                    )}


                    {/* Step 3: Media */}
                    {currentStep === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-3">
                                <ImageIcon className="w-5 h-5 text-purple-500" />
                                Media Upload
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Property Images <span className="text-red-500">*</span></label>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Upload at least 3 images (max 20). First image will be the cover photo.</p>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-2xl cursor-pointer bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" htmlFor="dropzone-file">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                                            <Upload className="w-10 h-10 text-slate-400 dark:text-slate-500 mb-2" />
                                            <p className="mb-2 text-sm text-slate-500 dark:text-slate-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input className="hidden" id="dropzone-file" multiple type="file" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Publish */}
                    {currentStep === 4 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-purple-500" />
                                Review & Publish
                            </h3>

                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                <div className="aspect-video bg-slate-100 dark:bg-slate-900 relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                        Cover Image Preview
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-2xl text-sm font-bold text-slate-800">
                                        {formData.currency}{formData.price}/year
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{formData.title || 'Untitled Property'}</h4>
                                    <p className="text-slate-500 flex items-center gap-1">
                                        <MapPin className="w-4 h-4" /> {formData.address}, {formData.neighborhood}
                                    </p>
                                    <div className="grid grid-cols-3 gap-4 py-4 mt-4 border-t border-slate-100 dark:border-slate-700">
                                        <div className="text-center">
                                            <span className="block font-bold text-slate-800 dark:text-white">{formData.beds || 0}</span>
                                            <span className="text-xs text-slate-500">Beds</span>
                                        </div>
                                        <div className="text-center border-l border-slate-100 dark:border-slate-700">
                                            <span className="block font-bold text-slate-800 dark:text-white">{formData.baths || 0}</span>
                                            <span className="text-xs text-slate-500">Baths</span>
                                        </div>
                                        <div className="text-center border-l border-slate-100 dark:border-slate-700">
                                            <span className="block font-bold text-slate-800 dark:text-white">{formData.sqm || 0}</span>
                                            <span className="text-xs text-slate-500">Sqm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="sticky bottom-0 z-10 p-6 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 transition-all">
                    <div className="flex justify-end gap-4">
                        <button
                            className="px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            onClick={currentStep === 1 ? onClose : prevStep}
                        >
                            {currentStep === 1 ? 'Cancel' : 'Back'}
                        </button>

                        {!isLastStep ? (
                            <button
                                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-lg shadow-purple-500/30 hover:opacity-90 transition-opacity"
                                onClick={nextStep}
                            >
                                Next: {currentStep === 1 ? 'Property Details' : currentStep === 2 ? 'Media' : 'Publish'}
                            </button>
                        ) : (
                            <button
                                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg shadow-green-500/30 hover:opacity-90 transition-opacity"
                                onClick={onClose}
                            >
                                Publish Listing
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
