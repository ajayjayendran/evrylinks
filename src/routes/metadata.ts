import type { FastifyInstance } from "fastify";
import { getMetadataHandler } from "../handlers/metadata";

export default async function metadataRoutes(fastify: FastifyInstance) {
  fastify.post("/meta", { handler: getMetadataHandler });
}
