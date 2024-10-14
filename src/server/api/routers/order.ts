import { orderRepositorySchema } from "~/server/interfaces/order/order.repository.interfaces";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { OrderRouteInterfaces } from "~/server/interfaces/order/order.route.interfaces";
import { orderRepository } from "~/server/repositories/order.repository";

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
          stockName: order.stock.name,
          products: order.OrderProduct.map((orderProduct) => ({
            buyQuantity: orderProduct.buyQuantity,
            unitType: orderProduct.product.product.unit.name,
            supplier: orderProduct.product.supplier.name,
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
