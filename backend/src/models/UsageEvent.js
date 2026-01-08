// backend/src/models/UsageEvent.js
import mongoose from "mongoose";

const UsageEventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["search", "navigation_start", "navigation_end"],
      required: true
    },
    buildingId: { type: mongoose.Schema.Types.ObjectId, ref: "Building" },
    floorId: { type: mongoose.Schema.Types.ObjectId },
    roomId: { type: mongoose.Schema.Types.ObjectId },
    metadata: { type: mongoose.Schema.Types.Mixed }
  },
  { timestamps: true }
);

UsageEventSchema.index({ createdAt: 1 });
UsageEventSchema.index({ type: 1 });
UsageEventSchema.index({ buildingId: 1, createdAt: 1 });

export default mongoose.model("UsageEvent", UsageEventSchema);
