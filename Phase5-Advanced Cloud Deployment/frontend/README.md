# Mansoori Todo - Phase 5: Cloud-Native Enhanced

A full-stack, cloud-native Todo application deployed on Vercel with enhanced features.

## ✨ Features

- 🔐 **JWT Authentication** - Secure signup/signin with password hashing
- ✅ **Task Management** - CRUD operations with priority, due dates, and tags
- 📊 **Analytics Dashboard** - Visual stats for task completion and productivity
- 🤖 **AI Chat Assistant** - Natural language task management
- ☁️ **Cloud Database** - Vercel Postgres for data persistence
- 🚀 **Serverless Deployment** - Optimized for Vercel Edge Functions

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Vercel Postgres
- **Auth**: JWT (jose) + bcrypt
- **Deployment**: Vercel

## 📦 Getting Started

### 1. Install dependencies
```bash
cd Phase5/frontend
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Fill in your Vercel Postgres connection string
```

### 3. Set up database
Run the SQL in `scripts/schema.sql` in your Vercel Postgres console.

### 4. Run development server
```bash
npm run dev
```

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Connect to Vercel
3. Add Vercel Postgres Storage
4. Deploy!

## 📁 Project Structure

```
Phase5/frontend/
├── src/app/
│   ├── api/
│   │   ├── auth/signup/route.ts   # User registration
│   │   ├── auth/signin/route.ts   # User login
│   │   ├── tasks/route.ts         # Task CRUD
│   │   ├── tasks/[id]/route.ts    # Individual task ops
│   │   └── analytics/route.ts     # Task analytics
│   ├── analytics/page.tsx         # Analytics dashboard
│   ├── signin/page.tsx            # Login page
│   ├── signup/page.tsx            # Registration page
│   └── page.tsx                   # Main dashboard
├── scripts/
│   └── schema.sql                 # Database schema
└── package.json
```

## 👤 Author

Mansoori - GIAIC Hackathon II

## 📄 License

MIT
