import React from 'react';
import { Info } from 'lucide-react';

export default function InfoBanner() {
    return (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-700 leading-5 m-0">
                You can only have one active request at a time. Complete or archive your current request to
                start a new one.
            </p>
        </div>
    );
}
