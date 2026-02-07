# Claude Code Guidelines - Phase 1

## Project Context

Phase 1 of "The Evolution of Todo" - a CLI-based in-memory task management application.

## Core Principles

1. **In-Memory Only**: No persistence. Data lost on restart (by design).
2. **Five Features**: Add, Delete, Update, View, Toggle Complete. Nothing more.
3. **Spec-Driven**: All code follows specification. No ad-hoc changes.
4. **TDD Required**: Tests first, implementation second.
5. **Python 3.13+**: Use modern Python features (type hints, dataclasses).

## Project Structure

```
Phase1/
├── src/
│   ├── models/task.py       # Task dataclass
│   ├── services/task_service.py  # CRUD operations
│   └── cli/main.py          # CLI entry point
├── tests/
│   ├── unit/               # Service tests
│   └── integration/        # CLI tests
└── specs/cli-todo/         # Specifications
```

## Commands

| Action | Command |
|--------|---------|
| Run CLI | `python -m src.cli.main <command>` |
| Run tests | `pytest tests/ -v` |
| Run with coverage | `pytest --cov=src --cov-report=term-missing` |

## Development Workflow

1. Check spec before implementing
2. Write failing test first
3. Implement minimum code to pass
4. Refactor if needed
5. Commit with descriptive message

## Code Standards

- PEP 8 style
- Type hints on all functions
- Docstrings on public APIs
- No external dependencies (stdlib only)
