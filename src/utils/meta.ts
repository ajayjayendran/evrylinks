import ogs from "open-graph-scraper";

export const getMetaData = async (url: string) => {
  const response = await ogs({
    url: url,
    fetchOptions: {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
      },
    },
    onlyGetOpenGraphInfo: true,
  });

  return response;
};
