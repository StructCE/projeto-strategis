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

        if (input?.filters.modules?.length) {
          const { modules } = input.filters;
          return serializedRoles.filter((serializedRole) => {
            for (const roleModule of serializedRole.modules) {
              if (modules.includes(roleModule?.name ?? "")) {
                return true;
              }
            }
            return false;
          });
        }

        return serializedRoles;
      },
    ),

  // getAll: protectedProcedure
  //   .input(roleRepositorySchema.getRoleIdProps)
  //   .query(
  //     async ({ input }): Promise<RoleRouteInterfaces["RoleWithModules"][]> => {
  //       const roles = await roleRepository.getAll(input);
  //       const serializedRoles = roles.map((role) => ({
  //         id: role.id,
  //         name: role.name,
  //         modules: role.RoleModule.map((roleModule) => ({
  //           name: roleModule.module.name,
  //           code: roleModule.module.code,
  //         })),
  //       }));

  //       if (input?.filters.modules?.length) {
  //         const { modules } = input.filters;
  //         return serializedRoles.filter((serializedRole) => {
  //           for (const roleModule of serializedRole.modules) {
  //             if (modules.includes(roleModule?.name ?? "")) {
  //               return true;
  //             }
  //           }
  //           return false;
  //         });
  //       }

  //       return serializedRoles;
  //     },
  //   ),

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
