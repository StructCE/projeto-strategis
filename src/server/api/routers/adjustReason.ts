import { adjustReasonRepositorySchema } from "~/server/interfaces/adjustReason/adjustReason.repository.interfaces";
import { type AdjustReasonRouteInterfaces } from "~/server/interfaces/adjustReason/adjustReason.route.interfaces";
import { adjustReasonRepository } from "~/server/repositories/adjustReason.repository";
import {
  createTRPCRouter,
  operationProcedure,
  protectedProcedure,
} from "../trpc";

export const adjustReasonRouter = createTRPCRouter({
  getReasonByName: protectedProcedure
    .input(adjustReasonRepositorySchema.getReasonByNameProps)
    .query(
      async ({
        input,
      }): Promise<AdjustReasonRouteInterfaces["AdjustReason"] | null> => {
        const adjustReason = await adjustReasonRepository.getReasonByName({
          name: input.name,
        });
        return adjustReason;
      },
    ),

  getAll: protectedProcedure.query(
    async (): Promise<AdjustReasonRouteInterfaces["AdjustReason"][]> => {
      const adjustReasons = await adjustReasonRepository.getAll();
      return adjustReasons;
    },
  ),

  registerAdjustReason: operationProcedure
    .input(adjustReasonRepositorySchema.registerProps)
    .mutation(
      async ({
        input,
      }): Promise<AdjustReasonRouteInterfaces["AdjustReason"]> => {
        const registeredAdjustReason =
          await adjustReasonRepository.register(input);
        return registeredAdjustReason;
      },
    ),

  editAdjustReason: operationProcedure
    .input(adjustReasonRepositorySchema.editProps)
    .mutation(
      async ({
        input,
      }): Promise<AdjustReasonRouteInterfaces["AdjustReason"]> => {
        const editedAdjustReason = await adjustReasonRepository.edit(input);
        return editedAdjustReason;
      },
    ),

  removeAdjustReason: operationProcedure
    .input(adjustReasonRepositorySchema.removeProps)
    .mutation(
      async ({
        input,
      }): Promise<AdjustReasonRouteInterfaces["AdjustReason"]> => {
        const deletedAdjustReason = await adjustReasonRepository.remove(input);
        return deletedAdjustReason;
      },
    ),
});
