import React from 'react';
import Link from 'next/link';
import Logo from "@/components/ui/Logo";
import AgentsSection from "@/components/landing/AgentsSection";


export default function Home() {
    return (
        <div
            className="min-h-screen"
            style={{
                backgroundImage: `url('/landing/full_page_background.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/60 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center gap-3 w-64 flex-shrink-0">
                            <Link href="/" className="hover:opacity-90 transition-opacity">
                                <Logo />
                            </Link>
                        </div>
                        <div className="hidden md:flex flex-1 justify-center items-center space-x-12">
                            <Link className="text-sm font-medium text-slate-600 hover:text-navy-900 transition-colors" href="#">Agents</Link>
                            <Link className="text-sm font-medium text-slate-600 hover:text-navy-900 transition-colors" href="#">Services</Link>
                            <Link className="text-sm font-medium text-slate-600 hover:text-navy-900 transition-colors" href="#">About Us</Link>
                        </div>
                        <div className="hidden md:flex items-center justify-end gap-4 w-64 flex-shrink-0">
                            <Link href="/login" className="text-slate-600 font-semibold text-sm hover:text-navy-900 transition-colors">Login</Link>
                            <Link href="/signup" className="bg-coral text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-coral-hover shadow-lg shadow-coral/20 transition-all transform hover:-translate-y-0.5">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header
                className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden text-white"
                style={{
                    backgroundImage: `linear-gradient(135deg, rgba(2, 6, 23, 0.82), rgba(14, 22, 42, 0.8)), url('/landing/hero_background.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-900/40 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/40 rounded-full blur-[100px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col items-center justify-center px-4">
                        <div className="w-full max-w-4xl mx-auto text-center">

                            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
                                Acquire Real Estate <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">Without the Chase</span>
                            </h1>
                            <p className="max-w-xl mx-auto text-slate-300 text-lg md:text-xl mb-10 leading-relaxed font-light">
                                The quiet marketplace for homeseekers. Define your terms, receive matches from verified agents, and secure your next home with confidence.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                <Link className="inline-flex items-center justify-center px-8 py-4 bg-coral text-white text-base font-bold rounded-full shadow-lg shadow-coral/30 hover:bg-coral-hover transition-all transform hover:-translate-y-1" href="/signup">
                                    Create Request
                                </Link>

                            </div>
                            <div className="mt-14 pt-8 border-t border-navy-800 flex items-center justify-center gap-12">
                                <div>
                                    <p className="text-3xl font-display font-bold text-white">100%</p>
                                    <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Verified Agents</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-display font-bold text-white">500+</p>
                                    <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Active Listings</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-display font-bold text-white">48h</p>
                                    <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Avg. Match Time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* City Coverage Section */}
            <div className="py-12 border-b border-slate-100/10 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <p className="text-center text-xs font-bold text-slate-400 mb-10 uppercase tracking-[0.2em]">Our Coverage</p>

                    {/* Horizontal Scroll Container */}
                    <div className="relative w-full overflow-hidden group">
                        <div className="flex w-max animate-scroll hover:[animation-play-state:paused] gap-6">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="flex gap-6">
                                    {[
                                        { name: "Lekki Phase 1", count: "250+" },
                                        { name: "Victoria Island", count: "180+" },
                                        { name: "Ikoyi", count: "150+" },
                                        { name: "Maitama", count: "120+" },
                                        { name: "Asokoro", count: "110+" },
                                        { name: "Wuse II", count: "90+" },
                                        { name: "Ajah", count: "120+" },
                                        { name: "Ikeja", count: "95+" },
                                        { name: "Garki", count: "85+" },
                                        { name: "Surulere", count: "80+" },
                                    ].map((loc, index) => (
                                        <div
                                            key={index}
                                            className="flex-none w-64 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors flex flex-col items-center justify-center text-center"
                                        >
                                            <div className="mb-2">
                                                <h4 className="text-charcoal font-semibold text-lg">{loc.name}</h4>
                                            </div>
                                            <span className="text-coral font-bold text-sm flex items-center gap-1 justify-center">
                                                <span className="material-symbols-outlined text-sm">home</span>
                                                {loc.count} Properties
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <section className="py-24 relative" id="how-it-works">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mb-6 tracking-tight">
                            Expert Matching, <br /><span className="text-coral">Zero Searching</span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed">We've stripped away the noise of public listings. Here, the market comes to you through a curated, private channel.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Step 1 */}
                        <div className="group bg-white p-8 rounded-2xl shadow-card hover:shadow-float transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-lavender-soft"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center mb-6 shadow-lg shadow-navy-900/20">
                                    <span className="material-symbols-outlined">edit_note</span>
                                </div>
                                <h3 className="font-display text-xl font-bold text-navy-900 mb-3">1. Define Request</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Set your parameters—budget, location, lifestyle. The more specific, the better the match.</p>
                            </div>
                        </div>
                        {/* Step 2 */}
                        <div className="group bg-white p-8 rounded-2xl shadow-card hover:shadow-float transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-lavender-soft"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center mb-6 shadow-lg shadow-navy-900/20">
                                    <span className="material-symbols-outlined">handshake</span>
                                </div>
                                <h3 className="font-display text-xl font-bold text-navy-900 mb-3">2. Agent Matching</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Verified top-tier agents review your request and submit only their most relevant inventory.</p>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className="group bg-white p-8 rounded-2xl shadow-card hover:shadow-float transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-lavender-soft"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center mb-6 shadow-lg shadow-navy-900/20">
                                    <span className="material-symbols-outlined">calendar_month</span>
                                </div>
                                <h3 className="font-display text-xl font-bold text-navy-900 mb-3">3. Private Viewing</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Book inspections instantly. A small commitment fee ensures exclusive attention from the agent.</p>
                            </div>
                        </div>
                        {/* Step 4 */}
                        <div className="group bg-white p-8 rounded-2xl shadow-card hover:shadow-float transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-lavender-soft"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-navy-900 text-white flex items-center justify-center mb-6 shadow-lg shadow-navy-900/20">
                                    <span className="material-symbols-outlined">verified_user</span>
                                </div>
                                <h3 className="font-display text-xl font-bold text-navy-900 mb-3">4. Secure Deal</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">Negotiate and close through our secure platform, with funds held in escrow until satisfaction.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Split Section */}
            <section className="py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="w-full lg:w-1/2 relative">
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square">
                                <img alt="Professional agent showing property" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDdB2XQH804IO2prxsrwy2mqhF7OzPYo7_aZeeHl2xRPSyLAusyBRXNrM-kqonGmRHKndt7ecsmPs35M9JWlOIRGhYxrY-Cps0ga6wYISLjhKlx0TkBs0kcS2JV61r5c7PiRCcDAZrQ5nh4vwNy1rUtRdNOnZblGuGlTc91syHRCRW55IFZkysvC_NSgY4IiIS7CbUCIlD_kZ3arxW-vhgotyvXzFLDgp9AdXTTxlKrxQH8rLQHQJMfhlrW1t5Sgk0UcoBYTaCIw" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="flex items-center gap-4 text-white">
                                        <div className="bg-green-500 p-1 rounded-full"><span className="material-symbols-outlined text-sm font-bold">check</span></div>
                                        <p className="font-medium text-sm">Verified License: #RE-992834</p>
                                    </div>
                                </div>
                                <div className="absolute top-8 right-8 bg-white/95 backdrop-blur shadow-xl rounded-2xl p-4 max-w-xs border border-slate-100">
                                    <div className="flex gap-4 items-center">
                                        <div className="bg-coral/10 p-3 rounded-full text-coral">
                                            <span className="material-symbols-outlined">trending_up</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Market Efficiency</p>
                                            <p className="text-lg font-bold text-navy-900">3x Faster Closing</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy-900 mb-8 leading-tight">
                                The Smarter Way to <br /><span className="text-coral">Navigate the Market</span>
                            </h2>
                            <p className="text-slate-600 text-lg mb-10">
                                Traditional searching is reactive. DomiHive is proactive. We built a platform where your intent drives the market, not the other way around.
                            </p>
                            <div className="space-y-6">
                                <div className="flex gap-5 items-start p-4 rounded-xl hover:bg-slate-50 transition-colors duration-300">
                                    <div className="mt-1 w-12 h-12 rounded-full bg-navy-50 text-navy-900 flex-shrink-0 flex items-center justify-center border border-navy-100">
                                        <span className="material-symbols-outlined">filter_list</span>
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl font-bold text-navy-900 mb-2">Precision Filtering</h3>
                                        <p className="text-slate-500 text-base leading-relaxed">
                                            Our algorithm ensures you only see properties that hit 92% or more of your criteria. No compromises.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-5 items-start p-4 rounded-xl hover:bg-slate-50 transition-colors duration-300">
                                    <div className="mt-1 w-12 h-12 rounded-full bg-navy-50 text-navy-900 flex-shrink-0 flex items-center justify-center border border-navy-100">
                                        <span className="material-symbols-outlined">shield</span>
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl font-bold text-navy-900 mb-2">Escrow Protection</h3>
                                        <p className="text-slate-500 text-base leading-relaxed">
                                            Financial transactions for inspections and deposits are held securely, releasing only when milestones are met.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-5 items-start p-4 rounded-xl hover:bg-slate-50 transition-colors duration-300">
                                    <div className="mt-1 w-12 h-12 rounded-full bg-navy-50 text-navy-900 flex-shrink-0 flex items-center justify-center border border-navy-100">
                                        <span className="material-symbols-outlined">support_agent</span>
                                    </div>
                                    <div>
                                        <h3 className="font-display text-xl font-bold text-navy-900 mb-2">Dedicated Concierge</h3>
                                        <p className="text-slate-500 text-base leading-relaxed">
                                            24/7 support from real estate experts who understand the nuances of high-value property transactions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Grid */}
            <section className="py-24 bg-navy-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-navy-800/50 rounded-full blur-[120px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-navy-800 pb-8">
                        <div>
                            <span className="text-coral font-bold tracking-widest uppercase text-sm mb-2 block">Why Choose Us</span>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-white max-w-xl">
                                Architected for Trust
                            </h2>
                        </div>
                        <p className="text-slate-400 max-w-md mt-6 md:mt-0 text-base leading-relaxed">
                            Every feature is designed to reduce friction and increase transparency in the property buying process.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: 'verified', title: 'Vetted Professionals', text: 'We maintain a strict acceptance rate for agents, ensuring you deal with the top 5% of the market.' },
                            { icon: 'psychology', title: 'Smart Matching', text: 'Algorithms that understand "charm" and "potential," not just bedroom count and square footage.' },
                            { icon: 'lock_clock', title: 'Instant Booking', text: 'Your time is valuable. Secure inspection slots instantly without the email tag.' },
                            { icon: 'payments', title: 'Secure Transactions', text: 'Bank-grade security protocols for every payment, from inspection fees to holding deposits.' },
                            { icon: 'headset_mic', title: 'Premium Support', text: 'A human expert is always available to navigate complex requirements or unique situations.' },
                            { icon: 'notifications_active', title: 'Curated Alerts', text: 'Receive notifications only when it matters. Quality over quantity, always.' }
                        ].map((item, index) => (
                            <div key={index} className="p-8 rounded-3xl bg-navy-800/50 border border-navy-700 hover:bg-navy-800 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 rounded-lg bg-navy-900 border border-navy-700 flex items-center justify-center mb-6 text-coral shadow-lg">
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                </div>
                                <h3 className="font-display text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="material-symbols-outlined text-coral text-5xl mb-6 opacity-80">format_quote</span>
                        <h2 className="font-display text-4xl font-bold text-navy-900">Client Stories</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-3xl shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                            <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium italic">
                                "I posted my request on Tuesday and had three perfect viewings booked by Friday. It saved me weeks of trawling through property portals."
                            </p>
                            <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                                <img alt="User" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVlk__cmTT_mEEk9l0T_beFDusijY8reJ1F1UjUXQLd3WCmFytkOjujA8pw4Yx8rZbhFUUvuSi6ypF4V1BGAS4Xx3semDgP7EbDusT_YqQdFeiyrU8ouhn7iuh3wWbWMX88NDA4xDQnOZSCSGZKc9GSUutXyGxCadHVGdAjw_MN3TMhmN-YfcRJ9lajhPxMar3nrf7SgYJ6rVCtLuo6h88wNJydpmf_K3b_mhaLGgirEc3mFa8TNDKVfT8gdxwP3EmVlloadE_ww" />
                                <div>
                                    <h4 className="font-display text-lg font-bold text-navy-900">Marcus Rodriguez</h4>
                                    <p className="text-slate-500 text-xs uppercase tracking-wide font-bold">Tech Entrepreneur</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-10 rounded-3xl shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform md:-translate-y-4">
                            <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium italic">
                                "The ability to book inspections instantly is a game changer. I knew exactly when I was seeing the property and the agent was ready for me."
                            </p>
                            <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                                <img alt="User" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUUTue2nF1Ek4-dcltRTQSvYaqZCuvGijN0kIr9ZxpZQBMkb69FDaRguKGvT8uLeK6o5ekpm1J95TJJaBgULjPQIJITjGwqa42cLcMX7yKYzTzar2_rZ67dBxDE5DgeFH-T0t17VzMxnyFl1NbncHIRK3msA-fMDqkwAIsEbaosyTcUKf3rCKjMP6uAAVb_DUWSVx9MN8IT_YthzInsZeRwxfPVckpAnt9UBwwgIgGK7whQVbxPlpyM345QECpAxhw0JeCGSZ0eQ" />
                                <div>
                                    <h4 className="font-display text-lg font-bold text-navy-900">Aspen Noonan</h4>
                                    <p className="text-slate-500 text-xs uppercase tracking-wide font-bold">Architect</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-10 rounded-3xl shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                            <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium italic">
                                "As an investor, time is money. DomiHive's matching system brought the deals to me based on my criteria, making the process incredibly efficient."
                            </p>
                            <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                                <img alt="User" className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLQDMNxARckaVshQJtXbOkxfp_ORhfGeKyiCNyT6y5Vz4OnCRvRdiboFl3hKes0jzJ7mPJvrr6umvsmqdGdoKza_wP40g64bI5ftOIaZ-KEq5h_3YrYIlQ1RWBZlBVTf1h6ctDl6COYrrrVko__Ai18Ka-no56QBUApzra1ugFNdaiA18ECdCQxML3phrZmu6emRzsPWSe7lY5ZZXlmA2L3qxhdp-VMSfIz4ErwOziE6wgvAtmYkIH6Qk0teHsQ89fyUblckos6A" />
                                <div>
                                    <h4 className="font-display text-lg font-bold text-navy-900">Sam Miller</h4>
                                    <p className="text-slate-500 text-xs uppercase tracking-wide font-bold">Real Estate Investor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">Common Questions</h2>
                        <p className="text-slate-500 mt-4">Everything you need to know about the platform.</p>
                    </div>
                    <div className="space-y-4">
                        <details className="group bg-surface rounded-xl p-6 open:bg-white open:shadow-lg open:ring-1 open:ring-slate-100 transition-all duration-300">
                            <summary className="flex justify-between items-center cursor-pointer list-none">
                                <span className="font-display text-lg font-semibold text-navy-900">How does the request system work?</span>
                                <span className="material-symbols-outlined text-slate-400 group-open:text-coral transition-colors transform group-open:rotate-45">add_circle</span>
                            </summary>
                            <p className="text-slate-600 text-base mt-4 leading-relaxed pr-8">
                                You submit a detailed request outlining your needs. Our verified agents then review your request and send you properties that match.
                            </p>
                        </details>
                        <details className="group bg-surface rounded-xl p-6 open:bg-white open:shadow-lg open:ring-1 open:ring-slate-100 transition-all duration-300">
                            <summary className="flex justify-between items-center cursor-pointer list-none">
                                <span className="font-display text-lg font-semibold text-navy-900">Is there a fee to post a request?</span>
                                <span className="material-symbols-outlined text-slate-400 group-open:text-coral transition-colors transform group-open:rotate-45">add_circle</span>
                            </summary>
                            <p className="text-slate-600 text-base mt-4 leading-relaxed pr-8">
                                Posting a request is free. You only pay a small fixed fee when you decide to book a confirmed inspection for a property you like.
                            </p>
                        </details>
                        <details className="group bg-surface rounded-xl p-6 open:bg-white open:shadow-lg open:ring-1 open:ring-slate-100 transition-all duration-300">
                            <summary className="flex justify-between items-center cursor-pointer list-none">
                                <span className="font-display text-lg font-semibold text-navy-900">How do I schedule an inspection?</span>
                                <span className="material-symbols-outlined text-slate-400 group-open:text-coral transition-colors transform group-open:rotate-45">add_circle</span>
                            </summary>
                            <p className="text-slate-600 text-base mt-4 leading-relaxed pr-8">
                                When an agent sends you a property match, you'll see available viewing slots. Select a time that works for you and confirm instantly.
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            {/* Agents Section */}
            <AgentsSection />

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden bg-navy-900">
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-[3rem] p-8 md:p-16 border border-navy-700 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-coral/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                Ready to Stop Searching <br />and <span className="text-coral">Start Acquiring?</span>
                            </h2>
                            <p className="text-slate-300 text-lg mb-8 max-w-lg font-light mx-auto">
                                Join the marketplace where the best properties find you. Submit your first request today.
                            </p>
                            <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 bg-coral text-white text-base font-bold rounded-full shadow-lg shadow-coral/30 hover:bg-coral-hover transition-all transform hover:-translate-y-1">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200/20 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                        <div className="col-span-1 md:col-span-1">
                            <Link href="/" className="inline-block mb-6 hover:opacity-90 transition-opacity">
                                <Logo />
                            </Link>
                            <p className="text-slate-500 text-sm leading-relaxed">The premium marketplace for secure, efficient property inspections and acquisitions.</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-navy-900">Services</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><Link className="hover:text-coral transition-colors" href="#">Create Request</Link></li>
                                <li><Link className="hover:text-coral transition-colors" href="#">For Agents</Link></li>
                                <li><Link className="hover:text-coral transition-colors" href="#">Pricing</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-navy-900">Company</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><Link className="hover:text-coral transition-colors" href="#">About Us</Link></li>
                                <li><Link className="hover:text-coral transition-colors" href="#">Careers</Link></li>
                                <li><Link className="hover:text-coral transition-colors" href="#">Press</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-navy-900">Legal</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><Link className="hover:text-coral transition-colors" href="#">Privacy Policy</Link></li>
                                <li><Link className="hover:text-coral transition-colors" href="#">Terms of Service</Link></li>
                                <li><Link className="hover:text-coral transition-colors" href="#">Escrow Agreement</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
                        <p>© 2024 DomiHive Inc. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link className="hover:text-coral transition-colors" href="#"><span className="material-symbols-outlined">social_leaderboard</span></Link>
                            <Link className="hover:text-coral transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
