import { type AccountRouteInterfaces } from "~/server/interfaces/account/account.route.interfaces";
import { accountRepository } from "~/server/repositories/account.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const accountRouter = createTRPCRouter({
  getAll: protectedProcedure.query(
    async (): Promise<AccountRouteInterfaces["Account"][]> => {
      const accounts = await accountRepository.getAll();
      return accounts;
    },
  ),
});
