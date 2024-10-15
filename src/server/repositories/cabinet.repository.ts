import { db } from "../db";
import type { CabinetRepositoryInterfaces } from "../interfaces/cabinet/cabinet.repository.interfaces";
import {
  type CabinetWithShelves,
  type Shelf,
} from "../interfaces/cabinet/cabinet.route.interfaces";

async function getAll() {
  const cabinets = await db.cabinet.findMany({
    include: {
      Shelf: true,
    },
  });
  return cabinets.map(
    (cabinet): CabinetWithShelves => ({
      id: cabinet.id,
      name: cabinet.name,
      shelf: cabinet.Shelf as Shelf[], // Define explicitamente o tipo de Shelf
    }),
  );
}

async function getCabinetFromStock(
  props: CabinetRepositoryInterfaces["CabinetFromStockProps"],
) {
  const cabinets = await db.cabinet.findMany({
    where: {
      StockCabinet: {
        some: {
          // Filtra cabinets que estão associados a algum StockCabinet
          stockId: props.stockId,
        },
      },
    },
    include: {
      Shelf: true,
    },
  });
  return cabinets.map(
    (cabinet): CabinetWithShelves => ({
      id: cabinet.id,
      name: cabinet.name,
      shelf: cabinet.Shelf as Shelf[], // Define explicitamente o tipo de Shelf
    }),
  );
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
  await db.shelf.deleteMany({
    where: {
      cabinetId: props.id, // Apaga todas as prateleiras associadas ao armário
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
  getCabinetFromStock,
  register,
  edit,
  remove,
};