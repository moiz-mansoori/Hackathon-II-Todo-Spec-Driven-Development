'use client';

import { useState, useEffect } from 'react';
import { taskService, Task } from '@/services/taskService';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, CheckCircle, Circle, LogOut, Layout, ListTodo, CheckSquare, Clock, PlusCircle, Loader2 } from 'lucide-react';
import AuthWrapper from '@/components/AuthWrapper';
import { cn } from '@/lib/utils';
import ChatPanel from '@/components/ChatPanel';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [loading, setLoading] = useState(true);
  const [addingTask, setAddingTask] = useState(false);
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const newTask = await taskService.createTask({
        title: newTitle,
        description: newDesc
      });
      setTasks([newTask, ...tasks]);
      setNewTitle('');
      setNewDesc('');
      setAddingTask(false);
    } catch (err) {
      console.error('Failed to add task', err);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      const updated = await taskService.toggleComplete(id);
      setTasks(tasks.map(t => t.id === id ? updated : t));
    } catch (err) {
      console.error('Failed to toggle task', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleSignout = () => {
    authService.signout();
    window.location.href = '/signin';
  };

  const completedCount = tasks.filter(t => t.is_complete).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-[#0b0f19] text-slate-100 selection:bg-indigo-500/30">
        {/* Navbar */}
        <nav className="sticky top-0 z-10 backdrop-blur-xl bg-slate-900/60 border-b border-white/5">
          <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl shadow-lg shadow-indigo-500/20">
                <Layout className="w-6 h-6 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-r from-white to-slate-400">Mansoori Tasks</span>
            </div>
            <button
              onClick={handleSignout}
              className="flex items-center gap-2 px-5 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all font-bold border border-transparent hover:border-white/10"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </nav>

        <main className="max-w-5xl mx-auto px-4 py-12">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Total Tasks', value: tasks.length, icon: ListTodo, color: 'indigo' },
              { label: 'Completed', value: completedCount, icon: CheckSquare, color: 'emerald' },
              { label: 'Pending', value: pendingCount, icon: Clock, color: 'amber' }
            ].map((stat) => (
              <div key={stat.label} className="bg-[#161e2c]/60 backdrop-blur-xl p-7 rounded-3xl shadow-2xl border border-white/5 flex items-center gap-5 group hover:scale-[1.02] transition-all duration-300">
                <div className={cn(
                  "p-4 rounded-2xl shadow-inner transition-colors",
                  stat.color === 'indigo' && "bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white",
                  stat.color === 'emerald' && "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white",
                  stat.color === 'amber' && "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-white"
                )}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">Welcome to Mansoori Todo Dashboard</h2>
              <p className="text-slate-400 font-medium tracking-wide">Ready to conquer your goals?</p>
            </div>
            <button
              onClick={() => setAddingTask(!addingTask)}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              <PlusCircle className="w-5 h-5" />
              New Task
            </button>
          </div>

          {/* Add Task Form */}
          {addingTask && (
            <div className="mb-10 animate-fade-in">
              <form onSubmit={handleAddTask} className="bg-[#161e2c]/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/5 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Task Name</label>
                  <input
                    type="text"
                    placeholder="E.g., Complete Project Documentation"
                    required
                    className="w-full px-5 py-4 bg-[#0b0f19] border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 font-medium text-white placeholder:text-slate-600"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Description</label>
                  <textarea
                    placeholder="Details about this task..."
                    className="w-full px-5 py-4 bg-[#0b0f19] border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 min-h-[120px] font-medium text-white placeholder:text-slate-600"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                </div>
                <div className="flex gap-4 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setAddingTask(false)}
                    className="px-8 py-4 text-slate-400 hover:bg-white/5 rounded-2xl transition-all font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-10 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-500/20"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Task List */}
          <div className="space-y-5">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-28 bg-[#161e2c]/40 backdrop-blur-sm rounded-[40px] border-4 border-dashed border-white/5 animate-fade-in">
                <div className="mx-auto w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <ListTodo className="w-12 h-12 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-black text-white">Clear Slate!</h3>
                <p className="text-slate-400 font-medium mt-2 max-w-xs mx-auto text-lg leading-relaxed">
                  You don't have any tasks scheduled yet. Start by adding one.
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "group flex items-start gap-5 p-6 bg-[#161e2c]/80 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl hover:bg-slate-800/50 transition-all duration-300 animate-fade-in",
                    task.is_complete && "opacity-40 bg-slate-900/50 border-transparent"
                  )}
                >
                  <button
                    onClick={() => handleToggle(task.id)}
                    className={cn(
                      "mt-1 p-1 rounded-2xl transition-all shadow-sm",
                      task.is_complete ? "text-emerald-600 bg-emerald-50" : "text-slate-300 bg-slate-50 hover:text-indigo-600 hover:bg-indigo-50 group-hover:scale-110"
                    )}
                  >
                    {task.is_complete ? <CheckCircle className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
                  </button>
                  <div className="flex-1 min-w-0 py-1">
                    <h3 className={cn(
                      "text-xl font-bold text-white truncate tracking-tight transition-all",
                      task.is_complete && "line-through text-slate-600"
                    )}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className={cn(
                        "mt-1.5 text-slate-400 font-medium text-sm leading-relaxed line-clamp-2",
                        task.is_complete && "text-slate-600"
                      )}>
                        {task.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all flex-shrink-0 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              ))
            )}
          </div>
        </main>

        {/* AI Chatbot */}
        <ChatPanel onTaskAction={fetchTasks} />
      </div>
    </AuthWrapper>
  );
}
