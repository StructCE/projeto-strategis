import { db } from "../db";
import type { InventoryRepositoryInterfaces } from "../interfaces/inventory/inventory.repository.interfaces";

async function getAll(props: InventoryRepositoryInterfaces["GetAllProps"]) {
  const { filters } = props;
  const inventories = await db.inventory.findMany({
    where: {
      AND: [
        { date: filters.date },
        { responsible: { user: { name: filters.responsible } } },
      ],
    },
    include: {
      responsible: { include: { user: true } },
      ProductInventory: { include: { product: { include: { unit: true } } } },
    },
  });
  return inventories;
}

async function register(props: InventoryRepositoryInterfaces["RegisterProps"]) {
  const { inventoryProducts, ...inventoryData } = props;
  const registeredInventory = await db.inventory.create({
    data: {
      ...inventoryData,
    },
  });

  const registeredInventoryProducts = inventoryProducts.map(
    async (inventoryProduct) => {
      const registeredInventoryProduct = await db.productInventory.create({
        data: { ...inventoryProduct, inventoryId: registeredInventory.id },
      });

      const updatedProductInventoryQuantity = await db.product.update({
        where: {
          id: inventoryProduct.productId,
        },
        data: {
          currentInventory: inventoryProduct.inventoryQuantity,
        },
      });
      return { registeredInventoryProduct, updatedProductInventoryQuantity };
    },
  );
  await Promise.all(registeredInventoryProducts);

  return registeredInventory;
}

export const inventoryRepository = {
  getAll,
  register,
};
