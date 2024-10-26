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
      usersWithPermission: {
        include: {
          user: true, // Inclui os dados do usuário relacionados à permissão
        },
      },
      ProductSupplier: {
        include: {
          supplier: true,
        },
      },
    },
  });

  return products;
}

async function getProductsBySupplierId(
  props: ProductRepositoryInterfaces["GetProductsBySupplierIdProps"],
) {
  const products = await db.product.findMany({
    where: {
      ProductSupplier: {
        some: {
          supplierId: props.supplierId, // Filtro pelo id do fornecedor
        },
      },
    },
    include: {
      unit: true,
      controlType: true,
      category: true,
      sectorOfUse: true,
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
      usersWithPermission: {
        include: {
          user: true, // Inclui os dados do usuário relacionados à permissão
        },
      },
      ProductSupplier: {
        include: {
          supplier: true, // Inclui os detalhes do fornecedor
        },
      },
    },
  });

  return products;
}

async function getAllProductSuppliers() {
  const productsSuppliers = await db.productSupplier.findMany({
    include: {
      product: {
        include: {
          unit: true,
          controlType: true,
          category: true,
          sectorOfUse: true,
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
          usersWithPermission: {
            include: {
              user: true, // Inclui os dados do usuário relacionados à permissão
            },
          },
        },
      },
      supplier: true,
    },
  });

  return productsSuppliers;
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

  // Verificar se o produto existe
  const existingProduct = await db.product.findUnique({
    where: { id },
  });
  if (existingProduct) {
    console.log(existingProduct);
  }
  if (!existingProduct) {
    throw new Error("Produto não encontrado.");
  }

  // Verificar se a unidade de compra existe
  if (data.unitId) {
    const existingUnit = await db.unit.findUnique({
      where: { id: data.unitId },
    });
    if (!existingUnit) {
      throw new Error("Unidade de compra não encontrada.");
    }
  }

  // Verificar se o tipo de controle existe
  if (data.controlTypeId) {
    const existingControlType = await db.controlType.findUnique({
      where: { id: data.controlTypeId },
    });
    if (!existingControlType) {
      throw new Error("Tipo de controle não encontrado.");
    }
  }

  // Verificar se a categoria existe
  if (data.categoryId) {
    const existingCategory = await db.productCategory.findUnique({
      where: { id: data.categoryId },
    });
    if (!existingCategory) {
      throw new Error("Categoria não encontrada.");
    }
  }

  // Verificar se o setor de uso existe
  if (data.sectorOfUseId) {
    const existingSectorOfUse = await db.useSector.findUnique({
      where: { id: data.sectorOfUseId },
    });
    if (!existingSectorOfUse) {
      throw new Error("Setor de utilização não encontrado.");
    }
  }

  // Verificar se a prateleira existe
  if (data.shelfId) {
    const existingShelf = await db.shelf.findUnique({
      where: { id: data.shelfId },
    });
    if (!existingShelf) {
      throw new Error("Prateleira não encontrada.");
    }
  }

  // Verificar fornecedores (se fornecido)
  if (data.ProductSupplier && data.ProductSupplier.length > 0) {
    const existingSuppliers = await db.supplier.findMany({
      where: { id: { in: data.ProductSupplier } },
    });
    if (existingSuppliers.length !== data.ProductSupplier.length) {
      throw new Error("Um ou mais fornecedores não foram encontrados.");
    }
  }

  // Verificar usuários com permissão (se fornecido)
  if (data.usersWithPermission && data.usersWithPermission.length > 0) {
    const existingUsers = await db.user.findMany({
      where: { id: { in: data.usersWithPermission } },
    });
    if (existingUsers.length !== data.usersWithPermission.length) {
      throw new Error(
        "Um ou mais usuários com permissão não foram encontrados.",
      );
    }
  }

  const editedProduct = await db.product.update({
    where: { id: id },
    data: {
      name: data.name,
      code: data.code,
      ncm: data.ncm,
      cfop: data.cfop,
      status: data.status,
      parentProductId: data.parentProductId,
      unitId: data.unitId,
      buyQuantity: data.buyQuantity,
      buyDay: data.buyDay,
      currentStock: data.currentStock,
      minimunStock: data.minimunStock,
      maximumStock: data.maximumStock,
      lastInventory: data.lastInventory,
      controlTypeId: data.controlTypeId,
      categoryId: data.categoryId,
      sectorOfUseId: data.sectorOfUseId,
      shelfId: data.shelfId,
      // Atualiza usersWithPermission, deletando os antigos e criando os novos
      usersWithPermission: {
        deleteMany: {}, // Deleta todas as permissões antigas
        create: data.usersWithPermission?.map((userId) => ({
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
  getProductsBySupplierId,
  getAllProductSuppliers,
  create,
  edit,
  remove,
};
