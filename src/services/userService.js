import User from "../models/User";
import Target from "../models/TargetModel";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function createUser(userData) {
  // return userData;
  // const hashedPassword = await bcrypt.hash(userData.name, 10);
  const user = new User({
    ...userData,
  });
  return await user.save();
}

export async function getUsers() {
  return await User.find({}).select("-password");
}

export async function getUserById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid user ID");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  return user;
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
  const userId = id;
  await Target.deleteMany({ userId });
  return await User.findByIdAndDelete(id);
}

export async function validateUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}
