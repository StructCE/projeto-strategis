import { db } from "../db";
import type { ShelfRepositoryInterfaces } from "../interfaces/shelf/shelf.repository.interfaces";

async function getAll(props: ShelfRepositoryInterfaces["GetAll"]) {
  if (props) {
    const { filters } = props;
    const conditions = [];

    if (filters?.company) {
      conditions.push({
        cabinet: {
          StockCabinet: {
            some: {
              stock: {
                company: {
                  name: filters.company,
                },
              },
            },
          },
        },
      });
    }

    const shelves = await db.shelf.findMany({
      where: {
        AND: conditions,
      },
    });

    return shelves;
  }
  const shelves = await db.shelf.findMany();
  return shelves;
}

async function register(props: ShelfRepositoryInterfaces["RegisterProps"]) {
  const registeredShelf = await db.shelf.create({
    data: {
      name: props.name,
      cabinetId: props.cabinetId,
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
