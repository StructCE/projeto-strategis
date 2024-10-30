import { db } from "../db";
import type { CabinetRepositoryInterfaces } from "../interfaces/cabinet/cabinet.repository.interfaces";
import {
  type CabinetWithShelves,
  type Shelf,
} from "../interfaces/cabinet/cabinet.route.interfaces";

async function getAll(props: CabinetRepositoryInterfaces["GetAll"]) {
  if (props) {
    const { filters } = props;
    const conditions = [];

    if (filters?.company) {
      conditions.push({
        OR: [
          {
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
          {
            StockCabinet: {
              none: {},
            },
          },
        ],
      });
    }

    const cabinets = await db.cabinet.findMany({
      where: filters?.includeUnassociated
        ? {
            OR: [
              { AND: conditions }, // Condição para cabinets com associação de estoque
              { StockCabinet: { none: {} } }, // Condição para cabinets sem associação de estoque
            ],
          }
        : {
            AND: conditions,
          },
      include: {
        StockCabinet: {
          include: {
            stock: {
              include: {
                company: true,
              },
            },
          },
        },
        Shelf: true,
      },
    });

    return cabinets;
  }

  const cabinets = await db.cabinet.findMany({
    include: {
      StockCabinet: {
        include: {
          stock: {
            include: {
              company: true, // Inclui os detalhes da empresa para validar o filtro
            },
          },
        },
      },
      Shelf: true,
    },
  });
  return cabinets;
}

async function getCabinetsWithoutStock() {
  const cabinets = await db.cabinet.findMany({
    where: {
      // Filtro para garantir que o armário não está associado a nenhum estoque
      StockCabinet: {
        none: {}, // Nenhum StockCabinet deve estar associado a esse Cabinet
      },
    },
    include: {
      Shelf: true, // Inclui as prateleiras associadas
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
          ...(props.stockId ? { stockId: props.stockId } : {}),
          ...(props.stockName ? { stock: { name: props.stockName } } : {}),
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
  getCabinetsWithoutStock,
  getCabinetFromStock,
  register,
  edit,
  remove,
};
