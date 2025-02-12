import Fastify from "fastify";
import cors from "@fastify/cors";
import registerRoutes from "./routes";

const fastify = Fastify({ logger: true });

// Register CORS
fastify.register(cors, { origin: "*" });

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
