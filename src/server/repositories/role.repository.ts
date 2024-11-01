import { db } from "../db";
import type { RoleRepositoryInterfaces } from "../interfaces/role/role.repository.interfaces";

async function getAll(props: RoleRepositoryInterfaces["GetAllProps"]) {
  if (props) {
    const { filters } = props;
    const conditions = [];

    if (filters.name) {
      conditions.push({ name: { contains: filters.name } });
    }

    const roleWithModules = await db.role.findMany({
      where: {
        AND: conditions,
      },
      include: {
        RoleModule: { include: { module: true } },
      },
    });
    return roleWithModules;
  }

  const roleWithModules = await db.role.findMany({
    include: {
      RoleModule: {
        include: { module: true },
      },
    },
  });
  return roleWithModules;
}

async function register(props: RoleRepositoryInterfaces["RegisterProps"]) {
  const registeredRole = await db.role.create({
    data: {
      name: props.name,
    },
  });

  const registeredRoleModules = props.modules.map(async (roleModule) => {
    const registeredRoleModule = await db.roleModule.create({
      data: {
        roleId: registeredRole.id,
        moduleCode: roleModule,
      },
    });
    return registeredRoleModule;
  });
  await Promise.all(registeredRoleModules);

  return registeredRole;
}

async function edit(props: RoleRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;

  // Atualiza apenas o nome
  const editedRole = await db.role.update({
    where: { id },
    data: { name: data.name },
  });

  // Atualiza os módulos apenas se forem fornecidos
  if (data.modules) {
    await db.roleModule.deleteMany({
      where: { roleId: id },
    });

    const recreatedRoleModules = data.modules.map(async (roleModule) => {
      const recreatedRoleModule = await db.roleModule.create({
        data: {
          roleId: editedRole.id,
          moduleCode: roleModule,
        },
      });
      return recreatedRoleModule;
    });

    await Promise.all(recreatedRoleModules);
  }

  return editedRole;
}

async function remove(props: RoleRepositoryInterfaces["DeleteProps"]) {
  // Deleta primeiro as dependências na tabela RoleModule
  await db.roleModule.deleteMany({
    where: {
      roleId: props.id,
    },
  });

  // Deleta as dependências na tabela UserRole
  await db.userRole.deleteMany({
    where: {
      roleId: props.id,
    },
  });

  // Finalmente, deleta o cargo
  const deletedRole = await db.role.delete({
    where: {
      id: props.id,
    },
  });

  return deletedRole;
}

export const roleRepository = {
  getAll,
  register,
  edit,
  remove,
};
