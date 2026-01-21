export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    role: 'user' | 'agent' | 'admin';
    [key: string]: any;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
    message?: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: 'user' | 'agent';
}

export interface PropertyRequestPayload {
    location: string;
    propertyType: string;
    bedrooms: string | number; // Frontend currently can send empty string or number
    bathrooms: string | number;
    offerType: string;
    budgetRange: string;
    additionalInfo: string;
}

// Based on the discrepancy, we define what the backend *should* return or what we currently ignore
export interface PropertyRequestResponse {
    id: string;
    // Add other fields as we discover them
    [key: string]: any;
}

export interface PropertyType {
    id: string;
    label: string; // Assuming 'label' or 'name'
    value?: string; // Sometimes APIs return value/label pairs
    [key: string]: any;
}

export interface Property {
    id: string;
    title: string;
    location: string;
    price: number | string; // UI uses string checks sometimes
    bedrooms: number;
    bathrooms: number;
    images?: string[];
    sqft?: number; // Added for UI
    [key: string]: any;
}

export interface Listing extends Property {
    agentId: string;
    status: 'active' | 'draft' | 'sold';
    createdAt: string;

    // UI specific fields (can be mapped or optional)
    image?: string; // UI uses this single image property sometimes
    beds?: number; // UI uses 'beds' alias
    baths?: number; // UI uses 'baths' alias
    lastUpdated?: string;
    isStale?: boolean;
    isAvailable?: boolean;
    referralsOn?: boolean;
    activeResponses?: number;
}


export interface UploadResponse {
    message: string;
    data: {
        publicId: string;
        url: string;
        format: string;
        width: number;
        height: number;
        bytes: number;
        createdAt: string;
    };
}
