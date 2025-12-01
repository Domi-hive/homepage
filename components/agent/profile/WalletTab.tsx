"use client";

import { Wallet, History } from 'lucide-react';

export default function WalletTab() {
    return (
        <div className="space-y-8">
            {/* Bank Account Details Card */}
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10">
                <div className="flex items-center gap-3 mb-6">
                    <Wallet className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Bank Account Details</h2>
                </div>
                <form className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="bank-name">Bank Name</label>
                        <select
                            className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none appearance-none text-slate-900 dark:text-white"
                            id="bank-name"
                        >
                            <option>Select Bank</option>
                            <option>Zenith Bank</option>
                            <option>Guaranty Trust Bank</option>
                            <option>First Bank</option>
                            <option>Access Bank</option>
                        </select>
                    </div>
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="account-number">Account Number</label>
                        <input
                            className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none text-slate-900 dark:text-white"
                            id="account-number"
                            placeholder="Enter account number"
                            type="text"
                        />
                    </div>
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="account-name">Account Name</label>
                        <input
                            className="w-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                            disabled
                            id="account-name"
                            placeholder="Auto-filled after verification"
                            readOnly
                            type="text"
                            defaultValue="User Name"
                        />
                    </div>
                    <div className="md:col-start-3">
                        <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white font-semibold py-3 w-full rounded-xl flex items-center justify-center gap-2 transition-opacity shadow-lg shadow-purple-500/30" type="submit">
                            Add/Update Account
                        </button>
                    </div>
                </form>
            </div>

            {/* Transaction History Card */}
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10">
                <div className="flex items-center gap-3 mb-6">
                    <History className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Transaction History</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-100/50 dark:bg-slate-800/50">
                            <tr>
                                <th className="px-6 py-4 font-semibold rounded-l-lg" scope="col">Date</th>
                                <th className="px-6 py-4 font-semibold" scope="col">Description</th>
                                <th className="px-6 py-4 font-semibold text-right" scope="col">Amount</th>
                                <th className="px-6 py-4 font-semibold text-center rounded-r-lg" scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-200/50 dark:border-slate-800/50">
                                <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">Aug 15, 2023</td>
                                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">Payout for property inspection</td>
                                <td className="px-6 py-4 font-semibold text-right text-green-600 dark:text-green-400">+ ₦50,000.00</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">
                                        Completed
                                    </span>
                                </td>
                            </tr>
                            <tr className="border-b border-slate-200/50 dark:border-slate-800/50">
                                <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">Aug 10, 2023</td>
                                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">Partial compensation for client no-show</td>
                                <td className="px-6 py-4 font-semibold text-right text-green-600 dark:text-green-400">+ ₦15,000.00</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">
                                        Completed
                                    </span>
                                </td>
                            </tr>
                            <tr className="border-b border-slate-200/50 dark:border-slate-800/50">
                                <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">Aug 05, 2023</td>
                                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">Dispute settlement payout</td>
                                <td className="px-6 py-4 font-semibold text-right text-green-600 dark:text-green-400">+ ₦25,000.00</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">
                                        Completed
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">Jul 28, 2023</td>
                                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">Payout for property inspection</td>
                                <td className="px-6 py-4 font-semibold text-right text-green-600 dark:text-green-400">+ ₦75,500.00</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">
                                        Completed
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
