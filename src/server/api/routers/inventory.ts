import { inventoryRepositorySchema } from "~/server/interfaces/inventory/inventory.repository.interfaces";
import type { InventoryRouteInterfaces } from "~/server/interfaces/inventory/inventory.route.interfaces";
import { inventoryRepository } from "~/server/repositories/inventory.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
          inventoryProducts: inventory.ProductInventory.map(
            (inventoryProduct) => ({
              id: inventoryProduct.id,
              code: inventoryProduct.product.code,
              name: inventoryProduct.product.name,
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

  registerInventory: protectedProcedure
    .input(inventoryRepositorySchema.registerProps)
    .mutation(
      async ({ input }): Promise<InventoryRouteInterfaces["Inventory"]> => {
        const registeredInventory = await inventoryRepository.register(input);
        return registeredInventory;
      },
    ),
});
