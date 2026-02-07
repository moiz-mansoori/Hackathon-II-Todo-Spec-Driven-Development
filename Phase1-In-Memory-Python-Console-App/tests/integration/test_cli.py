"""Integration tests for CLI commands."""

import subprocess
import sys
import os


def run_cli(*args: str) -> tuple[str, str, int]:
    """Run CLI command and return stdout, stderr, return code."""
    phase1_dir = os.path.join(os.path.dirname(__file__), "..", "..")
    src_dir = os.path.join(phase1_dir, "src")
    
    # Set PYTHONPATH to include src directory
    env = os.environ.copy()
    env["PYTHONPATH"] = src_dir
    
    result = subprocess.run(
        [sys.executable, "-m", "cli.main", *args],
        capture_output=True,
        text=True,
        cwd=src_dir,
        env=env
    )
    return result.stdout, result.stderr, result.returncode


class TestCLIHelp:
    """Tests for CLI help output."""
    
    def test_no_command_shows_help(self):
        """Test running without command shows help."""
        stdout, stderr, code = run_cli()
        
        assert code == 0
        assert "usage:" in stdout.lower() or "CLI In-Memory Todo" in stdout


class TestCLIAdd:
    """Tests for add command."""
    
    def test_add_task_shows_confirmation(self):
        """Test add command shows task created message."""
        stdout, stderr, code = run_cli("add", "Test task")
        
        assert code == 0
        assert "Created task" in stdout
        assert "Test task" in stdout
    
    def test_add_task_with_description(self):
        """Test add command with description."""
        stdout, stderr, code = run_cli("add", "Test task", "--desc", "Test desc")
        
        assert code == 0
        assert "Created task" in stdout
    
    def test_add_empty_title_error(self):
        """Test add with empty title shows error."""
        stdout, stderr, code = run_cli("add", "")
        
        assert code == 1
        assert "Error" in stderr


class TestCLIList:
    """Tests for list command."""
    
    def test_list_empty_shows_message(self):
        """Test list command with no tasks shows appropriate message."""
        stdout, stderr, code = run_cli("list")
        
        assert code == 0
        # Should show either "No tasks" or some task list
        assert "No tasks" in stdout or "ID" in stdout


class TestCLIFlow:
    """End-to-end flow tests."""
    
    def test_help_available(self):
        """Test help is available."""
        stdout, stderr, code = run_cli("--help")
        
        assert code == 0
        assert "add" in stdout
        assert "list" in stdout
        assert "delete" in stdout
