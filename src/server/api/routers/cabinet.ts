import { cabinetRepositorySchema } from "~/server/interfaces/cabinet/cabinet.repository.interfaces";
import type { CabinetRouteInterfaces } from "~/server/interfaces/cabinet/cabinet.route.interfaces";
import { cabinetRepository } from "~/server/repositories/cabinet.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const cabinetRouter = createTRPCRouter({
  getAll: protectedProcedure.query(
    async (): Promise<CabinetRouteInterfaces["CabinetWithShelves"][]> => {
      const cabinets = await cabinetRepository.getAll();
      return cabinets;
    },
  ),

  getCabinetsWithoutStock: protectedProcedure.query(
    async (): Promise<CabinetRouteInterfaces["CabinetWithShelves"][]> => {
      const cabinets = await cabinetRepository.getCabinetsWithoutStock();
      return cabinets;
    },
  ),

  getCabinetFromStock: protectedProcedure
    .input(cabinetRepositorySchema.cabinetFromStockProps)
    .query(
      async ({
        input,
      }): Promise<CabinetRouteInterfaces["CabinetWithShelves"][]> => {
        const cabinets = await cabinetRepository.getCabinetFromStock(input);
        return cabinets;
      },
    ),

  registerCabinet: protectedProcedure
    .input(cabinetRepositorySchema.registerProps)
    .mutation(async ({ input }): Promise<CabinetRouteInterfaces["Cabinet"]> => {
      const registeredCabinet = await cabinetRepository.register(input);
      return registeredCabinet;
    }),

  editCabinet: protectedProcedure
    .input(cabinetRepositorySchema.editProps)
    .mutation(async ({ input }): Promise<CabinetRouteInterfaces["Cabinet"]> => {
      const editedCabinet = await cabinetRepository.edit(input);
      return editedCabinet;
    }),

  removeCabinet: protectedProcedure
    .input(cabinetRepositorySchema.removeProps)
    .mutation(async ({ input }): Promise<CabinetRouteInterfaces["Cabinet"]> => {
      const deletedCabinet = await cabinetRepository.remove(input);
      return deletedCabinet;
    }),
});
