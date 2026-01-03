import { apiClient } from '@/lib/api-client';
import { Listing } from '@/types/api';

// Raw API response types
interface ApiProperty {
    id: string;
    address: string;
    city: string;
    state: string;
    country: string;
    bedrooms: number;
    bathrooms: number;
    squareMeters: string;
    yearBuilt: number | null;
    description: string;
    imageUrls: string[];
    features: string[];
    agent: any;
    createdAt: string;
    updatedAt: string;
}

interface ApiListing {
    id: string;
    property: ApiProperty;
    status: string;
    type: string;
    price: string;
    isActive: boolean;
    closedAt: string | null;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    listingPeriod: string;
    meetingPoint: string;
    inspectionDates: string[];
}

// Transform API listing to UI Listing format
function transformListing(apiListing: ApiListing): Listing {
    const property = apiListing.property;
    const price = parseFloat(apiListing.price);

    // Format price for display
    const formatPrice = (p: number): string => {
        if (p >= 1000000) return `₦${(p / 1000000).toFixed(1)}M`;
        if (p >= 1000) return `₦${(p / 1000).toFixed(0)}K`;
        return `₦${p}`;
    };

    // Calculate if listing is stale (older than 7 days)
    const updatedAt = new Date(apiListing.updatedAt);
    const daysSinceUpdate = Math.floor((Date.now() - updatedAt.getTime()) / (1000 * 60 * 60 * 24));
    const isStale = daysSinceUpdate > 7;

    return {
        id: apiListing.id,
        title: `${property.bedrooms} Bed ${property.city} Property`,
        location: `${property.city}, ${property.state}`,
        price: formatPrice(price),
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        image: property.imageUrls?.[0] || undefined,
        images: property.imageUrls,
        sqft: parseFloat(property.squareMeters) || 0,
        agentId: property.agent?.id || '',
        status: apiListing.status as 'active' | 'draft' | 'sold',
        createdAt: apiListing.createdAt,
        beds: property.bedrooms,
        baths: property.bathrooms,
        lastUpdated: updatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        isStale,
        isAvailable: apiListing.isActive && apiListing.status === 'active',
        referralsOn: false, // Not in API yet
        activeResponses: 0, // Not in API yet
    };
}

export const listingService = {
    async getAgentListings(agentId: string): Promise<Listing[]> {
        return apiClient.get<Listing[]>(`/listing/agent/${agentId}`);
    },

    async getMyListings(): Promise<Listing[]> {
        const response = await apiClient.get<ApiListing[]>('/listing/me');
        // Handle both array and single object response
        const listings = Array.isArray(response) ? response : [response];
        return listings.map(transformListing);
    },

    async createListing(payload: Partial<Listing>): Promise<Listing> {
        return apiClient.post<Listing>('/listing', payload);
    },

    async getAllListings(): Promise<Listing[]> {
        return apiClient.get<Listing[]>('/listing');
    }
};
