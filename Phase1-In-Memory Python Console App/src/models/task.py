"""Task data model for the CLI Todo application."""

from dataclasses import dataclass, field
from enum import Enum


class TaskStatus(Enum):
    """Status of a task - either pending or complete."""
    
    PENDING = "pending"
    COMPLETE = "complete"


@dataclass
class Task:
    """Represents a single todo item.
    
    Attributes:
        id: Unique identifier for the task (auto-generated).
        title: Brief description of the task (required).
        description: Detailed information about the task (optional).
        status: Current completion status (pending or complete).
    """
    
    id: int
    title: str
    description: str = ""
    status: TaskStatus = field(default=TaskStatus.PENDING)
    
    def is_complete(self) -> bool:
        """Check if the task is marked as complete."""
        return self.status == TaskStatus.COMPLETE
    
    def toggle_status(self) -> None:
        """Toggle between pending and complete status."""
        if self.status == TaskStatus.PENDING:
            self.status = TaskStatus.COMPLETE
        else:
            self.status = TaskStatus.PENDING
