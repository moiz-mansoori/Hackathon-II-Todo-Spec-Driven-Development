---
description: How to run the Mansoori Todo Application (Full Stack)
---

To run the complete application, you need to start three separate components in three different terminals:

### 1. Backend Server (FastAPI)
// turbo
```powershell
cd "Phase2/backend/src"
..\venv\Scripts\python -m uvicorn main:app --reload --port 8888
```

### 2. Frontend Application (Next.js)
// turbo
```powershell
cd "Phase2/frontend"
npm run dev
```

### 3. AI MCP Server (Python)
// turbo
```powershell
cd "Phase3/mcp-server"
.\venv\Scripts\python server.py
```

Once all three are running:
- Open your browser to [http://localhost:3000](http://localhost:3000)
- Sign in or Create an account
- Interact with the "Mansoori Tasks" dashboard and the AI Chat Assistant!
