import type { FastifyReply, FastifyRequest } from "fastify";
import { metadataRequestSchema } from "../schemas/metadataSchema";
import { fetchMetadata } from "../services/metadataService";
import { successResponse, handleError } from "../utils/response";

export const metadataHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const payload = metadataRequestSchema.parse(req.body);
    const metadata = await fetchMetadata(payload);
    reply.send(successResponse(metadata));
  } catch (error) {
    reply.status(500).send(handleError(error));
  }
};
