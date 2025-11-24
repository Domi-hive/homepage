import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const historyItems = [
    {
        id: 1,
        title: '3-bed in Ikoyi, Lekki',
        details: 'Completed on Jan 15, 2025  •  5 agents responded  •  2 inspection completed',
    },
    {
        id: 2,
        title: '2-bed in Victoria Island',
        details: 'Completed on Dec 28, 2024  •  3 agents responded  •  1 inspection completed',
    },
    {
        id: 3,
        title: '4-bed in Banana Island',
        details: 'Completed on Dec 10, 2024  •  2 agents responded  •  0 inspection completed',
    },
];

export default function RequestHistory() {
    return (
        <div className="mt-8">
            <h3 className="text-lg font-bold text-slate-900 leading-7 m-0 mb-4">Request History (3)</h3>
            <div className="flex flex-col gap-4">
                {historyItems.map((item) => (
                    <div key={item.id} className="bg-white/40 border border-white/50 rounded-2xl p-4 flex items-center justify-between transition-colors hover:bg-white/60">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                <Check className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-base font-semibold text-slate-900 leading-6 m-0 mb-0.5">{item.title}</p>
                                <p className="text-sm text-slate-500 leading-5 m-0">{item.details}</p>
                            </div>
                        </div>
                        <a href="#" className="flex items-center gap-2 text-sm font-semibold text-slate-600 no-underline transition-colors hover:text-purple-600 group">
                            <span>View</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
