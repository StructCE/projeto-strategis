import { db } from "../db";
import type { OrderRepositoryInterfaces } from "../interfaces/order/order.repository.interfaces";

async function getAll(props: OrderRepositoryInterfaces["GetAllProps"]) {
  // const { filters } = props;
  const orders = await db.order.findMany({
    // where: {
    //   AND: [
    //     { date: filters.date },
    //     { responsible: { user: { name: filters.responsibleName } } },
    //   ],
    // },
    include: {
      responsible: { include: { user: true } },
      stock: true,
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
  const userRole = await db.userRole.findFirst({
    where: {
      userId: props.responsibleId, // Relacionando o userId recebido do front-end
    },
  });

  if (!userRole) {
    throw new Error("O usuário não tem um papel associado (UserRole).");
  }

  const createdOrder = await db.order.create({
    data: {
      date: props.date,
      responsibleId: userRole.id,
      stockId: props.stockId,
    },
  });
  const createdOrderProducts = props.orderProducts.map(async (orderProduct) => {
    const createOrderProduct = await db.orderProduct.create({
      data: {
        purchaseQuantity: orderProduct.purchaseQuantity,
        orderId: createdOrder.id,
        productSupplierId: orderProduct.productSupplierId,
      },
    });
    return createOrderProduct;
  });
  await Promise.all(createdOrderProducts);

  return createdOrder;
}

async function edit(props: OrderRepositoryInterfaces["EditProps"]) {
  const { id, data } = props;
  const editedOrder = await db.order.update({
    where: {
      id: id,
    },
    data: {
      date: data.date,
      responsibleId: data.responsibleId,
      stockId: data.stockId,
    },
  });

  const editedOrderProducts = data.orderProducts.map(async (orderProduct) => {
    const editedOrderProduct = await db.orderProduct.update({
      where: {
        id: orderProduct.id,
      },
      data: { ...orderProduct.data },
    });
    return editedOrderProduct;
  });
  await Promise.all(editedOrderProducts);

  return editedOrder;
}

async function remove(props: OrderRepositoryInterfaces["DeleteProps"]) {
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
