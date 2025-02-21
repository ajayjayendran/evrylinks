import type { FastifyInstance } from "fastify";
import metadataRoutes from "./metadata";
import authRoutes from "./auth";

export default async function registerRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes, { prefix: "/user" });
  fastify.register(metadataRoutes, { prefix: "/api" });
}
