import { z } from "zod";

export const metadataRequestSchema = z.object({
  url: z.string().url(),
});

export type MetadataRequest = z.infer<typeof metadataRequestSchema>;
