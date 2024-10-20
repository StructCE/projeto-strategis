import { db } from "../db";
import type { AdjustRepositoryInterfaces } from "../interfaces/adjust/adjust.repository.interfaces";

async function getAll(props: AdjustRepositoryInterfaces["GetAllProps"]) {
  const adjusts = await db.adjust.findMany({
    // where: {
    //   stock: {
    //     companyId: props.companyId,
    //   },
    // },
    include: {
      stock: true,
      responsible: { include: { user: true } },
      ProductAdjust: {
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
          reason: true,
        },
      },
    },
  });
  return adjusts;
}

async function register(props: AdjustRepositoryInterfaces["RegisterProps"]) {
  const { adjustProducts, responsibleId: userId, ...adjustData } = props;

  const userRole = await db.userRole.findFirst({
    where: {
      userId: userId, // Relacionando o userId recebido do front-end
    },
  });

  if (!userRole) {
    throw new Error("O usuário não tem um papel associado (UserRole).");
  }

  const registeredAdjust = await db.adjust.create({
    data: {
      responsibleId: userRole.id,
      ...adjustData,
    },
  });

  const registeredAdjustProducts = adjustProducts.map(async (adjustProduct) => {
    const registeredAdjustProduct = await db.productAdjust.create({
      data: { ...adjustProduct, adjustId: registeredAdjust.id },
    });

    const productExists = await db.product.findUnique({
      where: {
        id: adjustProduct.productId,
      },
    });

    if (!productExists) {
      throw new Error("Produto não encontrado.");
    }

    // Atualizando a quantidade de inventário do produto
    const updatedProductAdjustQuantity = await db.product.update({
      where: {
        id: adjustProduct.productId,
      },
      data: {
        currentStock: adjustProduct.adjustedStock,
      },
    });

    return { registeredAdjustProduct, updatedProductAdjustQuantity };
  });

  await Promise.all(registeredAdjustProducts);
  return registeredAdjust;
}

export const adjustRepository = {
  getAll,
  register,
};
