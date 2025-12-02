'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Mock API call or real endpoint if available
            // const response = await fetch('https://s-dev.domihive.com/auth/forgot-password', { ... });

            // Simulating API delay for now as per plan assumption
            await new Promise(resolve => setTimeout(resolve, 1500));

            setIsSubmitted(true);
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        // Logic to resend email
        console.log('Resending email to', email);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff]">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <img
                            alt="DomiHive company logo"
                            className="h-16 w-16 mx-auto mb-6"
                            src="/landing/logo.png"
                        />
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Check your email</h1>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">We've sent a password reset link to your email address.</p>
                    </div>

                    <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-[0_10px_35px_0_rgba(100,100,150,0.15)] border border-white/50">
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="p-5 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                                    <span className="material-symbols-outlined text-blue-600 text-5xl">mail</span>
                                </div>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 mb-4">
                                A password reset link has been sent to <span className="font-semibold">{email}</span>. Please check your inbox and follow the instructions to reset your password.
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                If you don't see the email, please check your spam folder.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                        <span>Didn't receive the link? </span>
                        <button onClick={handleResend} className="font-semibold text-blue-600 hover:underline">Resend Link</button>
                    </div>

                    <div className="mt-8 text-center">
                        <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff]">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <img
                        alt="DomiHive company logo"
                        className="h-16 w-16 mx-auto mb-6"
                        src="/landing/logo.png"
                    />
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white text-center">Forgot your password?</h1>
                    <p className="mt-2 text-slate-500 dark:text-slate-400 text-center">Enter your email and we'll send you a reset link.</p>
                </div>

                <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-[0_10px_35px_0_rgba(100,100,150,0.15)] border border-white/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2" htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="user@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full appearance-none rounded-xl border-0 bg-slate-100/70 dark:bg-slate-700 px-4 py-3 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)] ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all outline-none"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full justify-center rounded-xl bg-blue-600 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                    Remember your password?{' '}
                    <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
