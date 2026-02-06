# Feature Specification: Phase 2 - Full-Stack Todo Web App

**Feature**: `fullstack-web`
**Created**: 2026-02-05
**Status**: Draft

---

## User Stories & Acceptance Criteria

### US-1: User Registration (Priority: P1)

As a new user, I want to create an account so I can securely access my personal task list.

**Acceptance Scenarios:**
1. **Given** signup page, **When** user enters valid email/password, **Then** account created and user logged in
2. **Given** existing email, **When** user tries to signup, **Then** error "Email already registered"
3. **Given** weak password (<8 chars), **When** user submits, **Then** validation error shown

---

### US-2: User Login/Logout (Priority: P1)

As a registered user, I want to login/logout to access my tasks securely.

**Acceptance Scenarios:**
1. **Given** valid credentials, **When** user logs in, **Then** redirected to dashboard with tasks
2. **Given** invalid credentials, **When** user tries login, **Then** error "Invalid credentials"
3. **Given** logged in user, **When** clicks logout, **Then** session ends and redirected to login

---

### US-3: Task CRUD Operations (Priority: P1)

As an authenticated user, I want to create, read, update, delete tasks.

**Acceptance Scenarios:**
1. **Given** logged in, **When** user creates task, **Then** task appears in list
2. **Given** existing task, **When** user edits title, **Then** changes saved and displayed
3. **Given** existing task, **When** user deletes, **Then** task removed from list
4. **Given** logged out, **When** accessing /dashboard, **Then** redirected to login

---

### US-4: Task Completion Toggle (Priority: P2)

As a user, I want to mark tasks complete/incomplete to track progress.

**Acceptance Scenarios:**
1. **Given** pending task, **When** user clicks checkbox, **Then** task marked complete with visual feedback
2. **Given** complete task, **When** user clicks checkbox, **Then** task marked pending
3. **Given** completion change, **When** page refreshes, **Then** status persists

---

### US-5: Data Isolation (Priority: P1)

As a user, my tasks must be private and inaccessible to other users.

**Acceptance Scenarios:**
1. **Given** User A's tasks, **When** User B logs in, **Then** User B cannot see User A's tasks
2. **Given** API call with wrong user's task ID, **Then** 403 Forbidden returned
3. **Given** JWT expired, **Then** 401 Unauthorized and redirect to login

---

## API Specification

### Authentication Endpoints

| Endpoint | Method | Request Body | Response |
|----------|--------|--------------|----------|
| `/api/auth/signup` | POST | `{email, password}` | `{user, token}` |
| `/api/auth/signin` | POST | `{email, password}` | `{user, token}` |
| `/api/auth/signout` | POST | - | `{success}` |
| `/api/auth/me` | GET | - | `{user}` |

### Task Endpoints (Protected)

| Endpoint | Method | Request Body | Response |
|----------|--------|--------------|----------|
| `/api/tasks` | GET | - | `[{task}]` |
| `/api/tasks` | POST | `{title, description?}` | `{task}` |
| `/api/tasks/{id}` | PUT | `{title?, description?}` | `{task}` |
| `/api/tasks/{id}` | DELETE | - | `{success}` |
| `/api/tasks/{id}/complete` | PATCH | - | `{task}` |

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT '',
    is_complete BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## Success Criteria

| ID | Criterion |
|----|-----------|
| SC-001 | Signup completes in <2 seconds |
| SC-002 | Login completes in <1 second |
| SC-003 | Task CRUD operations complete in <500ms |
| SC-004 | 100% user data isolation |
| SC-005 | Works on mobile and desktop |
| SC-006 | Handles network errors gracefully |

---

## Assumptions

1. Neon PostgreSQL database URL provided via environment variable
2. Better Auth secret configured for JWT signing
3. CORS configured for frontend-backend communication
4. No email verification in Phase 2 (can add later)
5. Session expires after 7 days of inactivity
