import { db } from "../db";

async function countProducts() {
  const productsCount = await db.product.aggregate({
    _sum: {
      currentStock: true,
    },
  });
  return productsCount._sum.currentStock ?? 0;
}

export const ProductRepository = {
  countProducts,
};
