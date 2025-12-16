'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { authService } from '@/services/auth.service';

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [strength, setStrength] = useState(0);

    useEffect(() => {
        // Simple password strength calculation
        let s = 0;
        if (password.length > 6) s += 25;
        if (password.length > 10) s += 25;
        if (/[A-Z]/.test(password)) s += 25;
        if (/[0-9]/.test(password)) s += 25;
        setStrength(s);
    }, [password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (!token) {
            setError('Missing reset token. Please check your email link.');
            return;
        }

        setIsLoading(true);

        try {
            await authService.resetPassword(token, password);
            setIsSubmitted(true);
        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff]">
                <div className="w-full max-w-md">
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-[#34D399] rounded-2xl p-4 w-16 h-16 flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-6">
                            <span className="material-symbols-outlined text-white text-4xl">check</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white text-center">Password Updated!</h1>
                        <p className="mt-2 text-slate-500 dark:text-slate-400 text-center">Your password has been updated successfully.</p>
                    </div>

                    <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-[0_10px_35px_0_rgba(100,100,150,0.15)] border border-white/50">
                        <div className="space-y-6">
                            <Link
                                href="/login"
                                className="flex w-full justify-center rounded-xl bg-blue-600 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition-all duration-200"
                            >
                                Go to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff]">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-600 rounded-2xl p-4 w-16 h-16 flex items-center justify-center shadow-lg mb-6">
                        <span className="material-symbols-outlined text-white text-4xl">lock_reset</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white text-center">Set your new password</h1>
                    <p className="mt-2 text-slate-500 dark:text-slate-400 text-center">Please create a new, strong password.</p>
                </div>

                <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-[0_10px_35px_0_rgba(100,100,150,0.15)] border border-white/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" htmlFor="new-password">New Password</label>
                            <div className="mt-1">
                                <input
                                    id="new-password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="block w-full appearance-none rounded-xl border-0 bg-slate-100/70 dark:bg-slate-700 px-4 py-3 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)] ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all outline-none"
                                />
                            </div>
                            {password && (
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="h-1.5 flex-1 rounded-full bg-slate-200 dark:bg-slate-600 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-300 ${strength <= 25 ? 'bg-red-500' :
                                                strength <= 50 ? 'bg-orange-500' :
                                                    strength <= 75 ? 'bg-yellow-500' : 'bg-green-500'
                                                }`}
                                            style={{ width: `${strength}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                        {strength <= 25 ? 'Weak' : strength <= 50 ? 'Fair' : strength <= 75 ? 'Good' : 'Strong'}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" htmlFor="confirm-password">Confirm New Password</label>
                            <div className="mt-1">
                                <input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="block w-full appearance-none rounded-xl border-0 bg-slate-100/70 dark:bg-slate-700 px-4 py-3 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)] ring-1 ring-inset ring-transparent focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all outline-none"
                                />
                            </div>
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
                                        Resetting...
                                    </>
                                ) : (
                                    'Reset Password'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                    Remembered it after all?{' '}
                    <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordContent />
        </Suspense>
    );
}
