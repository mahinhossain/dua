import { NextResponse } from "next/server";
import Dua from "../models/Dua";

export async function createUser(userData) {
  const user =  Dua.insertMany(userData);
  return user;
}

export async function getUsers() {
  return await Dua.find({});
}

export async function getUserById(id) {
  return await User.findById(id).select("-password");
}

export async function updateUser(id, userData) {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  return await User.findByIdAndUpdate(id, userData, { new: true }).select(
    "-password"
  );
}

export async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

export async function validateUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}
