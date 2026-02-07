import api from '@/lib/api';

export interface Task {
    id: number;
    title: string;
    description: string;
    is_complete: boolean;
    user_id: number;
    priority: 'low' | 'medium' | 'high';
    due_date: string | null;
    tags: string[];
    created_at: string;
    updated_at: string;
}

export interface TaskCreate {
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    due_date?: string | null;
    tags?: string[];
}

export interface TaskUpdate {
    title?: string;
    description?: string;
    is_complete?: boolean;
    priority?: 'low' | 'medium' | 'high';
    due_date?: string | null;
    tags?: string[];
}

export const taskService = {
    getTasks: async (): Promise<Task[]> => {
        const response = await api.get('tasks');
        return response.data;
    },

    createTask: async (task: TaskCreate): Promise<Task> => {
        const response = await api.post('tasks', task);
        return response.data;
    },

    updateTask: async (id: number, task: TaskUpdate): Promise<Task> => {
        const response = await api.put(`tasks/${id}`, task);
        return response.data;
    },

    deleteTask: async (id: number): Promise<void> => {
        await api.delete(`tasks/${id}`);
    },

    toggleComplete: async (id: number): Promise<Task> => {
        const response = await api.patch(`tasks/${id}`);
        return response.data;
    },
};
