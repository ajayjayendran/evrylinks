import { z } from "zod";

export const bookmarkSchema = z.object({
  userId: z.string().uuid().nonempty(),
  url: z.string().url().nonempty(),
  tag: z.string().nonempty(),
  title: z.any().nullable(),
  note: z.any().nullable(),
});

export const getBookmarkSchema = z.object({
  userId: z.string().uuid().nonempty(),
  tag: z.any().nullable(),
});
