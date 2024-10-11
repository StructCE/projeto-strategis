import { roleRepositorySchema } from "~/server/interfaces/role/role.repository.interfaces";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { RoleRouteInterfaces } from "~/server/interfaces/role/role.route.interfaces";
import { roleRepository } from "~/server/repositories/role.repository";

export const roleRouter = createTRPCRouter({
  getAll: protectedProcedure.query(
    async (): Promise<RoleRouteInterfaces["RoleWithModules"][]> => {
      const roles = await roleRepository.getAll();
      const serializedRoles = roles.map((role) => ({
        name: role.name,
        modules: role.RoleModule.map((roleModule) => roleModule.module.name),
      }));
      return serializedRoles;
    },
  ),

  registerRole: protectedProcedure
    .input(roleRepositorySchema.registerProps)
    .mutation(async ({ input }): Promise<RoleRouteInterfaces["Role"]> => {
      const registeredRole = await roleRepository.register(input);
      return registeredRole;
    }),

  editRole: protectedProcedure
    .input(roleRepositorySchema.editProps)
    .mutation(async ({ input }): Promise<RoleRouteInterfaces["Role"]> => {
      const editedRole = await roleRepository.edit(input);
      return editedRole;
    }),

  deleteRole: protectedProcedure
    .input(roleRepositorySchema.deleteProps)
    .mutation(async ({ input }): Promise<RoleRouteInterfaces["Role"]> => {
      const deletedRole = await roleRepository.remove(input);
      return deletedRole;
    }),
});
