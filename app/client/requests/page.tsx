"use client"

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ClientHeader from '@/components/client/ClientHeader';
import ActiveRequestCard from '@/components/client/requests/ActiveRequestCard';
import InfoBanner from '@/components/client/requests/InfoBanner';
import RequestHistory from '@/components/client/requests/RequestHistory';
import EmptyRequestsCard from '@/components/client/requests/EmptyRequestsCard';
import RequestFormDrawer from '@/components/client/dashboard/RequestFormDrawer';
import { requestService } from '@/services/request.service';
import { Loader2 } from 'lucide-react';

function ClientRequestsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  let initialTab: 'active' | 'history' = 'active';
  if (tabParam === 'history') initialTab = 'history';

  const [activeTab, setActiveTab] = useState<'active' | 'history'>(initialTab);
  const [activeRequests, setActiveRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  React.useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requests = await requestService.getUserRequests();
        // Assuming getUserRequests returns active requests or we filter them
        // For now, we use the responses as is
        setActiveRequests(Array.isArray(requests) ? requests : []);
      } catch (error) {
        console.error('Failed to fetch requests', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff] flex flex-col"
    >
      <div
        className="absolute inset-0 bg-cover bg-top opacity-75 pointer-events-none z-0"
        style={{ backgroundImage: 'url(/assets/full_page_background.png)' }}
      />

      <div className="hidden md:block relative z-10 px-4 md:px-10 pt-6 md:pt-10 pb-0">
        <ClientHeader
          title="Requests"
          subtitle="Manage your property search requests"
        />
      </div>

      <div className="flex flex-1 overflow-hidden relative z-10">
        <main className="flex-1 h-full overflow-y-auto flex flex-col">
          <div className="px-4 md:px-10 pb-[50px] pt-2 space-y-6">
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
                  Archive
                </button>
              </div>

              {activeTab === 'active' && (
                <div className="flex flex-col gap-8">
                  {isLoading ? (
                    <div className="flex justify-center p-10">
                      <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                    </div>
                  ) : activeRequests.length > 0 ? (
                    <>
                      <ActiveRequestCard />
                      <InfoBanner />
                    </>
                  ) : (
                    <EmptyRequestsCard onCreateRequest={() => setIsDrawerOpen(true)} />
                  )}
                </div>
              )}

              {activeTab === 'history' && (
                <RequestHistory />
              )}
            </div>

            <RequestFormDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ClientRequests() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientRequestsContent />
    </Suspense>
  );
}
