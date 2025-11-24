import React from 'react';
import { Heart, Camera, Bed, Bath, Ruler, MessageCircle } from 'lucide-react';

interface Property {
    id: string;
    title: string;
    image: string;
    location: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    qas: number;
}

interface PropertyCardProps {
    property: Property;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
    onClick: () => void;
}

export default function PropertyCard({ property, isFavorite, onToggleFavorite, onClick }: PropertyCardProps) {
    const formatPrice = (price: number) => {
        if (price >= 1000000) {
            return `₦${(price / 1000000).toFixed(1)}M`;
        }
        return `₦${price.toLocaleString()}`;
    };

    return (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/50 group cursor-pointer transition-transform hover:-translate-y-1 duration-300" onClick={onClick}>
            <div className="relative">
                <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-slate-800/60 text-white text-xs font-semibold py-1 px-2.5 rounded-full backdrop-blur-sm">
                    92% match
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(property.id);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 backdrop-blur-sm transition-colors"
                >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`} />
                </button>
                {property.qas > 0 && (
                    <div className="absolute bottom-3 left-3 bg-purple-500/80 text-white text-xs font-medium py-1 px-2 rounded-full flex items-center gap-1 backdrop-blur-sm">
                        <MessageCircle className="w-3 h-3" />
                        <span>{property.qas} Q&A</span>
                    </div>
                )}
                <div className="absolute bottom-3 right-3 bg-slate-800/60 text-white text-sm font-medium py-1 px-3 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                    <Camera className="w-4 h-4" />
                    <span>3</span>
                </div>
            </div>
            <div className="p-5">
                <h3 className="font-bold text-slate-800 text-lg mb-0.5 line-clamp-1">{property.title}</h3>
                <p className="text-sm text-slate-500 mb-2">{property.location}</p>
                <p className="text-2xl font-bold text-slate-900">{formatPrice(property.price)}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
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
            </div>
        </div>
    );
}
