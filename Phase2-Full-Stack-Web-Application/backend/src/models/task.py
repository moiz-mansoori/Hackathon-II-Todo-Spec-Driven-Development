"""Task model for todo items."""

from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional


class TaskBase(SQLModel):
    """Base task fields."""
    title: str = Field(min_length=1)
    description: str = ""


class Task(TaskBase, table=True):
    """Task database model."""
    __tablename__ = "tasks"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", index=True)
    is_complete: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class TaskCreate(SQLModel):
    """Schema for task creation."""
    title: str
    description: str = ""


class TaskUpdate(SQLModel):
    """Schema for task update."""
    title: Optional[str] = None
    description: Optional[str] = None


class TaskRead(SQLModel):
    """Schema for task response."""
    id: int
    title: str
    description: str
    is_complete: bool
    user_id: int
    created_at: datetime
    updated_at: datetime
