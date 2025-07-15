import { getTargets, addTarget, getTargetsByUserAndMonth } from "../../../../lib/data";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    if (userId && month && year) {
      const targets = getTargetsByUserAndMonth(userId, month, year);
      return NextResponse.json(targets);
    }

    const allTargets = getTargets();
    return NextResponse.json(allTargets);
  } catch (error) {
    console.error("Error fetching targets:", error);
    return NextResponse.json(
      { error: "Failed to fetch targets" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const targetData = await request.json();

    // Basic validation
    if (!targetData.userId || !targetData.month || !targetData.year) {
      return NextResponse.json(
        { error: "userId, month, and year are required" },
        { status: 400 }
      );
    }

    const newTarget = addTarget(targetData);
    return NextResponse.json(newTarget, { status: 201 });
  } catch (error) {
    console.error("Error creating target:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create target" },
      { status: 500 }
    );
  }
}
