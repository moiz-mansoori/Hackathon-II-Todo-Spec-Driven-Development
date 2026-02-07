import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
});

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8888/api';

// Defined tools for the AI Agent
const tools: any[] = [
    {
        type: 'function',
        function: {
            name: 'list_tasks',
            description: 'Lists all tasks for the user.',
            parameters: {
                type: 'object',
                properties: {},
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'create_task',
            description: 'Creates a new task.',
            parameters: {
                type: 'object',
                properties: {
                    title: { type: 'string', description: 'The title of the task.' },
                    description: { type: 'string', description: 'An optional description.' },
                },
                required: ['title'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'toggle_task',
            description: 'Marks a task as complete or incomplete.',
            parameters: {
                type: 'object',
                properties: {
                    task_id: { type: 'number', description: 'The ID of the task to toggle.' },
                },
                required: ['task_id'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'delete_task',
            description: 'Deletes a task by ID.',
            parameters: {
                type: 'object',
                properties: {
                    task_id: { type: 'number', description: 'The ID of the task to delete.' },
                },
                required: ['task_id'],
            },
        },
    }
];

export async function POST(req: Request) {
    try {
        const { messages, auth_token } = await req.json();

        if (!auth_token) {
            return NextResponse.json({ error: 'Auth token is required' }, { status: 401 });
        }

        const response = await openai.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful Todo Assistant. You can manage the user\'s tasks. When using tools, always use the provided auth_token. If you need to list tasks before performing an action (like finding an ID), do so automatically.'
                },
                ...messages,
            ],
            tools,
            tool_choice: 'auto',
        });

        const message = response.choices[0].message;

        // Handle Tool Calls
        if (message.tool_calls) {
            const toolCallResults = [];

            for (const toolCall of message.tool_calls as any[]) {
                const { name } = toolCall.function;
                const args = JSON.parse(toolCall.function.arguments);
                let result;

                const headers = { 'Authorization': `Bearer ${auth_token}` };

                try {
                    if (name === 'list_tasks') {
                        const res = await fetch(`${BACKEND_URL}/tasks`, { headers });
                        result = await res.json();
                    } else if (name === 'create_task') {
                        const res = await fetch(`${BACKEND_URL}/tasks`, {
                            method: 'POST',
                            headers: { ...headers, 'Content-Type': 'application/json' },
                            body: JSON.stringify(args),
                        });
                        result = await res.json();
                    } else if (name === 'toggle_task') {
                        const res = await fetch(`${BACKEND_URL}/tasks/${args.task_id}/complete`, {
                            method: 'PATCH',
                            headers,
                        });
                        result = await res.json();
                    } else if (name === 'delete_task') {
                        const res = await fetch(`${BACKEND_URL}/tasks/${args.task_id}`, {
                            method: 'DELETE',
                            headers,
                        });
                        result = { success: res.status === 200 };
                    }
                } catch (err) {
                    result = { error: 'Failed to execute tool' };
                }

                toolCallResults.push({
                    tool_call_id: toolCall.id,
                    role: 'tool',
                    name,
                    content: JSON.stringify(result),
                });
            }

            // Get final response after tool execution
            const finalResponse = await openai.chat.completions.create({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    ...messages,
                    message,
                    ...toolCallResults as any,
                ],
            });

            return NextResponse.json(finalResponse.choices[0].message);
        }

        return NextResponse.json(message);
    } catch (err: any) {
        console.error('Chat Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
