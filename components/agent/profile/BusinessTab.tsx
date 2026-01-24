"use client";

import { Info, Briefcase, CloudUpload } from "lucide-react";

export default function BusinessTab() {
  return (
    <div className="space-y-8">
      {/* Info Banner */}
      <div className="bg-gradient-to-r from-purple-100/50 to-blue-100/50 dark:from-purple-900/30 dark:to-blue-900/30 p-5 rounded-xl border border-purple-200/50 dark:border-purple-800/50 flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-white/50 dark:bg-slate-800/50 flex items-center justify-center">
          <Info className="text-[#0F172A] dark:text-purple-400 w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white">
            Optional - Add Business Information
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Providing your business details can help build more trust with
            clients.
          </p>
        </div>
      </div>

      {/* Business Information Card */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="text-[#0F172A] dark:text-slate-400 w-6 h-6" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Business Information
          </h2>
        </div>
        <form className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1"
              htmlFor="business-name"
            >
              Business Name
            </label>
            <input
              className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0F172A]/50 focus:border-[#0F172A] outline-none text-slate-900 dark:text-white"
              id="business-name"
              placeholder="Enter your registered business name"
              type="text"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1"
              htmlFor="business-address"
            >
              Business Address
            </label>
            <input
              className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0F172A]/50 focus:border-[#0F172A] outline-none text-slate-900 dark:text-white"
              id="business-address"
              placeholder="Enter your business address"
              type="text"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1"
              htmlFor="rc-number"
            >
              RC Number
            </label>
            <input
              className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0F172A]/50 focus:border-[#0F172A] outline-none text-slate-900 dark:text-white"
              id="rc-number"
              placeholder="Enter your CAC registration number"
              type="text"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2"
              htmlFor="cac-document"
            >
              CAC Document Upload
            </label>
            <div className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer">
              <div className="text-center">
                <CloudUpload className="mx-auto h-10 w-10 text-[#0F172A] dark:text-purple-400 mb-2" />
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  PDF, PNG, JPG (max. 5MB)
                </p>
              </div>
              <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="cac-document"
                type="file"
              />
            </div>
          </div>
          <div className="pt-2 flex justify-start">
            <button
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-slate-900/20"
              type="submit"
            >
              Save Business Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
