import { operationRepositorySchema } from "~/server/interfaces/operation/operation.repository.interfaces";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { operationRepository } from "~/server/repositories/operation.repository";
import type { OperationsRouteInterfaces } from "~/server/interfaces/operation/operation.route.interfaces";

export const operationRouter = createTRPCRouter({
  countOperations: protectedProcedure
    .input(operationRepositorySchema.countOperationsProps)
    .query(
      async ({
        input,
      }): Promise<OperationsRouteInterfaces["OperationsCount"]> => {
        const operationsCount =
          await operationRepository.countOperations(input);
        return { operationsCount };
      },
    ),
});
