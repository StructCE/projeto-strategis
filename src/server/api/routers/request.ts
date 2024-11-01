import { requestRepositorySchema } from "~/server/interfaces/request/request.repository.interfaces";
import type { RequestRouteInterfaces } from "~/server/interfaces/request/request.route.interfaces";
import { requestRepository } from "~/server/repositories/request.repository";
import {
  createTRPCRouter,
  operationProcedure,
  protectedProcedure,
} from "../trpc";

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
          id: request.id, // ID da solicitação (Request)
          description: request.description,
          requestDate: request.requestDate,
          responsibleName: request.responsible.user.name,
          status: request.status,
          statusDate: request.statusDate,
          statusResponsible: request.statusResponsible?.user.name,
          statusDescription: request.statusDescription,
          requestProducts: request.RequestProduct.map((requestProduct) => ({
            id: requestProduct.id, // ID do RequestProduct
            productId: requestProduct.productId, // ID do Produto
            code: requestProduct.product.code,
            name: requestProduct.product.name,
            ncm: requestProduct.product.ncm,
            cfop: requestProduct.product.cfop,
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

  registerRequest: operationProcedure
    .input(requestRepositorySchema.registerProps)
    .mutation(async ({ input }): Promise<RequestRouteInterfaces["Request"]> => {
      const registeredRequest = await requestRepository.register(input);
      return registeredRequest;
    }),

  editRequest: operationProcedure
    .input(requestRepositorySchema.editProps)
    .mutation(async ({ input }): Promise<RequestRouteInterfaces["Request"]> => {
      const editedRequest = await requestRepository.edit(input);
      return editedRequest;
    }),

  deleteRequest: operationProcedure
    .input(requestRepositorySchema.deleteProps)
    .mutation(async ({ input }): Promise<RequestRouteInterfaces["Request"]> => {
      const deletedRequest = await requestRepository.remove(input);
      return deletedRequest;
    }),
});
