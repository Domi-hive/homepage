"use client";

import {
    User,
    CreditCard,
    Camera,
    MapPin,
    FileText,
    ArrowRight,
    Check,
    Hourglass,
    ShieldCheck
} from "lucide-react";

export default function KYCTab() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Form */}
            <div className="lg:col-span-2">
                <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-soft border border-white/50 dark:border-white/10">
                    <div className="space-y-8">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-slate-700 dark:text-slate-200 flex items-center gap-2">
                                <User className="text-purple-500 w-5 h-5" />
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="full-name">Full Name</label>
                                    <input
                                        className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none text-slate-900 dark:text-white"
                                        id="full-name"
                                        placeholder="Enter your full name"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="dob">Date of Birth</label>
                                    <input
                                        className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none text-slate-900 dark:text-white"
                                        id="dob"
                                        type="date"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="id-type">ID Type</label>
                                    <select
                                        className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none text-slate-900 dark:text-white"
                                        id="id-type"
                                    >
                                        <option value="">Select ID Type</option>
                                        <option value="nin">NIN (National ID)</option>
                                        <option value="voters">Voter's Card</option>
                                        <option value="passport">International Passport</option>
                                        <option value="drivers">Driver's License</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="id-number">ID Number</label>
                                    <input
                                        className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none text-slate-900 dark:text-white"
                                        id="id-number"
                                        placeholder="Enter ID Number"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ID Upload */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-slate-700 dark:text-slate-200 flex items-center gap-2">
                                <CreditCard className="text-purple-500 w-5 h-5" />
                                ID Document Upload
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Front of ID</label>
                                    <div className="flex justify-center items-center w-full bg-white/50 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/80 transition-colors">
                                        <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
                                            <Camera className="w-8 h-8 text-purple-400" />
                                            <p className="font-semibold">Upload Front</p>
                                            <p className="text-xs">JPG, PNG or PDF</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Back of ID</label>
                                    <div className="flex justify-center items-center w-full bg-white/50 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/80 transition-colors">
                                        <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
                                            <Camera className="w-8 h-8 text-purple-400" />
                                            <p className="font-semibold">Upload Back</p>
                                            <p className="text-xs">JPG, PNG or PDF</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Selfie Verification</label>
                                <div className="flex justify-center items-center w-full bg-white/50 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/80 transition-colors">
                                    <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
                                        <Camera className="w-8 h-8 text-purple-400" />
                                        <p className="font-semibold">Take or upload a selfie</p>
                                        <p className="text-xs">Ensure your face is clear and well-lit</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Proof of Address */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg text-slate-700 dark:text-slate-200 flex items-center gap-2">
                                <MapPin className="text-purple-500 w-5 h-5" />
                                Proof of Address
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="address">Residential Address</label>
                                <input
                                    className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none text-slate-900 dark:text-white"
                                    id="address"
                                    placeholder="Enter your full residential address"
                                    type="text"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2" htmlFor="utility-bill">Utility Bill Upload</label>
                                <div className="flex justify-center items-center w-full bg-white/50 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/80 transition-colors">
                                    <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400">
                                        <FileText className="w-8 h-8 text-purple-400" />
                                        <p className="font-semibold">Upload Utility Bill</p>
                                        <p className="text-xs">PDF or Image (e.g., electricity, water bill)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-opacity shadow-lg shadow-purple-500/30" type="submit">
                            <span>Submit for Review</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Column: Timeline */}
            <div className="col-span-1">
                <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-soft border border-white/50 dark:border-white/10">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Review Status Timeline</h2>
                    <div className="relative space-y-10">
                        {/* Timeline Line */}
                        <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>

                        <div className="relative">
                            <div className="flex items-start gap-5">
                                <div className="z-10 w-10 h-10 flex-shrink-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                                    <Check className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-700 dark:text-slate-200">Documents Submitted</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Awaiting review</p>
                                    <time className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">July 15, 2024</time>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="flex items-start gap-5">
                                <div className="z-10 w-10 h-10 flex-shrink-0 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400">
                                    <Hourglass className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-700 dark:text-slate-200">Under Review</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Our team is currently reviewing your documents.</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="flex items-start gap-5">
                                <div className="z-10 w-10 h-10 flex-shrink-0 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-500 dark:text-slate-400">Verification Complete</p>
                                    <p className="text-sm text-slate-400 dark:text-slate-500">Your account will be updated upon approval.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
