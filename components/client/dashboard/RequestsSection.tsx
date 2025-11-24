import React from 'react';
import { MoreVertical } from 'lucide-react';

const requests = [
    {
        id: 1,
        user: {
            name: 'Sarah Johnson',
            avatar: 'https://i.pravatar.cc/44?img=4',
        },
        date: '2/16/2024',
        type: 'DUPLEX',
        title: 'Find 3-Bedroom Duplex',
        description: 'In Maitama area, modern design',
    },
];

export default function RequestsSection() {
    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 leading-8 m-0">Your Requests</h2>
                <a href="#" className="text-sm font-semibold text-purple-600 no-underline transition-colors hover:text-purple-800">
                    See all
                </a>
            </div>

            <div className="flex flex-col gap-4">
                {requests.map((request) => (
                    <div key={request.id} className="bg-white/60 border border-white/50 rounded-[32px] p-5 flex items-center gap-5 backdrop-blur-md">
                        <div className="flex items-center gap-3 shrink-0">
                            <img
                                src={request.user.avatar}
                                alt={request.user.name}
                                className="w-11 h-11 rounded-full object-cover"
                            />
                            <div className="flex flex-col">
                                <div className="text-base font-semibold text-slate-900 leading-6 mb-0.5">{request.user.name}</div>
                                <div className="text-sm text-slate-600 leading-5">{request.date}</div>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center gap-4">
                            <span className="inline-block px-3 py-1.5 bg-purple-100 rounded-full text-xs font-bold text-purple-700 leading-4 shrink-0">{request.type}</span>
                            <div className="flex-1">
                                <h3 className="text-base font-semibold text-slate-900 leading-6 m-0 mb-0.5">{request.title}</h3>
                                <p className="text-sm text-slate-600 leading-5 m-0">{request.description}</p>
                            </div>
                        </div>
                        <button type="button" className="w-6 h-[33px] border-none bg-transparent cursor-pointer flex items-center justify-center text-xl text-slate-600 shrink-0 transition-colors hover:text-slate-900" aria-label="More options">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
