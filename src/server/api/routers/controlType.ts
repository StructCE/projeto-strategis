import { controlTypeRepositorySchema } from "~/server/interfaces/controlType/controlType.repository.interfaces";
import {
  createTRPCRouter,
  operationProcedure,
  protectedProcedure,
} from "../trpc";
import type { ControlTypeRouteInterfaces } from "~/server/interfaces/controlType/controlType.route.interfaces";
import { controlTypeRepository } from "~/server/repositories/controlType.repository";

export const controlTypeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(
    async (): Promise<ControlTypeRouteInterfaces["ControlType"][]> => {
      const controlTypes = await controlTypeRepository.getAll();
      return controlTypes;
    },
  ),

  registerControlType: operationProcedure
    .input(controlTypeRepositorySchema.registerProps)
    .mutation(
      async ({ input }): Promise<ControlTypeRouteInterfaces["ControlType"]> => {
        const registeredControlType =
          await controlTypeRepository.register(input);
        return registeredControlType;
      },
    ),

  editControlType: operationProcedure
    .input(controlTypeRepositorySchema.editProps)
    .mutation(
      async ({ input }): Promise<ControlTypeRouteInterfaces["ControlType"]> => {
        const editedControlType = await controlTypeRepository.edit(input);
        return editedControlType;
      },
    ),

  removeControlType: operationProcedure
    .input(controlTypeRepositorySchema.removeProps)
    .mutation(
      async ({ input }): Promise<ControlTypeRouteInterfaces["ControlType"]> => {
        const deletedControlType = await controlTypeRepository.remove(input);
        return deletedControlType;
      },
    ),
});
