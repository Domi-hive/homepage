import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { ThemeToggle } from "@/components/theme-toggle"

export default function RequestsHeader() {
    return (
        <header className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 leading-8 m-0">Requests</h1>
                <p className="text-base text-slate-600 leading-6 m-0">Manage your property search requests</p>
            </div>
            <div className="flex items-center gap-6">
                <button type="button" className="w-6 h-[34px] border-none bg-transparent cursor-pointer flex items-center justify-center p-0 text-slate-600 hover:text-slate-900 transition-colors" aria-label="Notifications">
                    <Bell className="w-6 h-6" />
                </button>
                <ThemeToggle />
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-base">
                        <span className="header-user-initials">U</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-base font-semibold text-slate-900 leading-6">User</div>
                        <div className="text-xs text-slate-500 leading-4">Tenant</div>
                    </div>
                    <button type="button" className="w-6 h-[34px] border-none bg-transparent cursor-pointer flex items-center justify-center p-0 text-slate-600 hover:text-slate-900 transition-colors" aria-label="User menu">
                        <ChevronDown className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
