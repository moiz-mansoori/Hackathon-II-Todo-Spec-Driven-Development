"""CLI entry point for the Todo application."""

import argparse
import sys
from services.task_service import TaskService
from models.task import TaskStatus


# Global service instance for CLI session
_service = TaskService()


def create_parser() -> argparse.ArgumentParser:
    """Create the argument parser with all subcommands."""
    parser = argparse.ArgumentParser(
        prog="todo",
        description="CLI In-Memory Todo Application"
    )
    subparsers = parser.add_subparsers(dest="command", help="Available commands")
    
    # Add command
    add_parser = subparsers.add_parser("add", help="Add a new task")
    add_parser.add_argument("title", help="Task title")
    add_parser.add_argument("--desc", "-d", default="", help="Task description")
    
    # List command
    subparsers.add_parser("list", help="List all tasks")
    
    # Update command
    update_parser = subparsers.add_parser("update", help="Update a task")
    update_parser.add_argument("id", type=int, help="Task ID")
    update_parser.add_argument("--title", "-t", help="New title")
    update_parser.add_argument("--desc", "-d", help="New description")
    
    # Delete command
    delete_parser = subparsers.add_parser("delete", help="Delete a task")
    delete_parser.add_argument("id", type=int, help="Task ID")
    
    # Complete command
    complete_parser = subparsers.add_parser("complete", help="Toggle task completion")
    complete_parser.add_argument("id", type=int, help="Task ID")
    
    return parser


def format_status(status: TaskStatus) -> str:
    """Format task status with visual indicator."""
    if status == TaskStatus.COMPLETE:
        return "[✓] complete"
    return "[ ] pending"


def cmd_add(args: argparse.Namespace) -> int:
    """Handle add command."""
    try:
        task = _service.add(args.title, args.desc)
        print(f"Created task #{task.id}: {task.title}")
        print(f"Status: {format_status(task.status)}")
        return 0
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        return 1


def cmd_list(args: argparse.Namespace) -> int:
    """Handle list command."""
    tasks = _service.get_all()
    
    if not tasks:
        print("No tasks found. Use 'add' to create your first task.")
        return 0
    
    print(f"\n{'ID':<5} {'Status':<15} {'Title':<30} {'Description'}")
    print("-" * 70)
    
    for task in tasks:
        status = format_status(task.status)
        desc = task.description[:20] + "..." if len(task.description) > 20 else task.description
        print(f"{task.id:<5} {status:<15} {task.title:<30} {desc}")
    
    print(f"\nTotal: {len(tasks)} task(s)")
    return 0


def cmd_update(args: argparse.Namespace) -> int:
    """Handle update command."""
    if args.title is None and args.desc is None:
        print("Error: Provide --title and/or --desc to update", file=sys.stderr)
        return 1
    
    try:
        task = _service.update(args.id, args.title, args.desc)
        if task is None:
            print(f"Error: Task with ID {args.id} not found", file=sys.stderr)
            return 1
        print(f"Updated task #{task.id}: {task.title}")
        return 0
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        return 1


def cmd_delete(args: argparse.Namespace) -> int:
    """Handle delete command."""
    if _service.delete(args.id):
        print(f"Deleted task #{args.id}")
        return 0
    else:
        print(f"Error: Task with ID {args.id} not found", file=sys.stderr)
        return 1


def cmd_complete(args: argparse.Namespace) -> int:
    """Handle complete command."""
    task = _service.toggle_complete(args.id)
    if task is None:
        print(f"Error: Task with ID {args.id} not found", file=sys.stderr)
        return 1
    
    status_text = "complete" if task.is_complete() else "pending"
    print(f"Task #{task.id} marked as {status_text}")
    return 0


def main() -> int:
    """Main entry point for the CLI."""
    parser = create_parser()
    args = parser.parse_args()
    
    if args.command is None:
        parser.print_help()
        return 0
    
    commands = {
        "add": cmd_add,
        "list": cmd_list,
        "update": cmd_update,
        "delete": cmd_delete,
        "complete": cmd_complete,
    }
    
    handler = commands.get(args.command)
    if handler:
        return handler(args)
    
    parser.print_help()
    return 1


if __name__ == "__main__":
    sys.exit(main())
