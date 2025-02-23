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

app.get("/health", (_, res) => {
  res.send("Hello World!");
});

registerRoutes(app);

const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0";

app.listen({ port: Number(PORT), host: HOST }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running at ${address}`);
  console.log(`📜 API Docs available at ${address}/docs`);
});
