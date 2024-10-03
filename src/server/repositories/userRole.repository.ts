import { db } from "../db";
import type { UserRoleInterfaces } from "../interfaces/userRole/userRole.repository.interfaces";

async function create(props: UserRoleInterfaces["CreateProps"]) {
  const createdUserRole = await db.userRole.create({
    data: {
      ...props,
    },
  });
  return createdUserRole;
}

async function edit(props: UserRoleInterfaces["EditProps"]) {
  const { id, data } = props;
  const editedUserRole = await db.userRole.update({
    where: {
      id: id,
    },
    data: {
      ...data,
    },
  });
  return editedUserRole;
}

async function remove(props: UserRoleInterfaces["RemoveProps"]) {
  const deletedUserRole = await db.userRole.delete({
    where: {
      id: props.id,
    },
  });
  return deletedUserRole;
}

export const userRoleRepository = {
  create,
  edit,
  remove,
};
