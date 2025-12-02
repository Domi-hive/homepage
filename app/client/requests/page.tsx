"use client"

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ClientHeader from '@/components/client/ClientHeader';
import ActiveRequestCard from '@/components/client/requests/ActiveRequestCard';
import InfoBanner from '@/components/client/requests/InfoBanner';
import RequestHistory from '@/components/client/requests/RequestHistory';

export default function ClientRequests() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  let initialTab: 'active' | 'history' = 'active';
  if (tabParam === 'history') initialTab = 'history';

  const [activeTab, setActiveTab] = useState<'active' | 'history'>(initialTab);

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff]"
    >
      <div
        className="absolute inset-0 bg-cover bg-top opacity-75 pointer-events-none z-0"
        style={{ backgroundImage: 'url(/assets/full_page_background.png)' }}
      />

      <main className="relative z-10 p-10 h-full overflow-y-auto">
        <ClientHeader
          title="Requests"
          subtitle="Manage your property search requests"
        />

        <div className="space-y-8">
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-700/80">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-3 font-medium transition-colors ${activeTab === 'active'
                ? 'text-slate-800 dark:text-slate-100 font-semibold border-b-2 border-purple-500'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-3 font-medium transition-colors ${activeTab === 'history'
                ? 'text-slate-800 dark:text-slate-100 font-semibold border-b-2 border-purple-500'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
            >
              History
            </button>
          </div>

          {activeTab === 'active' && (
            <div className="flex flex-col gap-8">
              <ActiveRequestCard />
              <InfoBanner />
            </div>
          )}

          {activeTab === 'history' && (
            <RequestHistory />
          )}
        </div>
      </main>
    </div>
  );
}
