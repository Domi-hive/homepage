"use client"

import React from 'react';
import RequestsHeader from '@/components/client/requests/RequestsHeader';
import ActiveRequestCard from '@/components/client/requests/ActiveRequestCard';
import InfoBanner from '@/components/client/requests/InfoBanner';
import RequestHistory from '@/components/client/requests/RequestHistory';

export default function ClientRequests() {
  return (
    <div
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-75 pointer-events-none z-0"
        style={{ backgroundImage: 'url(/assets/full_page_background.png)' }}
      />

      <main className="relative z-10 p-10 h-full overflow-y-auto">
        <RequestsHeader />
        <div className="flex flex-col gap-8">
          <ActiveRequestCard />
          <InfoBanner />
          <RequestHistory />
        </div>
      </main>
    </div>
  );
}
