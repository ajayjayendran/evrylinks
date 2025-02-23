import type { FastifyReply, FastifyRequest } from "fastify";
import { successResponse, handleError } from "../utils/response";
import { verifyToken } from "../utils/token";
import { getMetaData } from "../utils/meta";
import { bookmarkSchema, getBookmarkSchema } from "../schemas/bookmark";
import db from "../database/config";
import { bookmarks } from "../models/bookmark";
import { eq } from "drizzle-orm";

export const getBookmarksHandler = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const userId = verifyToken(req);

  if (!userId) return res.code(401).send({ error: "Unauthorized" });

  try {
    const payload = getBookmarkSchema.parse(req.body);

    let result = await db
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.userId, payload.userId))
      .execute();

    if (payload.tag) {
      result = result.filter((value) => value.tag === payload.tag);
    }
    return res.send(successResponse(result));
  } catch (error) {
    console.log(error);
    res.status(500).send(handleError(error));
  }
};

export const saveBookmarkHandler = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const userId = verifyToken(req);

  if (!userId) return res.code(401).send({ error: "Unauthorized" });

  try {
    const payload = bookmarkSchema.parse(req.body);
    const meta = await getMetaData(payload.url);
    const {
      ogTitle = "",
      ogDescription = "",
      ogImage = [{ url: "" }],
    } = meta.result;

    const values = {
      url: payload.url,
      tag: payload.tag,
      meta_description: ogDescription || "",
      meta_image: ogImage[0].url || "",
      meta_title: ogTitle || "",
      title: payload.title,
      userId: payload.userId,
      note: payload.note,
    };

    await db.insert(bookmarks).values(values);

    return res.send(successResponse(values));
  } catch (error) {
    console.log(error);
  }
};
