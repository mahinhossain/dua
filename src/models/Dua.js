import mongoose from "mongoose";

const duaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    arabic: {
      type: String,
      required: true,
      trim: true,
    },
    transliteration: {
      type: String,
      required: true,
      trim: true,
    },
    meaning: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent recompilation in development
const Dua =  mongoose.models.Dua ||mongoose.model("Dua", duaSchema);

export default Dua;
