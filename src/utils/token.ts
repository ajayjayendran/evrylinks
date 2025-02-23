import type { FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export const verifyToken = (req: FastifyRequest) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    const decoded = jwt.verify(
      authHeader,
      process.env.JWT_SECRET as string
    ) as {
      usersId: number;
    };
    return decoded.usersId;
  } catch (error) {
    return null;
  }
};
