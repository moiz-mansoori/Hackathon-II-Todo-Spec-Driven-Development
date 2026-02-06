# 📝 Phase 1: In-Memory Python Console App

> **The foundation of everything great starts simple.**

Hey! 👋 This is where my todo app journey began. A clean, simple command-line application that lets you manage tasks right from your terminal.

---

## 🎯 What Does It Do?

It's a **CLI todo manager** that stores tasks in memory. Simple? Yes. But it taught me the fundamentals of clean architecture and test-driven development.

### Features:
- ✅ Add new tasks
- 📋 List all tasks
- ✔️ Mark tasks as complete
- 🗑️ Delete tasks
- ✏️ Update task titles

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10 or higher

### Run the App

```bash
# Navigate to this folder
cd "Phase1-In-Memory Python Console App"

# Run with different commands
python -m src.cli.main add "Buy groceries"
python -m src.cli.main list
python -m src.cli.main complete 1
python -m src.cli.main delete 1
```

---

## 💡 Available Commands

| Command | Description | Example |
|---------|-------------|---------|
| `add <title>` | Create a new task | `add "Call mom"` |
| `list` | Show all tasks | `list` |
| `complete <id>` | Mark task as done | `complete 1` |
| `delete <id>` | Remove a task | `delete 1` |
| `update <id> <title>` | Change task title | `update 1 "Call dad"` |

---

## 📂 Project Structure

```
Phase1-In-Memory Python Console App/
├── src/
│   ├── cli/           # Command-line interface
│   │   └── main.py    # Entry point with argparse
│   ├── models/        # Data models
│   │   └── task.py    # Task dataclass
│   └── services/      # Business logic
│       └── task_service.py  # CRUD operations
├── tests/             # Unit & integration tests
├── specs/             # Spec-driven documentation
│   ├── constitution.md
│   ├── spec.md
│   └── plan.md
└── pyproject.toml     # Project configuration
```

---

## 🧪 Running Tests

I wrote **35 tests** to make sure everything works perfectly!

```bash
# Run all tests
pytest

# Run with verbose output
pytest -v

# Run specific test file
pytest tests/test_task_service.py
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Python 3.12** | Core language |
| **Argparse** | CLI argument parsing |
| **Dataclasses** | Clean data models |
| **Pytest** | Testing framework |

---

## 📖 What I Learned

1. **Clean Architecture** - Separating CLI, models, and services
2. **Test-Driven Development** - Writing tests before code
3. **Python Best Practices** - Type hints, docstrings, modules
4. **Spec-Driven Development** - Planning before coding

---

## 🔗 Next Steps

This simple app evolves into something much bigger:
- **Phase 2:** Full-stack web application
- **Phase 3:** AI-powered chatbot
- **Phase 4:** Kubernetes deployment
- **Phase 5:** Cloud-native with analytics

---

## 👨‍💻 Author

**Moiz Ahmed Mansoori**
- [LinkedIn](https://linkedin.com/in/moiz-mansoori)
- [GitHub](https://github.com/moiz-mansoori)

---

<p align="center">
  <i>"Every expert was once a beginner."</i> 🌱
</p>
