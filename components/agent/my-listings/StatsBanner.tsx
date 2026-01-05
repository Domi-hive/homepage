import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface StatsBannerProps {
    staleCount: number;
    onUpdateStale?: () => void;
}

export default function StatsBanner({ staleCount, onUpdateStale }: StatsBannerProps) {
    // Don't show banner if no stale listings
    if (staleCount === 0) return null;

    return (
        <div className="bg-orange-100/60 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 p-4 rounded-xl flex items-center gap-3 border border-orange-200/50 dark:border-orange-800/50 mb-6">
            <AlertTriangle className="w-6 h-6" />
            <p className="text-sm font-medium">
                You have {staleCount} listing{staleCount !== 1 ? 's' : ''} that {staleCount !== 1 ? "haven't" : "hasn't"} been updated in over 24 hours. Stale listings can't be added to responses and won't be recommended to clients.
            </p>
            {onUpdateStale && (
                <button
                    onClick={onUpdateStale}
                    className="ml-auto font-bold text-sm text-orange-800 dark:text-orange-200 hover:underline"
                >
                    Update Now
                </button>
            )}
        </div>
    );
}
