"use client"

import React from 'react';
import ClientHeader from '@/components/client/ClientHeader';
import WelcomeCard from '@/components/client/dashboard/WelcomeCard';
import StatsCards from '@/components/client/dashboard/StatsCards';
import MatchedProperties from '@/components/client/dashboard/MatchedProperties';
import RequestsSection from '@/components/client/dashboard/RequestsSection';

export default function ClientDashboard() {
  return (
    <div
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff] flex flex-col"
    >
      <div
        className="absolute inset-0 bg-cover bg-top opacity-75 pointer-events-none z-0"
        style={{ backgroundImage: 'url(/assets/full_page_background.png)' }}
      />

      <div className="relative z-10 px-4 md:px-10 pt-6 md:pt-10 pb-6">
        <ClientHeader
          title="Dashboard"
          subtitle="Welcome back to your property hub"
        />
      </div>

      <div className="flex flex-1 overflow-hidden relative z-10">
        <main className="flex-1 h-full overflow-y-auto flex flex-col">
          <div className="px-4 md:px-10 pb-20 pt-2 space-y-6">
            <WelcomeCard />
            <StatsCards />
            <MatchedProperties />
            <RequestsSection />
          </div>
        </main>
      </div>
    </div>
  );
}
