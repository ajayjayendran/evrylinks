import type { FastifyInstance } from "fastify";
import { getProductsMock } from "../handlers/mock";

export default async function mockRoutes(fastify: FastifyInstance) {
  fastify.get("/products", { handler: getProductsMock });
}
