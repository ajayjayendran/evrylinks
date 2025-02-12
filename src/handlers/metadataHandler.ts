import type { FastifyReply, FastifyRequest } from "fastify";
import { metadataRequestSchema } from "../schemas/metadataSchema";
import { fetchMetadata } from "../services/metadataService";
import { successResponse, handleError } from "../utils/response";
import urlMetadata from "url-metadata";

export const metadataHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const payload = metadataRequestSchema.parse(req.body);
    const data = await urlMetadata(payload.url);
    console.log(data);
    const metadata = await fetchMetadata(payload);
    reply.send(successResponse(data));
  } catch (error) {
    console.log(error);
    reply.status(500).send(handleError(error));
  }
};
