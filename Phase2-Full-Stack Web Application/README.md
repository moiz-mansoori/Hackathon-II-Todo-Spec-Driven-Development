# 💻 Phase 2: Full-Stack Web Application

> **From terminal to browser - now we're talking!**

Welcome to Phase 2! 🎉 Here I transformed the simple CLI app into a beautiful, full-featured web application with a proper backend API and stunning frontend.

---

## ✨ What's New?

This isn't just a todo list anymore - it's a **complete web application** with:

- 🔐 **User Authentication** - Signup, signin, secure sessions
- 🎨 **Beautiful Dark UI** - Modern design with glassmorphism
- 🗄️ **PostgreSQL Database** - Data persists in the cloud (Neon)
- 🔒 **Secure API** - JWT tokens, password hashing
- 📱 **Responsive Design** - Works on desktop and mobile

---

## 🖼️ Screenshots

```
┌─────────────────────────────────────────────┐
│  🌙 Mansoori Todo                     [Logout]
├─────────────────────────────────────────────┤
│                                             │
│  📊 Total: 5    ✅ Done: 2    ⏳ Pending: 3  │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ ○ Buy groceries          🔴 High    │   │
│  │ ✓ Complete project       🟢 Done    │   │
│  │ ○ Call mom               🟡 Medium  │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [+ Add new task]                           │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL (or use Neon for free)

### 1. Start the Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
.\venv\Scripts\activate  # Windows
# or: source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from .env.example)
# Update DATABASE_URL with your Neon connection string

# Run the server
cd src
python -m uvicorn main:app --reload --port 8000
```

### 2. Start the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```

### 3. Open in Browser

🔗 **Frontend:** http://localhost:3000  
📚 **API Docs:** http://localhost:8000/docs

---

## 📂 Project Structure

```
Phase2-Full-Stack Web Application/
│
├── backend/                    # FastAPI Backend
│   ├── src/
│   │   ├── main.py            # App entry point
│   │   ├── config.py          # Settings
│   │   ├── database.py        # DB connection
│   │   ├── models/            # SQLModel schemas
│   │   │   ├── user.py
│   │   │   └── task.py
│   │   ├── routers/           # API endpoints
│   │   │   ├── auth.py        # Signup/Signin
│   │   │   └── tasks.py       # CRUD operations
│   │   └── services/          # Business logic
│   │       ├── auth_service.py
│   │       └── task_service.py
│   ├── requirements.txt
│   └── Dockerfile
│
└── frontend/                   # Next.js Frontend
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx       # Home/Dashboard
    │   │   ├── signin/        # Login page
    │   │   ├── signup/        # Register page
    │   │   └── layout.tsx
    │   ├── components/        # Reusable UI
    │   ├── services/          # API calls
    │   └── lib/               # Utilities
    ├── package.json
    └── tailwind.config.ts
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/signin` | Login & get JWT token |
| POST | `/auth/signout` | Logout |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all user's tasks |
| POST | `/tasks` | Create new task |
| PUT | `/tasks/{id}` | Update task |
| DELETE | `/tasks/{id}` | Delete task |
| PATCH | `/tasks/{id}/complete` | Toggle completion |

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI** | Modern Python web framework |
| **SQLModel** | SQL + Pydantic models |
| **PostgreSQL** | Production database |
| **JWT** | Secure authentication |
| **bcrypt** | Password hashing |
| **Uvicorn** | ASGI server |

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework |
| **TypeScript** | Type safety |
| **TailwindCSS** | Utility-first styling |
| **Axios** | HTTP client |
| **Lucide Icons** | Beautiful icons |

---

## 🔐 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
JWT_SECRET=your-secret-key
JWT_ALGORITHM=HS256
JWT_EXPIRE_DAYS=7
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🧪 API Testing

You can test the API using the built-in Swagger docs:

1. Start the backend
2. Open http://localhost:8000/docs
3. Try out the endpoints!

Or use curl:
```bash
# Signup
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"secret123"}'

# Get tasks (with token)
curl http://localhost:8000/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📖 What I Learned

1. **RESTful API Design** - Proper endpoints & HTTP methods
2. **JWT Authentication** - Secure token-based auth
3. **Database Design** - Relations, migrations, ORMs
4. **Frontend-Backend Integration** - CORS, cookies, headers
5. **Modern UI/UX** - Dark themes, animations, responsiveness

---

## 🔗 Deployment Links

- **Frontend:** [Coming soon - Vercel]
- **Backend:** [Coming soon - Railway/Render]

---

## 👨‍💻 Author

**Moiz Ahmed Mansoori**
- [LinkedIn](https://linkedin.com/in/moiz-mansoori)
- [GitHub](https://github.com/moiz-mansoori)

---

<p align="center">
  <i>"The best way to predict the future is to create it."</i> 🚀
</p>
