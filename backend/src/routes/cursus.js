import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET /api/cursus — formations avec leurs bullet points
router.get("/", async (req, res) => {
  try {
    const [schools] = await pool.query(
      "SELECT * FROM cursus ORDER BY order_index"
    );
    const [items] = await pool.query(
      "SELECT * FROM cursus_items ORDER BY cursus_id, order_index"
    );
    // Joindre les items à chaque formation
    const result = schools.map((school) => ({
      ...school,
      items: items.filter((i) => i.cursus_id === school.id),
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
