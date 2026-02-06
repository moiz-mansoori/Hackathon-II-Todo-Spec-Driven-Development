# Evolution of Todo - Phase 2 Constitution

> **Version**: 1.0.0 | **Ratified**: 2026-02-05

## Core Principles

### I. Full-Stack Web Architecture

Phase 2 transitions from CLI to web application with:
- **Backend**: FastAPI REST API with SQLModel ORM
- **Frontend**: Next.js App Router with TypeScript
- **Database**: Neon PostgreSQL (serverless)
- **Auth**: Better Auth with JWT tokens

**Rationale**: Modern stack enabling multi-user, persistent, responsive web app.

### II. Multi-User Isolation

Every user has their own isolated task list:
- User registration and authentication
- Tasks scoped to authenticated user
- No cross-user data access
- JWT verification on all protected endpoints

**Rationale**: Security-first design prevents data leakage.

### III. All Phase 1 Features

Inherits all 5 core features from Phase 1:
1. **Add Task**: Via API and UI
2. **Delete Task**: With confirmation
3. **Update Task**: Title and description
4. **View Tasks**: User's task list
5. **Toggle Complete**: Visual feedback

**Rationale**: Evolutionary design - no regression.

### IV. RESTful API Design

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/signup | Create account |
| POST | /api/auth/signin | Login |
| POST | /api/auth/signout | Logout |
| GET | /api/tasks | List user's tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/{id} | Update task |
| DELETE | /api/tasks/{id} | Delete task |
| PATCH | /api/tasks/{id}/complete | Toggle complete |

**Rationale**: Standard REST semantics for predictable API.

### V. Database-Backed Persistence

All data persists in PostgreSQL:
- Users table with hashed passwords
- Tasks table with user_id foreign key
- Timestamps for created_at, updated_at

**Rationale**: Data survives restarts, enables multi-device access.

### VI. Responsive UI

Frontend implements:
- Mobile-first responsive design
- Dark/light mode support
- Loading states and error handling
- Optimistic updates for snappy UX

**Rationale**: Production-quality user experience.

## Tech Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Backend | FastAPI | 0.109+ |
| ORM | SQLModel | 0.0.16+ |
| Database | Neon PostgreSQL | Latest |
| Auth | Better Auth | 1.0+ |
| Frontend | Next.js | 14+ |
| Styling | Tailwind CSS | 3.4+ |
| Language | Python 3.13+, TypeScript 5+ | |

## Compliance Checklist

- [ ] All API endpoints require authentication except signup/signin
- [ ] Passwords are hashed (bcrypt or argon2)
- [ ] JWT tokens have expiration
- [ ] User can only access own tasks
- [ ] API returns proper HTTP status codes
- [ ] Frontend handles all error states
- [ ] Tests cover auth flows
