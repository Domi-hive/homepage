"use client";

import { useState } from 'react';
import {
    Bell,
    MessageSquare,
    ChevronDown,
    PlayCircle,
    Star,
    MapPin,
    Navigation,
    Phone,
    MessageCircle,
    Ban,
    Info,
    Hourglass,
    CheckCircle,
    MinusCircle,
    XCircle,
    ChevronRight,
    AlertTriangle
} from 'lucide-react';
import InspectionDetailsModal from './InspectionDetailsModal';
import OutcomeSelectionModal from './OutcomeSelectionModal';
import ClientHeader from '@/components/client/ClientHeader';
import UpcomingInspectionCard from '@/components/client/inspections/UpcomingInspectionCard';

import { useSearchParams } from 'next/navigation';

export default function InspectionsPage() {
    const searchParams = useSearchParams();
    const initialTab = searchParams.get('tab') === 'upcoming' ? 'upcoming' : 'active';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOutcomeModalOpen, setIsOutcomeModalOpen] = useState(false);
    const [outcomeModalStep, setOutcomeModalStep] = useState<'selection' | 'did_not_happen'>('selection');
    const [selectedInspection, setSelectedInspection] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'active' | 'upcoming'>(initialTab);

    const handleViewInspection = (inspection: any) => {
        setSelectedInspection(inspection);
        setIsModalOpen(true);
    };
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff]">
            <div
                className="absolute inset-0 bg-cover bg-top opacity-75 pointer-events-none z-0"
                style={{ backgroundImage: 'url(/assets/full_page_background.png)' }}
            />

            <div className="relative z-10 p-4 md:p-10 h-full overflow-y-auto">
                <ClientHeader
                    title="My Inspections"
                    subtitle="Manage and track all your property inspections"
                />

                <div className="space-y-8">
                    {/* Tabs */}
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
                            onClick={() => setActiveTab('upcoming')}
                            className={`px-4 py-3 font-medium transition-colors ${activeTab === 'upcoming'
                                ? 'text-slate-800 dark:text-slate-100 font-semibold border-b-2 border-purple-500'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            Upcoming (2)
                        </button>
                    </div>

                    {activeTab === 'active' ? (
                        <>
                            {/* Active Inspection Card */}
                            <div className="bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
                                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3 mb-3">

                                            <p className="text-sm font-medium text-slate-500">Today, 7:56 am</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <img
                                                alt="Michael Okon"
                                                className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqCeZZ82qMY75Ay3gAbkHmRexzLrWgGd_dQxYpZFV4-tWs3LMiNKw3nANFmBBqL0c0ONivPbLxJ6hn5i2myUjhIhg0sZ4nT1ncr8MME4wVsNp1QivWJRsWC8T_Kws0Xo8IPcauxWy3X9kF6TXE5T6BKhrP_jb4skFipbth71IlH1fea7dFIurBFMyVKTDJTjMHDo8NXSq7BkVa-bEZFjz4zmN0WqJYdkzWwuyCTD2gwt2E8P_Uh53uiSe_5dk2y5mglK88i-Ufyw"
                                            />
                                            <div>
                                                <p className="font-bold text-xl text-slate-800">Michael Okon</p>
                                                <p className="text-sm text-slate-500 font-medium">1 property • ₦10,000</p>
                                            </div>
                                            <div className="flex items-center text-amber-500 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="font-bold text-sm ml-1">4.7</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="border-y border-slate-100 my-6">
                                    <p className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4">Properties</p>
                                    <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                        <img
                                            alt="5 Bedroom Mansion"
                                            className="w-24 h-20 rounded-xl object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj9qGZ6OJkdzJGn25j5vS4H6J-eGZjBwn2FzPVAeZ-6pZywflJOZjKzXqQHkEqyMBIlEsYsqgiC6ZDt6VPorTE3jklhQB5Y3KGuTempJ5sRjSZGGCxM93hqkO0oINzn0nN05TsLMzG41OUd20x6WcTWt0lb09C10RIb9bk8Ewgjz4ig97tHQKv2KoudkMKkyPIqkeW6gZSLt4xC7PKvAG89CWL4n-Jo9OXhbVGpl35PYTJyN-QyoV29XjAbgoYi9i33Gzc-VVL_w"
                                        />
                                        <div>
                                            <p className="font-bold text-slate-800 text-lg">5 Bedroom Mansion</p>
                                            <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                Banana Island, Ikoyi
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-0.5">Meeting Point</p>
                                        <p className="font-bold text-slate-800 text-lg">Banana Island, Ikoyi</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <button
                                        onClick={() => {
                                            setOutcomeModalStep('selection');
                                            setIsOutcomeModalOpen(true);
                                        }}
                                        className="bg-gradient-to-br from-purple-500 to-blue-500 border-none rounded-xl px-6 py-3 text-white text-base font-semibold cursor-pointer flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/30"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        <span>Mark as Complete</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setOutcomeModalStep('did_not_happen');
                                            setIsOutcomeModalOpen(true);
                                        }}
                                        className="bg-red-50 border border-red-200 rounded-xl px-6 py-3 text-red-600 text-base font-medium cursor-pointer transition-colors hover:bg-red-100 flex items-center gap-2"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        <span>Cancel</span>
                                    </button>
                                    <button className="bg-white border border-slate-200 rounded-xl px-6 py-3 text-slate-700 text-base font-medium cursor-pointer transition-colors hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2">
                                        <Navigation className="w-5 h-5 text-blue-500" />
                                        <span>Directions</span>
                                    </button>
                                    <button className="bg-white border border-slate-200 rounded-xl px-6 py-3 text-slate-700 text-base font-medium cursor-pointer transition-colors hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2">
                                        <Phone className="w-5 h-5 text-green-500" />
                                        <span>Call</span>
                                    </button>
                                    <button className="bg-white border border-slate-200 rounded-xl px-6 py-3 text-slate-700 text-base font-medium cursor-pointer transition-colors hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2">
                                        <MessageCircle className="w-5 h-5 text-green-600" />
                                        <span>WhatsApp</span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex items-start gap-3 border border-blue-100">
                                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                                <p className="text-sm font-medium leading-relaxed">You can only have one active inspection at a time. Complete your current inspection to start a new one.</p>
                            </div>

                            {/* History */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-6 px-2">Inspection History (4)</h3>
                                <div className="space-y-4">
                                    {[
                                        {
                                            id: 1,
                                            icon: Hourglass,
                                            iconColor: "text-orange-600",
                                            iconBg: "bg-orange-100",
                                            title: "2 properties in Ajah",
                                            subtitle: "Pending completion on 26 Nov 2025 • Sarah Smith",
                                            status: 'pending',
                                            isRated: false
                                        },
                                        {
                                            id: 2,
                                            icon: CheckCircle,
                                            iconColor: "text-green-600",
                                            iconBg: "bg-green-100",
                                            title: "1 property in Victoria Island",
                                            subtitle: "Completed on 23 Nov 2025 • Tunde Bakare",
                                            status: 'completed',
                                            isRated: false
                                        },
                                        {
                                            id: 3,
                                            icon: MinusCircle,
                                            iconColor: "text-red-600",
                                            iconBg: "bg-red-100",
                                            title: "1 property in Magodo",
                                            subtitle: "No-show on 21 Nov 2025 • Grace Obi",
                                            status: 'no-show',
                                            isRated: false
                                        },
                                        {
                                            id: 4,
                                            icon: XCircle,
                                            iconColor: "text-slate-600",
                                            iconBg: "bg-slate-200",
                                            title: "1 property in Lekki Phase 1",
                                            subtitle: "Cancelled on 19 Nov 2025 • David Eze",
                                            status: 'cancelled',
                                            isRated: false
                                        }
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleViewInspection(item)}
                                            className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-white/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-white/80 transition-colors cursor-pointer group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center shrink-0`}>
                                                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 text-lg">{item.title}</p>
                                                    <p className="text-sm text-slate-500 font-medium">{item.subtitle}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 self-end md:self-auto">
                                                {item.status === 'pending' && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // Handle mark as complete
                                                        }}
                                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
                                                    >
                                                        Mark as Complete
                                                    </button>
                                                )}
                                                {item.status === 'completed' && !item.isRated && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // Handle rate agent
                                                        }}
                                                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm flex items-center gap-1"
                                                    >
                                                        <Star className="w-4 h-4 fill-current" />
                                                        <span>Rate Agent</span>
                                                    </button>
                                                )}
                                                <div className="flex items-center gap-1 font-bold text-purple-600 transition-opacity">
                                                    <span>View</span>
                                                    <ChevronRight className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-6">
                            <UpcomingInspectionCard
                                date={{
                                    month: 'TOM',
                                    day: '28',
                                    time: '1:12 PM',
                                    bgColor: 'bg-purple-50',
                                    textColor: 'text-purple-600'
                                }}
                                title="5 Bedroom Mansion..."
                                subtitle="Banana Island, Ikoyi"
                                agent={{
                                    name: 'Michael Okon',
                                    role: 'Inspection Agent',
                                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_0gdiH5WNZ2CM5STyMan2DM5JisTrb-KMc_hmwX21lhKDqoSq0sCL7ON3ubReHpQiBHnZTncExjv1KEAXvx9du4xqAy54Tp6PRHA6sdGSE47Y2cYG3U8-n5I01Q-atMIhZOUKK22uAHiw8hv0WO1DdUurC80KNz7zULVXf4eCxZYbyJc6tz3ayl_DOaFQysoShZ-B0lkcHe-kDQnimfjt5eVrMsPrqEtqhMOWVqGcfbeUVSRP9rzxPnetcWsMBP5zapwAtxPiZw'
                                }}
                            />
                            <UpcomingInspectionCard
                                date={{
                                    month: 'DEC',
                                    day: '02',
                                    time: '11:12 AM',
                                    bgColor: 'bg-blue-50',
                                    textColor: 'text-blue-600'
                                }}
                                title="Multi-Property Inspection"
                                subtitle="2 Properties at Yaba"
                                agent={{
                                    name: 'Adaeze Nwankwo',
                                    role: 'Inspection Agent',
                                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM2KB9OGpahiA1kLG-oi7Q3fTaL6vsTNFyBJLMy1vRcttzHjDUL8_WZvG8gtSWYpdbXEnMf2F07voqCNAIakBXYwX1-Ee-7zFk2PrsSrajNZRm1hes1X8gwYzQ2V05ouCPMVMgd8jojVQp-yPVH063dww0WA7_HGkZM59stXco_Z6Bmqmn6oWmCdii6C31ZyvA5TeTVdeEadmubItQR-ePKaGpzDpTLFc3Z-FJSlE9ninB7ygX8k4XN6SNLErCnCu0Qj6IXrzt6Q'
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            <InspectionDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                inspection={selectedInspection}
            />

            <OutcomeSelectionModal
                isOpen={isOutcomeModalOpen}
                onClose={() => setIsOutcomeModalOpen(false)}
                initialStep={outcomeModalStep}
                onSubmit={(outcome, details) => {
                    console.log('Outcome submitted:', outcome, details);
                    setIsOutcomeModalOpen(false);
                    // Here you would typically update the inspection status in your backend/state
                }}
            />
        </div>
    );
}
