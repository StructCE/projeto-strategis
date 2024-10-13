import { db } from "../db";
import type { UserRepositoryInterfaces } from "../interfaces/user/user.repository.interfaces";

async function getAll() {
  // const { filters } = props;
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

async function edit(props: UserRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;

  // Buscar os cargos existentes do usuário
  const existingUserRoles = await db.userRole.findMany({
    where: { userId: id },
  });

  // Mapeia os IDs dos cargos atuais
  const existingUserRoleIds = existingUserRoles.map((userRole) => userRole.id);

  // Mapeia os IDs dos cargos vindos do formulário
  const newUserRoleIds = data.UserRole?.map((userRole) => userRole.id) ?? [];

  // Identificar cargos a remover
  const userRolesToRemove = existingUserRoles.filter(
    (userRole) => !newUserRoleIds.includes(userRole.id),
  );

  // Identificar cargos a adicionar
  const userRolesToAdd =
    data.UserRole?.filter(
      (userRole) => !existingUserRoleIds.includes(userRole.id),
    ) ?? [];

  // Atualizar o usuário e gerenciar os cargos
  const editedUser = await db.user.update({
    where: { id: id },
    data: {
      ...data,
      // Atualiza os cargos existentes
      UserRole: {
        update: data.UserRole?.filter((userRole) => userRole.id) // Somente para cargos com IDs
          .map((userRole) => ({
            where: { id: userRole.id },
            data: {
              companyId: userRole.companyId,
              roleId: userRole.roleId,
            },
          })),
        // Adiciona novos cargos
        create: userRolesToAdd.map((userRole) => ({
          companyId: userRole.companyId,
          roleId: userRole.roleId,
        })),
        // Remove cargos excluídos
        delete: userRolesToRemove.map((userRole) => ({ id: userRole.id })),
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
