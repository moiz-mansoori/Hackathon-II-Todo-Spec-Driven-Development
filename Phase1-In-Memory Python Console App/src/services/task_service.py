"""Task service for CRUD operations on tasks."""

from models.task import Task, TaskStatus


class TaskService:
    """Service for managing tasks in-memory.
    
    Provides CRUD operations for tasks with auto-incrementing IDs.
    All data is stored in memory and lost when the application exits.
    """
    
    def __init__(self) -> None:
        """Initialize the task service with empty storage."""
        self._tasks: dict[int, Task] = {}
        self._next_id: int = 1
    
    def add(self, title: str, description: str = "") -> Task:
        """Add a new task.
        
        Args:
            title: The task title (required).
            description: Optional task description.
            
        Returns:
            The created Task with assigned ID.
            
        Raises:
            ValueError: If title is empty or whitespace only.
        """
        if not title or not title.strip():
            raise ValueError("Title is required")
        
        task = Task(
            id=self._next_id,
            title=title.strip(),
            description=description.strip() if description else ""
        )
        self._tasks[self._next_id] = task
        self._next_id += 1
        return task
    
    def get_all(self) -> list[Task]:
        """Get all tasks.
        
        Returns:
            List of all tasks, ordered by ID.
        """
        return sorted(self._tasks.values(), key=lambda t: t.id)
    
    def get(self, task_id: int) -> Task | None:
        """Get a task by ID.
        
        Args:
            task_id: The ID of the task to retrieve.
            
        Returns:
            The Task if found, None otherwise.
        """
        return self._tasks.get(task_id)
    
    def update(
        self, 
        task_id: int, 
        title: str | None = None, 
        description: str | None = None
    ) -> Task | None:
        """Update an existing task.
        
        Args:
            task_id: The ID of the task to update.
            title: New title (optional, if None keeps existing).
            description: New description (optional, if None keeps existing).
            
        Returns:
            The updated Task if found, None if task doesn't exist.
            
        Raises:
            ValueError: If title is provided but empty.
        """
        task = self._tasks.get(task_id)
        if task is None:
            return None
        
        if title is not None:
            if not title.strip():
                raise ValueError("Title cannot be empty")
            task.title = title.strip()
        
        if description is not None:
            task.description = description.strip()
        
        return task
    
    def delete(self, task_id: int) -> bool:
        """Delete a task by ID.
        
        Args:
            task_id: The ID of the task to delete.
            
        Returns:
            True if task was deleted, False if not found.
        """
        if task_id in self._tasks:
            del self._tasks[task_id]
            return True
        return False
    
    def toggle_complete(self, task_id: int) -> Task | None:
        """Toggle the completion status of a task.
        
        Args:
            task_id: The ID of the task to toggle.
            
        Returns:
            The updated Task if found, None if task doesn't exist.
        """
        task = self._tasks.get(task_id)
        if task is None:
            return None
        
        task.toggle_status()
        return task
