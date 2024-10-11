import { userRepositorySchema } from "~/server/interfaces/user/user.repository.interfaces";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { UserRouteInterfaces } from "~/server/interfaces/user/user.route.interfaces";
import { userRepository } from "~/server/repositories/user.repository";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(userRepositorySchema.getAllProps)
    .query(
      async ({ input }): Promise<UserRouteInterfaces["UserWithRoles"][]> => {
        const usersWithRoles = await userRepository.getAll(input);
        const serializedUsersWithRoles = usersWithRoles.map(
          (userWithRoles) => ({
            id: userWithRoles.id,
            name: userWithRoles.name,
            email: userWithRoles.email,
            phone: userWithRoles.phone,
            roles: userWithRoles.UserRole.map((userRole) => userRole.role.name),
          }),
        );

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
