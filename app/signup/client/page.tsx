'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function ClientSignupPage() {
    const [password, setPassword] = useState('');

    // Simple password strength logic for visualization
    const getStrength = (pass: string) => {
        let strength = 0;
        if (pass.length > 5) strength++;
        if (pass.length > 8) strength++;
        if (/[A-Z]/.test(pass)) strength++;
        if (/[0-9]/.test(pass)) strength++;
        return strength;
    };

    const strength = getStrength(password);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-100 to-blue-100">
            {/* Logo - Absolute Top Left */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                <img
                    alt="DomiHive Logo"
                    className="w-10 h-10 rounded-lg"
                    src="/landing/logo.png"
                />
                <span className="text-2xl font-bold text-slate-900">DomiHive</span>
            </div>

            <main className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl shadow-purple-200/50 overflow-hidden grid md:grid-cols-2 h-[85vh] max-h-[800px]">
                {/* Left Side - Illustration */}
                <div className="hidden md:flex flex-col justify-center p-8 bg-white relative">
                    <div className="absolute inset-0">
                        <img
                            alt="Illustration of a couple standing in front of their new home"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQmN7g2UJfOdPyJs8rSMJ4A4nW2NnqV2EJzaiTw2tBERtn-AVEa2gqvjmIBHs3nqZxKkeMZHJasN7JUEpdB4DzDF9sB_8WuGaTiyOx4Ogp03PkgcSjbEo_eAwxRUQXTSGudlT8tWd1CKj3roXG5JDsUcxe7CVG0UNto0nOejy9I_pVtIbfCXjc716hDyOsNzGIHHuB4efvIkoHxuGKeX6DV3c8jjnuiWQk9tU0S2HHqNQDumT4jcJkFtue8z-vRrdRCaH0LYKH1A"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                            <h2 className="text-2xl font-bold text-white text-center mb-2">Find Your Dream Home</h2>
                            <p className="text-white/90 text-center text-sm">Join our community to discover exclusive listings and connect with top agents.</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full p-6 sm:p-8 flex flex-col justify-center bg-white h-full overflow-y-auto">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-slate-900">Create your Account</h1>
                        <p className="text-slate-500 text-sm mt-1">Let's get you started on your property search.</p>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1" htmlFor="full-name">Full Name</label>
                            <input
                                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-slate-900 placeholder-slate-400 outline-none transition-all text-sm"
                                id="full-name"
                                name="full-name"
                                placeholder="John Doe"
                                type="text"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1" htmlFor="email">Email</label>
                            <input
                                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-slate-900 placeholder-slate-400 outline-none transition-all text-sm"
                                id="email"
                                name="email"
                                placeholder="you@example.com"
                                type="email"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1" htmlFor="phone-number">Phone Number</label>
                            <div className="flex rounded-lg border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-purple-600 bg-slate-50">
                                <div className="flex items-center pl-3 pr-2 bg-slate-50 border-r border-slate-200">
                                    <img
                                        alt="Nigerian flag"
                                        className="w-4 h-auto"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-NdASLQ0ozbZhB5KUTB3zJqsRtr2p7MzYzZTCXX1a8tKtFo5SnBJHpmfBclD2ocHNhvu_TuufaIHea5C6orrdXRzacZwvFesLjNRNcN-e0XZOEZNuy_Ujof6JX4rWPiWMvjkR54OGgWCAwXvRQC-qbkLh0jEukTXwzrVJHbLEJTZetjHsayTB99vaZFyKiHnpsvXprO1w8dQgdrUf3BUxVVrAGhP8RnaoueQVdHNz_48BxGb7PTMioCgjoGJ9i3QOC1G0HYsh5g"
                                    />
                                    <span className="ml-2 text-slate-900 text-xs">+234</span>
                                    <ChevronDown className="w-3 h-3 text-slate-500 ml-1" />
                                </div>
                                <input
                                    className="w-full px-3 py-2.5 border-0 bg-transparent focus:ring-0 text-slate-900 placeholder-slate-400 outline-none text-sm"
                                    id="phone-number"
                                    name="phone-number"
                                    placeholder="801 234 5678"
                                    type="tel"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1" htmlFor="password">Password</label>
                            <input
                                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-slate-900 placeholder-slate-400 outline-none transition-all text-sm"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="flex items-center justify-between mt-1.5">
                                <span className={`text-xs font-medium ${strength > 2 ? 'text-green-500' : strength > 1 ? 'text-yellow-500' : 'text-slate-400'}`}>
                                    {strength > 3 ? 'Strong' : strength > 1 ? 'Medium' : 'Weak'}
                                </span>
                                <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className={`w-8 h-1 rounded-full transition-colors ${strength >= i ? (strength > 2 ? 'bg-green-500' : 'bg-yellow-500') : 'bg-slate-200'}`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input
                                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                id="terms"
                                name="terms"
                                type="checkbox"
                            />
                            <label className="ml-2 block text-xs text-slate-500" htmlFor="terms">
                                I agree to the <a className="font-medium text-purple-600 hover:text-purple-700" href="#">Terms & Privacy</a>
                            </label>
                        </div>
                        <div>
                            <button
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-semibold text-white bg-gradient-to-r from-[#C084FC] to-[#8B5CF6] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 transition-all duration-200"
                                type="submit"
                            >
                                Create Account & Verify
                            </button>
                        </div>
                        <p className="text-center text-xs text-slate-500">
                            Already have an account? <Link className="font-medium text-purple-600 hover:text-purple-700" href="/login">Log in</Link>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
}
