import React from "react";
import { ClipboardList, Calendar, Plus } from "lucide-react";
import Link from "next/link";
import { requestService } from "@/services/request.service";
import { useEffect, useState } from "react";

interface StatsCardsProps {
  activeRequest: any | null; // Using any for now based on API response structure flexibility
  onOpenDrawer: () => void;
}

export default function StatsCards({
  activeRequest,
  onOpenDrawer,
}: StatsCardsProps) {
  const formatBudget = (min: number | string, max: number | string) => {
    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    });
    return `${formatter.format(Number(min))} - ${formatter.format(Number(max))}`;
  };

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-5 mb-10">
      <div className="bg-white/60 border border-white/50 rounded-[20px] md:rounded-[32px] p-4 md:p-6 backdrop-blur-md h-full flex flex-col justify-between">
        <div className="flex items-start justify-between mb-3 md:mb-5">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-xs md:text-base font-medium text-slate-600 leading-tight md:leading-6 m-0 mb-1 md:mb-2 truncate">
              Active Request
            </h3>
            <div className="text-lg md:text-xl font-bold text-slate-900 leading-tight md:leading-8">
              {/* If activeRequest is explicitly null, show loading/empty logic, here assuming null check passed from parent or handled */}
              {activeRequest ? (
                <div className="flex flex-col gap-1">
                  <span className="truncate">
                    {activeRequest.bedrooms || "Any"} Bed{" "}
                    {activeRequest.propertyType || "Property"}
                  </span>
                  <span className="text-xs md:text-sm font-normal text-slate-500 truncate">
                    {activeRequest.locations?.[0] ||
                      activeRequest.location ||
                      "Lagos"}
                  </span>
                </div>
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
        {activeRequest ? (
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
