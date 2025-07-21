import {  
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "@/services/userService";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
   const awaitedParams = await params;
  const user = await getUserById(awaitedParams.id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(request, { params }) {
  try {
    const userData = await request.json();
    const updatedUser = await updateUser(params.id, userData);

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const deleted = await deleteUser(params.id);

    if (!deleted) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
