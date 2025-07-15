import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.join(__dirname, "../src/app/data");
console.log("path---", dataDirectory);
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
  // Validate required fields
  if (
    !target.userId ||
    !target.month ||
    !target.year ||
    target.target === undefined ||
    target.achievement === undefined
  ) {
    throw new Error("Missing required target fields");
  }

  const targets = getTargets();

  // Convert month/year to numbers for consistent comparison
  const month = Number(target.month);
  const year = Number(target.year);

  // Check for existing target
  const existingIndex = targets.findIndex(
    (t) =>
      t.userId === target.userId &&
      Number(t.month) === month &&
      Number(t.year) === year
  );

  const now = new Date().toISOString();
  const newTarget = {
    ...target,
    month, // Ensure numeric value
    year, // Ensure numeric value
    id: existingIndex >= 0 ? targets[existingIndex].id : Date.now().toString(),
    createdAt: existingIndex >= 0 ? targets[existingIndex].createdAt : now,
    updatedAt: now,
  };

  const updatedTargets =
    existingIndex >= 0
      ? [
          ...targets.slice(0, existingIndex),
          newTarget,
          ...targets.slice(existingIndex + 1),
        ]
      : [...targets, newTarget];

  writeJsonFile("targets.json", updatedTargets);
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
