import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET /api/content/:page
// Retourne tous les blocs d'une page, groupés par catégorie
router.get("/:page", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, block_key, type, value, category, order_index
       FROM content_blocks
       WHERE page_slug = ?
       ORDER BY category, order_index`,
      [req.params.page]
    );

    const grouped = rows.reduce((acc, row) => {
      const cat = row.category || "default";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(row);
      return acc;
    }, {});

    res.json({ page: req.params.page, content: grouped });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/content/:page/:key — un bloc précis
router.get("/:page/:key", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, block_key, type, value, category, order_index
       FROM content_blocks WHERE page_slug = ? AND block_key = ?`,
      [req.params.page, req.params.key]
    );
    if (!rows.length) return res.status(404).json({ error: "Bloc introuvable" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/content/:id — mise à jour d'un bloc
router.put("/:id", async (req, res) => {
  const { value } = req.body;
  if (!value) return res.status(400).json({ error: "Champ value requis" });
  try {
    const [result] = await pool.query(
      "UPDATE content_blocks SET value = ? WHERE id = ?",
      [value, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ error: "Bloc introuvable" });
    res.json({ message: "Bloc mis à jour", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/content/:id
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM content_blocks WHERE id = ?",
      [req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ error: "Bloc introuvable" });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
