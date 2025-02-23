import type { FastifyInstance } from "fastify";
import { getBookmarkHandler } from "../handlers/bookmark";

export default async function metadataRoutes(fastify: FastifyInstance) {
  fastify.post("/meta", { handler: getBookmarkHandler });
}
