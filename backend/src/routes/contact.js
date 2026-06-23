/**
 * contact.js — Route API pour les messages de contact.
 *
 * POST /api/contact → valide et sauvegarde un message dans la table `contacts`.
 * Champs obligatoires : nom, email.
 * Champs optionnels  : telephone, objet, message.
 */
import { Router } from "express";
import pool from "../db.js";

const router = Router();

/**
 * POST /api/contact
 * Body JSON : { nom, email, telephone?, objet?, message? }
 * Returns 201 { message, id } | 400 { error } | 500 { error }
 */
router.post("/", async (req, res) => {
  const { nom, email, telephone, objet, message } = req.body;

  // ── Validation ────────────────────────────────────────────────────────────
  if (!nom?.trim())   return res.status(400).json({ error: "Le nom est obligatoire." });
  if (!email?.trim()) return res.status(400).json({ error: "L'email est obligatoire." });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: "L'adresse email n'est pas valide." });
  }

  // ── Insertion ─────────────────────────────────────────────────────────────
  try {
    const [result] = await pool.query(
      `INSERT INTO contacts (nom, email, telephone, objet, message)
       VALUES (?, ?, ?, ?, ?)`,
      [
        nom.trim(),
        email.trim(),
        telephone?.trim() || null,
        objet?.trim()     || null,
        message?.trim()   || null,
      ]
    );

    res.status(201).json({
      message: "Message envoyé avec succès.",
      id: result.insertId,
    });
  } catch (err) {
    console.error("[POST /api/contact]", err.message);
    res.status(500).json({ error: "Erreur serveur. Réessayez plus tard." });
  }
});

/**
 * GET /api/contact
 * Retourne tous les messages de contact, du plus récent au plus ancien.
 */
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM contacts ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("[GET /api/contact]", err.message);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

export default router;
