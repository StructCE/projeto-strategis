import { stockRepositorySchema } from "~/server/interfaces/stock/stock.repository.interfaces";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { StockRouteInterfaces } from "~/server/interfaces/stock/stock.route.interfaces";
import { StockRepository } from "~/server/repositories/stock.repository";

export const stockRouter = createTRPCRouter({
  getAllStocks: protectedProcedure
    .input(stockRepositorySchema.getAllProps)
    .query(
      async ({ input }): Promise<StockRouteInterfaces["SerializedStock"][]> => {
        const stocks = await StockRepository.getAll(input);
        const serializedStocks = stocks.map((stock) => ({
          id: stock.id,
          name: stock.name,
          company: stock.company.name,
          cabinets: stock.StockCabinet.map(
            (stockCabinets) => stockCabinets.cabinet.name,
          ),
          shelfs: stock.StockShelf.map((stockShelfs) => stockShelfs.shelf.name),
          legalResponsible: {
            name: stock.legalResponsible.user.name,
            email: stock.legalResponsible.user.email,
            phone: stock.legalResponsible.user.phone,
            role: stock.legalResponsible.role.name,
          },
        }));
        return serializedStocks;
      },
    ),

  registerStock: protectedProcedure
    .input(stockRepositorySchema.registerProps)
    .query(async ({ input }): Promise<StockRouteInterfaces["Stock"]> => {
      const registeredStock = await StockRepository.register(input);
      return registeredStock;
    }),
});
