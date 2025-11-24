'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt:', { email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff]">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img
                        alt="DomiHive company logo"
                        className="h-16 w-16 mx-auto"
                        src="/landing/logo.png"
                    />
                    <h1 className="text-4xl font-bold text-slate-900 mt-4">Welcome back!</h1>
                    <p className="text-slate-500 mt-2">Sign in to continue your property search.</p>
                </div>

                <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-[0_10px_35px_0_rgba(100,100,150,0.15)] border border-white/50">
                    <div className="bg-blue-100/50 rounded-full p-1.5 flex gap-2 text-sm font-semibold text-slate-600 mb-8 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)]">
                        <button className="flex-1 text-center py-2.5 rounded-full bg-white shadow-md text-blue-600">Login</button>
                        <Link href="/signup" className="flex-1 text-center py-2.5 rounded-full hover:bg-white/50 flex items-center justify-center">
                            Sign Up
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-sm font-semibold text-slate-500 mb-2 block" htmlFor="email">Email</label>
                            <input
                                className="w-full bg-slate-100/70 border-transparent rounded-xl py-3 px-4 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)] outline-none transition-all"
                                id="email"
                                type="email"
                                placeholder="user@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-500 mb-2 block" htmlFor="password">Password</label>
                            <input
                                className="w-full bg-slate-100/70 border-transparent rounded-xl py-3 px-4 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent focus:bg-white shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)] outline-none transition-all"
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-blue-500/30 hover:opacity-90 transition-opacity"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-6">
                        <a className="text-sm font-semibold text-blue-600 hover:underline" href="#">Forgot Password?</a>
                    </div>
                </div>

                <p className="text-center text-slate-500 text-sm mt-8">
                    Don't have an account? <Link className="font-semibold text-blue-600 hover:underline" href="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}
