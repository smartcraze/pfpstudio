import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  emailVerified: Date,
  credits: { type: Number, default: 3 }, // Free credits
  usedCoupons: { type: [String], default: [] }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
