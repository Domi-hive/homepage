"use client"

import React, { useState, useRef } from 'react';
import { X, Upload, Home, Image as ImageIcon, FileText, MapPin, Users, CheckCircle, ChevronRight, ChevronLeft, Calendar, DollarSign, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddPropertyDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddPropertyDrawer({ isOpen, onClose }: AddPropertyDrawerProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        propertyType: 'apartment',
        description: '',
        address: '',
        city: '',
        state: '',
        beds: '',
        baths: '',
        sqft: '',
        furnished: false,
        parking: false,
        inspectionTime: '',
        inspectionNote: '',
        referralEnabled: false,
    });

    const steps = [
        { id: 1, title: 'Basic Info', icon: Home },
        { id: 2, title: 'Media', icon: ImageIcon },
        { id: 3, title: 'Details', icon: FileText },
        { id: 4, title: 'Inspection', icon: Calendar },
        { id: 5, title: 'Referral', icon: Users },
        { id: 6, title: 'Review', icon: CheckCircle },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-4xl bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col md:flex-row h-full">

                {/* Sidebar Steps */}
                <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-6 flex-shrink-0">
                    <div className="flex justify-between items-center mb-8 md:mb-12">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Add Property</h2>
                        <button onClick={onClose} className="md:hidden p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.id;
                            const isCompleted = currentStep > step.id;

                            return (
                                <div
                                    key={step.id}
                                    className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer whitespace-nowrap ${isActive
                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold'
                                            : isCompleted
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-slate-500 dark:text-slate-400'
                                        }`}
                                    onClick={() => setCurrentStep(step.id)}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${isActive
                                            ? 'border-blue-200 bg-blue-100 dark:bg-blue-900/40'
                                            : isCompleted
                                                ? 'border-green-200 bg-green-100 dark:bg-green-900/40'
                                                : 'border-slate-200 bg-white dark:bg-slate-800'
                                        }`}>
                                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                                    </div>
                                    <span>{step.title}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                    <div className="hidden md:flex absolute top-4 right-4 z-10">
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <X className="w-6 h-6 text-slate-500" />
                        </button>
                    </div>

                    <ScrollArea className="flex-1 p-6 md:p-10">
                        <div className="max-w-2xl mx-auto pb-20">

                            {/* Step 1: Basic Info */}
                            {currentStep === 1 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Basic Information</h3>
                                        <p className="text-slate-500 dark:text-slate-400">Start with the essentials of your property.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Property Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Modern 3-Bedroom Apartment in Maitama"
                                                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price (₦/year)</label>
                                                <div className="relative">
                                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                                    <input
                                                        type="text"
                                                        name="price"
                                                        value={formData.price}
                                                        onChange={handleInputChange}
                                                        placeholder="3,500,000"
                                                        className="w-full p-3 pl-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Property Type</label>
                                                <select
                                                    name="propertyType"
                                                    value={formData.propertyType}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                                                >
                                                    <option value="apartment">Apartment</option>
                                                    <option value="house">House</option>
                                                    <option value="duplex">Duplex</option>
                                                    <option value="land">Land</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                rows={4}
                                                placeholder="Describe the key features and selling points..."
                                                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Media */}
                            {currentStep === 2 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Media Uploads</h3>
                                        <p className="text-slate-500 dark:text-slate-400">Add high-quality photos to attract more clients.</p>
                                    </div>

                                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Upload className="w-8 h-8" />
                                        </div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-1">Click to upload or drag and drop</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {/* Mock uploaded images */}
                                        <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden relative group">
                                            <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" alt="Preview" className="w-full h-full object-cover" />
                                            <button className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden relative group">
                                            <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" alt="Preview" className="w-full h-full object-cover" />
                                            <button className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Details */}
                            {currentStep === 3 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Property Details</h3>
                                        <p className="text-slate-500 dark:text-slate-400">Specify the location and features.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    placeholder="Street address"
                                                    className="w-full p-3 pl-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">City</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    placeholder="Abuja"
                                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">State</label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    placeholder="FCT"
                                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bedrooms</label>
                                                <input
                                                    type="number"
                                                    name="beds"
                                                    value={formData.beds}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bathrooms</label>
                                                <input
                                                    type="number"
                                                    name="baths"
                                                    value={formData.baths}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Size (sqm)</label>
                                                <input
                                                    type="number"
                                                    name="sqft"
                                                    value={formData.sqft}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-6 pt-2">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="furnished"
                                                    checked={formData.furnished}
                                                    onChange={handleCheckboxChange}
                                                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-slate-700 dark:text-slate-300">Furnished</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="parking"
                                                    checked={formData.parking}
                                                    onChange={handleCheckboxChange}
                                                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-slate-700 dark:text-slate-300">Parking Available</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Inspection */}
                            {currentStep === 4 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Inspection Details</h3>
                                        <p className="text-slate-500 dark:text-slate-400">Set up how clients can view the property.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Preferred Inspection Times</label>
                                            <input
                                                type="text"
                                                name="inspectionTime"
                                                value={formData.inspectionTime}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Weekdays 9am - 5pm"
                                                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Agent Notes (Private)</label>
                                            <textarea
                                                name="inspectionNote"
                                                value={formData.inspectionNote}
                                                onChange={handleInputChange}
                                                rows={3}
                                                placeholder="Private notes about keys, access codes, etc..."
                                                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 5: Referral */}
                            {currentStep === 5 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Referral Settings</h3>
                                        <p className="text-slate-500 dark:text-slate-400">Control how other agents can interact with this listing.</p>
                                    </div>

                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                                                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="font-bold text-slate-800 dark:text-white">Allow Other Agents to Refer</h4>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            name="referralEnabled"
                                                            checked={formData.referralEnabled}
                                                            onChange={handleCheckboxChange}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    </label>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                                    When enabled, other agents can include this property in their responses to client requests. You'll receive 40% of inspection fees for referred bookings.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 6: Review */}
                            {currentStep === 6 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Review & Publish</h3>
                                        <p className="text-slate-500 dark:text-slate-400">Double check everything before going live.</p>
                                    </div>

                                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                        <div className="aspect-video bg-slate-100 dark:bg-slate-900 relative">
                                            <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80" alt="Cover" className="w-full h-full object-cover" />
                                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-sm font-bold text-slate-800">
                                                ₦{formData.price || '0'}/year
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{formData.title || 'Untitled Property'}</h4>
                                                    <p className="text-slate-500 flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" /> {formData.address}, {formData.city}
                                                    </p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${formData.referralEnabled ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                                    {formData.referralEnabled ? 'Referrals ON' : 'Referrals OFF'}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 py-4 border-t border-slate-100 dark:border-slate-700">
                                                <div className="text-center">
                                                    <span className="block font-bold text-slate-800 dark:text-white">{formData.beds || 0}</span>
                                                    <span className="text-xs text-slate-500">Beds</span>
                                                </div>
                                                <div className="text-center border-l border-slate-100 dark:border-slate-700">
                                                    <span className="block font-bold text-slate-800 dark:text-white">{formData.baths || 0}</span>
                                                    <span className="text-xs text-slate-500">Baths</span>
                                                </div>
                                                <div className="text-center border-l border-slate-100 dark:border-slate-700">
                                                    <span className="block font-bold text-slate-800 dark:text-white">{formData.sqft || 0}</span>
                                                    <span className="text-xs text-slate-500">Sqm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                                        <div>
                                            <h5 className="font-bold text-green-800 dark:text-green-300 text-sm">Ready to Publish</h5>
                                            <p className="text-xs text-green-700 dark:text-green-400 mt-1">All required fields have been filled. Your listing will be visible immediately.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </ScrollArea>

                    {/* Footer Actions */}
                    <div className="sticky bottom-0 z-10 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
                        <div className="flex justify-between items-center max-w-2xl mx-auto w-full">
                            <Button
                                variant="outline"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className="gap-2"
                            >
                                <ChevronLeft className="w-4 h-4" /> Back
                            </Button>

                            <div className="flex gap-3">
                                {currentStep === 6 ? (
                                    <Button
                                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white gap-2 shadow-lg shadow-green-500/30"
                                        onClick={onClose}
                                    >
                                        <CheckCircle className="w-4 h-4" /> Publish Listing
                                    </Button>
                                ) : (
                                    <Button
                                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white gap-2 shadow-lg shadow-purple-500/30"
                                        onClick={nextStep}
                                    >
                                        Next Step <ChevronRight className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
