import { apiClient } from '@/lib/api-client';

// Document type from API
export interface DocumentType {
    id: string;
    name: string;
    description: string;
    isRequired: boolean;
    createdAt: string;
}

// KYC document submission response
export interface KYCDocument {
    id: string;
    agentProfile?: { id: string };
    documentType?: { id: string; name: string; description: string; isRequired: boolean; createdAt: string };
    url: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    comment: string | null;
    uploadedAt: string;
    isDeleted: boolean;
}

// Temporary mapping: Backend has 'nin' and 'voter's card', but we need 'nin' and 'selfie'
// TODO: Update backend to have proper 'selfie' document type
// For now, use voter's card ID for selfie uploads
const DOCUMENT_TYPE_NAMES = {
    NIN: 'nin',
    SELFIE: "voter's card", // Temporary workaround - see todo.md
} as const;

export const kycService = {
    /**
     * Get all accepted document types
     */
    async getDocumentTypes(): Promise<DocumentType[]> {
        return apiClient.get<DocumentType[]>('/kyc/document-types');
    },

    /**
     * Get document type ID by name
     */
    async getDocumentTypeId(typeName: 'nin' | 'selfie'): Promise<string | null> {
        const types = await this.getDocumentTypes();
        const targetName = typeName === 'selfie' ? DOCUMENT_TYPE_NAMES.SELFIE : DOCUMENT_TYPE_NAMES.NIN;
        const docType = types.find(t => t.name.toLowerCase() === targetName.toLowerCase());
        return docType?.id || null;
    },

    /**
     * Get the current agent's submitted documents
     */
    async getMyDocuments(): Promise<KYCDocument[]> {
        return apiClient.get<KYCDocument[]>('/kyc/documents/user');
    },

    /**
     * Get all pending documents (admin use)
     */
    async getPendingDocuments(): Promise<KYCDocument[]> {
        return apiClient.get<KYCDocument[]>('/kyc/documents/pending');
    },

    /**
     * Upload a KYC document
     * @param documentTypeId - The UUID of the document type
     * @param url - The URL of the uploaded document
     */
    async uploadDocument(documentTypeId: string, url: string): Promise<KYCDocument> {
        return apiClient.post<KYCDocument>('/kyc/documents', {
            documentTypeId,
            url,
        });
    },

    /**
     * Helper: Upload NIN document
     */
    async uploadNIN(url: string): Promise<KYCDocument> {
        const typeId = await this.getDocumentTypeId('nin');
        if (!typeId) throw new Error('NIN document type not found');
        return this.uploadDocument(typeId, url);
    },

    /**
     * Helper: Upload Selfie document
     * Note: Currently uses voter's card ID as temporary workaround
     */
    async uploadSelfie(url: string): Promise<KYCDocument> {
        const typeId = await this.getDocumentTypeId('selfie');
        if (!typeId) throw new Error('Selfie document type not found');
        return this.uploadDocument(typeId, url);
    },
};

