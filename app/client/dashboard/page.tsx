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
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-75 pointer-events-none z-0"
        style={{ backgroundImage: 'url(/assets/full_page_background.png)' }}
      />

      <main className="relative z-10 p-10 h-full overflow-y-auto">
        <ClientHeader
          title="Dashboard"
          subtitle="Welcome back to your property hub"
        />
        <WelcomeCard />
        <StatsCards />
        <MatchedProperties />
        <RequestsSection />
      </main>
    </div>
  );
}
