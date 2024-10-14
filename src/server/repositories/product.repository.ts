import { db } from "../db";
import type { ProductRepositoryInterfaces } from "../interfaces/product/product.repository.interfaces";

async function countProducts() {
  const productsCount = await db.product.aggregate({
    _sum: {
      currentStock: true,
    },
  });
  return productsCount._sum.currentStock ?? 0;
}

async function getAllWhere(props: ProductRepositoryInterfaces["GetAllProps"]) {
  const { filters } = props;
  const products = await db.product.findMany({
    where: {
      AND: [
        { name: filters.name },
        {
          controlType: {
            name: filters.controlType,
          },
        },
        {
          category: {
            name: filters.productCategory,
          },
        },
        {
          stock: {
            name: filters.stock,
          },
        },
        {
          sectorOfUse: {
            name: filters.sectorOfUse,
          },
        },
      ],
    },
  });
  return products;
}

//TODO: logica para retornar apenas produtos do restaurante passado
async function getAll() {
  const products = await db.product.findMany();
  return products;
}

async function create(props: ProductRepositoryInterfaces["CreateProps"]) {
  const createdProduct = await db.product.create({
    data: {
      ...props,
    },
  });
  return createdProduct;
}

async function edit(props: ProductRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;
  const editedProduct = await db.product.update({
    where: {
      id: id,
    },
    data: {
      ...data,
    },
  });
  return editedProduct;
}

async function remove(props: ProductRepositoryInterfaces["RemoveProps"]) {
  const deletedProduct = await db.product.delete({
    where: {
      id: props.id,
    },
  });
  return deletedProduct;
}

export const ProductRepository = {
  countProducts,
  getAll,
  getAllWhere,
  create,
  edit,
  remove,
};
