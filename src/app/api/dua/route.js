import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
} from '@/services/DuaService';

// Connect to DB
await dbConnect();

// GET all users
export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST create a new user
export async function POST(request) {
  try {
    const userData = await request.json();
    const user = await createUser(userData);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// PUT update a user
export async function PUT(request) {
  try {
    const { id, ...userData } = await request.json();
    const updatedUser = await updateUser(id, userData);
    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE a user
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}