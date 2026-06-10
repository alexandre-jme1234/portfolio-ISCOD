import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET /api/expertises
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM expertises ORDER BY order_index"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/expertises/:slug
router.get("/:slug", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM expertises WHERE slug = ?",
      [req.params.slug]
    );
    if (!rows.length) return res.status(404).json({ error: "Expertise introuvable" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/expertises/:id
router.put("/:id", async (req, res) => {
  const { title, subtitle, description } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE expertises SET title = ?, subtitle = ?, description = ? WHERE id = ?",
      [title, subtitle, description, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ error: "Expertise introuvable" });
    res.json({ message: "Expertise mise à jour", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/expertises/:id
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM expertises WHERE id = ?",
      [req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ error: "Expertise introuvable" });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
