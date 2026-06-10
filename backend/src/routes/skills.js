import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET /api/skills — toutes les compétences groupées par catégorie
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM skills ORDER BY category, order_index"
    );
    const grouped = rows.reduce((acc, s) => {
      if (!acc[s.category]) acc[s.category] = [];
      acc[s.category].push(s);
      return acc;
    }, {});
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/skills/:category — compétences d'une catégorie
router.get("/:category", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM skills WHERE category = ? ORDER BY order_index",
      [req.params.category]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/skills/:id
router.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE skills SET name = ?, description = ? WHERE id = ?",
      [name, description, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ error: "Compétence introuvable" });
    res.json({ message: "Compétence mise à jour", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/skills/:id
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM skills WHERE id = ?", [req.params.id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
