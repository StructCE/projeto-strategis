import { db } from "../db";
import type { CabinetRepositoryInterfaces } from "../interfaces/cabinet/cabinet.repository.interfaces";

async function getAll() {
  const cabinets = await db.cabinet.findMany({
    include: {
      StockCabinet: {
        include: {
          CabinetShelf: {
            include: {
              shelf: true,
            },
          },
        },
      },
    },
  });
  return cabinets;
}

async function register(props: CabinetRepositoryInterfaces["RegisterProps"]) {
  const registeredCabinet = await db.cabinet.create({
    data: {
      ...props,
    },
  });
  return registeredCabinet;
}

async function edit(props: CabinetRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;
  const editedCabinet = await db.cabinet.update({
    where: { id },
    data: { ...data },
  });
  return editedCabinet;
}

async function remove(props: CabinetRepositoryInterfaces["RemoveProps"]) {
  await db.cabinetShelf.deleteMany({
    where: {
      cabinet: {
        cabinetId: props.id, // Apaga todas as prateleiras associadas ao armário
      },
    },
  });

  await db.stockCabinet.deleteMany({
    where: {
      cabinetId: props.id, // Apaga todos os StockCabinets associados ao armário
    },
  });

  const deletedCabinet = await db.cabinet.delete({
    where: {
      id: props.id, // Deletar o Cabinet em si
    },
  });

  return deletedCabinet;
}

export const cabinetRepository = {
  getAll,
  register,
  edit,
  remove,
};
