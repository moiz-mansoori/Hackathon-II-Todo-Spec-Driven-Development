import os
import httpx
from fastmcp import FastMCP
from dotenv import load_dotenv

load_dotenv()

# Initialize FastMCP Server
mcp = FastMCP("ModernTodos")

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8888")

@mcp.tool()
async def list_tasks(auth_token: str) -> str:
    """
    Lists all tasks for the authenticated user.
    Required: auth_token (JWT from sign-in)
    """
    headers = {"Authorization": f"Bearer {auth_token}"}
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BACKEND_URL}/tasks", headers=headers)
        if response.status_code == 200:
            tasks = response.json()
            if not tasks:
                return "You have no tasks yet."
            
            output = "Your Tasks:\n"
            for t in tasks:
                status = "✅" if t['is_complete'] else "⏳"
                output += f"- [{status}] {t['title']} (ID: {t['id']})\n"
                if t['description']:
                    output += f"  Desc: {t['description']}\n"
            return output
        return f"Error fetching tasks: {response.text}"

@mcp.tool()
async def create_task(title: str, auth_token: str, description: str = "") -> str:
    """
    Creates a new task for the user.
    Required: title, auth_token
    Optional: description
    """
    headers = {"Authorization": f"Bearer {auth_token}"}
    data = {"title": title, "description": description}
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{BACKEND_URL}/tasks", json=data, headers=headers)
        if response.status_code == 200:
            task = response.json()
            return f"Successfully created task: {task['title']} (ID: {task['id']})"
        return f"Error creating task: {response.text}"

@mcp.tool()
async def toggle_task(task_id: int, auth_token: str) -> str:
    """
    Toggles the completion status of a task.
    Required: task_id, auth_token
    """
    headers = {"Authorization": f"Bearer {auth_token}"}
    async with httpx.AsyncClient() as client:
        response = await client.patch(f"{BACKEND_URL}/tasks/{task_id}/complete", headers=headers)
        if response.status_code == 200:
            task = response.json()
            status = "completed" if task['is_complete'] else "pending"
            return f"Task '{task['title']}' is now {status}."
        return f"Error toggling task: {response.text}"

@mcp.tool()
async def delete_task(task_id: int, auth_token: str) -> str:
    """
    Deletes a task by ID.
    Required: task_id, auth_token
    """
    headers = {"Authorization": f"Bearer {auth_token}"}
    async with httpx.AsyncClient() as client:
        response = await client.delete(f"{BACKEND_URL}/tasks/{task_id}", headers=headers)
        if response.status_code == 200:
            return f"Successfully deleted task {task_id}."
        return f"Error deleting task: {response.text}"

if __name__ == "__main__":
    mcp.run()
