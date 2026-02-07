# Feature Specification: Phase 1 - CLI In-Memory Todo App

**Feature**: `cli-todo`
**Created**: 2026-02-05
**Status**: Draft

---

## User Stories & Acceptance Criteria

### US-1: Add New Task (Priority: P1)

As a user, I want to add a new task with a title and optional description so I can track work items.

**Acceptance Scenarios:**
1. **Given** app is running, **When** user runs `add "Buy groceries" --desc "Milk, eggs"`, **Then** task created with unique ID and "pending" status displayed
2. **Given** app is running, **When** user runs `add "Quick note"` without description, **Then** task created with empty description
3. **Given** app is running, **When** user runs `add ""` with empty title, **Then** error "Title is required" displayed

---

### US-2: View All Tasks (Priority: P1)

As a user, I want to view all tasks with status to see what needs done.

**Acceptance Scenarios:**
1. **Given** tasks exist, **When** user runs `list`, **Then** all tasks shown with ID, title, description, status
2. **Given** no tasks, **When** user runs `list`, **Then** message "No tasks found" displayed
3. **Given** mixed status tasks, **When** user runs `list`, **Then** pending/complete clearly distinguished

---

### US-3: Toggle Task Complete/Incomplete (Priority: P2)

As a user, I want to toggle completion status to track progress.

**Acceptance Scenarios:**
1. **Given** pending task ID 1, **When** user runs `complete 1`, **Then** status becomes "complete"
2. **Given** complete task ID 2, **When** user runs `complete 2`, **Then** status becomes "pending"
3. **Given** no task ID 99, **When** user runs `complete 99`, **Then** error "Task not found" displayed

---

### US-4: Update Task Details (Priority: P3)

As a user, I want to update title/description to correct/add detail.

**Acceptance Scenarios:**
1. **Given** task ID 1, **When** user runs `update 1 --title "New title"`, **Then** title updated
2. **Given** task ID 1, **When** user runs `update 1 --desc "New desc"`, **Then** description updated
3. **Given** no task ID 99, **When** user runs `update 99 --title "X"`, **Then** error "Task not found"

---

### US-5: Delete Task (Priority: P3)

As a user, I want to delete tasks to remove irrelevant items.

**Acceptance Scenarios:**
1. **Given** task ID 1, **When** user runs `delete 1`, **Then** task removed and confirmation shown
2. **Given** no task ID 99, **When** user runs `delete 99`, **Then** error "Task not found"
3. **Given** deleted task, **When** user runs `list`, **Then** deleted task not shown

---

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Non-integer task ID | Error: "ID must be a valid integer" |
| Very long title (>500 chars) | Accepted (no artificial limits) |
| Special chars in description | Preserved exactly |
| App restart | All tasks lost (expected, documented) |

---

## Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-001 | Add task with title (required) and description (optional) |
| FR-002 | Generate unique integer ID starting from 1 |
| FR-003 | Store all tasks in memory during runtime |
| FR-004 | Display all tasks with ID, title, description, status |
| FR-005 | Delete task by ID |
| FR-006 | Update task title and/or description by ID |
| FR-007 | Toggle task status (pending/complete) |
| FR-008 | Clear error messages for failed operations |
| FR-009 | CLI accepting text commands |
| FR-010 | No data persistence between restarts |

---

## Key Entities

### Task
| Field | Type | Description |
|-------|------|-------------|
| id | int | Unique auto-generated ID (starts at 1) |
| title | str | Brief description (required, non-empty) |
| description | str | Detailed info (optional, defaults to empty) |
| status | str | "pending" or "complete" (defaults to pending) |

---

## Success Criteria

| ID | Criterion |
|----|-----------|
| SC-001 | Add task in under 5 seconds |
| SC-002 | Identify pending vs completed at glance |
| SC-003 | Complete full workflow without docs after onboarding |
| SC-004 | All 5 features function with feedback |
| SC-005 | Clear error messages for invalid operations |
| SC-006 | Handle 100+ tasks without issues |

---

## Assumptions

- Single user application
- English interface only
- Data loss on restart is expected
- No network required (offline capable)
- Python 3.13+ available
- No maximum task limit (memory only)
