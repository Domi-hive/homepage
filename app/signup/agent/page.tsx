'use client';

import Link from 'next/link';

import { useState } from 'react';

export default function AgentSignupPage() {
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
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-violet-200 to-blue-200 dark:from-violet-900 dark:to-blue-900">
            <div className="w-full max-w-6xl mx-auto">
                <main className="grid lg:grid-cols-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
                    <div className="relative hidden lg:block rounded-l-2xl overflow-hidden">
                        <img
                            alt="An illustration of a real estate agent presenting a house key to a happy couple."
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU0-MyqkxJtcsq7_0C_cq3J990l_Jbpvq0q-Ju7kaxYYNJcutXb_ALwL6wGKOzusWkzfJlUXfnM13DXYPu_l-6nkGNLjM-FVbqZKip6LOgqr3AYhUCDIOMIR-iCuAZyMY3-jOG4nd4TY5V3vwREK6YE_Rsn1kQL_Pt8bY5M8Y2GfV9JRXJHHgsQ59ddPyLG-OdD6COIvCUWaN1J7KKfjUglhda_o_ovLUCnY43O_MwM1eijS045QR5OJiSTG59KNHPrufUCwg7Zw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-10 text-white">
                            <h2 className="text-4xl font-bold mb-3">Join DomiHive Agents</h2>
                            <p className="text-lg text-gray-200">Connect with clients, manage your listings, and grow your real estate business with our powerful tools.</p>
                        </div>
                    </div>
                    <div className="w-full p-6 sm:p-8 flex flex-col justify-center bg-white h-full overflow-y-auto">
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <img
                                alt="DomiHive Logo"
                                className="w-10 h-10 rounded-lg"
                                src="/landing/logo.png"
                            />
                            <span className="text-2xl font-bold text-slate-900">DomiHive</span>
                        </div>
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-slate-900">Create your Agent Account</h1>
                            <p className="text-slate-500 text-sm mt-1">Let's get you started on growing your business.</p>
                        </div>

                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1" htmlFor="first-name">First Name</label>
                                    <input
                                        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-slate-900 placeholder-slate-400 outline-none transition-all text-sm"
                                        id="first-name"
                                        name="first-name"
                                        placeholder="John"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1" htmlFor="last-name">Last Name</label>
                                    <input
                                        className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-slate-900 placeholder-slate-400 outline-none transition-all text-sm"
                                        id="last-name"
                                        name="last-name"
                                        placeholder="Doe"
                                        type="text"
                                    />
                                </div>
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
                                <input
                                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-slate-900 placeholder-slate-400 outline-none transition-all text-sm"
                                    id="phone-number"
                                    name="phone-number"
                                    placeholder="0801 234 5678"
                                    type="tel"
                                />
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
        </div>
    );
}
