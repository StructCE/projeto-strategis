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
  if (props) {
    const { filters } = props;
    const conditions = [];

    if (filters?.company) {
      conditions.push({
        OR: [
          {
            shelf: {
              cabinet: {
                StockCabinet: {
                  some: {
                    stock: {
                      company: {
                        name: { contains: filters.company },
                      },
                    },
                  },
                },
              },
            },
          },
          {
            ProductSupplier: {
              some: {
                supplier: {
                  CompanySupplier: {
                    some: {
                      company: {
                        name: { contains: filters.company },
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      });
    }
    if (filters.name) {
      conditions.push({ name: { contains: filters.name } });
    }
    if (filters.controlType) {
      conditions.push({
        controlType: {
          name: { contains: filters.controlType },
        },
      });
    }
    if (filters.productCategory) {
      conditions.push({
        category: {
          name: { contains: filters.productCategory },
        },
      });
    }
    if (filters.stock) {
      conditions.push({
        shelf: {
          cabinet: {
            StockCabinet: {
              some: { stock: { name: { contains: filters.stock } } },
            },
          },
        },
      });
    }
    if (filters.code) {
      conditions.push({ code: { contains: filters.code } });
    }
    if (filters.status) {
      conditions.push({ status: { contains: filters.status } });
    }
    if (filters.buyDay) {
      conditions.push({ buyDay: { contains: filters.buyDay } });
    }
    if (filters.sectorOfUse) {
      conditions.push({
        sectorOfUse: {
          name: { contains: filters.sectorOfUse },
        },
      });
    }
    if (filters.supplier) {
      conditions.push({
        ProductSupplier: {
          some: {
            supplier: {
              name: { contains: filters.supplier },
            },
          },
        },
      });
    }

    const products = await db.product.findMany({
      where: {
        AND: conditions,
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
        usersWithPermission: { include: { user: true } },
        ProductSupplier: {
          include: {
            supplier: true,
          },
        },
      },
    });
    return products;
  }
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
      usersWithPermission: { include: { user: true } },
      ProductSupplier: {
        include: {
          supplier: true,
        },
      },
    },
  });
  return products;
}

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
        deleteMany: {},
        create: data.usersWithPermission?.map((userId) => ({
          userId,
        })),
      },
      // Condicionalmente atualiza ProductSupplier apenas se data.ProductSupplier estiver presente
      ...(data.ProductSupplier && {
        ProductSupplier: {
          deleteMany: {}, // Deleta todos os fornecedores antigos
          create: data.ProductSupplier.map((supplierId) => ({
            supplierId,
          })),
        },
      }),
    },
  });

  return editedProduct;
}

async function remove(props: ProductRepositoryInterfaces["RemoveProps"]) {
  // Exclui as permissões relacionadas ao produto
  await db.productPermission.deleteMany({ where: { productId: props.id } });

  // Exclui os fornecedores relacionados ao produto
  await db.productSupplier.deleteMany({ where: { productId: props.id } });

  // Exclui os ajustes relacionados ao produto
  await db.productAdjust.deleteMany({ where: { productId: props.id } });

  // Exclui os registros de inventário relacionados ao produto
  await db.productInventory.deleteMany({ where: { productId: props.id } });

  // Exclui os produtos em solicitações relacionados ao produto
  await db.requestProduct.deleteMany({ where: { productId: props.id } });

  // Exclui o produto principal (caso existam produtos filhos associados)
  await db.product.deleteMany({ where: { parentProductId: props.id } });

  // Exclui o próprio produto
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
