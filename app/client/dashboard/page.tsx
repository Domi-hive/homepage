"use client";

import React from "react";
import ClientHeader from "@/components/client/ClientHeader";
import WelcomeCard from "@/components/client/dashboard/WelcomeCard";
import StatsCards from "@/components/client/dashboard/StatsCards";
import MatchedProperties from "@/components/client/dashboard/MatchedProperties";

import { useState } from "react";
import RequestFormDrawer from "@/components/client/dashboard/RequestFormDrawer";

import { requestService } from "@/services/request.service";

export default function ClientDashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [requestCount, setRequestCount] = useState<number | null>(null);

  const fetchRequestStats = async () => {
    try {
      const requests = await requestService.getUserRequests();
      if (Array.isArray(requests)) {
        setRequestCount(requests.length);
      }
    } catch (error: any) {
      if (
        error.message?.includes("Unauthorized") ||
        error.message?.includes("401")
      ) {
        setRequestCount(0);
        return;
      }
      console.error("Failed to fetch stats", error);
    }
  };

  React.useEffect(() => {
    fetchRequestStats();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fff7ed] to-[#e3eeff] flex flex-col">
      <div
        className="fixed inset-0 bg-cover bg-top opacity-10 pointer-events-none z-0"
        style={{ backgroundImage: "url(/assets/full_page_background.png)" }}
      />

      <div className="hidden md:block relative z-10 px-4 md:px-10 pt-6 md:pt-10 pb-0">
        <ClientHeader
          title="Dashboard"
          subtitle="Welcome back to your property hub"
        />
      </div>

      <div className="flex flex-1 overflow-hidden relative z-10">
        <main className="flex-1 h-full overflow-y-auto flex flex-col">
          <div className="px-4 md:px-10 pb-[50px] pt-[30px] space-y-6">
            <WelcomeCard />
            <StatsCards
              requestCount={requestCount}
              onOpenDrawer={() => setIsDrawerOpen(true)}
            />
            <MatchedProperties />
          </div>

          <RequestFormDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onSuccess={fetchRequestStats}
          />
        </main>
      </div>
    </div>
  );
}
