import { db } from "../db";
import type { ShelfRepositoryInterfaces } from "../interfaces/shelf/shelf.repository.interfaces";

async function getAll() {
  const shelfs = await db.shelf.findMany();
  return shelfs;
}

async function register(props: ShelfRepositoryInterfaces["RegisterProps"]) {
  // Primeiro, cria a prateleira (Shelf)
  const registeredShelf = await db.shelf.create({
    data: {
      name: props.name,
    },
  });

  // Verificar se o cabinetId existe no banco
  const cabinetExists = await db.cabinet.findUnique({
    where: { id: props.cabinetId },
  });

  if (!cabinetExists) {
    throw new Error(`Cabinet with ID ${props.cabinetId} does not exist`);
  }

  console.log("Registered Shelf ID:", registeredShelf.id);
  console.log("Cabinet ID:", props.cabinetId);

  // Cria a associação na tabela de junção CabinetShelf
  await db.cabinetShelf.create({
    data: {
      shelfId: registeredShelf.id, // ID da prateleira criada
      cabinetId: props.cabinetId, // ID do armário/StockCabinet
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
