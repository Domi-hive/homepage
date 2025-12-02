import React, { useState } from 'react';
import { Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

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
    {
        id: 4,
        title: '5-bed Duplex in Maitama',
        details: 'Completed on Nov 22, 2024  •  4 agents responded  •  1 inspection completed',
    },
    {
        id: 5,
        title: '3-bed Apartment in Wuse II',
        details: 'Completed on Nov 15, 2024  •  6 agents responded  •  3 inspection completed',
    },
    {
        id: 6,
        title: '4-bed Terrace in Gwarinpa',
        details: 'Completed on Oct 30, 2024  •  2 agents responded  •  1 inspection completed',
    },
    {
        id: 7,
        title: '2-bed Flat in Jabi',
        details: 'Completed on Oct 12, 2024  •  3 agents responded  •  2 inspection completed',
    },
    {
        id: 8,
        title: '5-bed Detached in Asokoro',
        details: 'Completed on Sep 28, 2024  •  5 agents responded  •  1 inspection completed',
    },
    {
        id: 9,
        title: '3-bed Bungalow in Kubwa',
        details: 'Completed on Sep 15, 2024  •  1 agents responded  •  0 inspection completed',
    },
    {
        id: 10,
        title: '4-bed Maisonette in Katampe',
        details: 'Completed on Aug 30, 2024  •  4 agents responded  •  2 inspection completed',
    },
    {
        id: 11,
        title: '2-bed Studio in Central Area',
        details: 'Completed on Aug 15, 2024  •  2 agents responded  •  1 inspection completed',
    },
    {
        id: 12,
        title: '3-bed Penthouse in Guzape',
        details: 'Completed on Jul 30, 2024  •  3 agents responded  •  1 inspection completed',
    },
];

const ITEMS_PER_PAGE = 10;

export default function RequestHistory() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(historyItems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = historyItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="mt-8">
            <h3 className="text-lg font-bold text-slate-900 leading-7 m-0 mb-4">Request History ({historyItems.length})</h3>
            <div className="flex flex-col gap-4">
                {currentItems.map((item) => (
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-lg font-semibold text-sm transition-colors ${currentPage === page
                                    ? 'bg-blue-500 text-white shadow'
                                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
