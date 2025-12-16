import { apiClient } from '@/lib/api-client';
import { LoginPayload, SignupPayload, AuthResponse } from '@/types/api';

export const authService = {
    async login(credentials: LoginPayload): Promise<AuthResponse> {
        return apiClient.post<AuthResponse>('/auth/login', credentials, { skipAuth: true });
    },

    async signup(payload: SignupPayload): Promise<AuthResponse> {
        return apiClient.post<AuthResponse>('/auth/signup', payload, { skipAuth: true });
    },

    // Helper to centralize session management (optional usage)
    setSession(data: AuthResponse) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('authToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('userRole', data.user.role);
            localStorage.setItem('userData', JSON.stringify(data.user));

            document.cookie = `authToken=${data.accessToken}; path=/; max-age=86400; SameSite=Strict`;
            document.cookie = `userRole=${data.user.role}; path=/; max-age=86400; SameSite=Strict`;
        }
    },

    clearSession() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userData');

            // Clear cookies
            document.cookie = 'authToken=; path=/; max-age=0; SameSite=Strict';
            document.cookie = 'userRole=; path=/; max-age=0; SameSite=Strict';
        }
    }
};
