import { adjustReasonRepositorySchema } from "~/server/interfaces/adjustReason/adjustReason.repository.interfaces";
import { type AdjustReasonRouteInterfaces } from "~/server/interfaces/adjustReason/adjustReason.route.interfaces";
import { adjustReasonRepository } from "~/server/repositories/adjustReason.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const adjustReasonRouter = createTRPCRouter({
  getAll: protectedProcedure.query(
    async (): Promise<AdjustReasonRouteInterfaces["AdjustReason"][]> => {
      const adjustReasons = await adjustReasonRepository.getAll();
      return adjustReasons;
    },
  ),

  registerAdjustReason: protectedProcedure
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

  editAdjustReason: protectedProcedure
    .input(adjustReasonRepositorySchema.editProps)
    .mutation(
      async ({
        input,
      }): Promise<AdjustReasonRouteInterfaces["AdjustReason"]> => {
        const editedAdjustReason = await adjustReasonRepository.edit(input);
        return editedAdjustReason;
      },
    ),

  removeAdjustReason: protectedProcedure
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
