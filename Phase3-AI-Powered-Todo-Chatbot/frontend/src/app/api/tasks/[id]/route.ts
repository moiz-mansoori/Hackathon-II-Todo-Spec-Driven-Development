import { NextRequest, NextResponse } from "next/server";
import { getTaskById, updateTask, deleteTask, toggleTask } from "@/lib/db";

// GET /api/tasks/[id] - Get a specific task
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const userId = request.headers.get("x-user-id");

        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 401 });
        }

        const task = await getTaskById(parseInt(id), parseInt(userId));
        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
    }
}

// PUT /api/tasks/[id] - Update a task
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const userId = request.headers.get("x-user-id");

        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 401 });
        }

        const body = await request.json();
        const task = await updateTask(parseInt(id), parseInt(userId), body);

        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const userId = request.headers.get("x-user-id");

        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 401 });
        }

        const deleted = await deleteTask(parseInt(id), parseInt(userId));
        if (!deleted) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Task deleted" });
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
    }
}

// PATCH /api/tasks/[id] - Toggle task completion
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const userId = request.headers.get("x-user-id");

        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 401 });
        }

        const task = await toggleTask(parseInt(id), parseInt(userId));
        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json(task);
    } catch (error) {
        console.error("Error toggling task:", error);
        return NextResponse.json({ error: "Failed to toggle task" }, { status: 500 });
    }
}
