/**
 * migrate_establishments.js — Migration : tables de présentation des établissements.
 *
 * Usage (depuis la racine du projet) :
 *   docker exec portfolio_backend node src/migrate_establishments.js
 *
 * Crée deux tables (si absentes) sur la base configurée dans le .env
 * (Aiven en production, Docker local sinon) :
 *   - establishments         : nom + sous-titre + textes de présentation générale
 *   - establishment_visions  : tableau des arguments "vision pédagogique" (1-N)
 *
 * Puis insère un jeu de données initial fidèle à la maquette Figma (node 2179:886)
 * pour les établissements cliquables de la frise /parcours.
 * NB : les LOGOS ne sont PAS stockés en base (servis depuis le frontend).
 */

import "dotenv/config";
import mysql from "mysql2/promise";

// ── Connexion (issue du .env) ────────────────────────────────────────────────
const config = {
  host:     process.env.DB_HOST     || "localhost",
  port:     Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME     || "portfolio",
  user:     process.env.DB_USER     || "portfolio_user",
  password: process.env.DB_PASSWORD || "portfolio_pass",
  charset:  "utf8mb4",
  ...(process.env.DB_SSL === "true" && { ssl: { rejectUnauthorized: false } }),
};

// ── DDL ───────────────────────────────────────────────────────────────────────
const CREATE_ESTABLISHMENTS = `
CREATE TABLE IF NOT EXISTS establishments (
  id                 INT AUTO_INCREMENT PRIMARY KEY,
  slug               VARCHAR(100)  NOT NULL UNIQUE,  -- ex: "coliback" (lien depuis /parcours)
  name               VARCHAR(200)  NOT NULL,         -- "Nom de l'établissement"
  subtitle           VARCHAR(255),                   -- "Type d'établissement · Ville · Année de création"
  presentation_left  TEXT,                           -- présentation générale, colonne gauche
  presentation_right TEXT,                           -- présentation générale, colonne droite
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

const CREATE_VISIONS = `
CREATE TABLE IF NOT EXISTS establishment_visions (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  establishment_id INT NOT NULL,
  title            VARCHAR(200) NOT NULL,  -- ex: "Apprentissage Actif"
  description      TEXT,
  position         INT DEFAULT 0,          -- ordre d'affichage des cartes
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (establishment_id) REFERENCES establishments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

// ── Seed — contenu fidèle à la maquette (texte non modifié) ────────────────────
// Sous-titre, présentation et cartes sont les textes "template" de la maquette.
// Seul le `name` varie (issu de la frise /parcours).
const SUBTITLE = "Type d'établissement · Ville · Année de création";

const PRESENTATION_LEFT =
  "L'établissement se distingue par son approche innovante de l'enseignement supérieur, " +
  "alliant rigueur académique et immersion professionnelle. Fondé sur des valeurs " +
  "d'excellence et d'ouverture, il accompagne chaque étudiant dans la construction d'un " +
  "parcours sur mesure, adapté aux défis contemporains du marché mondial.";

const PRESENTATION_RIGHT =
  "Nos infrastructures de pointe et notre corps professoral composé d'experts du secteur " +
  "garantissent une formation de haut niveau. En favorisant l'apprentissage par projet et " +
  "la recherche collaborative, nous préparons nos diplômés à devenir les leaders et " +
  "innovateurs de demain dans leurs domaines respectifs.";

const VISIONS = [
  {
    title: "Apprentissage Actif",
    description:
      "Une pédagogie centrée sur l'engagement de l'étudiant à travers des cas pratiques et des simulations réelles.",
  },
  {
    title: "Innovation Sociale",
    description:
      "Encourager des solutions durables pour répondre aux problématiques sociétales par le biais du design et de la technologie.",
  },
  {
    title: "Réseau Global",
    description:
      "Une ouverture internationale facilitée par des partenariats stratégiques avec des universités et entreprises mondiales.",
  },
];

// Établissements cliquables de la frise (slug = nom du logo dans /public/images/parcours)
const ESTABLISHMENTS = [
  { slug: "coliback",            name: "COLIBACK" },
  { slug: "aucae",               name: "AUCAE" },
  { slug: "la-capsule",          name: "La Capsule" },
  { slug: "the-hacking-project", name: "The Hacking Project" },
  { slug: "misterauto",          name: "MisterAuto" },
  { slug: "esd",                 name: "ESD" },
  { slug: "supdecom",            name: "SUP'DE COM" },
  { slug: "lyon3",               name: "Université Jean Moulin Lyon 3" },
];

async function migrate() {
  let connection;
  try {
    console.log(`\n🔌 Connexion à ${config.host}:${config.port}/${config.database} …`);
    connection = await mysql.createConnection(config);
    console.log("✅ Connecté.");

    // 1. Création des tables
    await connection.query(CREATE_ESTABLISHMENTS);
    await connection.query(CREATE_VISIONS);
    console.log("🎉 Tables `establishments` et `establishment_visions` prêtes.");

    // 2. Seed (uniquement si la table est vide pour rester idempotent)
    const [[{ count }]] = await connection.query(
      "SELECT COUNT(*) AS count FROM establishments"
    );

    if (count > 0) {
      console.log(`ℹ️  ${count} établissement(s) déjà présent(s) — seed ignoré.\n`);
    } else {
      for (const est of ESTABLISHMENTS) {
        const [result] = await connection.query(
          `INSERT INTO establishments (slug, name, subtitle, presentation_left, presentation_right)
           VALUES (?, ?, ?, ?, ?)`,
          [est.slug, est.name, SUBTITLE, PRESENTATION_LEFT, PRESENTATION_RIGHT]
        );
        const establishmentId = result.insertId;

        for (let i = 0; i < VISIONS.length; i++) {
          await connection.query(
            `INSERT INTO establishment_visions (establishment_id, title, description, position)
             VALUES (?, ?, ?, ?)`,
            [establishmentId, VISIONS[i].title, VISIONS[i].description, i]
          );
        }
      }
      console.log(`🌱 ${ESTABLISHMENTS.length} établissements + visions insérés.\n`);
    }

    // 3. Confirmation
    const [rows] = await connection.query(
      "SELECT id, slug, name FROM establishments ORDER BY id"
    );
    console.table(rows);
  } catch (err) {
    console.error("❌ Erreur de migration :", err.message);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
    console.log("🔌 Connexion fermée.");
  }
}

migrate();
