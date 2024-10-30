import { inventoryRepositorySchema } from "~/server/interfaces/inventory/inventory.repository.interfaces";
import type { InventoryRouteInterfaces } from "~/server/interfaces/inventory/inventory.route.interfaces";
import { inventoryRepository } from "~/server/repositories/inventory.repository";
import {
  createTRPCRouter,
  operationProcedure,
  protectedProcedure,
} from "../trpc";

export const inventoryRouter = createTRPCRouter({
  getAllInventories: protectedProcedure
    .input(inventoryRepositorySchema.getAllProps)
    .query(
      async ({
        input,
      }): Promise<InventoryRouteInterfaces["SerializedInventory"][]> => {
        const inventories = await inventoryRepository.getAll(input);
        const serializedInventories = inventories.map((inventory) => ({
          id: inventory.id,
          date: inventory.date,
          responsibleName: inventory.responsible.user.name,
          stockId: inventory.stock.id,
          status: inventory.status,
          inventoryProducts: inventory.ProductInventory.map(
            (inventoryProduct) => ({
              id: inventoryProduct.id,
              code: inventoryProduct.product.code,
              name: inventoryProduct.product.name,
              ncm: inventoryProduct.product.ncm,
              cfop: inventoryProduct.product.cfop,
              productId: inventoryProduct.product.id,
              unit: inventoryProduct.product.unit,
              inventoryQuantity: inventoryProduct.inventoryQuantity,
              stockQuantity: inventoryProduct.stockQuantity,
              shelf: inventoryProduct.product.shelf,
            }),
          ),
        }));
        return serializedInventories;
      },
    ),

  registerInventory: operationProcedure
    .input(inventoryRepositorySchema.registerProps)
    .mutation(
      async ({ input }): Promise<InventoryRouteInterfaces["Inventory"]> => {
        const registeredInventory = await inventoryRepository.register(input);
        return registeredInventory;
      },
    ),

  editInventory: operationProcedure
    .input(inventoryRepositorySchema.editProps)
    .mutation(
      async ({ input }): Promise<InventoryRouteInterfaces["Inventory"]> => {
        const editedInventory = await inventoryRepository.edit(input);
        return editedInventory;
      },
    ),
});
