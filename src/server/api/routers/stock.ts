import { stockRepositorySchema } from "~/server/interfaces/stock/stock.repository.interfaces";
import type { StockRouteInterfaces } from "~/server/interfaces/stock/stock.route.interfaces";
import { StockRepository } from "~/server/repositories/stock.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const stockRouter = createTRPCRouter({
  getAllStocks: protectedProcedure
    .input(stockRepositorySchema.getAllProps)
    .query(
      async ({
        input,
      }): Promise<StockRouteInterfaces["StockWithCabinets"][]> => {
        const stocks = await StockRepository.getAll(input);
        const serializedStocks = stocks.map((stock) => ({
          id: stock.id,
          name: stock.name,
          company: { id: stock.company.id, name: stock.company.name },
          StockCabinet: stock.StockCabinet.map((stockCabinet) => ({
            id: stockCabinet.id,
            cabinetId: stockCabinet.cabinetId,
          })),
          legalResponsible: {
            id: stock.legalResponsible.id,
            userId: stock.legalResponsible.userId,
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
    .mutation(async ({ input }): Promise<StockRouteInterfaces["Stock"]> => {
      const registeredStock = await StockRepository.register(input);
      return registeredStock;
    }),

  editStock: protectedProcedure
    .input(stockRepositorySchema.editProps)
    .mutation(async ({ input }): Promise<StockRouteInterfaces["Stock"]> => {
      const editedStock = await StockRepository.edit(input);
      return editedStock;
    }),

  deleteStock: protectedProcedure
    .input(stockRepositorySchema.deleteProps)
    .mutation(async ({ input }): Promise<StockRouteInterfaces["Stock"]> => {
      const deletedStock = await StockRepository.remove(input);
      return deletedStock;
    }),
});
