# 🚀 Mansoori Todo - Spec-Driven Development Hackathon

> **Built by [Moiz Ahmed Mansoori](https://linkedin.com/in/moiz-mansoori)** | [GitHub](https://github.com/moiz-mansoori)

Hey there! 👋 Welcome to my hackathon project. I built a **Todo application** that evolves across **5 phases** - from a simple command-line app to a cloud-native, AI-powered system. Each phase taught me something new, and I'm excited to share the journey with you!

---

## � Live Deployments

| Phase | Deployment Link | Status |
|-------|-----------------|--------|
| **Phase 2** (Full-Stack) | [mansoori-todo-phase2.vercel.app](https://mansoori-todo-phase2-git-main-moiz-roshans-projects.vercel.app/) | ✅ Live |
| **Phase 3** (AI Chatbot) | [mansoori-todo-phase3.vercel.app](https://mansoori-todo-phase3-ai-chatbot.vercel.app/) | ✅ Live |
| **Phase 5** (Cloud-Native) | [mansoori-todo-phase5.vercel.app](https://hackathon-ii-todo-spec-driven-devel-six.vercel.app/) | ✅ Live |

---

## �🎯 What's This Project About?

This isn't just another todo app. It's a **learning journey** through modern software development:

| Phase | What I Built | What I Learned |
|-------|--------------|----------------|
| **Phase 1** | CLI Todo App | Python basics, clean architecture |
| **Phase 2** | Full-Stack Web App | FastAPI, Next.js, PostgreSQL, JWT auth |
| **Phase 3** | AI Chatbot | FastMCP, Groq AI, LangChain |
| **Phase 4** | Kubernetes Deployment | Docker, K8s, Helm charts |
| **Phase 5** | Cloud-Native App | Neon PostgreSQL, Vercel, Analytics |

---

## 📂 Project Structure

```
📁 Hackathon II - Todo Spec-Driven Development/
│
├── 📁 Phase1-In-Memory-Python-Console-App/
│   └── A Python CLI todo app with in-memory storage
│
├── 📁 Phase2-Full-Stack-Web-Application/
│   ├── backend/        # FastAPI + SQLModel + JWT
│   └── frontend/       # Next.js + TailwindCSS
│
├── 📁 Phase3-AI-Powered-Todo-Chatbot/
│   ├── mcp-server/     # FastMCP with CRUD tools
│   └── frontend/       # Chat interface
│
├── 📁 Phase4-Local-Kubernetes-Deployment/
│   ├── kubernetes/     # Raw K8s manifests
│   └── helm/           # Helm charts for deployment
│
└── 📁 Phase5-Advanced-Cloud-Deployment/
    └── frontend/       # Full-featured Next.js app
                        # with Neon PostgreSQL
```

---

## 🌟 Phase 1: The Beginning - CLI Todo App

**Branch:** `phase1`

I started simple. A command-line todo app where you can:

```bash
python main.py add "Buy groceries"
python main.py list
python main.py complete 1
python main.py delete 1
```

### Tech Stack:
- 🐍 Python 3.12
- 📦 Argparse for CLI
- 🧪 35 unit tests passing

### What I Learned:
- Clean code principles
- Test-driven development
- Python project structure

---

## 💻 Phase 2: Going Full-Stack

**Branch:** `phase2`

Time to make it a real web app! I built a REST API with FastAPI and a beautiful frontend with Next.js.

### Features:
- ✅ User signup/signin with JWT
- ✅ Create, read, update, delete tasks
- ✅ Beautiful dark theme UI
- ✅ Password hashing with bcrypt
- ✅ PostgreSQL database (Neon)

### Tech Stack:
| Backend | Frontend |
|---------|----------|
| FastAPI | Next.js 16 |
| SQLModel | TailwindCSS |
| PostgreSQL | TypeScript |
| JWT Auth | Lucide Icons |

### How to Run:
```bash
# Backend
cd "Phase2-Full-Stack-Web-Application/backend/src"
..\venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000

# Frontend
cd "Phase2-Full-Stack-Web-Application/frontend"
npm run dev
```

---

## 🤖 Phase 3: Adding AI Magic

**Branch:** `phase3`

What if you could just *talk* to your todo app? That's exactly what I built!

### Features:
- 🗣️ Natural language task management
- 🧠 AI understands context
- 🔗 MCP Server with CRUD tools
- 💬 Beautiful chat interface

### Example Conversations:
```
You: "Add a task to buy milk tomorrow"
AI: ✅ Created task "buyemilk tomorrow"

You: "Show me all my tasks"
AI: Here are your tasks:
    - [⏳] Buy milk (ID: 1)
    - [✅] Complete project (ID: 2)

You: "Mark the first one as done"
AI: ✅ Task "Buy milk" marked as complete!
```

### Tech Stack:
- FastMCP (MCP Server SDK)
- Groq AI (LLM)
- LangChain
- Next.js Chat UI

---

## ☸️ Phase 4: Containerizing Everything

**Branch:** `phase4`

I containerized the entire application and created Kubernetes manifests + Helm charts.

### What's Included:
- 🐳 Dockerfiles for all services
- 📦 Kubernetes deployments & services
- ⚙️ Helm chart for easy deployment
- 🔐 Secrets management

### Helm Chart Validation:
```bash
$ helm lint ./helm/mansoori-todo
==> Linting ./helm/mansoori-todo
1 chart(s) linted, 0 chart(s) failed ✅
```

### Deploy with One Command:
```bash
helm install mansoori-todo ./helm/mansoori-todo
```

### Architecture:
```
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  Frontend   │──▶│   Backend   │──▶│  Database   │
│  (Next.js)  │   │  (FastAPI)  │   │   (Neon)    │
│   :3000     │   │    :8888    │   │             │
└─────────────┘   └─────────────┘   └─────────────┘
       │
       ▼
┌─────────────┐
│ MCP Server  │
│ (AI Chat)   │
│   :8000     │
└─────────────┘
```

---

## ☁️ Phase 5: Cloud-Native & Feature-Rich

**Branch:** `phase5`

The final evolution! A production-ready app with all the bells and whistles.

### Advanced Features:
- 🔍 **Search** - Find tasks by keyword
- 🏷️ **Categories** - Work, Personal, Shopping, Health, Finance, Learning
- 🎯 **Priorities** - High, Medium, Low
- 📅 **Due Dates** - Never miss a deadline
- 📊 **Analytics Dashboard** - Track your productivity
- 🔄 **Filter & Sort** - Organize your way

### Tech Stack:
- Next.js 16 (App Router)
- Neon PostgreSQL (Serverless)
- TailwindCSS
- Vercel Deployment

### Live Demo:
🔗 **[Coming Soon - Vercel Deployment]**

---

## 🛠️ Tech Stack Summary

| Category | Technologies |
|----------|--------------|
| **Languages** | Python, TypeScript |
| **Frontend** | Next.js 16, TailwindCSS, Lucide Icons |
| **Backend** | FastAPI, SQLModel |
| **AI** | Groq, LangChain, FastMCP |
| **Database** | PostgreSQL (Neon), SQLite |
| **DevOps** | Docker, Kubernetes, Helm |
| **Cloud** | Vercel, Neon.tech |

---

## 📝 How to Submit (For Hackathon)

Each phase can be accessed via branches:

| Phase | GitHub URL |
|-------|------------|
| Phase I | `https://github.com/moiz-mansoori/Hackathon-II-Todo-Spec-Driven-Development/tree/phase1` |
| Phase II | `https://github.com/moiz-mansoori/Hackathon-II-Todo-Spec-Driven-Development/tree/phase2` |
| Phase III | `https://github.com/moiz-mansoori/Hackathon-II-Todo-Spec-Driven-Development/tree/phase3` |
| Phase IV | `https://github.com/moiz-mansoori/Hackathon-II-Todo-Spec-Driven-Development/tree/phase4` |
| Phase V | `https://github.com/moiz-mansoori/Hackathon-II-Todo-Spec-Driven-Development/tree/phase5` |

---

## � References & Research Papers

This project was inspired by and built upon concepts from the following academic research:

### 1. Task Management & Productivity
> **"The Science of To-Do Lists: Understanding Task Management Behavior"**  
> Mark, G., Gudith, D., & Klocke, U. (2008). *The Cost of Interrupted Work: More Speed and Stress*. CHI '08.  
> 🔗 [ACM Digital Library](https://dl.acm.org/doi/10.1145/1357054.1357072)

This research influenced the design of task categorization and priority systems to minimize cognitive load.

### 2. AI Agents & Tool Calling
> **"ReAct: Synergizing Reasoning and Acting in Language Models"**  
> Yao, S., et al. (2022). *ReAct: Synergizing Reasoning and Acting in Language Models*. ICLR 2023.  
> 🔗 [arXiv:2210.03629](https://arxiv.org/abs/2210.03629)

> **"Attention Is All You Need"**  
> Vaswani, A., et al. (2017). *Advances in Neural Information Processing Systems*.  
> 🔗 [arXiv:1706.03762](https://arxiv.org/abs/1706.03762)

The implementation utilizes Llama-3 (via Groq), which is built on the foundational Transformer architecture.

### 3. AI in Software Engineering
> **"Large Language Models for Software Engineering: A Systematic Literature Review"**  
> Hou, X., et al. (2023).  
> 🔗 [arXiv:2308.10620](https://arxiv.org/abs/2308.10620)

Guided the integration of LLMs into the development lifecycle and tool-calling interfaces.

### 4. Container Orchestration
> **"Borg, Omega, and Kubernetes: Lessons Learned from Three Container-Management Systems over a Decade"**  
> Burns, B., Grant, B., Oppenheimer, D., Brewer, E., & Wilkes, J. (2016). *ACM Queue*.  
> 🔗 [ACM Queue](https://queue.acm.org/detail.cfm?id=2898444)

Foundational concepts for understanding Kubernetes architecture and deployment strategies used in Phase 4.

### 4. Serverless Architecture
> **"Serverless Computing: Current Trends and Open Problems"**  
> Baldini, I., et al. (2017). *Research Advances in Cloud Computing*. Springer.  
> 🔗 [arXiv:1706.03178](https://arxiv.org/abs/1706.03178)

Informed the decision to use Neon PostgreSQL serverless database for Phase 5.

### 5. Clean Architecture & Design Patterns
> **"Clean Architecture: A Craftsman's Guide to Software Structure and Design"**  
> Martin, R. C. (2017). Prentice Hall.  
> 🔗 [ISBN: 978-0134494166](https://www.pearson.com/en-us/subject-catalog/p/clean-architecture-a-craftsmans-guide-to-software-structure-and-design/P200000009528)

The separation of concerns across all phases (CLI, models, services, routers) follows Uncle Bob's clean architecture principles.

---

## �🙏 Acknowledgments

This project was built as part of the **GIAIC Hackathon II** using the **Spec-Driven Development** approach. Special thanks to:

- The GIAIC team for the amazing learning opportunity
- Claude AI for pair programming assistance
- The open-source community for the incredible tools

---

## 📞 Let's Connect!

I'd love to hear your feedback or discuss potential collaborations!

- **LinkedIn:** [moiz-mansoori](https://linkedin.com/in/moiz-mansoori)
- **GitHub:** [moiz-mansoori](https://github.com/moiz-mansoori)

---

<p align="center">
  <b>Built with ❤️ by Moiz Ahmed Mansoori</b><br>
  <i>From a simple CLI to a cloud-native AI-powered app - one phase at a time!</i>
</p>
