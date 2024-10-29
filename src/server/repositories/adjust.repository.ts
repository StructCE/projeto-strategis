import { db } from "../db";
import type { AdjustRepositoryInterfaces } from "../interfaces/adjust/adjust.repository.interfaces";

async function getAll(props: AdjustRepositoryInterfaces["GetAllProps"]) {
  if (props) {
    const { filters } = props;
    const conditions = [];

    if (filters?.responsible) {
      conditions.push({
        responsible: { user: { name: { contains: filters?.responsible } } },
      });
    }
    if (filters?.adjustType) {
      conditions.push({ type: { contains: filters?.adjustType } });
    }
    if (filters?.date) {
      conditions.push(
        {
          date: {
            gte: filters?.date
              ? new Date(
                  `${filters?.date.getFullYear()}-${filters?.date.getMonth() + 1}-${filters?.date?.getDate()}T00:00:00.000Z`,
                )
              : undefined,
          },
        },
        {
          date: {
            lt: filters?.date
              ? new Date(
                  `${filters?.date.getFullYear()}-${filters?.date.getMonth() + 1}-${filters?.date.getDate() + 1}T00:00:00.000Z`,
                )
              : undefined,
          },
        },
      );
    }

    const adjusts = await db.adjust.findMany({
      where: {
        AND: conditions,
      },
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
  return await db.adjust.findMany({
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
