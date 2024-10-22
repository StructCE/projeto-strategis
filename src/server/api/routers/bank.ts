import { type BankRouteInterfaces } from "~/server/interfaces/bank/bank.route.interfaces";
import { bankRepository } from "~/server/repositories/bank.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const bankRouter = createTRPCRouter({
  getAll: protectedProcedure.query(
    async (): Promise<BankRouteInterfaces["Bank"][]> => {
      const banks = await bankRepository.getAll();
      return banks;
    },
  ),
});
