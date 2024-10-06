import { productCategoryRepositorySchema } from "~/server/interfaces/productCategory/productCategory.repository.interfaces";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { productCategoryRepository } from "~/server/repositories/productCategory.repository";
import type { ProductCategoryRouteInterfaces } from "~/server/interfaces/productCategory/productCategory.route.interfaces";

export const productCategoryRouter = createTRPCRouter({
  getAll: protectedProcedure.query(
    async (): Promise<ProductCategoryRouteInterfaces["ProductCategory"][]> => {
      const productCategories = await productCategoryRepository.getAll();
      return productCategories;
    },
  ),

  registerProductCategory: protectedProcedure
    .input(productCategoryRepositorySchema.registerProps)
    .mutation(
      async ({
        input,
      }): Promise<ProductCategoryRouteInterfaces["ProductCategory"]> => {
        const registeredProductCategory =
          await productCategoryRepository.register(input);
        return registeredProductCategory;
      },
    ),

  editProductCategory: protectedProcedure
    .input(productCategoryRepositorySchema.editProps)
    .mutation(
      async ({
        input,
      }): Promise<ProductCategoryRouteInterfaces["ProductCategory"]> => {
        const editedProductCategory =
          await productCategoryRepository.edit(input);
        return editedProductCategory;
      },
    ),

  removeProductCategory: protectedProcedure
    .input(productCategoryRepositorySchema.removeProps)
    .mutation(
      async ({
        input,
      }): Promise<ProductCategoryRouteInterfaces["ProductCategory"]> => {
        const deletedProductCategory =
          await productCategoryRepository.remove(input);
        return deletedProductCategory;
      },
    ),
});
