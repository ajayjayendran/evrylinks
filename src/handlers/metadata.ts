import type { FastifyReply, FastifyRequest } from "fastify";
import { metadataRequestSchema } from "../schemas/metadataSchema";
import { successResponse, handleError } from "../utils/response";
import { verifyToken } from "../utils/token";
import ogs from "open-graph-scraper";

export const getMetadataHandler = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const userId = verifyToken(req);

  if (!userId) return res.code(401).send({ error: "Unauthorized" });

  try {
    const payload = metadataRequestSchema.parse(req.body);

    const response = await ogs({
      url: payload.url,
      fetchOptions: {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        },
      },
      onlyGetOpenGraphInfo: true,
    });
    if (response) res.send(successResponse(response));
  } catch (error) {
    console.log(error);
    res.status(500).send(handleError(error));
  }
};
