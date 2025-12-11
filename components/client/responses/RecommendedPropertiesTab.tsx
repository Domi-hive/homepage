"use client"

import React from 'react';
import { Clock, Bed, Bath, Ruler, Camera } from 'lucide-react';
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
        bedrooms: 3,
        bathrooms: 3,
        sqft: 250,
        matchScore: 95
    },
    {
        id: 2,
        title: "Luxury 3-Bedroom Apartment",
        location: "Wuse II, Abuja",
        price: 2900000,
        period: "month",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf7p-AOcJHUknKdQ1APmoMjIwnbg7ym-mHOCubBe1L2KgmFR3_TbMG_M0cHwimg4CcjlO_6h0KYy6OwqJz0j5amuQWMuWq2qXzsYWqi2gAVol7rql7S2ewDsTSrQp3Lr_bA_g1ZXFAvW4EedtPJ9t89zcekpkPpmvmFUjqCfDW-sUzZbEk7qYYb0FAo8gXNARzaddtQTLUVLotz0-9I43hUj4Ey4mCMdj-RH4JI0cy213X5IIypt7BI8RDffcGlfKQE36ImujtxQ",
        bedrooms: 3,
        bathrooms: 4,
        sqft: 300,
        matchScore: 92
    },
    {
        id: 4,
        title: "Premium Penthouse with City Views",
        location: "Maitama, Abuja",
        price: 6500000,
        period: "month",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-HAfAFfXJdwETd24GF8yxSltDmyHW70ouIJcOJMumNTResxMIRYLM5B_fX-dXZs4tvtANw-Q9TqUFLqBO1fCEv4fI9yjWX6E4wyHexBEKnPIereamnWai_aInB08xg_15YztPWAi9pMGXj6Cjq41QXnz5GDFZK3zEKMDksFMxKIi7VeqUCBpduvJIFSV8yEg7sbDTn3btrMxs4tcdoyrqbWAgf5gyW6FK1m5IshrglUfRhhhyDbG-GZMzzSRnB9PPhr6C2_LTBQ",
        bedrooms: 4,
        bathrooms: 5,
        sqft: 450,
        matchScore: 98
    },
    {
        id: 5,
        title: "Modern Duplex in Asokoro",
        location: "Asokoro, Abuja",
        price: 7200000,
        period: "month",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuByRHAQYpHsvk8rOhuyonKuLAn2RWmRAT_At8WHHKmCBmDINQB_nFrWtcVeIdV_N-HCeCLBcMCb3n6W1_1mf4hJdF9tcaw8elu-wf8rY7gxOl0WnFdJlkBHfP7ItHEcR7av90nJ0u1-P1XUHu18XZ67M-7QFy9WJYhFuIHoDhNfJYDdsSE3shYlqqYTai8yRJCoBTPqY067V3N-I8Ob6QCPjVVwNj9QD9ZpABzJoopVnkO4wt-ZTwBELTWwk-VTyvWzpM5CLk9sBQ",
        bedrooms: 5,
        bathrooms: 6,
        sqft: 500,
        matchScore: 89
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                {RECOMMENDED_PROPERTIES.map((property) => (
                    <div key={property.id} className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-[0_8px_32px_0_rgba(100,100,150,0.15)] border border-white/50 dark:border-white/10 overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 hover:z-30 transition-all duration-300">
                        <div className="relative">
                            <img
                                alt={property.title}
                                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                                src={property.image}
                            />
                            <div className="absolute top-3 left-3 bg-slate-800/60 text-white text-xs font-semibold py-1 px-2.5 rounded-full backdrop-blur-sm">
                                {property.matchScore}% match
                            </div>
                            <div className="absolute bottom-3 right-3 bg-slate-800/60 text-white text-sm font-medium py-1 px-3 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                                <Camera className="w-4 h-4" />
                                <span>3</span>
                            </div>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-0.5 line-clamp-1">{property.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{property.location}</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-blue-400">
                                ₦{(property.price / 1000000).toFixed(1)}M<span className="text-sm font-medium text-slate-500 dark:text-slate-400 ml-1">/{property.period}</span>
                            </p>

                            <div className="mt-4 flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                                <div className="flex items-center gap-1.5">
                                    <Bed className="w-5 h-5 text-slate-400" />
                                    <span>{property.bedrooms}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Bath className="w-5 h-5 text-slate-400" />
                                    <span>{property.bathrooms}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Ruler className="w-5 h-5 text-slate-400" />
                                    <span>{property.sqft} sqm</span>
                                </div>
                            </div>

                            <Button
                                onClick={() => onExpressInterest(property.title)}
                                className="mt-6 w-full bg-blue-200/80 dark:bg-blue-800/50 hover:bg-blue-300/80 dark:hover:bg-blue-700/50 text-blue-800 dark:text-blue-200 font-semibold py-6 rounded-lg transition-colors"
                            >
                                Express Interest
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
