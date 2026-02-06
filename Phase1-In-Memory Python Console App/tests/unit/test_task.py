"""Unit tests for Task model."""

import pytest
from models.task import Task, TaskStatus


class TestTaskStatus:
    """Tests for TaskStatus enum."""
    
    def test_pending_value(self):
        """Test pending status has correct value."""
        assert TaskStatus.PENDING.value == "pending"
    
    def test_complete_value(self):
        """Test complete status has correct value."""
        assert TaskStatus.COMPLETE.value == "complete"


class TestTask:
    """Tests for Task dataclass."""
    
    def test_create_task_with_defaults(self):
        """Test creating task with default values."""
        task = Task(id=1, title="Test task")
        
        assert task.id == 1
        assert task.title == "Test task"
        assert task.description == ""
        assert task.status == TaskStatus.PENDING
    
    def test_create_task_with_all_fields(self):
        """Test creating task with all fields specified."""
        task = Task(
            id=1,
            title="Test task",
            description="Test description",
            status=TaskStatus.COMPLETE
        )
        
        assert task.id == 1
        assert task.title == "Test task"
        assert task.description == "Test description"
        assert task.status == TaskStatus.COMPLETE
    
    def test_is_complete_false_for_pending(self):
        """Test is_complete returns False for pending task."""
        task = Task(id=1, title="Test")
        assert task.is_complete() is False
    
    def test_is_complete_true_for_complete(self):
        """Test is_complete returns True for complete task."""
        task = Task(id=1, title="Test", status=TaskStatus.COMPLETE)
        assert task.is_complete() is True
    
    def test_toggle_status_pending_to_complete(self):
        """Test toggling from pending to complete."""
        task = Task(id=1, title="Test")
        task.toggle_status()
        assert task.status == TaskStatus.COMPLETE
    
    def test_toggle_status_complete_to_pending(self):
        """Test toggling from complete to pending."""
        task = Task(id=1, title="Test", status=TaskStatus.COMPLETE)
        task.toggle_status()
        assert task.status == TaskStatus.PENDING
