import Building from "../models/Building.js";

// GET /api/buildings
export async function listBuildings(req, res) {
  try {
    const buildings = await Building.find({})
      .sort({ name: 1 })
      .select("_id name centerLat centerLng floors createdAt updatedAt");

    return res.json({ buildings });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch buildings" });
  }
}

// GET /api/buildings/:id
export async function getBuilding(req, res) {
  try {
    const { id } = req.params;

    const building = await Building.findById(id);
    if (!building) return res.status(404).json({ error: "Building not found" });

    return res.json({ building });
  } catch (err) {
    return res.status(400).json({ error: "Invalid building id" });
  }
}

// POST /api/buildings
// Admin creates building "shell" (name only). Coordinates are system-managed.
export async function createBuilding(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }

    const building = await Building.create({
      name: String(name).trim(),
      floors: []
      // centerLat/centerLng NOT set here
    });

    return res.status(201).json({ building });
  } catch (err) {
    return res.status(500).json({ error: "Failed to create building" });
  }
}

// PUT /api/buildings/:id
// Only allow editing admin-managed fields (name). Ignore coords entirely.
export async function updateBuilding(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const update = {};
    if (name !== undefined) update.name = String(name).trim();

    const building = await Building.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true
    });

    if (!building) return res.status(404).json({ error: "Building not found" });

    return res.json({ building });
  } catch (err) {
    return res.status(400).json({ error: "Failed to update building" });
  }
}

// DELETE /api/buildings/:id
export async function deleteBuilding(req, res) {
  try {
    const { id } = req.params;

    const building = await Building.findByIdAndDelete(id);
    if (!building) return res.status(404).json({ error: "Building not found" });

    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).json({ error: "Failed to delete building" });
  }
}
