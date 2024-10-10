import { db } from "../db";
import type { ProductSupplierRepositoryInterfaces } from "../interfaces/productSupplier/productSupplier.repository.interfaces";

async function getAll(
  props: ProductSupplierRepositoryInterfaces["GetAllProps"],
) {
  const { filters } = props;
  const products = await db.productSupplier.findMany({
    where: {
      AND: [
        { productId: filters.productId },
        {
          product: {
            name: filters.name,
            controlType: {
              name: filters.controlType,
            },
            category: {
              name: filters.productCategory,
            },
            stock: {
              name: filters.stock,
            },
            sectorOfUse: {
              name: filters.sectorOfUse,
            },
          },
        },
      ],
    },
    include: {
      product: {
        include: {
          unit: true,
          controlType: true,
          category: true,
          sectorOfUse: true,
          cabinet: true,
        },
      },
      supplier: true,
    },
  });
  return products;
}

export const ProductSupplierRepository = {
  getAll,
  //   create,
  //   edit,
  //   remove,
};
