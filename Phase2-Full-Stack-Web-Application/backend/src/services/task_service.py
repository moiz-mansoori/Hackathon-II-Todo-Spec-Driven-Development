"""Task service for CRUD operations."""

from datetime import datetime
from typing import Optional
from sqlmodel import Session, select
from ..models.task import Task, TaskCreate, TaskUpdate


class TaskService:
    """Service for task CRUD operations."""
    
    @staticmethod
    def create_task(session: Session, user_id: int, task_data: TaskCreate) -> Task:
        """Create a new task for a user."""
        task = Task(
            user_id=user_id,
            title=task_data.title,
            description=task_data.description
        )
        session.add(task)
        session.commit()
        session.refresh(task)
        return task
    
    @staticmethod
    def get_user_tasks(session: Session, user_id: int) -> list[Task]:
        """Get all tasks for a user."""
        statement = select(Task).where(Task.user_id == user_id).order_by(Task.created_at.desc())
        return list(session.exec(statement).all())
    
    @staticmethod
    def get_task(session: Session, task_id: int, user_id: int) -> Optional[Task]:
        """Get a specific task by ID, scoped to user."""
        statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
        return session.exec(statement).first()
    
    @staticmethod
    def update_task(
        session: Session, 
        task_id: int, 
        user_id: int, 
        task_data: TaskUpdate
    ) -> Optional[Task]:
        """Update a task."""
        task = TaskService.get_task(session, task_id, user_id)
        if task is None:
            return None
        
        if task_data.title is not None:
            task.title = task_data.title
        if task_data.description is not None:
            task.description = task_data.description
        
        task.updated_at = datetime.utcnow()
        session.add(task)
        session.commit()
        session.refresh(task)
        return task
    
    @staticmethod
    def delete_task(session: Session, task_id: int, user_id: int) -> bool:
        """Delete a task."""
        task = TaskService.get_task(session, task_id, user_id)
        if task is None:
            return False
        
        session.delete(task)
        session.commit()
        return True
    
    @staticmethod
    def toggle_complete(session: Session, task_id: int, user_id: int) -> Optional[Task]:
        """Toggle task completion status."""
        task = TaskService.get_task(session, task_id, user_id)
        if task is None:
            return None
        
        task.is_complete = not task.is_complete
        task.updated_at = datetime.utcnow()
        session.add(task)
        session.commit()
        session.refresh(task)
        return task
