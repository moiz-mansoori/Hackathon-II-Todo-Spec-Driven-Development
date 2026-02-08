import axios from 'axios';

const api = axios.create({
    baseURL: '/api',  // Use local Next.js API routes
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the JWT token and user ID
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('todo_token');
        const userId = localStorage.getItem('todo_user_id');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (userId) {
            config.headers['x-user-id'] = userId;
        }
    }
    return config;
});

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('todo_token');
                localStorage.removeItem('todo_user_id');
                window.location.href = '/signin';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
