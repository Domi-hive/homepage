
import { apiClient } from '@/lib/api-client';
import { UploadResponse } from '@/types/api';

export const uploadService = {
    async uploadFile(file: File): Promise<UploadResponse> {
        const formData = new FormData();
        formData.append('file', file);

        return apiClient.post<UploadResponse>('/upload', formData);
    },
};
