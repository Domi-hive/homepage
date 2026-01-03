'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';

interface ActiveRequestCardProps {
    request: {
        id: string;
        cities?: string[];
        locations?: string[];  // fallback field name
        state?: string;
        minPrice?: number;
        maxPrice?: number;
        bedrooms?: number;
        bathrooms?: number;
        createdAt: string;
        responseCount?: number;
        propertyCount?: number;
        activeQAs?: number;
    };
}

export default function ActiveRequestCard({ request }: ActiveRequestCardProps) {
    // Build location string
    const locationList = request.cities || request.locations || [];
    const locationString = locationList.length > 0
        ? locationList.join(', ')
        : request.state || 'Unknown location';

    // Build budget string
    const formatPrice = (price: number) => {
        if (price >= 1000000) {
            return `₦${(price / 1000000).toFixed(1)}M`;
        }
        return `₦${price.toLocaleString()}`;
    };

    const budgetString = request.minPrice && request.maxPrice
        ? `${formatPrice(request.minPrice)} - ${formatPrice(request.maxPrice)}`
        : 'Any budget';

    // Build bedroom string
    const bedroomString = request.bedrooms
        ? `${request.bedrooms} bed`
        : '';

    // Build title
    const title = [bedroomString, `in ${locationString}`].filter(Boolean).join(' ') +
        ` | Budget: ${budgetString}`;

    // Calculate time ago
    const getTimeAgo = (dateString: string) => {
        const created = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - created.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) return `Created ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        if (diffHours > 0) return `Created ${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffMins > 0) return `Created ${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        return 'Created just now';
    };

    const stats = [
        { value: String(request.responseCount ?? 0), label: 'Responses' },
        { value: String(request.propertyCount ?? 0), label: 'Properties' },
        { value: String(request.activeQAs ?? 0), label: 'Active Q&As' },
    ];

    return (
        <div className="bg-white/60 border border-white/50 rounded-[32px] p-6 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
                <div className="relative w-3 h-3 flex items-center justify-center">
                    <div className="absolute w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></div>
                    <div className="relative w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-sm font-bold text-green-600 uppercase tracking-wider m-0">Active Request</p>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 leading-8 m-0 mb-2">
                {title}
            </h2>
            <p className="flex items-center gap-2 text-sm text-slate-600 leading-5 m-0 mb-6">
                <Clock className="w-4 h-4" />
                {getTimeAgo(request.createdAt)}
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-white/50 rounded-2xl border border-white/50">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col gap-1">
                        <p className="text-xl md:text-2xl font-bold text-slate-900 leading-8 m-0">{stat.value}</p>
                        <p className="text-[10px] md:text-xs font-medium text-slate-500 uppercase tracking-wide m-0">{stat.label}</p>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
                <Link href={`/client/requests/${request.id}/responses`} className="bg-gradient-to-br from-purple-500 to-blue-500 border-none rounded-xl px-6 py-3 text-white text-base font-semibold cursor-pointer flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/30">
                    <span>View Responses</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
                <button type="button" className="bg-white border border-slate-200 rounded-xl px-6 py-3 text-slate-700 text-base font-medium cursor-pointer transition-colors hover:bg-slate-50 hover:text-slate-900">
                    Edit
                </button>
                <button type="button" className="bg-white border border-slate-200 rounded-xl px-6 py-3 text-slate-700 text-base font-medium cursor-pointer transition-colors hover:bg-slate-50 hover:text-slate-900">
                    Archive
                </button>
            </div>
        </div>
    );
}
