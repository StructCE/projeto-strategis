import { shelfRepositorySchema } from "~/server/interfaces/shelf/shelf.repository.interfaces";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { shelfRepository } from "~/server/repositories/shelf.repository";
import type { ShelfRouteInterfaces } from "~/server/interfaces/shelf/shelf.route.interfaces";

export const shelfRouter = createTRPCRouter({
  getAll: protectedProcedure.query(
    async (): Promise<ShelfRouteInterfaces["Shelf"][]> => {
      const shelfs = await shelfRepository.getAll();
      return shelfs;
    },
  ),

  registerShelf: protectedProcedure
    .input(shelfRepositorySchema.registerProps)
    .mutation(async ({ input }): Promise<ShelfRouteInterfaces["Shelf"]> => {
      const registeredShelf = await shelfRepository.register(input);
      return registeredShelf;
    }),

  editShelf: protectedProcedure
    .input(shelfRepositorySchema.editProps)
    .mutation(async ({ input }): Promise<ShelfRouteInterfaces["Shelf"]> => {
      const editedShelf = await shelfRepository.edit(input);
      return editedShelf;
    }),

  removeShelf: protectedProcedure
    .input(shelfRepositorySchema.removeProps)
    .mutation(async ({ input }): Promise<ShelfRouteInterfaces["Shelf"]> => {
      const deletedShelf = await shelfRepository.remove(input);
      return deletedShelf;
    }),
});
