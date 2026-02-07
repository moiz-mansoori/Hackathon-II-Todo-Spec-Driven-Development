# Phase 2 Backend - Todo API

FastAPI backend with SQLModel ORM and JWT authentication.

## Setup

```bash
cd Phase2/backend

# Create virtual environment
python -m venv venv
.\venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env
# Edit .env with your Neon database URL and JWT secret
```

## Run

```bash
cd src
uvicorn main:app --reload --port 8000
```

API available at: http://localhost:8000
Docs at: http://localhost:8000/docs

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Create account |
| POST | /api/auth/signin | Login |
| GET | /api/tasks | List tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/{id} | Update task |
| DELETE | /api/tasks/{id} | Delete task |
| PATCH | /api/tasks/{id}/complete | Toggle complete |
