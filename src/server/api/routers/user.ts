import { userRepositorySchema } from "~/server/interfaces/user/user.repository.interfaces";
import type { UserRouteInterfaces } from "~/server/interfaces/user/user.route.interfaces";
import { userRepository } from "~/server/repositories/user.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUserById: protectedProcedure
    .input(userRepositorySchema.getUserById)
    .query(
      async ({
        input,
      }): Promise<UserRouteInterfaces["UserWithRoles"] | null> => {
        const userWithRoles = await userRepository.getUserById({
          id: input.id,
        });

        if (!userWithRoles) {
          return null; // Retorna null se o usuário não for encontrado
        }

        const serializedUserWithRoles = {
          id: userWithRoles.id,
          name: userWithRoles.name,
          email: userWithRoles.email,
          phone: userWithRoles.phone,
          UserRole: userWithRoles.UserRole.map((userRole) => ({
            id: userRole.id,
            companyId: userRole.companyId,
            roleId: userRole.roleId,
          })),
        };

        return serializedUserWithRoles;
      },
    ),

  getAll: protectedProcedure.query(
    async (): Promise<UserRouteInterfaces["UserWithRoles"][]> => {
      const usersWithRoles = await userRepository.getAll();
      const serializedUsersWithRoles = usersWithRoles.map((userWithRoles) => ({
        id: userWithRoles.id,
        name: userWithRoles.name,
        email: userWithRoles.email,
        phone: userWithRoles.phone,
        UserRole: userWithRoles.UserRole.map((userRole) => ({
          id: userRole.id,
          companyId: userRole.companyId,
          roleId: userRole.roleId,
        })),
      }));

      return serializedUsersWithRoles;
    },
  ),

  registerUser: protectedProcedure
    .input(userRepositorySchema.registerProps)
    .mutation(async ({ input }): Promise<UserRouteInterfaces["User"]> => {
      const registeredUser = await userRepository.register(input);
      return registeredUser;
    }),

  editUser: protectedProcedure
    .input(userRepositorySchema.editProps)
    .mutation(async ({ input }): Promise<UserRouteInterfaces["User"]> => {
      const editedUser = await userRepository.edit(input);
      return editedUser;
    }),

  deleteUser: protectedProcedure
    .input(userRepositorySchema.deleteProps)
    .mutation(async ({ input }): Promise<UserRouteInterfaces["User"]> => {
      const deletedUser = await userRepository.remove(input);
      return deletedUser;
    }),
});
