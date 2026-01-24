"use client";

import { useState } from "react";
import {
  MapPin,
  ChevronDown,
  Navigation,
  Phone,
  CheckCircle,
  Star,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface InspectionRowProps {
  inspection: {
    id: number;
    clientName: string;
    clientImage: string | null;
    propertiesCount: number;
    price: string;
    rating: number;
    meetingPoint: string;
    meetingTime: string;
    location: string;
    status: string;
    properties: Array<{
      id: string;
      title: string;
      location: string;
      price: string;
      image: string | null;
    }>;
  };
  isArrived: boolean;
  onArrive: (id: number) => void;
  onComplete: (inspection: any) => void;
  onViewProperty: (property: any) => void;
}

export default function InspectionRow({
  inspection,
  isArrived,
  onArrive,
  onComplete,
  onViewProperty,
}: InspectionRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl shadow-[0_4px_16px_0_rgba(100,100,150,0.1)] border border-white/50 dark:border-white/10 overflow-hidden transition-all my-4">
      {/* Main Row - Clickable to toggle expand */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/40 dark:hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-6 flex-1 min-w-0">
          {/* Client Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm shrink-0 overflow-hidden">
              {inspection.clientImage ? (
                <img
                  src={inspection.clientImage}
                  alt={inspection.clientName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-6 h-6 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-800 dark:text-white truncate">
                {inspection.clientName}
              </h3>
            </div>
          </div>

          {/* Meeting Info (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300 flex-1">
            <div className="flex items-center gap-1.5 min-w-[120px]">
              <MapPin className="h-4 w-4 text-slate-400" />
              <span className="truncate">{inspection.meetingPoint}</span>
            </div>
            <Badge
              variant="outline"
              className="bg-coral/10 text-coral border-coral/20 dark:bg-coral/20 dark:text-coral dark:border-coral/30 font-bold px-2 py-0.5 shrink-0"
            >
              {inspection.propertiesCount} Propert
              {inspection.propertiesCount > 1 ? "ies" : "y"}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4 ml-2">
          {/* Chevron */}
          <div
            className={`p-1 rounded-full transition-transform duration-200 ${
              isExpanded ? "rotate-180 bg-slate-100 dark:bg-slate-800" : ""
            }`}
          >
            <ChevronDown className="h-5 w-5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-white/5 p-6 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-6">
            {/* Quick Actions & Mobile Details */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div className="md:hidden space-y-2 w-full">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>{inspection.meetingPoint}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="gap-2 bg-white hover:bg-slate-100 text-slate-600 border-slate-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">Call Client</span>
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 bg-white hover:bg-slate-100 text-slate-600 border-slate-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Navigation className="w-4 h-4" />
                  <span className="hidden sm:inline">Navigate</span>
                </Button>
              </div>
            </div>

            {/* Properties Horizontal List */}
            <div>
              <p className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-3">
                Properties to Inspect ({inspection.properties?.length || 0})
              </p>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {inspection.properties &&
                  inspection.properties.map((property) => (
                    <div
                      key={property.id}
                      key={property.id}
                      onClick={() => onViewProperty(property)}
                      className="flex-none w-72 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col snap-start cursor-pointer transition-transform hover:scale-[1.02]"
                    >
                      <div className="h-32 bg-slate-200 relative">
                        <img
                          alt={property.title}
                          className="w-full h-full object-cover"
                          src={property.image || "/placeholder.svg"}
                        />
                        {property.price && (
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-800 shadow-sm">
                            {property.price}
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="font-bold text-slate-800 dark:text-white text-sm truncate">
                          {property.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1 truncate">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{property.location}</span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Main Action Buttons (Bottom Right) */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onArrive(inspection.id);
                }}
                className={`px-5 font-bold shadow-md transition-all gap-2 ${
                  isArrived
                    ? "bg-green-100 text-green-700 shadow-none border border-green-200 hover:bg-green-200"
                    : "bg-[#FF7F50] text-white hover:bg-[#FF7F50]/90"
                }`}
              >
                {isArrived ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Arrived
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4" /> I've Arrived
                  </>
                )}
              </Button>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onComplete(inspection);
                }}
                className="bg-[#0F172A] text-white font-bold shadow-lg shadow-slate-900/20 hover:bg-[#0F172A]/90 gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Complete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
