import { type AccountPlanRouteInterfaces } from "~/server/interfaces/accountPlan/accountPlan.route.interfaces";
import { accountPlanRepository } from "~/server/repositories/accountPlan.repository";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const accountPlanRouter = createTRPCRouter({
  getAll: protectedProcedure.query(
    async (): Promise<AccountPlanRouteInterfaces["AccountPlan"][]> => {
      const accountPlans = await accountPlanRepository.getAll();
      return accountPlans;
    },
  ),
});
