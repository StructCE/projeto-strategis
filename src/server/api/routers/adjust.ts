import { adjustRepositorySchema } from "~/server/interfaces/adjust/adjust.repository.interfaces";
import type { AdjustRouteInterfaces } from "~/server/interfaces/adjust/adjust.route.interfaces";
import { adjustRepository } from "~/server/repositories/adjust.repository";
import {
  createTRPCRouter,
  operationProcedure,
  protectedProcedure,
} from "../trpc";

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
          date: adjust.date,
          type: adjust.type,
          responsibleName: adjust.responsible.user.name,
          stockName: adjust.stock.name,
          adjustProducts: adjust.ProductAdjust.map((adjustProduct) => ({
            id: adjustProduct.id,
            currentStock: adjustProduct.product.currentStock,
            oldStock: adjustProduct.oldStock,
            adjustedStock: adjustProduct.adjustedStock,
            reason: {
              id: adjustProduct.reason.id,
              name: adjustProduct.reason.name,
            },
            name: adjustProduct.product.name,
            code: adjustProduct.product.code,
            ncm: adjustProduct.product.ncm,
            cfop: adjustProduct.product.cfop,
            unit: adjustProduct.product.unit,
            shelf: adjustProduct.product.shelf,
          })),
        }));
        return serializedAdjusts;
      },
    ),

  registerAdjust: operationProcedure
    .input(adjustRepositorySchema.registerProps)
    .mutation(async ({ input }): Promise<AdjustRouteInterfaces["Adjust"]> => {
      const registeredAdjust = await adjustRepository.register(input);
      return registeredAdjust;
    }),
});
