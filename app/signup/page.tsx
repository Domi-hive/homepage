'use client';

import Link from 'next/link';
import { Home, UserCheck } from 'lucide-react';

export default function SignupPage() {
    return (
        <div className="flex flex-col min-h-screen w-screen bg-[#F7F5FF] relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-[#E9D5FF] rounded-full blur-[100px] opacity-40"></div>
                <div className="absolute bottom-[15%] right-[10%] w-[40%] h-[40%] bg-[#D1FAE5] rounded-full blur-[100px] opacity-40"></div>
            </div>

            <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                    <img
                        alt="DomiHive company logo"
                        className="h-10 w-10 sm:h-12 sm:w-12"
                        src="/landing/logo.png"
                    />
                    <span className="text-2xl sm:text-3xl font-bold text-slate-800">DomiHive</span>
                </div>
                <div className="text-sm sm:text-base text-slate-500">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-purple-600 hover:underline">
                        Log in
                    </Link>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">How will you use DomiHive?</h1>
                        <p className="text-slate-500 mt-3 text-lg max-w-2xl mx-auto">
                            Choose your role to get started. This will help us tailor your experience on our platform.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
                        {/* Client Card */}
                        <Link
                            href="/signup/client"
                            className="group flex flex-col items-start bg-white/60 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_0_rgba(100,100,150,0.25)] hover:border-purple-300 h-full"
                        >
                            <div className="h-48 w-full relative overflow-hidden">
                                <img
                                    alt="Happy family moving into a new home"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ5TXv80W5I9s-yzHa0V53ErR7jhfk1AD1ubiMMCqXp60CjEWY0uKywfKF-7VqGfnaexfgloZgNDv27SaOBWrRfS9Mi7jvaCBLj0L1snsePzDjnzbtia0tNd7rVlRCgmttur9FiOQCxsCySoRbydHaNAGHBL33cLbHu43YQy7QEujfsZzqesdHKlL-P6OpsF4Q7VD02k3k_ca7CO2gQfBqwXoVDUEcfrv8XVDenI_6VviDj4B7JFPOb44-E5jwJNaHiJVQp2OA-w"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow w-full">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                                        <Home className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800">I'm a Client</h2>
                                </div>
                                <p className="text-slate-500 text-sm mb-4 flex-grow">
                                    Looking for a new property to rent or buy. Find your dream home with our powerful search tools and expert guidance.
                                </p>
                                <div className="flex items-center font-semibold text-purple-600 text-sm mt-auto group-hover:gap-2 transition-all">
                                    <span>Get Started</span>
                                    <span className="material-symbols-outlined ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </div>
                            </div>
                        </Link>

                        {/* Agent Card */}
                        <Link
                            href="/signup/agent"
                            className="group flex flex-col items-start bg-white/60 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_40px_0_rgba(100,100,150,0.25)] hover:border-purple-300 h-full"
                        >
                            <div className="h-48 w-full relative overflow-hidden">
                                <img
                                    alt="Real estate agent showing a property on a tablet"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLRY52UkYEmKypNX9hK5-ID_l5V0ZDGtwLvqaGC_RpWJIK6FPpXVPoMtC7_W-aOJp-AVpdG-AcwwHMkUNszAz3dxayWW24z_RRkvHUQe2XnFMxSYNvmpS3B54ZLd6MhFVptT5KKOqdMTRWdNITXYnZyEFrakYnoySmw0iP9pmI3vrMtOy44xZJje1HPeUOgE0rHTL_GrcwNWMZglO9WUTW0YUHhjpIc4IPGy7Gv-F8TN_rzLxB5eeQ5sD0UkbI9UfP_VCk0kwCnQ"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow w-full">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                                        <UserCheck className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800">I'm an Agent</h2>
                                </div>
                                <p className="text-slate-500 text-sm mb-4 flex-grow">
                                    Managing properties and connecting with clients. Grow your business with our suite of professional tools.
                                </p>
                                <div className="flex items-center font-semibold text-purple-600 text-sm mt-auto group-hover:gap-2 transition-all">
                                    <span>Continue as Agent</span>
                                    <span className="material-symbols-outlined ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
