import { cabinetRepositorySchema } from "~/server/interfaces/cabinet/cabinet.repository.interfaces";
import type { CabinetRouteInterfaces } from "~/server/interfaces/cabinet/cabinet.route.interfaces";
import { cabinetRepository } from "~/server/repositories/cabinet.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const cabinetRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(cabinetRepositorySchema.getAll)
    .query(
      async ({
        input,
      }): Promise<CabinetRouteInterfaces["CabinetWithStock"][]> => {
        const cabinets = await cabinetRepository.getAll(input);

        // Mapeia os dados para corresponder ao tipo esperado de retorno
        const mappedCabinets = cabinets.map((cabinet) => {
          return {
            id: cabinet.id,
            name: cabinet.name,
            // Assume que cada Cabinet possui apenas um Stock associado por meio de StockCabinet
            stock: cabinet.StockCabinet?.[0]?.stock, // Pega o primeiro Stock associado
            shelf: cabinet.Shelf, // A lista de Shelf já está na estrutura esperada
          };
        });

        return mappedCabinets;
      },
    ),

  getCabinetsWithoutStock: protectedProcedure.query(
    async (): Promise<CabinetRouteInterfaces["CabinetWithShelves"][]> => {
      const cabinets = await cabinetRepository.getCabinetsWithoutStock();
      return cabinets;
    },
  ),

  getCabinetFromStock: protectedProcedure
    .input(cabinetRepositorySchema.cabinetFromStockProps)
    .query(
      async ({
        input,
      }): Promise<CabinetRouteInterfaces["CabinetWithShelves"][]> => {
        const cabinets = await cabinetRepository.getCabinetFromStock(input);
        return cabinets;
      },
    ),

  registerCabinet: protectedProcedure
    .input(cabinetRepositorySchema.registerProps)
    .mutation(async ({ input }): Promise<CabinetRouteInterfaces["Cabinet"]> => {
      const registeredCabinet = await cabinetRepository.register(input);
      return registeredCabinet;
    }),

  editCabinet: protectedProcedure
    .input(cabinetRepositorySchema.editProps)
    .mutation(async ({ input }): Promise<CabinetRouteInterfaces["Cabinet"]> => {
      const editedCabinet = await cabinetRepository.edit(input);
      return editedCabinet;
    }),

  removeCabinet: protectedProcedure
    .input(cabinetRepositorySchema.removeProps)
    .mutation(async ({ input }): Promise<CabinetRouteInterfaces["Cabinet"]> => {
      const deletedCabinet = await cabinetRepository.remove(input);
      return deletedCabinet;
    }),
});
