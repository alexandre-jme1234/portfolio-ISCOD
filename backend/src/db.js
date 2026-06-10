import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || "localhost",
  port:     Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME     || "portfolio",
  user:     process.env.DB_USER     || "portfolio_user",
  password: process.env.DB_PASSWORD || "portfolio_pass",
  charset:  "utf8mb4",
  waitForConnections: true,
  connectionLimit: 10,
});

// Force UTF-8 on every new connection to fix charset encoding issues
pool.on("connection", (conn) => {
  conn.query("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
});

export default pool;
