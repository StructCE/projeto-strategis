import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { ProductRouteInterfaces } from "~/server/interfaces/product/product.route.interfaces";
import { ProductRepository } from "~/server/repositories/product.repository";

export const productRouter = createTRPCRouter({
  countProducts: protectedProcedure.query(
    async (): Promise<ProductRouteInterfaces["ProductsCount"]> => {
      const productsCount = await ProductRepository.countProducts();
      return { productsCount };
    },
  ),
});
