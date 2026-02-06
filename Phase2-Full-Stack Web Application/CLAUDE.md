# Claude Code Guidelines - Phase 2

## Project Context

Phase 2 of "The Evolution of Todo" - Full-stack web application with FastAPI backend and Next.js frontend.

## Core Principles

1. **Multi-User Isolation**: Every query filters by user_id
2. **JWT Auth**: All protected endpoints verify Bearer token
3. **RESTful Design**: Standard HTTP methods and status codes
4. **Type Safety**: SQLModel for backend, TypeScript for frontend
5. **Spec-Driven**: All code follows specification

## Project Structure

```
Phase2/
├── backend/
│   └── src/
│       ├── main.py           # FastAPI app
│       ├── models/           # SQLModel models
│       ├── routers/          # API endpoints
│       └── services/         # Business logic
└── frontend/
    └── src/
        ├── app/              # Next.js pages
        ├── components/       # React components
        └── lib/              # Utilities
```

## Commands

| Action | Command |
|--------|---------|
| Run backend | `uvicorn main:app --reload` |
| Run frontend | `npm run dev` |
| Run backend tests | `pytest tests/ -v` |

## API Routes

- `POST /api/auth/signup` - Create account
- `POST /api/auth/signin` - Login
- `GET /api/tasks` - List tasks (protected)
- `POST /api/tasks` - Create task (protected)
- `PUT /api/tasks/{id}` - Update task (protected)
- `DELETE /api/tasks/{id}` - Delete task (protected)

## Environment Variables

Create `.env` from `.env.example`:
- `DATABASE_URL` - Neon PostgreSQL connection
- `JWT_SECRET` - Secret for signing tokens
