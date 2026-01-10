// backend/src/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: {
      type: String,
      enum: ["ADMIN", "EDITOR", "VIEWER"],
      default: "VIEWER"
    },
    passwordHash: {type: String, required: true}
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
