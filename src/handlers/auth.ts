import type { FastifyReply, FastifyRequest } from "fastify";
import db from "../database/config";
import { users } from "../models/user";
import bcrypt from "bcrypt";
import type { AuthUser } from "../types/auth";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const SignupHandler = async (req: FastifyRequest, res: FastifyReply) => {
  const { email, password } = req.body as AuthUser;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({ email, password: hashedPassword });
    return res.code(200).send({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.code(500).send({ error: "Error registering user" });
  }
};

export const loginHandler = async (req: FastifyRequest, res: FastifyReply) => {
  const { email, password } = req.body as AuthUser;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .execute();

  if (!user || user?.length === 0) {
    return res.code(401).send({ error: "Invalid Credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user[0].password);

  if (!isPasswordValid) {
    return res.code(401).send({ error: "Invalid Password" });
  }

  const token = jwt.sign(
    { usersId: user[0].id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  return res.send({ token, message: "Login successfully!" });
};
