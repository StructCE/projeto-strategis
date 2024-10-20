import { db } from "../db";
import type { InventoryRepositoryInterfaces } from "../interfaces/inventory/inventory.repository.interfaces";

async function getAll(props: InventoryRepositoryInterfaces["GetAllProps"]) {
  // const { filters } = props;
  const inventories = await db.inventory.findMany({
    // where: {
    //   AND: [
    //     { date: filters.date },
    //     { responsible: { user: { name: filters.responsible } } },
    //   ],
    // },
    include: {
      stock: true,
      responsible: { include: { user: true } },
      ProductInventory: {
        include: {
          product: {
            include: {
              unit: true,
              shelf: {
                include: {
                  cabinet: {
                    include: {
                      StockCabinet: {
                        include: {
                          stock: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return inventories;
}

async function register(props: InventoryRepositoryInterfaces["RegisterProps"]) {
  const { inventoryProducts, responsibleId: userId, ...inventoryData } = props;

  // Encontra o UserRole correspondente ao userId
  const userRole = await db.userRole.findFirst({
    where: {
      userId: userId, // Relacionando o userId recebido do front-end
    },
  });

  if (!userRole) {
    throw new Error("O usuário não tem um papel associado (UserRole).");
  }

  // Agora usamos o id do UserRole como o responsibleId
  const registeredInventory = await db.inventory.create({
    data: {
      responsibleId: userRole.id, // Usando o id do UserRole encontrado
      date: inventoryData.date,
      stockId: inventoryData.stockId,
      status: inventoryData.status,
    },
  });

  const registeredInventoryProducts = inventoryProducts.map(
    async (inventoryProduct) => {
      // Criando os registros de ProductInventory
      const registeredInventoryProduct = await db.productInventory.create({
        data: { ...inventoryProduct, inventoryId: registeredInventory.id },
      });

      // Verifica se o produto existe
      const productExists = await db.product.findUnique({
        where: {
          id: inventoryProduct.productId,
        },
      });

      if (!productExists) {
        throw new Error("Produto não encontrado.");
      }

      // Atualizando a quantidade de inventário do produto
      const updatedProductInventoryQuantity = await db.product.update({
        where: {
          id: inventoryProduct.productId,
        },
        data: {
          lastInventory: inventoryProduct.inventoryQuantity,
        },
      });

      return { registeredInventoryProduct, updatedProductInventoryQuantity };
    },
  );

  await Promise.all(registeredInventoryProducts);

  return registeredInventory;
}

async function edit(props: InventoryRepositoryInterfaces["EditProps"]) {
  const {
    id,
    inventoryData: { ...inventoryData },
  } = props;

  // Verificar se o request existe
  const inventoryExists = await db.inventory.findUnique({ where: { id } });
  if (!inventoryExists) {
    throw new Error("Inventário não encontrado");
  }

  const editedInventory = await db.inventory.update({
    where: { id },
    data: {
      status: inventoryData.status,
    },
  });

  return editedInventory;
}

export const inventoryRepository = {
  getAll,
  register,
  edit,
};
