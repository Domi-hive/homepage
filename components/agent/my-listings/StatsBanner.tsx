import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function StatsBanner() {
    return (
        <div className="bg-orange-100/60 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 p-4 rounded-xl flex items-center gap-3 border border-orange-200/50 dark:border-orange-800/50 mb-6">
            <AlertTriangle className="w-6 h-6" />
            <p className="text-sm font-medium">
                You have 3 listings that haven't been updated in over 24 hours. Stale listing can't be added to responses and won't be recommended to clients.
            </p>
            <button className="ml-auto font-bold text-sm text-orange-800 dark:text-orange-200 hover:underline">
                Update Now
            </button>
        </div>
    );
}
