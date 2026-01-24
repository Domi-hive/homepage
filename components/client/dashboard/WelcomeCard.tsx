import React, { useState } from "react";
// import { Plus } from 'lucide-react'; // Removed
import RequestFormDrawer from "./RequestFormDrawer";

// onOpenDrawer prop removed as button is moved to StatsCards
// interface WelcomeCardProps {
//     onOpenDrawer: () => void;
// }

export default function WelcomeCard() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Night";
  };

  return (
    <>
      <div className="bg-gradient-to-br from-orange-100/80 to-blue-100/80 border border-white/50 rounded-[32px] p-6 md:p-10 mb-10 flex flex-col md:flex-row md:items-center justify-between backdrop-blur-md gap-4 md:gap-0">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight md:leading-9 m-0 mb-4 md:mb-2 text-center md:text-left">
            {getGreeting()}, User! 👋
          </h2>

          {/* Mobile Layout: Question Only */}
          <div className="md:hidden">
            <p className="text-sm text-slate-600 leading-tight m-0">
              Looking for anything new today?
            </p>
          </div>

          {/* Desktop Layout: Question Only */}
          <p className="hidden md:block text-base text-slate-600 leading-6 m-0">
            Looking for anything new today?
          </p>
        </div>

        {/* Desktop Button Removed */}
      </div>

      {/* Drawer moved to parent */}
    </>
  );
}
