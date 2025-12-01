'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
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
                <header className="mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 p-2 rounded-lg shadow-md">
                            <span className="material-icons text-white text-2xl">home</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">DomiHive</h1>
                    </div>
                </header>
                <main className="grid lg:grid-cols-2 gap-8 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
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
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="max-w-md mx-auto w-full">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create your Agent Account</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">Let's get you started on growing your business.</p>
                            <form action="#" className="space-y-6" method="POST">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="full-name">Full Name</label>
                                    <div className="mt-1">
                                        <input
                                            autoComplete="name"
                                            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-[#A78BFA] focus:border-[#A78BFA] py-3 px-4"
                                            id="full-name"
                                            name="full-name"
                                            placeholder="John Doe"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">Email</label>
                                    <div className="mt-1">
                                        <input
                                            autoComplete="email"
                                            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-[#A78BFA] focus:border-[#A78BFA] py-3 px-4"
                                            id="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            type="email"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="phone-number">Phone Number</label>
                                    <div className="mt-1 flex rounded-lg shadow-sm">
                                        <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <img
                                                    alt="Nigerian flag"
                                                    className="h-5 w-5 rounded-sm"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuABfxbwUqBO9wr257CA0QYZUYKLsycph6UEF9TaH5lkhMwjdhUmXj2tLiXrwqMrB8w6K1rYQa-w7xK0vJrG4Sr3q9rB-u9gf0tHKgkB0eyOsorZRaqWza91Gkea5K-k8pOHx5Tu1FMNcfcCFNYyd-Maem-DueVmQNDNknVOHA1PxfjXoXSFy1_S9t29lsJJ_OZSwwN1dGJx7h-txliCU2scpO0r00kYhObRN6CrqkKTRxmOe66AfkeVSpMclRt1AGuhHDQji8WulA"
                                                />
                                            </div>
                                            <select
                                                className="pl-10 pr-8 block w-full rounded-none rounded-l-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-[#A78BFA] focus:border-[#A78BFA] py-3"
                                                id="country-code"
                                                name="country-code"
                                            >
                                                <option>+234</option>
                                                <option>+1</option>
                                                <option>+44</option>
                                            </select>
                                        </div>
                                        <input
                                            autoComplete="tel"
                                            className="block w-full rounded-none rounded-r-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-[#A78BFA] focus:border-[#A78BFA] py-3 px-4"
                                            id="phone-number"
                                            name="phone-number"
                                            placeholder="801 234 5678"
                                            type="tel"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">Password</label>
                                    <div className="mt-1">
                                        <input
                                            autoComplete="new-password"
                                            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-[#A78BFA] focus:border-[#A78BFA] py-3 px-4"
                                            id="password"
                                            name="password"
                                            placeholder="••••••••"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {strength > 3 ? 'Strong' : strength > 1 ? 'Medium' : 'Weak'}
                                        </span>
                                        <div className="flex items-center space-x-1">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1 w-8 rounded-full transition-colors ${strength >= i
                                                            ? 'bg-red-300' // Using red as per reference HTML "filled" class color #fca5a5
                                                            : 'bg-gray-200 dark:bg-gray-600'
                                                        }`}
                                                    style={{
                                                        backgroundColor: strength >= i ? '#fca5a5' : undefined
                                                    }}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        className="h-4 w-4 text-[#A78BFA] focus:ring-[#A78BFA] border-gray-300 dark:border-gray-600 rounded"
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                    />
                                    <label className="ml-2 block text-sm text-gray-900 dark:text-gray-300" htmlFor="terms">
                                        I agree to the <a className="font-medium text-[#A78BFA] hover:text-violet-500" href="#">Terms & Privacy</a>
                                    </label>
                                </div>
                                <div>
                                    <button
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#A78BFA] hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A78BFA] transition-colors"
                                        type="submit"
                                    >
                                        Create Account & Verify
                                    </button>
                                </div>
                            </form>
                            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?
                                <Link className="font-medium text-[#A78BFA] hover:text-violet-500 ml-1" href="/login">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
