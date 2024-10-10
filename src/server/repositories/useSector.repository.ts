import { db } from "../db";
import type { UseSectorRepositoryInterfaces } from "../interfaces/useSector/useSector.repository.interfaces";

async function getAll() {
  const useSectors = await db.useSector.findMany();
  return useSectors;
}

async function register(props: UseSectorRepositoryInterfaces["RegisterProps"]) {
  const registeredUseSector = await db.useSector.create({
    data: {
      ...props,
    },
  });
  return registeredUseSector;
}

async function edit(props: UseSectorRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;
  const editedUseSector = await db.useSector.update({
    where: { id },
    data: { ...data },
  });
  return editedUseSector;
}

async function remove(props: UseSectorRepositoryInterfaces["RemoveProps"]) {
  const deletedUseSector = await db.useSector.delete({
    where: {
      id: props.id,
    },
  });
  return deletedUseSector;
}

export const useSectorRepository = {
  getAll,
  register,
  edit,
  remove,
};
