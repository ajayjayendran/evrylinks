import type { FastifyInstance } from "fastify";
import metadataRoutes from "./metadata";

export default async function registerRoutes(fastify: FastifyInstance) {
  fastify.register(metadataRoutes, { prefix: "/api" });
}
