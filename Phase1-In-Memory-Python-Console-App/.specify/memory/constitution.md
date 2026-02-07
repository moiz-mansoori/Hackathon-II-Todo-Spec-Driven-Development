# Evolution of Todo - Phase 1 Constitution

> **Version**: 1.0.0 | **Ratified**: 2026-02-05

## Core Principles

### I. In-Memory CLI First

All task data MUST be stored in-memory during runtime. No external databases, files, or persistent storage. The application MUST be a command-line interface (CLI) that runs in a standard terminal console.

**Rationale**: Phase 1 establishes core domain logic without persistence complexity. Validates data model before committing to storage.

### II. Five Core Features Only

The application implements exactly these features:
1. **Add Task**: Create task with title and optional description
2. **Delete Task**: Remove task by unique ID
3. **Update Task**: Modify task title or description by ID
4. **View Tasks**: List all tasks with status
5. **Toggle Complete**: Mark task as complete/incomplete

No tags, priorities, due dates, or categories in Phase 1.

**Rationale**: Constrained scope ensures MVP delivery. Features extend in subsequent phases.

### III. Spec-Driven Development

All code follows this workflow:
1. **Specify**: Generate specification from requirements
2. **Plan**: Produce architectural plan
3. **Tasks**: Create actionable task list
4. **Implement**: Execute tasks with tests first

No code without specification approval.

**Rationale**: Traceability, reproducibility, and methodology alignment.

### IV. Python 3.13+ Clean Code

All source code MUST:
- Target Python 3.13+
- Follow PEP 8 style guidelines
- Use type hints for all function signatures
- Include docstrings for public functions/classes
- Be organized in modular, single-responsibility files
- Use only standard library for core features

**Rationale**: Modern Python with strict typing catches errors early.

### V. Self-Contained Architecture

```
Phase1/
├── src/
│   ├── models/          # Task data model
│   ├── services/        # Business logic (CRUD)
│   └── cli/             # Command-line interface
├── tests/
│   ├── unit/            # Unit tests for services
│   └── integration/     # CLI integration tests
├── specs/               # Feature specifications
└── history/             # PHR and ADR records
```

Each module independently importable and testable. No circular dependencies.

### VI. Test-Driven Development

For each feature:
1. Write test cases FIRST (RED phase)
2. Verify tests fail appropriately
3. Implement code to pass tests (GREEN phase)
4. Refactor while maintaining green tests

Test coverage target: 80% minimum for `services/` module.

**Rationale**: TDD ensures requirements met and prevents regression.

## Governance

### Amendment Process

1. Propose change with rationale
2. If significant, document decision
3. Update constitution with version bump

### Versioning

- **MAJOR**: Principle removal or incompatible change
- **MINOR**: New principle or expanded guidance
- **PATCH**: Clarifications, non-semantic refinements

## Compliance Checklist

- [ ] Code follows Python 3.13+ guidelines (Principle IV)
- [ ] No external persistence added (Principle I)
- [ ] Only five core features implemented (Principle II)
- [ ] All code generated via spec workflow (Principle III)
- [ ] Tests written before implementation (Principle VI)
- [ ] Project structure maintained (Principle V)
