import { getUsers, addUser } from '../../../../lib/data';
// import { getUsers, addUser } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = getUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const userData = await request.json();
    
    // Basic validation
    if (!userData.name || !userData.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const newUser = addUser(userData);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create user" },
      { status: 500 }
    );
  }
}