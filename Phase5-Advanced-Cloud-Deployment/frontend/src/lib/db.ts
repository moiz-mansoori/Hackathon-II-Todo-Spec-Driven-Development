import { Pool } from 'pg';

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// User functions
export async function createUser(name: string, email: string, passwordHash: string) {
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash) 
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [name, email, passwordHash]
  );
  return result.rows[0];
}

export async function getUserByEmail(email: string) {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
}

export async function getUserById(id: number) {
  const result = await pool.query(
    'SELECT id, name, email, created_at FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

// Task functions
export async function getTasks(userId: number) {
  const result = await pool.query(
    `SELECT * FROM tasks 
     WHERE user_id = $1
     ORDER BY 
       CASE WHEN due_date IS NULL THEN 1 ELSE 0 END,
       due_date ASC,
       CASE priority 
         WHEN 'high' THEN 1 
         WHEN 'medium' THEN 2 
         ELSE 3 
       END,
       created_at DESC`,
    [userId]
  );
  return result.rows.map(task => ({
    ...task,
    tags: task.tags || []
  }));
}

export async function getTaskById(id: number, userId: number) {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
    [id, userId]
  );
  if (result.rows[0]) {
    result.rows[0].tags = result.rows[0].tags || [];
  }
  return result.rows[0] || null;
}

export async function createTask(
  userId: number,
  title: string,
  description: string = '',
  priority: string = 'medium',
  dueDate: string | null = null,
  tags: string[] = []
) {
  const result = await pool.query(
    `INSERT INTO tasks (user_id, title, description, priority, due_date, tags)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [userId, title, description, priority, dueDate, JSON.stringify(tags)]
  );
  result.rows[0].tags = result.rows[0].tags || [];
  return result.rows[0];
}

export async function updateTask(
  id: number,
  userId: number,
  updates: { title?: string; description?: string; priority?: string; due_date?: string; tags?: string[]; is_complete?: boolean }
) {
  const task = await getTaskById(id, userId);
  if (!task) return null;

  const result = await pool.query(
    `UPDATE tasks SET
       title = COALESCE($1, title),
       description = COALESCE($2, description),
       priority = COALESCE($3, priority),
       due_date = COALESCE($4, due_date),
       tags = COALESCE($5, tags),
       is_complete = COALESCE($6, is_complete),
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $7 AND user_id = $8
     RETURNING *`,
    [
      updates.title,
      updates.description,
      updates.priority,
      updates.due_date,
      updates.tags ? JSON.stringify(updates.tags) : null,
      updates.is_complete,
      id,
      userId
    ]
  );

  if (result.rows[0]) {
    result.rows[0].tags = result.rows[0].tags || [];
  }
  return result.rows[0] || null;
}

export async function toggleTask(id: number, userId: number) {
  const result = await pool.query(
    `UPDATE tasks SET is_complete = NOT is_complete, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [id, userId]
  );
  if (result.rows[0]) {
    result.rows[0].tags = result.rows[0].tags || [];
  }
  return result.rows[0] || null;
}

export async function deleteTask(id: number, userId: number) {
  const result = await pool.query(
    'DELETE FROM tasks WHERE id = $1 AND user_id = $2',
    [id, userId]
  );
  return (result.rowCount ?? 0) > 0;
}

// Analytics functions
export async function getAnalytics(userId: number) {
  const result = await pool.query(
    `SELECT 
       COUNT(*)::int as total_tasks,
       COUNT(*) FILTER (WHERE is_complete = true)::int as completed_tasks,
       COUNT(*) FILTER (WHERE is_complete = false)::int as pending_tasks,
       COUNT(*) FILTER (WHERE is_complete = false AND due_date < CURRENT_DATE)::int as overdue_tasks,
       COUNT(*) FILTER (WHERE priority = 'high')::int as high_priority,
       COUNT(*) FILTER (WHERE priority = 'medium')::int as medium_priority,
       COUNT(*) FILTER (WHERE priority = 'low')::int as low_priority,
       COUNT(*) FILTER (WHERE due_date = CURRENT_DATE)::int as tasks_due_today,
       COUNT(*) FILTER (WHERE due_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days')::int as tasks_due_week,
       COUNT(*) FILTER (WHERE is_complete = true AND updated_at >= CURRENT_DATE - INTERVAL '7 days')::int as recent_completions
     FROM tasks 
     WHERE user_id = $1`,
    [userId]
  );

  const stats = result.rows[0];
  const totalTasks = stats.total_tasks || 0;
  const completedTasks = stats.completed_tasks || 0;

  return {
    totalTasks,
    completedTasks,
    pendingTasks: stats.pending_tasks || 0,
    overdueTasks: stats.overdue_tasks || 0,
    completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    tasksByPriority: {
      high: stats.high_priority || 0,
      medium: stats.medium_priority || 0,
      low: stats.low_priority || 0,
    },
    tasksDueToday: stats.tasks_due_today || 0,
    tasksDueThisWeek: stats.tasks_due_week || 0,
    recentCompletions: stats.recent_completions || 0,
  };
}

export default pool;
