import type { FastifyReply, FastifyRequest } from "fastify";
import { successResponse } from "../utils/response";

const products = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: (Math.random() * 1000).toFixed(2),
  image: `https://picsum.photos/500/500?random=${i + 1}`,
  category: ["Electronics", "Fashion", "Books", "Home", "Toys"][i % 5],
}));

interface QueryParams {
  page?: string;
  limit?: string;
}

export const getProductsMock = async (
  req: FastifyRequest<{ Querystring: QueryParams }>,
  res: FastifyReply
) => {
  let { page = 1, limit = 20 } = req.query;
  console.log(res);
  page = parseInt(page as string);
  limit = parseInt(limit as string);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = products.slice(startIndex, endIndex);

  if (res)
    res.send(
      successResponse({
        page,
        limit,
        total: products.length,
        totalPages: Math.ceil(products.length / limit),
        products: paginatedProducts,
      })
    );
};
