import { db } from "../db";
import type { StockRepositoryInterfaces } from "../interfaces/stock/stock.repository.interfaces";

async function getAll(props: StockRepositoryInterfaces["GetAllProps"]) {
  const { filters } = props;
  const stocks = await db.stock.findMany({
    where: {
      AND: [
        {
          name: filters.name,
        },
        {
          company: {
            name: filters.company,
          },
        },
      ],
    },
    include: {
      legalResponsible: {
        include: {
          user: true,
          role: true,
        },
      },
      StockCabinet: {
        include: {
          CabinetShelf: { include: { shelf: true } },
          cabinet: true,
        },
      },
      company: true,
    },
  });
  return stocks;
}

async function register(props: StockRepositoryInterfaces["RegisterProps"]) {
  const createdStock = await db.stock.create({
    data: {
      ...props,
    },
  });
  return createdStock;
}

export const StockRepository = {
  getAll,
  register,
};
