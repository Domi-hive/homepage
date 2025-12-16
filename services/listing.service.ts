import { apiClient } from '@/lib/api-client';
import { Listing } from '@/types/api';

export const listingService = {
    async getAgentListings(agentId: string): Promise<Listing[]> {
        return apiClient.get<Listing[]>(`/listing/agent/${agentId}`);
    },

    async createListing(payload: Partial<Listing>): Promise<Listing> {
        return apiClient.post<Listing>('/listing', payload);
    },

    async getAllListings(): Promise<Listing[]> {
        return apiClient.get<Listing[]>('/listing');
    }
};
