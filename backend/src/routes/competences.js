import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET /api/competences
// Retourne la liste des pages de type 'competence' (hors page d'overview)
// triées par ordre d'insertion — utilisée par la navbar pour les sous-menus dynamiques.
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT slug, title
       FROM pages
       WHERE type = 'competence'
         AND slug != 'competences'
       ORDER BY id`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
