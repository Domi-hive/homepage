"use client";

import { Bell, Shield, User } from "lucide-react";

export default function ProfileTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Profile Picture Card */}
      <div className="col-span-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10 flex flex-col items-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 self-start">
          Profile Picture
        </h2>
        <div className="w-40 h-40 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 mb-6">
          <User className="w-20 h-20 fill-current" />
        </div>
        <button className="bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold py-2 px-5 rounded-lg transition-colors shadow-sm w-full border border-slate-200 dark:border-slate-700">
          Change Photo
        </button>
      </div>

      {/* Personal Information Card */}
      <div className="col-span-1 lg:col-span-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
          Personal Information
        </h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1"
                htmlFor="first-name"
              >
                First Name
              </label>
              <input
                className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0F172A]/50 focus:border-[#0F172A] outline-none transition-all"
                id="first-name"
                type="text"
                defaultValue="User"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1"
                htmlFor="last-name"
              >
                Last Name
              </label>
              <input
                className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0F172A]/50 focus:border-[#0F172A] outline-none transition-all"
                id="last-name"
                type="text"
                defaultValue="Name"
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0F172A]/50 focus:border-[#0F172A] outline-none transition-all"
              id="email"
              type="email"
              defaultValue="user.name@example.com"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0F172A]/50 focus:border-[#0F172A] outline-none transition-all"
              id="phone"
              type="tel"
              defaultValue="+234 802 123 4567"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0F172A]/50 focus:border-[#0F172A] outline-none transition-all"
              id="location"
              type="text"
              defaultValue="Abuja, Nigeria"
            />
          </div>
          <div className="pt-2">
            <button
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-slate-900/20"
              type="submit"
            >
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences Card */}
      <div className="col-span-1 lg:col-span-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-[#0F172A] dark:text-slate-400 w-6 h-6" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Notification Preferences
          </h2>
        </div>
        <div className="space-y-5">
          <label className="flex items-start justify-between cursor-pointer group">
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-200">
                New Client Requests
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Get notified about new requests from potential clients
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded border-slate-300 text-[#0F172A] focus:ring-[#0F172A] cursor-pointer"
            />
          </label>
          <label className="flex items-start justify-between cursor-pointer group">
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-200">
                Inspection Confirmations
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Receive notifications when clients confirm an inspection
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded border-slate-300 text-[#0F172A] focus:ring-[#0F172A] cursor-pointer"
            />
          </label>
          <label className="flex items-start justify-between cursor-pointer group">
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-200">
                Earnings Updates
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Get notified when you receive payments
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded border-slate-300 text-[#0F172A] focus:ring-[#0F172A] cursor-pointer"
            />
          </label>
          <label className="flex items-start justify-between cursor-pointer group">
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-200">
                Marketing Emails
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Receive updates about new features and promotions
              </p>
            </div>
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-slate-300 text-[#0F172A] focus:ring-[#0F172A] cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Security Card */}
      <div className="col-span-1 lg:col-span-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-[#0F172A] dark:text-slate-400 w-6 h-6" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Security
          </h2>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label
              className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1"
              htmlFor="current-password"
            >
              Current Password
            </label>
            <input
              className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0F172A]/50 focus:border-[#0F172A] outline-none transition-all"
              id="current-password"
              type="password"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1"
              htmlFor="new-password"
            >
              New Password
            </label>
            <input
              className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0F172A]/50 focus:border-[#0F172A] outline-none transition-all"
              id="new-password"
              type="password"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1"
              htmlFor="confirm-password"
            >
              Confirm New Password
            </label>
            <input
              className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0F172A]/50 focus:border-[#0F172A] outline-none transition-all"
              id="confirm-password"
              type="password"
            />
          </div>
          <div className="md:col-start-3">
            <button
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold py-3 w-full rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-slate-900/20"
              type="submit"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
