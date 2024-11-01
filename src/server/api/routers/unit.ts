import { unitRepositorySchema } from "~/server/interfaces/unit/unit.repository.interfaces";
import { type UnitRouteInterfaces } from "~/server/interfaces/unit/unit.route.interfaces";
import { unitRepository } from "~/server/repositories/unit.repository";
import {
  createTRPCRouter,
  operationProcedure,
  protectedProcedure,
} from "../trpc";

export const unitRouter = createTRPCRouter({
  getAll: protectedProcedure.query(
    async (): Promise<UnitRouteInterfaces["Unit"][]> => {
      const units = await unitRepository.getAll();
      return units;
    },
  ),

  registerUnit: operationProcedure
    .input(unitRepositorySchema.registerProps)
    .mutation(async ({ input }): Promise<UnitRouteInterfaces["Unit"]> => {
      const registeredUnit = await unitRepository.register(input);
      return registeredUnit;
    }),

  editUnit: operationProcedure
    .input(unitRepositorySchema.editProps)
    .mutation(async ({ input }): Promise<UnitRouteInterfaces["Unit"]> => {
      const editedUnit = await unitRepository.edit(input);
      return editedUnit;
    }),

  removeUnit: operationProcedure
    .input(unitRepositorySchema.removeProps)
    .mutation(async ({ input }): Promise<UnitRouteInterfaces["Unit"]> => {
      const deletedUnit = await unitRepository.remove(input);
      return deletedUnit;
    }),
});
