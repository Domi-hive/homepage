import React from "react";
import Link from "next/link";
import { Bell, Settings, ChevronDown, User } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between mb-10">
      <h1 className="text-4xl font-bold text-slate-900 m-0 leading-10">
        Dashboard
      </h1>
      <div className="flex items-center gap-6">
        <Link
          href="/client/activity"
          className="w-6 h-[34px] border-none bg-transparent cursor-pointer flex items-center justify-center p-0 text-slate-600 hover:text-slate-900 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6" />
        </Link>
        <button
          type="button"
          className="w-6 h-[34px] border-none bg-transparent cursor-pointer flex items-center justify-center p-0 text-slate-600 hover:text-slate-900 transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <Link
            href="/client/profile"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-300 transition-colors">
              <User className="w-6 h-6 fill-current" />
            </div>
            <div className="flex flex-col">
              <div className="text-base font-semibold text-slate-900 leading-6">
                User
              </div>
              <div className="text-xs text-slate-500 leading-4">Tenant</div>
            </div>
          </Link>
          <button
            type="button"
            className="w-6 h-[34px] border-none bg-transparent cursor-pointer flex items-center justify-center p-0 text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="User menu"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
