import mysql from "mysql2/promise";

/**
 * db.js — Pool de connexion MariaDB/MySQL.
 * Supporte SSL quand DB_SSL=true (requis par Aiven et autres hébergeurs cloud).
 */

const sslEnabled = process.env.DB_SSL === "true";

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || "localhost",
  port:     Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME     || "portfolio",
  user:     process.env.DB_USER     || "portfolio_user",
  password: process.env.DB_PASSWORD || "portfolio_pass",
  charset:  "utf8mb4",
  waitForConnections: true,
  connectionLimit: 10,
  // SSL activé si DB_SSL=true (Aiven, PlanetScale, etc.)
  ...(sslEnabled && { ssl: { rejectUnauthorized: false } }),
});

// Force UTF-8 sur chaque nouvelle connexion
pool.on("connection", (conn) => {
  conn.query("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
});

export default pool;