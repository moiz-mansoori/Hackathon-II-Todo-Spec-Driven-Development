"""Task CRUD routes."""

from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from database import get_session
from models.task import TaskCreate, TaskUpdate, TaskRead
from models.user import User
from services.task_service import TaskService
from dependencies import get_current_user


router = APIRouter(prefix="/api/tasks", tags=["tasks"])


@router.get("", response_model=list[TaskRead])
def get_tasks(
    session: Annotated[Session, Depends(get_session)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    """Get all tasks for the current user."""
    return TaskService.get_user_tasks(session, current_user.id)


@router.post("", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(
    task_data: TaskCreate,
    session: Annotated[Session, Depends(get_session)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    """Create a new task."""
    if not task_data.title.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Title is required"
        )
    
    return TaskService.create_task(session, current_user.id, task_data)


@router.put("/{task_id}", response_model=TaskRead)
def update_task(
    task_id: int,
    task_data: TaskUpdate,
    session: Annotated[Session, Depends(get_session)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    """Update a task."""
    task = TaskService.update_task(session, task_id, current_user.id, task_data)
    
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    return task


@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    session: Annotated[Session, Depends(get_session)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    """Delete a task."""
    deleted = TaskService.delete_task(session, task_id, current_user.id)
    
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    return {"success": True, "message": "Task deleted"}


@router.patch("/{task_id}/complete", response_model=TaskRead)
def toggle_complete(
    task_id: int,
    session: Annotated[Session, Depends(get_session)],
    current_user: Annotated[User, Depends(get_current_user)]
):
    """Toggle task completion status."""
    task = TaskService.toggle_complete(session, task_id, current_user.id)
    
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    return task
