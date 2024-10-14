import { productRepositorySchema } from "~/server/interfaces/product/product.repository.interfaces";
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

  getAllWhere: protectedProcedure
    .input(productRepositorySchema.getAllProps)
    .query(async ({ input }): Promise<ProductRouteInterfaces["Product"][]> => {
      const products = await ProductRepository.getAllWhere(input);
      return products;
    }),

  getAll: protectedProcedure.query(
    async ({ input }): Promise<ProductRouteInterfaces["Product"][]> => {
      const products = await ProductRepository.getAll(input);
      return products;
    },
  ),

  createProduct: protectedProcedure
    .input(productRepositorySchema.createProps)
    .mutation(async ({ input }): Promise<ProductRouteInterfaces["Product"]> => {
      const createdProduct = await ProductRepository.create(input);
      return createdProduct;
    }),

  editProduct: protectedProcedure
    .input(productRepositorySchema.editProps)
    .mutation(async ({ input }): Promise<ProductRouteInterfaces["Product"]> => {
      const editedProduct = await ProductRepository.edit(input);
      return editedProduct;
    }),

  deleteProduct: protectedProcedure
    .input(productRepositorySchema.removeProps)
    .mutation(async ({ input }): Promise<ProductRouteInterfaces["Product"]> => {
      const deletedProduct = await ProductRepository.remove(input);
      return deletedProduct;
    }),
});
