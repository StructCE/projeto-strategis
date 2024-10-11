import { adjustRepositorySchema } from "~/server/interfaces/adjust/adjust.repository.interfaces";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { AdjustRouteInterfaces } from "~/server/interfaces/adjust/adjust.route.interfaces";
import { adjustRepository } from "~/server/repositories/adjust.repository";

export const adjustRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(adjustRepositorySchema.getAllProps)
    .query(
      async ({
        input,
      }): Promise<AdjustRouteInterfaces["SerializedAdjust"][]> => {
        const adjusts = await adjustRepository.getAll(input);
        const serializedAdjusts = adjusts.map((adjust) => ({
          id: adjust.id,
          name: adjust.name,
          date: adjust.date,
          type: adjust.type,
          responsibleName: adjust.responsible.user.name,
          stockName: adjust.stock.name,
          adjustProducts: adjust.ProductAdjust.map((adjustProduct) => ({
            id: adjustProduct.id,
            oldStock: adjustProduct.oldStock,
            adjustedStock: adjustProduct.adjustedStock,
            reason: adjustProduct.reason.reasonName,
            product: adjustProduct.product.name,
            productCode: adjustProduct.product.id,
            productUnit: adjustProduct.product.unit.name,
          })),
        }));
        return serializedAdjusts;
      },
    ),

  registerAdjust: protectedProcedure
    .input(adjustRepositorySchema.registerProps)
    .mutation(async ({ input }): Promise<AdjustRouteInterfaces["Adjust"]> => {
      const registeredAdjust = await adjustRepository.register(input);
      return registeredAdjust;
    }),
});
