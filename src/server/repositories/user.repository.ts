import { db } from "../db";
import type { UserRepositoryInterfaces } from "../interfaces/user/user.repository.interfaces";

async function getAll(props: UserRepositoryInterfaces["GetAllProps"]) {
  const { filters } = props;
  const users = await db.user.findMany({
    where: {
      AND: [
        { name: filters.name },
        {
          UserRole: {
            every: {
              company: {
                name: filters.company,
              },
            },
            some: {
              role: { name: filters.role },
            },
          },
        },
        {},
      ],
    },
    include: {
      UserRole: {
        include: {
          role: true,
        },
      },
    },
  });
  return users;
}

async function register(props: UserRepositoryInterfaces["RegisterProps"]) {
  const registeredUser = await db.user.create({
    data: { ...props },
  });
  return registeredUser;
}

async function edit(props: UserRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;
  const editedUser = await db.user.update({
    where: {
      id: id,
    },
    data: {
      ...data,
    },
  });
  return editedUser;
}

async function remove(props: UserRepositoryInterfaces["DeleteProps"]) {
  const deleteedUser = await db.user.delete({
    where: {
      id: props.id,
    },
  });
  return deleteedUser;
}

export const userRepository = {
  getAll,
  register,
  edit,
  remove,
};
