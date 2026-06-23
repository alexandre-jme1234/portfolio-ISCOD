/**
 * migrate_contacts.js — Migration one-shot : création de la table contacts sur Aiven.
 *
 * Usage (depuis la racine du projet) :
 *   docker-compose run --rm backend node src/migrate_contacts.js
 *
 * Ce script se connecte à la base MariaDB configurée dans les variables d'environnement
 * (Aiven en production, Docker local sinon) et crée la table `contacts` si elle n'existe pas.
 */

import "dotenv/config";
import mysql from "mysql2/promise";

// ── Paramètres de connexion (issus du .env) ──────────────────────────────────
const config = {
  host:     process.env.DB_HOST     || "localhost",
  port:     Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME     || "portfolio",
  user:     process.env.DB_USER     || "portfolio_user",
  password: process.env.DB_PASSWORD || "portfolio_pass",
  charset:  "utf8mb4",
  // SSL requis pour Aiven Cloud (DB_SSL=true)
  ...(process.env.DB_SSL === "true" && { ssl: { rejectUnauthorized: false } }),
};

// ── DDL — Table contacts ────────────────────────────────────────────────────
const CREATE_CONTACTS = `
CREATE TABLE IF NOT EXISTS contacts (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nom         VARCHAR(200)  NOT NULL,
  email       VARCHAR(200)  NOT NULL,
  telephone   VARCHAR(50),
  objet       VARCHAR(200),
  message     TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

async function migrate() {
  let connection;

  try {
    console.log(`\n🔌 Connexion à ${config.host}:${config.port}/${config.database} …`);
    connection = await mysql.createConnection(config);
    console.log("✅ Connecté.");

    // Vérifie si la table existe déjà avant de la créer
    const [rows] = await connection.query(`
      SELECT TABLE_NAME
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'contacts'
    `, [config.database]);

    if (rows.length > 0) {
      console.log("ℹ️  Table `contacts` déjà présente — aucune action requise.\n");
    } else {
      await connection.query(CREATE_CONTACTS);
      console.log("🎉 Table `contacts` créée avec succès.\n");
    }

    // Affiche la structure réelle pour confirmation
    const [cols] = await connection.query(`DESCRIBE contacts`);
    console.log("📋 Structure de la table contacts :");
    console.table(cols.map(c => ({ Field: c.Field, Type: c.Type, Null: c.Null, Default: c.Default })));

  } catch (err) {
    console.error("❌ Erreur de migration :", err.message);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
    console.log("🔌 Connexion fermée.");
  }
}

migrate();
