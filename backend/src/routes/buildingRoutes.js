import { Router } from "express";
import {
  listBuildings,
  getBuilding,
  createBuilding,
  updateBuilding,
  deleteBuilding
} from "../controllers/buildingController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";

const router = Router();

// Read: anyone logged in
router.get("/", requireAuth, listBuildings);
router.get("/:id", requireAuth, getBuilding);

// Write: editor/admin
router.post("/", requireAuth, requireRole("EDITOR", "ADMIN"), createBuilding);
router.put("/:id", requireAuth, requireRole("EDITOR", "ADMIN"), updateBuilding);

// Destructive: admin only
router.delete("/:id", requireAuth, requireRole("ADMIN"), deleteBuilding);

export default router;
