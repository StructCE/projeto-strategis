import { db } from "../db";

async function getAll() {
  const accountPlans = await db.invoiceAccountPlan.findMany({
    include: { accounts: true },
  });
  return accountPlans;
}

export const accountPlanRepository = {
  getAll,
};
