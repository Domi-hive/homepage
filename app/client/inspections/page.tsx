"use client";

import React from 'react';
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

export default function InspectionsPage() {
    return (
        <div className="p-4 md:p-10 min-h-full bg-gradient-to-br from-[#f3e7ff] to-[#e3eeff]">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800">My Inspections</h1>
                    <p className="text-slate-500 mt-1">Manage and track all your property inspections</p>
                </div>
                <div className="flex items-center gap-6 self-end md:self-auto">
                    <button className="text-slate-500 hover:text-slate-700 transition-colors">
                        <Bell className="w-6 h-6" />
                    </button>
                    <button className="text-slate-500 hover:text-slate-700 transition-colors">
                        <MessageSquare className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3 bg-white/50 p-2 rounded-full md:bg-transparent md:p-0">
                        <img
                            alt="User avatar"
                            className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-white shadow-sm"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuApwz1HzKfzmiTi2UQsUJcW888s0VDgItEm-xhw7ioi7hzA5iXKdTooAJNi23OxGQOc6EdcnvtCqsPqCQtjebd3RrTQ3rU70soZYB989rU0V2xwU10nXOPhJp5OauflT4w4YdPaLYgvCUKTcmK4ileUe50q8glR9EXw6QSKFjXo4SAzVB2v_Ww33PACuP1RMXVBUxYrJwx_w9fhdfO5zk7wDg-oMOyLfPFNKy9AS6x9TgXe8AO1vmZTW9s3Ba9EcmOU1xeAqW6q8A"
                        />
                        <div className="hidden md:block">
                            <span className="font-semibold text-slate-800 block leading-tight">User</span>
                            <p className="text-xs text-slate-500">Tenant</p>
                        </div>
                        <ChevronDown className="w-5 h-5 text-slate-500 hidden md:block" />
                    </div>
                </div>
            </header>

            <div className="space-y-8 max-w-5xl mx-auto">
                {/* Tabs */}
                <div className="bg-white/60 backdrop-blur-sm p-1.5 rounded-xl shadow-sm inline-flex gap-1 border border-white/50">
                    <button className="flex items-center gap-2 font-semibold py-2 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md shadow-purple-500/20 transition-all">
                        <span>Active</span>
                        <div className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></div>
                    </button>
                    <button className="font-semibold py-2 px-6 rounded-lg text-slate-500 hover:bg-white/50 transition-colors">Upcoming</button>
                </div>

                {/* Warning Banner */}
                <div className="bg-orange-500 text-white p-6 rounded-2xl shadow-lg shadow-orange-500/20 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                    <div className="bg-white/20 p-2 rounded-full shrink-0">
                        <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-xl">Previous Inspection Incomplete</h3>
                        <p className="text-sm opacity-90 mt-1">You need to mark your 6:11 am inspection as complete before starting this one.</p>
                    </div>
                    <button className="w-full md:w-auto bg-white text-orange-600 font-bold py-2.5 px-5 rounded-xl hover:bg-orange-50 transition-colors shadow-sm whitespace-nowrap">
                        Complete Previous Inspection
                    </button>
                </div>

                {/* Active Inspection Card */}
                <div className="bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                                    <PlayCircle className="w-3.5 h-3.5" />
                                    <span>Ready to Start</span>
                                </div>
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
                        <div className="text-sm font-bold bg-green-100 text-green-700 px-4 py-1.5 rounded-full border border-green-200 shadow-sm">
                            Paid
                        </div>
                    </div>

                    <div className="border-y border-slate-100 py-6 my-6">
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <button className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm border border-slate-200 flex items-center justify-center gap-2 hover:-translate-y-0.5">
                            <Navigation className="w-5 h-5 text-blue-500" />
                            <span>Directions</span>
                        </button>
                        <button className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm border border-slate-200 flex items-center justify-center gap-2 hover:-translate-y-0.5">
                            <Phone className="w-5 h-5 text-green-500" />
                            <span>Call</span>
                        </button>
                        <button className="bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm border border-slate-200 flex items-center justify-center gap-2 hover:-translate-y-0.5">
                            <MessageCircle className="w-5 h-5 text-green-600" />
                            <span>WhatsApp</span>
                        </button>
                    </div>

                    <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-not-allowed">
                        <Ban className="w-5 h-5" />
                        <span>Confirm Arrival - Blocked</span>
                    </button>
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
                                icon: Hourglass,
                                iconColor: "text-orange-600",
                                iconBg: "bg-orange-100",
                                title: "2 properties in Ajah",
                                subtitle: "Pending completion on 26 Nov 2025 • Sarah Smith"
                            },
                            {
                                icon: CheckCircle,
                                iconColor: "text-green-600",
                                iconBg: "bg-green-100",
                                title: "1 property in Victoria Island",
                                subtitle: "Completed on 23 Nov 2025 • Tunde Bakare"
                            },
                            {
                                icon: MinusCircle,
                                iconColor: "text-red-600",
                                iconBg: "bg-red-100",
                                title: "1 property in Magodo",
                                subtitle: "No-show on 21 Nov 2025 • Grace Obi"
                            },
                            {
                                icon: XCircle,
                                iconColor: "text-slate-600",
                                iconBg: "bg-slate-200",
                                title: "1 property in Lekki Phase 1",
                                subtitle: "Cancelled on 19 Nov 2025 • David Eze"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-white/50 flex justify-between items-center hover:bg-white/80 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center`}>
                                        <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-lg">{item.title}</p>
                                        <p className="text-sm text-slate-500 font-medium">{item.subtitle}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 font-bold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                    <span>View</span>
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
