// backend/src/models/Building.js
import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    number: {type: String, required: true},
    waypointId: {type: String}
  },
  // room is embedded, but still needs mongo _id asigned
  {_id: true}
);

const FloorSchema = new mongoose.Schema(
  {
    level: {type: String, required: true},
    mapAssetURL: {type: String},
    rooms: [RoomSchema]
  },
  // floors are embedded as well, still need mongo _id asigned to each
  {_id: true}
);

const BuildingSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    floors: [FloorSchema]
  },
  { timestamp: true}
);

export default mongoose.model("Building", BuildingSchema);