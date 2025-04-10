import type { FastifyInstance } from "fastify";
import metadataRoutes from "./metadata";
import authRoutes from "./auth";
import bookmarkRoutes from "./bookmark";
import mockRoutes from "./mock";

export default async function registerRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes, { prefix: "/user" });
  fastify.register(metadataRoutes, { prefix: "/api" });
  fastify.register(bookmarkRoutes, { prefix: "/api/bookmark" });
  fastify.register(mockRoutes, { prefix: "/mock" });
}
