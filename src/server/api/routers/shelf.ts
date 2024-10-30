import { shelfRepositorySchema } from "~/server/interfaces/shelf/shelf.repository.interfaces";
import type { ShelfRouteInterfaces } from "~/server/interfaces/shelf/shelf.route.interfaces";
import { shelfRepository } from "~/server/repositories/shelf.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const shelfRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(shelfRepositorySchema.getAll)
    .query(async ({ input }): Promise<ShelfRouteInterfaces["Shelf"][]> => {
      const shelves = await shelfRepository.getAll(input);
      return shelves;
    }),

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
