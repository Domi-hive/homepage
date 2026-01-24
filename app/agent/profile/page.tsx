"use client";

import { useState } from "react";
import { Bell, MessageSquare, ChevronDown } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import ProfileTab from "@/components/agent/profile/ProfileTab";
import KYCTab from "@/components/agent/profile/KYCTab";
import WalletTab from "@/components/agent/profile/WalletTab";
import BusinessTab from "@/components/agent/profile/BusinessTab";

export default function AgentProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "kyc" | "wallet" | "business"
  >("profile");

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fff7ed] to-[#e3eeff] dark:from-[#1a1829] dark:to-[#1e294e] flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-top opacity-10 pointer-events-none z-0"
        style={{ backgroundImage: "url(/assets/full_page_background.png)" }}
      />
      <div className="relative z-10 px-10 pt-10 pb-6">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
              Profile Settings
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Manage your account information and preferences
            </p>
          </div>
          <div className="flex items-center gap-6 self-end md:self-auto">
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/agent/activity"
                className="w-6 h-[34px] border-none bg-transparent cursor-pointer flex items-center justify-center p-0 text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-6 h-6" />
              </Link>
              <ThemeToggle />
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Link href="/agent/profile">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity">
                  <span className="header-user-initials">U</span>
                </div>
              </Link>
              <div className="hidden md:flex flex-col">
                <div className="text-base font-semibold text-slate-900 leading-6">
                  User
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className="flex-1 overflow-y-auto px-10 pb-20 relative z-10">
        <div className="space-y-8">
          {/* Navigation Tabs */}
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-700/80 mb-6">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 ${
                activeTab === "profile"
                  ? "text-slate-800 dark:text-slate-100 border-purple-500"
                  : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("kyc")}
              className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 ${
                activeTab === "kyc"
                  ? "text-slate-800 dark:text-slate-100 border-purple-500"
                  : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              KYC Verification
            </button>
            <button
              onClick={() => setActiveTab("wallet")}
              className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 ${
                activeTab === "wallet"
                  ? "text-slate-800 dark:text-slate-100 border-purple-500"
                  : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              Wallet & Payments
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`px-4 py-3 text-sm font-semibold transition-all border-b-2 ${
                activeTab === "business"
                  ? "text-slate-800 dark:text-slate-100 border-purple-500"
                  : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              Business Details
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "kyc" && <KYCTab />}
          {activeTab === "wallet" && <WalletTab />}
          {activeTab === "business" && <BusinessTab />}
        </div>
      </div>
    </div>
  );
}
