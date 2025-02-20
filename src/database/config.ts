// src/config/database.ts
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";

dotenv.config();

// Connection pool with PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
});

// Initialize Drizzle ORM
const db = drizzle(pool);

export default db;
