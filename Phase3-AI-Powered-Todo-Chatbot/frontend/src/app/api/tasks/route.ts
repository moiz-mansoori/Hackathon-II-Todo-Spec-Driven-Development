import { NextRequest, NextResponse } from "next/server";
import { getTasks, createTask } from "@/lib/db";

// GET /api/tasks - Get all tasks for a user
export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 401 });
        }

        const tasks = await getTasks(parseInt(userId));
        return NextResponse.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
    }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 401 });
        }

        const body = await request.json();
        const { title, description = "", priority = "medium", due_date = null, tags = [] } = body;

        if (!title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        const task = await createTask(parseInt(userId), title, description, priority, due_date, tags);
        return NextResponse.json(task, { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
    }
}
