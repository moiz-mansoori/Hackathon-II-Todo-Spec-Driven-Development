# Architecture Plan: Phase 2 - Full-Stack Todo Web App

**Feature**: `fullstack-web`
**Created**: 2026-02-05
**Status**: Draft

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                       │
│                     http://localhost:3000                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │  Login Page │  │ Signup Page │  │     Dashboard (Tasks)   │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTP/REST + JWT
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend (FastAPI)                          │
│                     http://localhost:8000                       │
│  ┌────────────────────────┐  ┌────────────────────────────────┐│
│  │     Auth Router        │  │        Tasks Router            ││
│  │  /api/auth/*           │  │        /api/tasks/*            ││
│  └───────────┬────────────┘  └───────────────┬────────────────┘│
│              │                               │                  │
│              ▼                               ▼                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │                    Service Layer                           ││
│  │        AuthService          TaskService                    ││
│  └────────────────────────────────────────────────────────────┘│
│              │                               │                  │
│              ▼                               ▼                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │                    SQLModel ORM                            ││
│  │        User Model            Task Model                    ││
│  └────────────────────────────────────────────────────────────┘│
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Neon PostgreSQL                               │
│              postgresql://...@neon.tech/todo                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Backend Structure

```
Phase2/backend/
├── src/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app entry
│   ├── config.py               # Settings from env
│   ├── database.py             # SQLModel engine/session
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py             # User SQLModel
│   │   └── task.py             # Task SQLModel
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── auth.py             # Auth endpoints
│   │   └── tasks.py            # Task CRUD endpoints
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py     # JWT, password hashing
│   │   └── task_service.py     # Task CRUD logic
│   └── dependencies.py         # JWT verification
├── tests/
│   ├── test_auth.py
│   └── test_tasks.py
├── requirements.txt
└── .env.example
```

---

## Frontend Structure

```
Phase2/frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home (redirect)
│   │   ├── login/page.tsx      # Login form
│   │   ├── signup/page.tsx     # Signup form
│   │   └── dashboard/page.tsx  # Tasks UI
│   ├── components/
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   └── TaskForm.tsx
│   ├── lib/
│   │   ├── api.ts              # API client
│   │   └── auth.ts             # Auth helpers
│   └── types/
│       └── index.ts            # TypeScript types
├── package.json
├── tailwind.config.js
└── next.config.js
```

---

## Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Enter email/password
    Frontend->>Backend: POST /api/auth/signup
    Backend->>Database: Insert user (hashed pw)
    Database-->>Backend: User created
    Backend-->>Frontend: JWT token
    Frontend->>Frontend: Store token (cookie/localStorage)
    Frontend-->>User: Redirect to dashboard
```

---

## Security Design

| Concern | Solution |
|---------|----------|
| Password storage | bcrypt hash with salt |
| Token security | JWT with expiration (7 days) |
| API protection | Bearer token in Authorization header |
| User isolation | Query filter by user_id |
| CORS | Whitelist frontend origin |

---

## Environment Variables

```env
# Backend
DATABASE_URL=postgresql://user:pass@neon.tech/todo
JWT_SECRET=your-secret-key
JWT_ALGORITHM=HS256
JWT_EXPIRE_DAYS=7

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Key Dependencies

### Backend
- fastapi
- sqlmodel
- python-jose[cryptography]
- passlib[bcrypt]
- uvicorn
- python-dotenv
- psycopg2-binary

### Frontend
- next
- react
- typescript
- tailwindcss
- axios
