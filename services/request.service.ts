import { apiClient } from '@/lib/api-client';
import { PropertyRequestPayload, PropertyRequestResponse } from '@/types/api';

export const requestService = {
    async createPropertyRequest(payload: PropertyRequestPayload): Promise<PropertyRequestResponse> {
        return apiClient.post<PropertyRequestResponse>('/requests', payload);
    },
};
