import { cabinetRepositorySchema } from "~/server/interfaces/cabinet/cabinet.repository.interfaces";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { cabinetRepository } from "~/server/repositories/cabinet.repository";
import type { CabinetRouteInterfaces } from "~/server/interfaces/cabinet/cabinet.route.interfaces";

export const cabinetRouter = createTRPCRouter({
  getAll: protectedProcedure.query(
    async (): Promise<CabinetRouteInterfaces["Cabinet"][]> => {
      const cabinets = await cabinetRepository.getAll();
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
