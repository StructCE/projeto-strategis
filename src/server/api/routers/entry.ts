import type { EntryRouteInterfaces } from "~/server/interfaces/entry/entry.route.interfaces";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { EntryRepository } from "~/server/repositories/entry.repository";

export const entryRouter = createTRPCRouter({
  countPendentNFs: protectedProcedure.query(
    async (): Promise<EntryRouteInterfaces["PendentNFsCount"]> => {
      const pendentNFsCount = await EntryRepository.countPendentNFs();
      return { pendentNFsCount };
    },
  ),
});
