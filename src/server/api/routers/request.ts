import { requestRepositorySchema } from "~/server/interfaces/request/request.repository.interfaces";
import type { RequestRouteInterfaces } from "~/server/interfaces/request/request.route.interfaces";
import { requestRepository } from "~/server/repositories/request.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const requestRouter = createTRPCRouter({
  countPendentRequests: protectedProcedure.query(
    async (): Promise<RequestRouteInterfaces["PendentRequestsCount"]> => {
      const pendentRequestsCount =
        await requestRepository.countPendentRequests();
      return { pendentRequestsCount };
    },
  ),

  getAll: protectedProcedure
    .input(requestRepositorySchema.getAllProps)
    .query(
      async ({
        input,
      }): Promise<RequestRouteInterfaces["SerializedRequest"][]> => {
        const requests = await requestRepository.getAll(input);
        const serializedRequests = requests.map((request) => ({
          description: request.description,
          requestDate: request.requestDate,
          responsibleName: request.responsible.user.name,
          status: request.status,
          statusDate: request.statusDate,
          statusResponsible: request.statusResponsible?.user.name,
          statusDescription: request.statusDescription,
          requestProducts: request.RequestProduct.map((requestProduct) => ({
            code: requestProduct.product.code,
            name: requestProduct.product.name,
            // unit: requestProduct.product.unit.name,
            requestedQuantity: requestProduct.requestedQuantity,
            releasedQuantity: requestProduct.releasedQuantity,
            currentStock: requestProduct.product.currentStock,
            minimunStock: requestProduct.product.minimunStock,
            shelf: requestProduct.product.shelf,
          })),
        }));

        return serializedRequests;
      },
    ),

  registerRequest: protectedProcedure
    .input(requestRepositorySchema.registerProps)
    .mutation(async ({ input }): Promise<RequestRouteInterfaces["Request"]> => {
      const registeredRequest = await requestRepository.register(input);
      return registeredRequest;
    }),
});
