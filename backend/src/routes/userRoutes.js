// backend/src/routes/userRoutes.js
import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";

const router = Router();

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

router.get("/admin/ping", requireAuth, requireRole("ADMIN"), (req, res) => {
  res.json({ ok: true, message: "admin pong" });
});

export default router;
