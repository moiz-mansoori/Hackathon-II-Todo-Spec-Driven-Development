# 🤖 Phase 3: AI-Powered Todo Chatbot

> **"Hey, add a task to buy milk" - and it just works!**

Welcome to the future of task management! 🚀 In this phase, I added an AI chatbot that lets you manage your todos using natural language. No more clicking buttons - just talk to it!

---

## 🌟 The Magic

Imagine this conversation:

```
You: "I need to buy groceries tomorrow"
🤖 AI: ✅ Created task "buy groceries tomorrow"

You: "What do I need to do?"
🤖 AI: Here are your tasks:
       - [⏳] Buy groceries tomorrow (ID: 1)
       - [✅] Complete hackathon project (ID: 2)

You: "Mark the first one as done"
🤖 AI: ✅ Task "buy groceries tomorrow" is now completed!

You: "Delete task 2"
🤖 AI: 🗑️ Successfully deleted task 2
```

Pretty cool, right? 😎

---

## 🧠 How It Works

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   You       │────▶│  AI (Groq)  │────▶│ MCP Server  │
│  "Add task" │     │  Understands│     │  Executes   │
└─────────────┘     │  Your Intent│     │  Actions    │
                    └─────────────┘     └──────┬──────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │   Backend   │
                                        │  (FastAPI)  │
                                        └─────────────┘
```

1. **You speak naturally** - No special commands needed
2. **AI understands** - Groq LLM processes your message
3. **MCP Server executes** - Calls the right API endpoints
4. **Task completed** - You see the result!

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- Groq API Key (free at [console.groq.com](https://console.groq.com))

### 1. Start the MCP Server

```bash
cd mcp-server

# Create virtual environment
python -m venv venv
.\venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "BACKEND_URL=http://localhost:8888" > .env
echo "GROQ_API_KEY=your-groq-api-key" >> .env

# Run the server
python server.py
```

### 2. Make Sure Backend is Running

The MCP server talks to the Phase 2 backend, so you need that running too:

```bash
cd "../Phase2-Full-Stack-Web-Application/backend/src"
python -m uvicorn main:app --reload --port 8888
```

### 3. Start the Chat Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Chat Away! 💬

Open http://localhost:3000 and start chatting!

---

## 📂 Project Structure

```
Phase3-AI-Powered Todo Chatbot/
│
├── mcp-server/                 # MCP Server (Python)
│   ├── server.py              # Main server with tools
│   ├── requirements.txt       # Dependencies
│   └── Dockerfile
│
└── frontend/                   # Chat Interface (Next.js)
    └── src/
        └── app/
            └── landing/       # Landing page
```

---

## 🔧 MCP Tools

The MCP server exposes these tools to the AI:

| Tool | Description | Example |
|------|-------------|---------|
| `list_tasks` | Get all tasks | "Show my tasks" |
| `create_task` | Create new task | "Add buy milk" |
| `toggle_task` | Complete/uncomplete | "Mark task 1 done" |
| `delete_task` | Remove a task | "Delete task 2" |

Each tool knows how to talk to the backend API and returns human-readable responses!

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **FastMCP** | MCP Server SDK (Python) |
| **Groq AI** | Fast LLM inference |
| **LangChain** | AI orchestration |
| **httpx** | Async HTTP client |
| **Next.js** | Chat UI frontend |

---

## 🔑 Environment Variables

### MCP Server (.env)
```env
BACKEND_URL=http://localhost:8888
GROQ_API_KEY=gsk_your_groq_api_key
```

---

## 💬 Example Prompts

Try these with the chatbot:

| What You Say | What Happens |
|--------------|--------------|
| "I need to finish my homework" | Creates a task |
| "Show me everything I have to do" | Lists all tasks |
| "I finished task 1" | Marks it complete |
| "Remove the first task" | Deletes it |
| "Add 3 tasks: laundry, dishes, vacuum" | Creates 3 tasks! |

---

## 📖 What I Learned

1. **MCP Protocol** - Model Context Protocol for AI tools
2. **LLM Integration** - Connecting AI to real applications
3. **Tool Calling** - Teaching AI to execute functions
4. **Async Python** - httpx for non-blocking API calls
5. **Prompt Engineering** - Getting AI to understand context

---

## 🔗 Deployment Links

- **Frontend:** [Coming soon - Vercel]
- **MCP Server:** [Local only for now]

---

## 👨‍💻 Author

**Moiz Ahmed Mansoori**
- [LinkedIn](https://linkedin.com/in/moiz-mansoori)
- [GitHub](https://github.com/moiz-mansoori)

---

<p align="center">
  <i>"The future is already here - it's just not evenly distributed."</i> 🤖
</p>
