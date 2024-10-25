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
    const products = await db.product.findMany({
      where: {
        AND: [
          { name: { contains: filters.name } },
          {
            controlType: {
              name: { contains: filters.controlType },
            },
          },
          {
            category: {
              name: { contains: filters.productCategory },
            },
          },
          {
            shelf: {
              cabinet: {
                StockCabinet: { some: { stock: { name: filters.stock } } },
              },
            },
          },
          { id: { contains: filters.code } },
          { category: { name: { contains: filters.productCategory } } },
          { status: { contains: filters.status } },
          { buyDay: { contains: filters.buyDay } },
          {
            sectorOfUse: {
              name: { contains: filters.sectorOfUse },
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
  getProductsBySupplierId,
  getAllProductSuppliers,
  create,
  edit,
  remove,
};
