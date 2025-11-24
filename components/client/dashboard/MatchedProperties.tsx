import React from 'react';
import { Heart, ArrowLeft, ArrowRight, Check } from 'lucide-react';

const properties = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=320&h=192&fit=crop',
        price: 2700000,
        title: 'Modern 2-Bedroom in Wuse II',
        location: 'Wuse II, Abuja',
        status: 'available',
        agent: {
            name: 'John Adeyemi',
            avatar: 'https://i.pravatar.cc/32?img=1',
            verified: true,
        },
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=320&h=192&fit=crop',
        price: 4500000,
        title: 'Luxury Duplex in Maitama',
        location: 'Maitama, Abuja',
        status: 'available',
        agent: {
            name: 'Ada Okafor',
            avatar: 'https://i.pravatar.cc/32?img=2',
            verified: true,
        },
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=320&h=192&fit=crop',
        price: 1800000,
        title: 'Cozy Studio in Garki',
        location: 'Garki, Abuja',
        status: 'scheduled',
        agent: {
            name: 'Chidi Eze',
            avatar: 'https://i.pravatar.cc/32?img=3',
            verified: true,
        },
    },
];

export default function MatchedProperties() {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="mb-10">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 leading-8 m-0 mb-1">Matched Properties</h2>
                    <p className="text-base text-slate-600 leading-6 m-0">
                        Properties that meet your request preferences
                    </p>
                </div>
                <div className="flex gap-3">
                    <button type="button" className="w-10 h-10 border-none bg-white/80 rounded-full cursor-pointer flex items-center justify-center text-xl transition-colors hover:bg-white" aria-label="Previous">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button type="button" className="w-10 h-10 border-none bg-white/80 rounded-full cursor-pointer flex items-center justify-center text-xl transition-colors hover:bg-white" aria-label="Next">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
                {properties.map((property) => (
                    <div key={property.id} className="bg-white/60 border border-white/50 rounded-[32px] overflow-hidden backdrop-blur-md">
                        <div className="relative w-full h-48 overflow-hidden">
                            <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-full object-cover block"
                            />
                            <button type="button" className="absolute top-4 right-4 w-9 h-9 border-none bg-black/30 rounded-full text-white text-lg cursor-pointer flex items-center justify-center transition-colors hover:bg-black/50" aria-label="Favorite">
                                <Heart className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-5">
                            <div className="flex items-baseline gap-2 mb-3">
                                <span className="text-xl font-bold text-slate-900 leading-7">{formatPrice(property.price)}</span>
                                <span className="text-sm font-medium text-slate-600 leading-5">/month</span>
                            </div>
                            <h3 className="text-base font-semibold text-slate-900 leading-6 m-0 mb-1">{property.title}</h3>
                            <p className="text-sm text-slate-600 leading-5 m-0 mb-3">{property.location}</p>
                            <div className="mb-4">
                                <span
                                    className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium leading-4 ${property.status === 'available'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-orange-100 text-orange-700'
                                        }`}
                                >
                                    {property.status === 'available'
                                        ? 'Available for Inspection'
                                        : 'Inspection Scheduled'}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                <img
                                    src={property.agent.avatar}
                                    alt={property.agent.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-slate-700 leading-5 mb-0.5">{property.agent.name}</div>
                                    {property.agent.verified && (
                                        <div className="flex items-center gap-1 text-xs text-slate-600 leading-4">
                                            <Check className="w-3 h-3 text-emerald-500 font-bold" />
                                            <span>Verified Agent</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
