import type { FastifyInstance } from "fastify";
import { SignupHandler, loginHandler } from "../handlers/auth";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/create", { handler: SignupHandler });
  fastify.post("/login", { handler: loginHandler });
}
