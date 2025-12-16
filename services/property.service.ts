import { apiClient } from '@/lib/api-client';
import { Property, PropertyType } from '@/types/api';

export const propertyService = {
    async getPropertyTypes(): Promise<PropertyType[]> {
        return apiClient.get<PropertyType[]>('/properties/types/all');
    },

    async getProperties(filters?: Record<string, any>): Promise<Property[]> {
        // Construct query string from filters if needed, passing simple params for now
        const queryString = filters ? '?' + new URLSearchParams(filters).toString() : '';
        return apiClient.get<Property[]>('/properties' + queryString);
    },

    async getMatchedProperties(): Promise<Property[]> {
        // Assuming /properties returns matched properties for now, or we might need a specific endpoint
        return this.getProperties();
    }
};
