import User from '../models/User';
import bcrypt from 'bcrypt';

export async function createUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({
    ...userData,
    password: hashedPassword,
  });
  return await user.save();
}

export async function getUsers() {
  return await User.find({}).select('-password');
}

export async function getUserById(id) {
  return await User.findById(id).select('-password');
}

export async function updateUser(id, userData) {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  return await User.findByIdAndUpdate(id, userData, { new: true }).select('-password');
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