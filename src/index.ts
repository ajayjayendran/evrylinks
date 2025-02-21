import Fastify from "fastify";
import cors from "@fastify/cors";
import registerRoutes from "./routes";
import db from "../src/database/config";

const app = Fastify({ logger: true });

// Register CORS
app.register(cors, { origin: "*" });

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

registerRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen({ port: Number(PORT) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running at ${address}`);
  console.log(`📜 API Docs available at ${address}/docs`);
});
