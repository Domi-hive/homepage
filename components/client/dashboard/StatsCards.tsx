import React from "react";
import { ClipboardList, Calendar, Plus } from "lucide-react";
import Link from "next/link";
import { requestService } from "@/services/request.service";
import { useEffect, useState } from "react";

interface StatsCardsProps {
  requestCount: number | null;
  onOpenDrawer: () => void;
}

export default function StatsCards({
  requestCount,
  onOpenDrawer,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-5 mb-10">
      <div className="bg-white/60 border border-white/50 rounded-[20px] md:rounded-[32px] p-4 md:p-6 backdrop-blur-md h-full flex flex-col justify-between">
        <div className="flex items-start justify-between mb-3 md:mb-5">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-xs md:text-base font-medium text-slate-600 leading-tight md:leading-6 m-0 mb-1 md:mb-2 truncate">
              Active Requests
            </h3>
            <div className="text-lg md:text-2xl font-bold text-slate-900 leading-tight md:leading-8">
              {requestCount === null ? (
                <div className="h-6 md:h-8 w-16 bg-slate-200 rounded animate-pulse" />
              ) : requestCount > 0 ? (
                requestCount
              ) : (
                <div className="flex flex-col items-start gap-1">
                  <span className="text-sm font-normal text-slate-500">
                    No active request
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br from-orange-100 to-red-100">
            <ClipboardList className="w-4 h-4 md:w-6 md:h-6 text-slate-700" />
          </div>
        </div>
        {requestCount === null ? (
          <div className="h-5 w-24 bg-slate-200 rounded animate-pulse" />
        ) : requestCount > 0 ? (
          <Link
            href="/client/requests?tab=active"
            className="text-xs md:text-sm font-semibold text-[#F59E0B] no-underline inline-block transition-colors hover:text-[#D97706]"
          >
            View details →
          </Link>
        ) : (
          <button
            onClick={onOpenDrawer}
            className="mt-2 w-full bg-coral shadow-md shadow-coral/20 border-none rounded-xl px-3 py-2 text-white text-xs md:text-sm font-semibold cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-200 hover:shadow-coral/40 hover:-translate-y-0.5 hover:bg-coral-hover"
          >
            <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>Create Request</span>
          </button>
        )}
      </div>

      <div className="bg-white/60 border border-white/50 rounded-[20px] md:rounded-[32px] p-4 md:p-6 backdrop-blur-md h-full flex flex-col justify-between">
        <div className="flex items-start justify-between mb-3 md:mb-5">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-xs md:text-base font-medium text-slate-600 leading-tight md:leading-6 m-0 mb-1 md:mb-2 truncate">
              Next inspection
            </h3>
            <div className="text-lg md:text-2xl font-bold text-slate-900 leading-tight md:leading-8">
              Wed, 2 PM
            </div>
          </div>
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br from-slate-100 to-slate-200">
            <Calendar className="w-4 h-4 md:w-6 md:h-6 text-slate-700" />
          </div>
        </div>
        <Link
          href="/client/inspections?tab=upcoming"
          className="text-xs md:text-sm font-semibold text-[#F59E0B] no-underline inline-block transition-colors hover:text-[#D97706]"
        >
          See details →
        </Link>
      </div>
    </div>
  );
}
