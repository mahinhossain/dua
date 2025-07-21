import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "../../../models/Product";
await dbConnect();

// GET all users
export async function GET() {
 const product = await Product.find({});

  return NextResponse.json(product);
}

export async function POST(request) {
  const { name, price, description } = await request.json();
  for (let i = 0; i < 100; i++) {
   
    
    const product = await Product.create({ name, price, description });
  }

  return NextResponse.json("Product created successfully", );
}
