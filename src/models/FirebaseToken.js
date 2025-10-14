import mongoose from "mongoose";

const firebaseToken = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    token: {
      type: String,
      required: true,
      trim: true,
    },
    browserId: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent recompilation in development
const FirebaseToken =
  mongoose.models.FirebaseToken ||
  mongoose.model("FirebaseToken", firebaseToken);

export default FirebaseToken;
