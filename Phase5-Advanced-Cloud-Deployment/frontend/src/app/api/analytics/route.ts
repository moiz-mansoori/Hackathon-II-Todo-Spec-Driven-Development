import { NextRequest, NextResponse } from "next/server";
import { getAnalytics } from "@/lib/db";

// GET /api/analytics - Get task analytics for a user
export async function GET(request: NextRequest) {
    try {
        const userId = request.headers.get("x-user-id");
        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 401 });
        }

        const analytics = await getAnalytics(parseInt(userId));
        return NextResponse.json(analytics);
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
    }
}
