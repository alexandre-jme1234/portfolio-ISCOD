import { Router } from "express";
import pool from "../db.js";

const router = Router();

const parseProject = (row) => ({
  ...row,
  tags_expertises:  JSON.parse(row.tags_expertises  || "[]"),
  tags_competences: JSON.parse(row.tags_competences || "[]"),
});

// GET /api/projects
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM projects ORDER BY order_index"
    );
    res.json(rows.map(parseProject));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/projects/:slug
router.get("/:slug", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM projects WHERE slug = ?",
      [req.params.slug]
    );
    if (!rows.length) return res.status(404).json({ error: "Projet introuvable" });
    res.json(parseProject(rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/projects/:id
router.put("/:id", async (req, res) => {
  const { title, subtitle, description } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE projects SET title = ?, subtitle = ?, description = ? WHERE id = ?",
      [title, subtitle, description, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ error: "Projet introuvable" });
    res.json({ message: "Projet mis à jour", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/projects/:id
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM projects WHERE id = ?",
      [req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ error: "Projet introuvable" });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
