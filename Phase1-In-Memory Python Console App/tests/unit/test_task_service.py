"""Unit tests for TaskService."""

import pytest
from services.task_service import TaskService
from models.task import TaskStatus


class TestTaskServiceAdd:
    """Tests for TaskService.add method."""
    
    def test_add_task_returns_task(self):
        """Test adding task returns the created task."""
        service = TaskService()
        task = service.add("Test task")
        
        assert task.id == 1
        assert task.title == "Test task"
        assert task.description == ""
        assert task.status == TaskStatus.PENDING
    
    def test_add_task_with_description(self):
        """Test adding task with description."""
        service = TaskService()
        task = service.add("Test task", "Task description")
        
        assert task.description == "Task description"
    
    def test_add_multiple_tasks_increments_id(self):
        """Test that IDs auto-increment."""
        service = TaskService()
        task1 = service.add("Task 1")
        task2 = service.add("Task 2")
        task3 = service.add("Task 3")
        
        assert task1.id == 1
        assert task2.id == 2
        assert task3.id == 3
    
    def test_add_task_empty_title_raises(self):
        """Test that empty title raises ValueError."""
        service = TaskService()
        
        with pytest.raises(ValueError, match="Title is required"):
            service.add("")
    
    def test_add_task_whitespace_title_raises(self):
        """Test that whitespace-only title raises ValueError."""
        service = TaskService()
        
        with pytest.raises(ValueError, match="Title is required"):
            service.add("   ")
    
    def test_add_task_strips_whitespace(self):
        """Test that title and description are stripped."""
        service = TaskService()
        task = service.add("  Test  ", "  Description  ")
        
        assert task.title == "Test"
        assert task.description == "Description"


class TestTaskServiceGetAll:
    """Tests for TaskService.get_all method."""
    
    def test_get_all_empty(self):
        """Test get_all returns empty list when no tasks."""
        service = TaskService()
        tasks = service.get_all()
        
        assert tasks == []
    
    def test_get_all_returns_all_tasks(self):
        """Test get_all returns all added tasks."""
        service = TaskService()
        service.add("Task 1")
        service.add("Task 2")
        
        tasks = service.get_all()
        
        assert len(tasks) == 2
        assert tasks[0].title == "Task 1"
        assert tasks[1].title == "Task 2"
    
    def test_get_all_returns_sorted_by_id(self):
        """Test tasks are sorted by ID."""
        service = TaskService()
        service.add("Task 1")
        service.add("Task 2")
        service.add("Task 3")
        
        tasks = service.get_all()
        
        assert [t.id for t in tasks] == [1, 2, 3]


class TestTaskServiceGet:
    """Tests for TaskService.get method."""
    
    def test_get_existing_task(self):
        """Test getting an existing task by ID."""
        service = TaskService()
        service.add("Task 1")
        
        task = service.get(1)
        
        assert task is not None
        assert task.title == "Task 1"
    
    def test_get_nonexistent_task(self):
        """Test getting a non-existent task returns None."""
        service = TaskService()
        
        task = service.get(99)
        
        assert task is None


class TestTaskServiceUpdate:
    """Tests for TaskService.update method."""
    
    def test_update_title(self):
        """Test updating task title."""
        service = TaskService()
        service.add("Old title")
        
        task = service.update(1, title="New title")
        
        assert task is not None
        assert task.title == "New title"
    
    def test_update_description(self):
        """Test updating task description."""
        service = TaskService()
        service.add("Task", "Old desc")
        
        task = service.update(1, description="New desc")
        
        assert task is not None
        assert task.description == "New desc"
    
    def test_update_both_fields(self):
        """Test updating both title and description."""
        service = TaskService()
        service.add("Old title", "Old desc")
        
        task = service.update(1, title="New title", description="New desc")
        
        assert task is not None
        assert task.title == "New title"
        assert task.description == "New desc"
    
    def test_update_nonexistent_task(self):
        """Test updating non-existent task returns None."""
        service = TaskService()
        
        task = service.update(99, title="New")
        
        assert task is None
    
    def test_update_empty_title_raises(self):
        """Test updating with empty title raises ValueError."""
        service = TaskService()
        service.add("Task")
        
        with pytest.raises(ValueError, match="Title cannot be empty"):
            service.update(1, title="")


class TestTaskServiceDelete:
    """Tests for TaskService.delete method."""
    
    def test_delete_existing_task(self):
        """Test deleting an existing task."""
        service = TaskService()
        service.add("Task 1")
        
        result = service.delete(1)
        
        assert result is True
        assert service.get(1) is None
    
    def test_delete_nonexistent_task(self):
        """Test deleting non-existent task returns False."""
        service = TaskService()
        
        result = service.delete(99)
        
        assert result is False


class TestTaskServiceToggleComplete:
    """Tests for TaskService.toggle_complete method."""
    
    def test_toggle_pending_to_complete(self):
        """Test toggling pending task to complete."""
        service = TaskService()
        service.add("Task")
        
        task = service.toggle_complete(1)
        
        assert task is not None
        assert task.status == TaskStatus.COMPLETE
    
    def test_toggle_complete_to_pending(self):
        """Test toggling complete task to pending."""
        service = TaskService()
        service.add("Task")
        service.toggle_complete(1)  # Make it complete first
        
        task = service.toggle_complete(1)
        
        assert task is not None
        assert task.status == TaskStatus.PENDING
    
    def test_toggle_nonexistent_task(self):
        """Test toggling non-existent task returns None."""
        service = TaskService()
        
        task = service.toggle_complete(99)
        
        assert task is None
