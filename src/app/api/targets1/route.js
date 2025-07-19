import {
  getTargets,
  addTarget,
  getTargetsByUserAndMonth,
} from "@/services/TargetService";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    if (userId && month && year) {
      const targets = await getTargetsByUserAndMonth(userId, month, year);
      return NextResponse.json(targets);
    }

    const allTargets = await getTargets();
    return NextResponse.json(allTargets);
  } catch (error) {
    console.error("Error fetching targets11:", error);
    return NextResponse.json(
      { error: "Failed to fetch targets11" },
      { status: 500 }
    );
  }
}

export async function POST(request) {

  const targetData = await request.json();
  const newTarget = await addTarget(targetData);
  return NextResponse.json(newTarget, { status: 201 });
 
}
