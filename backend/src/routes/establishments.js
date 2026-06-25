import { Router } from "express";
import pool from "../db.js";

/**
 * Routes /api/establishments — CRUD des pages de présentation d'établissement.
 *
 * Un établissement = nom + sous-titre + textes de présentation générale,
 * accompagné d'un tableau d'arguments "vision pédagogique" (table liée).
 * Le logo n'est PAS géré ici : il est servi statiquement par le frontend.
 *
 *   GET    /api/establishments        → liste (sans les visions)
 *   GET    /api/establishments/:slug   → un établissement + ses visions
 *   POST   /api/establishments         → création (établissement + visions)
 *   PUT    /api/establishments/:id      → mise à jour (établissement + visions)
 *   DELETE /api/establishments/:id      → suppression (visions supprimées en cascade)
 */

const router = Router();

// Charge les visions (cartes pédagogiques) d'un établissement, triées par position.
async function fetchVisions(establishmentId) {
  const [rows] = await pool.query(
    "SELECT id, title, description, position FROM establishment_visions WHERE establishment_id = ? ORDER BY position",
    [establishmentId]
  );
  return rows;
}

// GET /api/establishments — liste légère (pour debug / admin)
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, slug, name, subtitle FROM establishments ORDER BY name"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/establishments/:slug — détail complet (établissement + visions)
router.get("/:slug", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM establishments WHERE slug = ?",
      [req.params.slug]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "Établissement introuvable" });
    }
    const establishment = rows[0];
    establishment.visions = await fetchVisions(establishment.id);
    res.json(establishment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/establishments — création
// Body attendu : { slug, name, subtitle, presentation_left, presentation_right, visions: [{title, description}] }
router.post("/", async (req, res) => {
  const {
    slug,
    name,
    subtitle = null,
    presentation_left = null,
    presentation_right = null,
    visions = [],
  } = req.body;

  if (!slug || !name) {
    return res.status(400).json({ error: "Les champs 'slug' et 'name' sont requis" });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO establishments (slug, name, subtitle, presentation_left, presentation_right)
       VALUES (?, ?, ?, ?, ?)`,
      [slug, name, subtitle, presentation_left, presentation_right]
    );
    const establishmentId = result.insertId;

    // Insère les visions associées (ordre = index du tableau)
    for (let i = 0; i < visions.length; i++) {
      await pool.query(
        `INSERT INTO establishment_visions (establishment_id, title, description, position)
         VALUES (?, ?, ?, ?)`,
        [establishmentId, visions[i].title, visions[i].description ?? null, i]
      );
    }

    res.status(201).json({ message: "Établissement créé", id: establishmentId });
  } catch (err) {
    // Doublon de slug → 409 Conflict
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Ce slug existe déjà" });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/establishments/:id — mise à jour
// Si `visions` est fourni, les anciennes sont remplacées par les nouvelles.
router.put("/:id", async (req, res) => {
  const { name, subtitle, presentation_left, presentation_right, visions } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE establishments
       SET name = ?, subtitle = ?, presentation_left = ?, presentation_right = ?
       WHERE id = ?`,
      [name, subtitle, presentation_left, presentation_right, req.params.id]
    );
    if (!result.affectedRows) {
      return res.status(404).json({ error: "Établissement introuvable" });
    }

    // Remplacement des visions si le tableau est fourni
    if (Array.isArray(visions)) {
      await pool.query(
        "DELETE FROM establishment_visions WHERE establishment_id = ?",
        [req.params.id]
      );
      for (let i = 0; i < visions.length; i++) {
        await pool.query(
          `INSERT INTO establishment_visions (establishment_id, title, description, position)
           VALUES (?, ?, ?, ?)`,
          [req.params.id, visions[i].title, visions[i].description ?? null, i]
        );
      }
    }

    res.json({ message: "Établissement mis à jour", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/establishments/:id — suppression (cascade sur les visions)
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM establishments WHERE id = ?",
      [req.params.id]
    );
    if (!result.affectedRows) {
      return res.status(404).json({ error: "Établissement introuvable" });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
