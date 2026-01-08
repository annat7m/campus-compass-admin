// backend/src/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["ADMIN", "EDITOR", "VIEWER"],
      default: "VIEWER"
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
