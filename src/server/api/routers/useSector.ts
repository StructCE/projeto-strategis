import { useSectorRepositorySchema } from "~/server/interfaces/useSector/useSector.repository.interfaces";
import {
  createTRPCRouter,
  operationProcedure,
  protectedProcedure,
} from "../trpc";
import { useSectorRepository } from "~/server/repositories/useSector.repository";
import type { UseSectorRouteInterfaces } from "~/server/interfaces/useSector/useSector.route.interfaces";

export const useSectorRouter = createTRPCRouter({
  getAll: protectedProcedure.query(
    async (): Promise<UseSectorRouteInterfaces["UseSector"][]> => {
      const useSectors = await useSectorRepository.getAll();
      return useSectors;
    },
  ),

  registerUseSector: operationProcedure
    .input(useSectorRepositorySchema.registerProps)
    .mutation(
      async ({ input }): Promise<UseSectorRouteInterfaces["UseSector"]> => {
        const registeredUseSector = await useSectorRepository.register(input);
        return registeredUseSector;
      },
    ),

  editUseSector: operationProcedure
    .input(useSectorRepositorySchema.editProps)
    .mutation(
      async ({ input }): Promise<UseSectorRouteInterfaces["UseSector"]> => {
        const editedUseSector = await useSectorRepository.edit(input);
        return editedUseSector;
      },
    ),

  removeUseSector: operationProcedure
    .input(useSectorRepositorySchema.removeProps)
    .mutation(
      async ({ input }): Promise<UseSectorRouteInterfaces["UseSector"]> => {
        const deletedUseSector = await useSectorRepository.remove(input);
        return deletedUseSector;
      },
    ),
});
