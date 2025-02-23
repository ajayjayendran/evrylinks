import type { FastifyInstance } from "fastify";
import { getBookmarksHandler, saveBookmarkHandler } from "../handlers/bookmark";

export default async function bookmarkRoutes(fastify: FastifyInstance) {
  fastify.post("/create", { handler: saveBookmarkHandler });
  fastify.post("/list", { handler: getBookmarksHandler });
}
