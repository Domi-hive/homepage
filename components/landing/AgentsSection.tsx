import React from 'react';

export default function AgentsSection() {
    return (
        <section className="py-24 bg-navy-950 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral rounded-full blur-[150px]"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-navy-900/50 rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="p-8 md:p-16 flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral/10 border border-coral/20 mb-6 w-fit">
                                <span className="text-coral font-bold text-[10px] uppercase tracking-widest">For Real Estate Professionals</span>
                            </div>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                Maximize Your Earnings, <br /><span className="text-coral">Minimize the Chase</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-10 max-w-lg font-light leading-relaxed">
                                Stop spending hours searching for leads. Join the marketplace where verified clients come to you with high-intent requests.
                            </p>
                            <div className="space-y-6 mb-12">
                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-coral">
                                        <span className="material-symbols-outlined text-xl">verified_user</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">Verified Client Leads</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">No more cold calling. Deal with serious buyers ready to transact.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-coral">
                                        <span className="material-symbols-outlined text-xl">event_available</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">Instant Booking</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">Fill your calendar effortlessly with pre-scheduled inspections.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-coral">
                                        <span className="material-symbols-outlined text-xl">speed</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">Secure Faster Closings</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">Curated matching means better conversion and shorter sales cycles.</p>
                                    </div>
                                </div>
                            </div>
                            <a className="inline-flex items-center justify-center px-10 py-5 bg-coral text-white text-base font-bold rounded-full shadow-lg shadow-coral/30 hover:bg-coral-hover transition-all transform hover:-translate-y-1 w-fit" href="#">
                                Become a Partner Agent
                            </a>
                        </div>
                        <div className="relative min-h-[400px] lg:h-auto">
                            <img alt="Professional real estate agent in modern workspace" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAltmMIUfgI7kdXDsgxmeyMUDQlwNv04N33Zjwb9mNIE96cQwI1T9SjSXPimpRH-gi8-vum-tFCGIBu01V1kzggS_j15Hz0r4g91XcMJ31lB-hxPqmIquwYt_5WTZUzMGfYobu8vYkeqUGn6X3TOOmFzYPlAvz8B2UB75S5I-tOJfhBLgULXdIKNxVLEOoH6lLJN7T1QjUb_hVDMTZQCdsPdbLH8qfAf1brG8BVH_3K8j5yJxzC4sn0XEY3tDorXM_5AOwBCoYsyg" />
                            <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-transparent to-transparent hidden lg:block"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
