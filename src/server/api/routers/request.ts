import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { RequestRouteInterfaces } from "~/server/interfaces/request/request.route.interfaces";
import { RequestRepository } from "~/server/repositories/request.repository";

export const requestRouter = createTRPCRouter({
  countPendentRequests: protectedProcedure.query(
    async (): Promise<RequestRouteInterfaces["PendentRequestsCount"]> => {
      const pendentRequestsCount =
        await RequestRepository.countPendentRequests();
      return { pendentRequestsCount };
    },
  ),
});
