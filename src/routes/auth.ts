import type { FastifyInstance } from "fastify";
import { SignupHandler } from "../handlers/authHandler";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/create", { handler: SignupHandler });
}
