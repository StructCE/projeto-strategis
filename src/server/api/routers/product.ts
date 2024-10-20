import { productRepositorySchema } from "~/server/interfaces/product/product.repository.interfaces";
import type { ProductRouteInterfaces } from "~/server/interfaces/product/product.route.interfaces";
import { ProductRepository } from "~/server/repositories/product.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  countProducts: protectedProcedure.query(
    async (): Promise<ProductRouteInterfaces["ProductsCount"]> => {
      const productsCount = await ProductRepository.countProducts();
      return { productsCount };
    },
  ),

  getAllWhere: protectedProcedure
    .input(productRepositorySchema.getAllProps)
    .query(
      async ({
        input,
      }): Promise<ProductRouteInterfaces["ProductWithFeatures"][]> => {
        const products = await ProductRepository.getAllWhere(input);
        return products;
      },
    ),

  getAll: protectedProcedure.query(
    async (): Promise<ProductRouteInterfaces["ProductWithFeatures"][]> => {
      const products = await ProductRepository.getAll();
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

  updateCurrentStock: protectedProcedure
    .input(productRepositorySchema.updateCurrentStockProps)
    .mutation(async ({ input }): Promise<ProductRouteInterfaces["Product"][]> => {
      const editedProducts = await ProductRepository.updateCurrentStock(input);
      return editedProducts;
    }),

  deleteProduct: protectedProcedure
    .input(productRepositorySchema.removeProps)
    .mutation(async ({ input }): Promise<ProductRouteInterfaces["Product"]> => {
      const deletedProduct = await ProductRepository.remove(input);
      return deletedProduct;
    }),
});
