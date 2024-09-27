import { operationRepositorySchema } from "~/server/interfaces/operation.repository.interfaces";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { operationRepository } from "~/server/repositories/operation.repository";


export const operationRouter = createTRPCRouter({
  countOperations: protectedProcedure.input(operationRepositorySchema.countOperationsProps).query(async ({input}) => {
    const operationsCount = await operationRepository.countOperations(input) 
    return operationsCount  
  })
})