import { db } from "../db";
import type { ShelfRepositoryInterfaces } from "../interfaces/shelf/shelf.repository.interfaces";

async function getAll() {
  const shelfs = await db.shelf.findMany();
  return shelfs;
}

async function register(props: ShelfRepositoryInterfaces["RegisterProps"]) {
  const registeredShelf = await db.shelf.create({
    data: {
      ...props,
    },
  });
  return registeredShelf;
}

async function edit(props: ShelfRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;
  const editedShelf = await db.shelf.update({
    where: { id },
    data: { ...data },
  });
  return editedShelf;
}

async function remove(props: ShelfRepositoryInterfaces["RemoveProps"]) {
  const deletedShelf = await db.shelf.delete({
    where: {
      id: props.id,
    },
  });
  return deletedShelf;
}

export const shelfRepository = {
  getAll,
  register,
  edit,
  remove,
};
