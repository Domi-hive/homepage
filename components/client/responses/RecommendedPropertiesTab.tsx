"use client"

import React from 'react';
import { Clock, Heart, CheckCircle2, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Mock data based on the provided HTML
const RECOMMENDED_PROPERTIES = [
    {
        id: 1,
        title: "Modern 3-Bedroom in Wuse II",
        location: "Wuse II, Abuja",
        price: 2700000,
        period: "month",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCouDYAeyCZDMP2qoDl9Zd7QplAJRPZXE3C8Q08ZxD8Mx7Mz4uRprqnREe7rRezHrahBq3J3KR3wlnN3oMHtgQ18AVEKl7tyLYVJ72aJKPKvAbvn3SO8iychBYGvB83Pd1GqIyW0Q8TdTwmVft5gkWWNS0WL9DuL9-AVyh9VRZgrHSzqr1K7q0QrPCZ52adtMHgyCqu1BSRmBphe-ENi3Yr5p9WSjYS4WdGRq_6UmdPhIA6M2Rz274Vi5XhCV_gLay_w7xMZ6Fc4w",
        agent: {
            name: "Sarah Johnson",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFqcfsVyr79WCc3cycwoGVNTY1VmZc9yvOkFPU_du7UgNPGw7lnT1-jRvtti6gTNA0NXAjH2q3gY58vJxEd4FmfifSDDPtdEkhYgSa5MZRWjbxWLb6tyfGzuwTPthUPOHuVtAIorASRh0Wr-3zOZdMk98MHqvYdmnPECyY1AXjySGw7I1auwaua5ANs5Ui4VNL62Rd63KnwUfW0Nsq5lgQA4RODQB9QoQHmRuXN6CG7CgUCm47f3Ji6rg58w8jmK_Msa-igcbuoQ",
            verified: true
        },
        isLocked: false
    },
    {
        id: 2,
        title: "Luxury 3-Bedroom Apartment",
        location: "Wuse II, Abuja",
        price: 2900000,
        period: "month",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf7p-AOcJHUknKdQ1APmoMjIwnbg7ym-mHOCubBe1L2KgmFR3_TbMG_M0cHwimg4CcjlO_6h0KYy6OwqJz0j5amuQWMuWq2qXzsYWqi2gAVol7rql7S2ewDsTSrQp3Lr_bA_g1ZXFAvW4EedtPJ9t89zcekpkPpmvmFUjqCfDW-sUzZbEk7qYYb0FAo8gXNARzaddtQTLUVLotz0-9I43hUj4Ey4mCMdj-RH4JI0cy213X5IIypt7BI8RDffcGlfKQE36ImujtxQ",
        agent: {
            name: "Mike Chen",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMHZOPtw8sN6qPD_ExJIYRQi9PmUucV7BMY3HHPCVS9kww5vAgMJCcITnjgMSU81_hO1PEy4SYZ_sCelxv0iX-ExQRNYeDAwT_m1D1A1GpmtCIzLJsADEFmsh12ytrb4WgjtF8Gp3X9-fr3ojInER9lNiDz5R5qCbYiUVAywzcbOmHx-YGm8WbKTTGFlw3JBtdgLDyMrBgF2nhY-OeWvNmqB6XQBRLxvdvgEVfe2w29myMxcM8pRCAimxPZBDxmbFifHkcCz6Ehw",
            verified: true
        },
        isLocked: false
    },
    {
        id: 3,
        title: "Spacious 3-Bedroom Unit",
        location: "Wuse II, Abuja",
        price: 2500000,
        period: "month",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-8Sdc3-ipIllqmU3eHHxSKiXpJthijHpTW23F0ALlv5AGYaSO7H2YT8ppuJHMa2VjTIPHrZ22YbKkWMkfearprnoyXAcyNwxYbe9nBBRhv5Wt18JeyiSCb3Jj3oUfvGnFeqnpeJeE8fdX3mbsHUPw_UIntEmE0CyxWCauI3qH9vQChgDb8XIsNPfcf-Nc24PfBZV1dlOASGsHbSCB_n_TEL-Zrt73N-djeMenr9h9GjvqogIsSxlJmvJIs3GoZstRw0wFCAL1yQ",
        agent: {
            name: "Emma Davis",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4mC6vUqlCNhjcDYiNGywG6UFeClRzChZGUxuCi0CAvz_JZdD4UnjRB41ipOAv7fkQKFetnPk_KWDfn713KWmMEAJ3A7nQE2-ti-4Ydq-Ap_FJQ2dPvtHKw2OmfO105fWmn4BrNCric7kU-wAm_umH-U2K4_SpRp_IS_CbcNvmneOE_BGqLyJueVXXWq6X69WrQZrT2F7YSzH7XPy01Fg6Hsfvq2K7LMGOh77NvyQd6oK1SK_7Imd0YAVJWdIbixxOSWn-JWeGzw",
            verified: true
        },
        isLocked: true
    },
    {
        id: 4,
        title: "Premium Penthouse with City Views",
        location: "Maitama, Abuja",
        price: 6500000,
        period: "month",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-HAfAFfXJdwETd24GF8yxSltDmyHW70ouIJcOJMumNTResxMIRYLM5B_fX-dXZs4tvtANw-Q9TqUFLqBO1fCEv4fI9yjWX6E4wyHexBEKnPIereamnWai_aInB08xg_15YztPWAi9pMGXj6Cjq41QXnz5GDFZK3zEKMDksFMxKIi7VeqUCBpduvJIFSV8yEg7sbDTn3btrMxs4tcdoyrqbWAgf5gyW6FK1m5IshrglUfRhhhyDbG-GZMzzSRnB9PPhr6C2_LTBQ",
        agent: {
            name: "Sarah Johnson",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqO9fdnab1aAab75gRFNJxa1tkxscK5CjcX_uW8bFcA06mhQcgEmsRFACY4I9Hri0jJ0KRc0yScHNXfu2OHbiP87xiggqtuivFJNxsu9hnNHV9SJz0f3fV_b5o4SC27VgyApJytYbZYUEReXkAzMMmFC6RdkDRQ5F_uTMpfSy-WAndF6UvwZtpRhBoOD7uS5hr947DG_AMPQ7uIXoeeHGgBXVge0kGeF2J0cBe4oT9BBBOHQ3IO8PuHABbz_JQ2GL65qE3jjqcbg",
            verified: true
        },
        isLocked: false
    },
    {
        id: 5,
        title: "Modern Duplex in Asokoro",
        location: "Asokoro, Abuja",
        price: 7200000,
        period: "month",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuByRHAQYpHsvk8rOhuyonKuLAn2RWmRAT_At8WHHKmCBmDINQB_nFrWtcVeIdV_N-HCeCLBcMCb3n6W1_1mf4hJdF9tcaw8elu-wf8rY7gxOl0WnFdJlkBHfP7ItHEcR7av90nJ0u1-P1XUHu18XZ67M-7QFy9WJYhFuIHoDhNfJYDdsSE3shYlqqYTai8yRJCoBTPqY067V3N-I8Ob6QCPjVVwNj9QD9ZpABzJoopVnkO4wt-ZTwBELTWwk-VTyvWzpM5CLk9sBQ",
        agent: {
            name: "Mike Chen",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBf0hG-2Mng_L1drLHNXRDrwfXJaAD4_udZm6U7HAG_H-MYlEt-JyceKQWKaskuJAj6cqHzUik4wq188jYoXSY6JdsFb7d0aFGZSzYHaf_mjdn-kIEdMaultbz0Ag0uHKtwUuL-abGhd3QFvyTvCtpZos1NQ7I_I9a8sBu0gYcQyyJ--G7QyPe5NOCmmFBcugTskvDA6l18YWYgt64u5V0XR_PouJi1qCzdZMOq6yyYM4TRNVjGDxISupjAigStn3BnrBpYGQKQnA",
            verified: true
        },
        isLocked: false
    }
];

interface RecommendedPropertiesTabProps {
    favorites: Set<number>;
    toggleFavorite: (id: number) => void;
    onExpressInterest: (propertyTitle: string) => void;
}

export default function RecommendedPropertiesTab({ favorites, toggleFavorite, onExpressInterest }: RecommendedPropertiesTabProps) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {RECOMMENDED_PROPERTIES.slice(0, 3).map((property) => (
                    <div key={property.id} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10 overflow-hidden flex flex-col">
                        <div className="relative">
                            <img
                                alt={property.title}
                                className="w-full h-52 object-cover"
                                src={property.image}
                            />
                            {property.isLocked && (
                                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-white p-5 text-center">
                                    <Lock className="w-10 h-10 mb-2" />
                                    <p className="font-semibold">Locked - Pending Update</p>
                                    <p className="text-sm text-slate-300">Contact agent for availability</p>
                                </div>
                            )}
                            <div className="absolute top-3 right-3 flex gap-2">
                                {!property.isLocked && (
                                    <button className="w-8 h-8 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 dark:hover:bg-black/40 transition-colors">
                                        <Clock className="w-4 h-4" />
                                    </button>
                                )}
                                <button
                                    onClick={() => toggleFavorite(property.id)}
                                    className="w-8 h-8 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 dark:hover:bg-black/40 transition-colors"
                                >
                                    <Heart
                                        className={`w-4 h-4 ${favorites.has(property.id) ? "fill-red-500 text-red-500" : ""}`}
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                ₦{property.price.toLocaleString()}/<span className="text-sm font-medium text-slate-500 dark:text-slate-400">{property.period}</span>
                            </p>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-1">{property.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{property.location}</p>
                            <div className="border-t border-slate-200/80 dark:border-slate-800/80 my-4"></div>
                            <div className="flex items-center gap-3 mt-auto">
                                <img
                                    alt={`Agent ${property.agent.name}`}
                                    className="w-8 h-8 rounded-full"
                                    src={property.agent.image}
                                />
                                <div>
                                    <p className="font-semibold text-sm text-slate-700 dark:text-slate-200">{property.agent.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Verified Agent</p>
                                </div>
                                {property.agent.verified && (
                                    <CheckCircle2 className="w-4 h-4 text-green-500 ml-1 fill-current" />
                                )}
                            </div>
                            {property.isLocked ? (
                                <div className="mt-4 w-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold py-3 rounded-lg text-center">
                                    Locked - Pending Update
                                </div>
                            ) : (
                                <Button
                                    onClick={() => onExpressInterest(property.title)}
                                    className="mt-4 w-full bg-blue-200/80 dark:bg-blue-800/50 hover:bg-blue-300/80 dark:hover:bg-blue-700/50 text-blue-800 dark:text-blue-200 font-semibold py-6 rounded-lg transition-colors"
                                >
                                    Express Interest
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center py-4">
                <p className="text-slate-600 dark:text-slate-400 font-medium">Budget ₦5M – ₦8M</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {RECOMMENDED_PROPERTIES.slice(3).map((property) => (
                    <div key={property.id} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10 overflow-hidden flex flex-col">
                        <div className="relative">
                            <img
                                alt={property.title}
                                className="w-full h-52 object-cover"
                                src={property.image}
                            />
                            {property.isLocked && (
                                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-white p-5 text-center">
                                    <Lock className="w-10 h-10 mb-2" />
                                    <p className="font-semibold">Locked - Pending Update</p>
                                    <p className="text-sm text-slate-300">Contact agent for availability</p>
                                </div>
                            )}
                            <div className="absolute top-3 right-3 flex gap-2">
                                {!property.isLocked && (
                                    <button className="w-8 h-8 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 dark:hover:bg-black/40 transition-colors">
                                        <Clock className="w-4 h-4" />
                                    </button>
                                )}
                                <button
                                    onClick={() => toggleFavorite(property.id)}
                                    className="w-8 h-8 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 dark:hover:bg-black/40 transition-colors"
                                >
                                    <Heart
                                        className={`w-4 h-4 ${favorites.has(property.id) ? "fill-red-500 text-red-500" : ""}`}
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                ₦{property.price.toLocaleString()}/<span className="text-sm font-medium text-slate-500 dark:text-slate-400">{property.period}</span>
                            </p>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-1">{property.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{property.location}</p>
                            <div className="border-t border-slate-200/80 dark:border-slate-800/80 my-4"></div>
                            <div className="flex items-center gap-3 mt-auto">
                                <img
                                    alt={`Agent ${property.agent.name}`}
                                    className="w-8 h-8 rounded-full"
                                    src={property.agent.image}
                                />
                                <div>
                                    <p className="font-semibold text-sm text-slate-700 dark:text-slate-200">{property.agent.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Verified Agent</p>
                                </div>
                                {property.agent.verified && (
                                    <CheckCircle2 className="w-4 h-4 text-green-500 ml-1 fill-current" />
                                )}
                            </div>
                            {property.isLocked ? (
                                <div className="mt-4 w-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold py-3 rounded-lg text-center">
                                    Locked - Pending Update
                                </div>
                            ) : (
                                <Button
                                    onClick={() => onExpressInterest(property.title)}
                                    className="mt-4 w-full bg-blue-200/80 dark:bg-blue-800/50 hover:bg-blue-300/80 dark:hover:bg-blue-700/50 text-blue-800 dark:text-blue-200 font-semibold py-6 rounded-lg transition-colors"
                                >
                                    Express Interest
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
