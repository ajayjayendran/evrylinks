import type { MetadataRequest } from "../schemas/metadataSchema";

export const fetchMetadata = async (payload: MetadataRequest) => {
  return {
    title: "Example Title",
    description: "Example Description",
    url: payload.url,
    image: "https://example.com/sample-image.jpg",
  };
};
