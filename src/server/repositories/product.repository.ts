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
        // {
        //   stock: {
        //     name: filters.stock,
        //   },
        // },
        {
          sectorOfUse: {
            name: filters.sectorOfUse,
          },
        },
      ],
    },
    include: {
      unit: true,
      controlType: true,
      category: true,
      sectorOfUse: true,
      shelf: {
        include: {
          cabinet: true,
        },
      },
      usersWithPermission: true,
      ProductSupplier: {
        include: {
          supplier: true,
        },
      },
    },
  });
  return products;
}

//TODO: logica para retornar apenas produtos do restaurante passado
async function getAll() {
  const products = await db.product.findMany({
    include: {
      unit: true,
      controlType: true,
      category: true,
      sectorOfUse: true,
      shelf: {
        include: {
          cabinet: true,
        },
      },
      usersWithPermission: true,
      ProductSupplier: {
        include: {
          supplier: true,
        },
      },
    },
  });

  return products;
}

async function create(props: ProductRepositoryInterfaces["CreateProps"]) {
  const createdProduct = await db.product.create({
    data: {
      ...props,
      usersWithPermission: {
        create: props.usersWithPermission.map((userId) => ({
          userId,
        })),
      },
      ProductSupplier: {
        create: props.ProductSupplier?.map((supplierId) => ({
          supplierId, // Associa os IDs dos fornecedores ao produto
        })),
      },
    },
  });
  return createdProduct;
}

async function edit(props: ProductRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;

  const editedProduct = await db.product.update({
    where: { id },
    data: {
      ...data,
      // Atualiza usersWithPermission, deletando os antigos e criando os novos
      usersWithPermission: {
        deleteMany: {}, // Deleta todas as permissões antigas
        create: data.usersWithPermission.map((userId) => ({
          userId,
        })), // Cria as novas permissões
      },
      // Atualiza ProductSupplier, deletando os antigos e criando os novos
      ProductSupplier: {
        deleteMany: {}, // Deleta todos os fornecedores antigos
        create: data.ProductSupplier?.map((supplierId) => ({
          supplierId,
        })),
      },
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
