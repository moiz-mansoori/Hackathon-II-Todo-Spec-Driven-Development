import api from '@/lib/api';

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface SignupData extends LoginData {
    name: string;
}

export const authService = {
    signup: async (data: SignupData): Promise<AuthResponse> => {
        const response = await api.post('auth/signup', data);
        const { token, user } = response.data;
        if (typeof window !== 'undefined') {
            localStorage.setItem('todo_token', token);
            localStorage.setItem('todo_user_id', user.id.toString());
        }
        return response.data;
    },

    signin: async (data: LoginData): Promise<AuthResponse> => {
        const response = await api.post('auth/signin', data);
        const { token, user } = response.data;
        if (typeof window !== 'undefined') {
            localStorage.setItem('todo_token', token);
            localStorage.setItem('todo_user_id', user.id.toString());
        }
        return response.data;
    },

    signout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('todo_token');
            localStorage.removeItem('todo_user_id');
        }
    },

    isAuthenticated: (): boolean => {
        if (typeof window !== 'undefined') {
            return !!localStorage.getItem('todo_token');
        }
        return false;
    },

    getUserId: (): string | null => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('todo_user_id');
        }
        return null;
    },
};
