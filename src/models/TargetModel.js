import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  target: {
    type: String,  // You can also use Number if target is strictly numeric
    required: true
  },
  achievement: {
    type: String,  // You can also use Number if achievement is strictly numeric
    required: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Achievement = mongoose.models.Achievement || mongoose.model('Achievement', achievementSchema);

export default  Achievement;
