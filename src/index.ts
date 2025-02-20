import Fastify from "fastify";
import cors from "@fastify/cors";
import registerRoutes from "./routes";
import db from "../src/database/config";

const fastify = Fastify({ logger: true });

// Register CORS
fastify.register(cors, { origin: "*" });

// Health check for DB connection
(async () => {
  try {
    await db.execute("SELECT 1");
    console.log("✅ Database connection successful!");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // Stop the app if DB is unreachable
  }
})();

registerRoutes(fastify);

// Start Server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log(`🚀 Server running at http://localhost:3000`);
    console.log(`📜 API Docs available at http://localhost:3000/docs`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
