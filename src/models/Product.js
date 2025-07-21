import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
     
    
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent recompilation in development
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
