import api from '@/lib/api';

export interface User {
    id: number;
    email: string;
}

export interface AuthResponse extends User {
    token: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface SignupData extends LoginData { }

export const authService = {
    signup: async (data: SignupData): Promise<AuthResponse> => {
        const response = await api.post('auth/signup', data);
        const { token } = response.data;
        if (typeof window !== 'undefined') {
            localStorage.setItem('todo_token', token);
        }
        return response.data;
    },

    signin: async (data: LoginData): Promise<AuthResponse> => {
        const response = await api.post('auth/signin', data);
        const { token } = response.data;
        if (typeof window !== 'undefined') {
            localStorage.setItem('todo_token', token);
        }
        return response.data;
    },

    signout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('todo_token');
        }
    },

    isAuthenticated: (): boolean => {
        if (typeof window !== 'undefined') {
            return !!localStorage.getItem('todo_token');
        }
        return false;
    },
};
