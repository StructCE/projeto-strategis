import { db } from "../db";
import type { UserRepositoryInterfaces } from "../interfaces/user/user.repository.interfaces";

async function getAll() {
  const users = await db.user.findMany({
    include: {
      UserRole: {
        include: {
          company: true,
          role: true,
        },
      },
    },
  });
  return users;
}

async function register(props: UserRepositoryInterfaces["RegisterProps"]) {
  const { name, email, phone, UserRole } = props;

  const registeredUser = await db.user.create({
    data: {
      name,
      email,
      phone,
      UserRole: {
        create: UserRole.map((role) => ({
          companyId: role.companyId,
          roleId: role.roleId,
        })),
      },
    },
  });

  return registeredUser;
}

// async function register(props: UserRepositoryInterfaces["RegisterProps"]) {
//   const registeredUser = await db.user.create({
//     data: { ...props },
//   });
//   return registeredUser;
// }

async function edit(props: UserRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;

  // Buscar UserRoles existentes com base em companyId e roleId
  const userRoles = await db.userRole.findMany({
    where: {
      companyId: { in: data.UserRole.map((ur) => ur.companyId) },
      roleId: { in: data.UserRole.map((ur) => ur.roleId) },
      userId: id,
    },
  });

  const editedUser = await db.user.update({
    where: { id: id },
    data: {
      ...data,
      UserRole: {
        connect: userRoles.map((userRole) => ({ id: userRole.id })),
      },
    },
  });
  return editedUser;
}

async function remove(props: UserRepositoryInterfaces["DeleteProps"]) {
  // Primeiro deletar registros relacionados, como UserRole, por exemplo
  await db.userRole.deleteMany({
    where: {
      userId: props.id,
    },
  });

  // Agora, deletar o usuário
  const deletedUser = await db.user.delete({
    where: {
      id: props.id,
    },
  });

  return deletedUser;
}

export const userRepository = {
  getAll,
  register,
  edit,
  remove,
};
