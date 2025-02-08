import type { FastifyInstance } from "fastify";
import { metadataHandler } from "../handlers/metadataHandler";

export default async function metadataRoutes(fastify: FastifyInstance) {
  fastify.post("/metadata", { handler: metadataHandler });
}
