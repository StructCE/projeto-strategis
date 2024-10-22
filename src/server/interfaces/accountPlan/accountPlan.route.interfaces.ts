export type AccountPlan = {
  id: string;
  name: string;
  abbreviation: string;
  accounts: { id: string; name: string; accountPlanId: string | null }[];
};

export type AccountPlanRouteInterfaces = {
  AccountPlan: AccountPlan;
};
