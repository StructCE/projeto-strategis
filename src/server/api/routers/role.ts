import { roleRepositorySchema } from "~/server/interfaces/role/role.repository.interfaces";
import type { RoleRouteInterfaces } from "~/server/interfaces/role/role.route.interfaces";
import { roleRepository } from "~/server/repositories/role.repository";
import {
  createTRPCRouter,
  operationProcedure,
  protectedProcedure,
} from "../trpc";

export const roleRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(roleRepositorySchema.getAllProps)
    .query(
      async ({ input }): Promise<RoleRouteInterfaces["RoleWithModules"][]> => {
        const roles = await roleRepository.getAll(input);
        const serializedRoles = roles.map((role) => ({
          id: role.id,
          name: role.name,
          modules: role.RoleModule.map((roleModule) => ({
            name: roleModule.module.name,
            code: roleModule.module.code,
          })),
        }));
        if (
          input?.filters.modules?.length &&
          input.filters.modules.length > 0
        ) {
          const { modules } = input.filters;
          return serializedRoles.filter((serializedRole) => {
            for (let i = 0; i < serializedRole.modules.length; i++) {
              if (modules.includes(serializedRole.modules[i]?.name ?? ""))
                return true;
            }
          });
        }
        return serializedRoles;
      },
    ),

  registerRole: operationProcedure
    .input(roleRepositorySchema.registerProps)
    .mutation(async ({ input }): Promise<RoleRouteInterfaces["Role"]> => {
      const registeredRole = await roleRepository.register(input);
      return registeredRole;
    }),

  editRole: operationProcedure
    .input(roleRepositorySchema.editProps)
    .mutation(async ({ input }): Promise<RoleRouteInterfaces["Role"]> => {
      const editedRole = await roleRepository.edit(input);
      return editedRole;
    }),

  deleteRole: operationProcedure
    .input(roleRepositorySchema.deleteProps)
    .mutation(async ({ input }): Promise<RoleRouteInterfaces["Role"]> => {
      const deletedRole = await roleRepository.remove(input);
      return deletedRole;
    }),
});
