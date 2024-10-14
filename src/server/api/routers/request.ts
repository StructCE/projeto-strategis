import { requestRepositorySchema } from "~/server/interfaces/request/request.repository.interfaces";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { RequestRouteInterfaces } from "~/server/interfaces/request/request.route.interfaces";
import { requestRepository } from "~/server/repositories/request.repository";

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
          requestDate: request.requestDate,
          responsibleName: request.responsible.user.name,
          statusResponsible: request.statusResponsible.user.name,
          statusDate: request.statusDate,
          status: request.status,
          requestProducts: request.RequestProduct.map((requestProduct) => ({
            code: requestProduct.product.id,
            name: requestProduct.product.name,
            unit: requestProduct.product.unit.name,
            requestedQuantity: requestProduct.requestedQuantity,
            releasedQuantity: requestProduct.releasedQuantity,
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
