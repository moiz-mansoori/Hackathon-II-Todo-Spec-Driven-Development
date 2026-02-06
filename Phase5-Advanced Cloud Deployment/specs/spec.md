# Phase 5: Cloud-Native Enhanced Todo

## Goal
Deploy an enhanced version of the Mansoori Todo application to the cloud (Vercel) with new features: due date reminders, priorities, tags, and analytics dashboard.

## Features

### 1. Enhanced Task Model
- **Due Date** - Task due date with visual indicators
- **Priority** - High, Medium, Low
- **Tags/Categories** - User-defined categories
- **Recurring Tasks** - Daily, Weekly, Monthly templates

### 2. Analytics Dashboard
- Task completion rate
- Overdue task count
- Tasks by priority breakdown
- Weekly/Monthly trends

### 3. Cloud Deployment
- **Frontend + API** → Vercel (Serverless)
- **Database** → Vercel Postgres or SQLite (for demo)

## Architecture

```
┌─────────────────────────────────────────────────┐
│                    VERCEL                        │
│  ┌─────────────────┐    ┌─────────────────────┐ │
│  │   Next.js App   │───▶│   API Routes        │ │
│  │   (Frontend)    │    │   (/api/*)          │ │
│  └─────────────────┘    └─────────────────────┘ │
│                                │                 │
│                                ▼                 │
│                    ┌───────────────────┐        │
│                    │  Vercel Postgres  │        │
│                    │    (Database)     │        │
│                    └───────────────────┘        │
└─────────────────────────────────────────────────┘
```

## Acceptance Criteria

1. [ ] Task model includes due_date, priority, and tags
2. [ ] Analytics page shows completion stats
3. [ ] App deployed to Vercel with working database
4. [ ] AI chatbot integrated with new features
