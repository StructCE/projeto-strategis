import { db } from "../db";
import type { AdjustRepositoryInterfaces } from "../interfaces/adjust/adjust.repository.interfaces";

async function getAll(props: AdjustRepositoryInterfaces["GetAllProps"]) {
  const adjusts = await db.adjust.findMany({
    where: {
      stock: {
        companyId: props.companyId,
      },
    },
    include: {
      stock: true,
      responsible: { include: { user: true } },
      ProductAdjust: {
        include: {
          product: { include: { unit: true } },
          reason: true,
        },
      },
    },
  });
  return adjusts;
}

async function register(props: AdjustRepositoryInterfaces["RegisterProps"]) {
  const { adjustProducts, ...adjustData } = props;
  const registeredAdjust = await db.adjust.create({
    data: {
      ...adjustData,
    },
  });

  const registeredAdjustProducts = adjustProducts.map(async (adjustProduct) => {
    const registeredAdjustProduct = await db.productAdjust.create({
      data: { ...adjustProduct, adjustId: registeredAdjust.id },
    });
    return registeredAdjustProduct;
  });

  await Promise.all(registeredAdjustProducts);
  return registeredAdjust;
}

export const adjustRepository = {
  getAll,
  register,
};
