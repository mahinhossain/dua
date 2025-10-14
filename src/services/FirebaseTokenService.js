import { NextResponse } from "next/server";
import FirebaseTokenModel from "../models/FirebaseToken";

export async function storeToken(data) {
  const token = FirebaseTokenModel.insertMany(data);
  return token;
}

export async function getToken() {
  const latestTokenDoc = await FirebaseTokenModel.findOne({})
    .sort({ createdAt: -1 }) // or use updatedAt if preferred
    .lean(); // optional, returns plain JS object

  return latestTokenDoc?.token || null; // return token or null if not found
}
