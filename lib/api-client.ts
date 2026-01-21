export const API_BASE_URL = 'https://s-dev.domihive.com';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions extends RequestInit {
    token?: string;
    skipAuth?: boolean;
}

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(endpoint: string, method: RequestMethod, data?: any, options?: RequestOptions): Promise<T> {
        const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

        const isFormData = data instanceof FormData;

        const headers: Record<string, string> = {
            ...(!isFormData && { 'Content-Type': 'application/json' }),
            ...(options?.headers as Record<string, string>),
        };

        if (!options?.skipAuth) {
            const token = localStorage.getItem('authToken');
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        const config: RequestInit = {
            method,
            headers,
            ...options,
        };

        if (data) {
            config.body = isFormData ? data : JSON.stringify(data);
        }

        try {
            const response = await fetch(url, config);
            const responseData = await response.json().catch(() => ({})); // Handle empty responses gracefully

            if (!response.ok) {
                throw new Error(responseData.message || responseData.error || `API Error: ${response.statusText}`);
            }

            return responseData as T;
        } catch (error: any) {
            // Rethrow or handle commonly
            const isAuthError = error.message?.includes('Unauthorized') || error.message?.includes('401');
            if (!isAuthError) {
                console.error(`API Request Failed: ${endpoint}`, error);
            }
            throw error;
        }
    }

    public get<T>(endpoint: string, options?: RequestOptions) {
        return this.request<T>(endpoint, 'GET', undefined, options);
    }

    public post<T>(endpoint: string, data: any, options?: RequestOptions) {
        return this.request<T>(endpoint, 'POST', data, options);
    }

    public put<T>(endpoint: string, data: any, options?: RequestOptions) {
        return this.request<T>(endpoint, 'PUT', data, options);
    }

    public delete<T>(endpoint: string, options?: RequestOptions) {
        return this.request<T>(endpoint, 'DELETE', undefined, options);
    }

    public patch<T>(endpoint: string, data: any, options?: RequestOptions) {
        return this.request<T>(endpoint, 'PATCH', data, options);
    }
}

export const apiClient = new ApiClient(API_BASE_URL);
