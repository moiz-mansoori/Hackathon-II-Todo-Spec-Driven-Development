# Architecture Plan: Phase 1 - CLI In-Memory Todo

**Feature**: `cli-todo`
**Created**: 2026-02-05
**Status**: Draft

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      CLI Layer                          │
│                   (src/cli/main.py)                     │
│         argparse commands: add, list, update,           │
│                delete, complete                         │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   Service Layer                          │
│               (src/services/task_service.py)             │
│    TaskService: add, get_all, get, update,              │
│                 delete, toggle_complete                  │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    Model Layer                           │
│                 (src/models/task.py)                     │
│             @dataclass Task: id, title,                  │
│                 description, status                      │
└─────────────────────────────────────────────────────────┘
```

---

## Component Design

### 1. Task Model (`src/models/task.py`)

```python
from dataclasses import dataclass, field
from enum import Enum

class TaskStatus(Enum):
    PENDING = "pending"
    COMPLETE = "complete"

@dataclass
class Task:
    id: int
    title: str
    description: str = ""
    status: TaskStatus = field(default=TaskStatus.PENDING)
```

**Design Decisions:**
- `dataclass` for immutable-friendly design
- `Enum` for type-safe status values
- Default empty description, pending status

---

### 2. Task Service (`src/services/task_service.py`)

```python
class TaskService:
    def __init__(self):
        self._tasks: dict[int, Task] = {}
        self._next_id: int = 1
    
    def add(self, title: str, description: str = "") -> Task
    def get_all(self) -> list[Task]
    def get(self, task_id: int) -> Task | None
    def update(self, task_id: int, title: str | None, description: str | None) -> Task | None
    def delete(self, task_id: int) -> bool
    def toggle_complete(self, task_id: int) -> Task | None
```

**Design Decisions:**
- Dictionary for O(1) lookup by ID
- Auto-incrementing ID counter
- Returns `None` for not-found cases (let CLI handle errors)
- Single instance pattern (in-memory state)

---

### 3. CLI Interface (`src/cli/main.py`)

| Command | Arguments | Action |
|---------|-----------|--------|
| `add` | `title`, `--desc` | Create task |
| `list` | _(none)_ | Show all tasks |
| `update` | `id`, `--title`, `--desc` | Modify task |
| `delete` | `id` | Remove task |
| `complete` | `id` | Toggle status |

**Design Decisions:**
- `argparse` for robust argument parsing
- Subcommand pattern for each operation
- Colored output for status (green=complete, yellow=pending)
- Formatted table output using string formatting

---

## Error Handling

| Error | Handler | User Message |
|-------|---------|--------------|
| Empty title | CLI validation | "Error: Title is required" |
| Invalid ID format | CLI validation | "Error: ID must be a valid integer" |
| Task not found | Service returns None | "Error: Task with ID X not found" |

---

## Testing Strategy

### Unit Tests (`tests/unit/test_task_service.py`)
- Test each service method in isolation
- Cover happy path and error cases
- Test ID auto-increment behavior

### Integration Tests (`tests/integration/test_cli.py`)
- Test full CLI command execution
- Verify output format
- Test error message display

---

## Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| Python | 3.13+ | Runtime |
| pytest | 8.0+ | Testing framework |
| pytest-cov | 4.0+ | Coverage reporting |

---

## Non-Functional Requirements

| NFR | Target |
|-----|--------|
| Response time | < 100ms for any operation |
| Memory | Handle 10,000 tasks without issue |
| CLI startup | < 1 second |
