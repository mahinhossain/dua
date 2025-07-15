import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.join(__dirname, "../../data");

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

// Helper function to read JSON files
const readJsonFile = (filename) => {
  const filePath = path.join(dataDirectory, filename);
  try {
    // Create file if it doesn't exist
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf8");
      return [];
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
};

// Helper function to write JSON files
const writeJsonFile = (filename, data) => {
  const filePath = path.join(dataDirectory, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
};

// Users CRUD operations
export const getUsers = () => readJsonFile("users.json");
export const addUser = (user) => {
  const users = getUsers();
  const newUser = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  writeJsonFile("users.json", [...users, newUser]);
  return newUser;
};

// Targets CRUD operations
export const getTargets = () => readJsonFile("targets.json");
export const addTarget = (target) => {
  const targets = getTargets();
  const newTarget = {
    ...target,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  writeJsonFile("targets.json", [...targets, newTarget]);
  return newTarget;
};
export const getTargetsByUserAndMonth = (userId, month, year) => {
  const targets = getTargets();
  return targets.filter(
    (t) =>
      t.userId === userId &&
      t.month === parseInt(month) &&
      t.year === parseInt(year)
  );
};
export const getUserById = (id) => {
  const users = getUsers();
  return users.find((user) => user.id === id);
};

export const updateUser = (id, updates) => {
  const users = getUsers();
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) return null;

  const updatedUser = {
    ...users[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  const newUsers = [
    ...users.slice(0, index),
    updatedUser,
    ...users.slice(index + 1),
  ];

  writeJsonFile("users.json", newUsers);
  return updatedUser;
};

export const deleteUser = (id) => {
  const users = getUsers();
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) return false;

  const newUsers = [...users.slice(0, index), ...users.slice(index + 1)];

  writeJsonFile("users.json", newUsers);
  return true;
};
