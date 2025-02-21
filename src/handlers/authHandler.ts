import type { FastifyReply, FastifyRequest } from "fastify";
import db from "../database/config";
import { users } from "../models/user";
import bcrypt from "bcrypt";

export const SignupHandler = async (req: FastifyRequest, res: FastifyReply) => {
  const { email, password } = req.body as { email: string; password: string };

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({ email, password: hashedPassword });
    return res.code(200).send({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.code(500).send({ error: "Error registering user" });
  }
};
