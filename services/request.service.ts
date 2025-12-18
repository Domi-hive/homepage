import { apiClient } from '@/lib/api-client';
import { PropertyRequestPayload, PropertyRequestResponse } from '@/types/api';

export const requestService = {
    async createPropertyRequest(payload: PropertyRequestPayload): Promise<PropertyRequestResponse> {
        return apiClient.post<PropertyRequestResponse>('/requests', payload);
    },

    async getUserRequests(userId?: string): Promise<any[]> {
        // If userId is provided, usage might differ based on API. 
        // For now, assuming /users/requests/all gets requests for current authenticated user.
        return apiClient.get<any[]>('/users/requests/all');
    },

    async getAllRequests(): Promise<any[]> {
        return apiClient.get<any[]>('/requests');
    },

    async sendRequestResponse(requestId: string, payload: { agentId: string, propertyIds: string[], message: string }): Promise<any> {
        return apiClient.post<any>(`/request-response/${requestId}/respond`, payload);
    }
};
