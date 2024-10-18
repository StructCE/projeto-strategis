import { orderRepositorySchema } from "~/server/interfaces/order/order.repository.interfaces";
import type { OrderRouteInterfaces } from "~/server/interfaces/order/order.route.interfaces";
import { orderRepository } from "~/server/repositories/order.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const orderRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(orderRepositorySchema.getAllProps)
    .query(
      async ({ input }): Promise<OrderRouteInterfaces["SerializedOrder"][]> => {
        const orders = await orderRepository.getAll(input);
        const serializedOrders = orders.map((order) => ({
          id: order.id,
          date: order.date,
          responsibleName: order.responsible.user.name,
          // stock: { id: order.stock.id, name: order.stock.name },
          orderProducts: order.OrderProduct.map((orderProduct) => ({
            id: orderProduct.product.product.id,
            code: orderProduct.product.product.code,
            name: orderProduct.product.product.name,
            purchaseQuantity: orderProduct.purchaseQuantity,
            currentStock: orderProduct.product.product.currentStock,
            minimunStock: orderProduct.product.product.minimunStock,
            unit: orderProduct.product.product.unit,
            ProductSupplier: {
              id: orderProduct.product.supplier.id,
              supplier: orderProduct.product.supplier,
            },
            shelf: orderProduct.product.product.shelf,
          })),
        }));

        return serializedOrders;
      },
    ),

  registerOrder: protectedProcedure
    .input(orderRepositorySchema.registerProps)
    .mutation(async ({ input }): Promise<OrderRouteInterfaces["Order"]> => {
      const registeredOrder = await orderRepository.register(input);
      return registeredOrder;
    }),

  editOrder: protectedProcedure
    .input(orderRepositorySchema.editProps)
    .mutation(async ({ input }): Promise<OrderRouteInterfaces["Order"]> => {
      const editedOrder = await orderRepository.edit(input);
      return editedOrder;
    }),

  deleteOrder: protectedProcedure
    .input(orderRepositorySchema.deleteProps)
    .mutation(async ({ input }): Promise<OrderRouteInterfaces["Order"]> => {
      const deletedOrder = await orderRepository.remove(input);
      return deletedOrder;
    }),
});
