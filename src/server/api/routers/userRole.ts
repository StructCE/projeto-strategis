import { userRoleSchema } from "~/server/interfaces/userRole/userRole.repository.interfaces";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { UserRoleRouteInterfaces } from "~/server/interfaces/userRole/userRole.route.interfaces";
import { userRoleRepository } from "~/server/repositories/userRole.repository";

export const userRoleRouter = createTRPCRouter({
  createUserRole: protectedProcedure
    .input(userRoleSchema.createProps)
    .mutation(
      async ({ input }): Promise<UserRoleRouteInterfaces["UserRole"]> => {
        const createdUserRole = await userRoleRepository.create(input);
        return createdUserRole;
      },
    ),

  editUserRole: protectedProcedure
    .input(userRoleSchema.editProps)
    .mutation(
      async ({ input }): Promise<UserRoleRouteInterfaces["UserRole"]> => {
        const editedUserRole = await userRoleRepository.edit(input);
        return editedUserRole;
      },
    ),

  deleteUserRole: protectedProcedure
    .input(userRoleSchema.removeProps)
    .mutation(
      async ({ input }): Promise<UserRoleRouteInterfaces["UserRole"]> => {
        const deletedUserRole = await userRoleRepository.remove(input);
        return deletedUserRole;
      },
    ),
});
