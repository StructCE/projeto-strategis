import { db } from "../db";
import type { OrderRepositoryInterfaces } from "../interfaces/order/order.repository.interfaces";

async function getAll(props: OrderRepositoryInterfaces["GetAllProps"]) {
  if (props) {
    const { filters } = props;
    const conditions = [];

    if (filters?.responsibleName) {
      conditions.push({
        responsible: { user: { name: { contains: filters?.responsibleName } } },
      });
    }

    if (filters?.supplier) {
      conditions.push({
        OrderProduct: {
          some: {
            product: {
              supplier: { name: { contains: filters?.supplier } },
            },
          },
        },
      });
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

    const filteredOrders = await db.order.findMany({
      where: {
        AND: conditions,
      },
      include: {
        responsible: { include: { user: true } },
        // stock: true,
        OrderProduct: {
          include: {
            product: {
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
                supplier: true,
              },
            },
          },
        },
      },
    });
    return filteredOrders;
  }

  const orders = await db.order.findMany({
    include: {
      responsible: { include: { user: true } },
      // stock: true,
      OrderProduct: {
        include: {
          product: {
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
              supplier: true,
            },
          },
        },
      },
    },
  });
  return orders;
}

async function register(props: OrderRepositoryInterfaces["RegisterProps"]) {
  const { orderProducts, responsibleId: userId, ...orderData } = props;

  // Primeiro, você busca o userRole correspondente ao responsável
  const userRole = await db.userRole.findFirst({
    where: {
      userId: userId, // Relacionando o userId recebido do front-end
    },
  });

  // Verifica se o papel de usuário foi encontrado
  if (!userRole) {
    throw new Error("O usuário não tem um papel associado (UserRole).");
  }

  // Criação do pedido com o 'responsibleId' do userRole
  const createdOrder = await db.order.create({
    data: {
      responsibleId: userRole.id, // Usando o id do UserRole encontrado
      date: orderData.date,
    },
  });

  const registeredOrderProducts = await Promise.all(
    orderProducts.map(async (orderProduct) => {
      // Criando os registros de ProductInventory
      const productSupplier = await db.productSupplier.findFirst({
        where: { id: orderProduct.productSupplierId },
      });

      if (!productSupplier) {
        throw new Error("ProductSupplier ID inválido.");
      }

      const registeredOrderProduct = await db.orderProduct.create({
        data: {
          orderId: createdOrder.id,
          purchaseQuantity: orderProduct.purchaseQuantity,
          productSupplierId: orderProduct.productSupplierId,
        },
      });

      return { registeredOrderProduct };
    }),
  );

  await Promise.all(registeredOrderProducts);

  return createdOrder;
}

async function edit(props: OrderRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;
  const editedOrder = await db.order.update({
    where: {
      id: id,
    },
    data: {
      // date: data.date,
      // responsibleId: data.responsibleId,
      status: data.status,
      // stockId: data.stockId,
    },
  });

  // const editedOrderProducts = data.orderProducts.map(async (orderProduct) => {
  //   const editedOrderProduct = await db.orderProduct.update({
  //     where: {
  //       id: orderProduct.id,
  //     },
  //     data: { ...orderProduct.data },
  //   });
  //   return editedOrderProduct;
  // });
  // await Promise.all(editedOrder);

  return editedOrder;
}

async function remove(props: OrderRepositoryInterfaces["DeleteProps"]) {
  await db.orderProduct.deleteMany({
    where: {
      orderId: props.id,
    },
  });

  const deletedOrder = await db.order.delete({
    where: {
      id: props.id,
    },
  });
  return deletedOrder;
}

export const orderRepository = {
  getAll,
  register,
  edit,
  remove,
};
