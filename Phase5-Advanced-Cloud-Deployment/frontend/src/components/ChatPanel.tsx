'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatPanelProps {
    onTaskAction?: () => void;
}

export default function ChatPanel({ onTaskAction }: ChatPanelProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hello! I am your AI Todo Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            const token = localStorage.getItem('todo_token');
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, { role: 'user', content: userMsg }],
                    auth_token: token
                })
            });

            const data = await response.json();

            if (data.role === 'assistant') {
                setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
                // If the AI mentioned performing an action, refresh the task list
                if (data.content.toLowerCase().includes('created') ||
                    data.content.toLowerCase().includes('deleted') ||
                    data.content.toLowerCase().includes('updated') ||
                    data.content.toLowerCase().includes('marked')) {
                    onTaskAction?.();
                }
            } else if (data.error) {
                setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.error}` }]);
            }
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please check your Groq API key and ensure the backend is running.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Bubble */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative"
                >
                    <div className="absolute -top-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-[#161e2c] animate-pulse" />
                    <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="w-[400px] h-[600px] bg-[#161e2c]/90 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col overflow-hidden animate-fade-in text-white">
                    {/* Header */}
                    <div className="p-6 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border-b border-white/5 flex items-center justify-between shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-500/20 rounded-xl">
                                <Bot className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg leading-tight">Todo Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span className="text-xs font-semibold text-slate-300">Llama 3.3 Active</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/10 rounded-xl transition-all"
                        >
                            <X className="w-6 h-6 text-slate-400" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800"
                    >
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "flex items-start gap-3 animate-fade-in",
                                    msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                                )}
                            >
                                <div className={cn(
                                    "p-2 rounded-xl shrink-0",
                                    msg.role === 'user' ? "bg-slate-800 text-slate-400" : "bg-indigo-500/10 text-indigo-400"
                                )}>
                                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                </div>
                                <div className={cn(
                                    "px-4 py-3 rounded-2xl max-w-[80%] text-sm font-medium leading-relaxed shadow-sm",
                                    msg.role === 'user'
                                        ? "bg-indigo-500 text-white rounded-tr-none"
                                        : "bg-[#0b0f19] border border-white/5 text-slate-200 rounded-tl-none"
                                )}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-3 animate-pulse">
                                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div className="px-4 py-3 rounded-2xl bg-[#0b0f19] border border-white/5 text-slate-400 text-sm font-medium flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    AI is thinking...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-[#0b0f19]/50 border-t border-white/5">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Ask me to add or list tasks..."
                                className="w-full pl-5 pr-14 py-4 bg-[#0b0f19] border border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium shadow-inner text-white placeholder:text-slate-600"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl disabled:opacity-50 disabled:hover:bg-indigo-500 transition-all shadow-lg active:scale-95"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            </button>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-3 text-center flex items-center justify-center gap-1 font-bold tracking-wider uppercase">
                            <Sparkles className="w-3 h-3" />
                            Powered by Groq Llama 3.3
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
