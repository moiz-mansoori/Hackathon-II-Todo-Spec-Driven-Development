'use client';

import { useState, useEffect, useMemo } from 'react';
import { taskService, Task } from '@/services/taskService';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Trash2, CheckCircle2, Circle, LogOut, BarChart3, Loader2, Calendar, Tag, Flag, Search, Filter, ArrowUpDown, X } from 'lucide-react';
import AuthWrapper from '@/components/AuthWrapper';
import { cn } from '@/lib/utils';

// Available categories/tags
const CATEGORIES = ['work', 'personal', 'shopping', 'health', 'finance', 'learning'];

type FilterStatus = 'all' | 'pending' | 'completed';
type SortOption = 'date' | 'priority' | 'title' | 'due_date';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newDueDate, setNewDueDate] = useState('');
  const [newTags, setNewTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingTask, setAddingTask] = useState(false);
  const router = useRouter();

  // Search, Filter, Sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date');

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

  // Filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query) ||
        task.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (filterStatus === 'pending') {
      result = result.filter(task => !task.is_complete);
    } else if (filterStatus === 'completed') {
      result = result.filter(task => task.is_complete);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'priority':
          const priorityOrder = { high: 1, medium: 2, low: 3 };
          return (priorityOrder[a.priority as keyof typeof priorityOrder] || 3) -
            (priorityOrder[b.priority as keyof typeof priorityOrder] || 3);
        case 'due_date':
          if (!a.due_date && !b.due_date) return 0;
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        case 'date':
        default:
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      }
    });

    return result;
  }, [tasks, searchQuery, filterStatus, sortBy]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const newTask = await taskService.createTask({
        title: newTitle,
        description: newDesc,
        priority: newPriority,
        due_date: newDueDate || null,
        tags: newTags,
      });
      setTasks([newTask, ...tasks]);
      setNewTitle('');
      setNewDesc('');
      setNewPriority('medium');
      setNewDueDate('');
      setNewTags([]);
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
    window.location.href = '/';
  };

  const toggleTag = (tag: string) => {
    setNewTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const completedCount = tasks.filter(t => t.is_complete).length;
  const pendingCount = tasks.length - completedCount;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/10 border-green-500/20';
      default: return 'text-neutral-400 bg-neutral-500/10 border-neutral-500/20';
    }
  };

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      work: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      personal: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      shopping: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
      health: 'text-green-400 bg-green-500/10 border-green-500/20',
      finance: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      learning: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    };
    return colors[tag] || 'text-neutral-400 bg-neutral-500/10 border-neutral-500/20';
  };

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-neutral-900 via-[#0a0a0a] to-neutral-900" />
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-neutral-800/10 rounded-full blur-3xl" />
        <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-neutral-800/10 rounded-full blur-3xl" />

        {/* Navbar */}
        <nav className="relative sticky top-0 z-10 backdrop-blur-xl bg-neutral-900/50 border-b border-neutral-800">
          <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-black" />
              </div>
              <span className="font-semibold text-white">Mansoori Todo</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/analytics"
                className="flex items-center gap-2 px-4 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all text-sm"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Analytics</span>
              </Link>
              <button
                onClick={handleSignout}
                className="flex items-center gap-2 px-4 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </nav>

        <main className="relative max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white mb-2">Your Tasks</h1>
            <p className="text-neutral-500">
              {tasks.length === 0 ? 'No tasks yet. Create your first one!' : `${pendingCount} pending, ${completedCount} completed`}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
              <p className="text-neutral-500 text-sm mb-1">Total</p>
              <p className="text-2xl font-semibold text-white">{tasks.length}</p>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
              <p className="text-neutral-500 text-sm mb-1">Completed</p>
              <p className="text-2xl font-semibold text-green-400">{completedCount}</p>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4">
              <p className="text-neutral-500 text-sm mb-1">Pending</p>
              <p className="text-2xl font-semibold text-yellow-400">{pendingCount}</p>
            </div>
          </div>

          {/* Search, Filter, Sort Bar */}
          <div className="flex flex-wrap gap-3 mb-6">
            {/* Search */}
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-600 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                className="pl-10 pr-8 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700 appearance-none cursor-pointer"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="pl-10 pr-8 py-2.5 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700 appearance-none cursor-pointer"
              >
                <option value="date">Newest First</option>
                <option value="priority">By Priority</option>
                <option value="due_date">By Due Date</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Add Task Button / Form */}
          {!addingTask ? (
            <button
              onClick={() => setAddingTask(true)}
              className="w-full mb-8 py-4 border-2 border-dashed border-neutral-800 hover:border-neutral-600 rounded-xl text-neutral-500 hover:text-neutral-300 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add new task
            </button>
          ) : (
            <div className="mb-8 bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Task title..."
                    required
                    autoFocus
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-700 text-white placeholder:text-neutral-600 text-sm"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Description (optional)..."
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-700 text-white placeholder:text-neutral-600 text-sm min-h-[80px] resize-none"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-xs text-neutral-500 mb-1">Priority</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as 'low' | 'medium' | 'high')}
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-xs text-neutral-500 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700"
                    />
                  </div>
                </div>

                {/* Category/Tags Selection */}
                <div>
                  <label className="block text-xs text-neutral-500 mb-2">Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs border transition-all capitalize",
                          newTags.includes(tag)
                            ? getTagColor(tag)
                            : "text-neutral-500 bg-neutral-800/50 border-neutral-700 hover:border-neutral-600"
                        )}
                      >
                        <Tag className="w-3 h-3 inline mr-1" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setAddingTask(false)}
                    className="px-4 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-white hover:bg-neutral-200 text-black font-medium rounded-lg transition-all text-sm"
                  >
                    Create task
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Results Count */}
          {(searchQuery || filterStatus !== 'all') && (
            <p className="text-neutral-500 text-sm mb-4">
              Showing {filteredTasks.length} of {tasks.length} tasks
              {searchQuery && <span> matching "{searchQuery}"</span>}
            </p>
          )}

          {/* Task List */}
          <div className="space-y-3">
            {loading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-8 h-8 text-neutral-600 animate-spin" />
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-16 border border-neutral-800 rounded-xl">
                <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {searchQuery || filterStatus !== 'all' ? (
                    <Search className="w-6 h-6 text-neutral-500" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6 text-neutral-500" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-white mb-1">
                  {searchQuery || filterStatus !== 'all' ? 'No matching tasks' : 'No tasks yet'}
                </h3>
                <p className="text-neutral-500 text-sm">
                  {searchQuery || filterStatus !== 'all'
                    ? 'Try adjusting your search or filter'
                    : 'Click "Add new task" to get started'}
                </p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "group flex items-start gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:bg-neutral-800/50 transition-all",
                    task.is_complete && "opacity-50"
                  )}
                >
                  <button
                    onClick={() => handleToggle(task.id)}
                    className={cn(
                      "mt-0.5 flex-shrink-0 transition-colors",
                      task.is_complete ? "text-green-500" : "text-neutral-600 hover:text-neutral-400"
                    )}
                  >
                    {task.is_complete ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      "text-white font-medium",
                      task.is_complete && "line-through text-neutral-500"
                    )}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-neutral-500 text-sm mt-1 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {task.priority && (
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border",
                          getPriorityColor(task.priority)
                        )}>
                          <Flag className="w-3 h-3" />
                          {task.priority}
                        </span>
                      )}
                      {task.due_date && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs text-neutral-400 bg-neutral-800 border border-neutral-700">
                          <Calendar className="w-3 h-3" />
                          {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      )}
                      {task.tags && task.tags.length > 0 && task.tags.map(tag => (
                        <span
                          key={tag}
                          className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border capitalize",
                            getTagColor(tag)
                          )}
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="flex-shrink-0 p-2 text-neutral-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </AuthWrapper>
  );
}
