import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { accountRouter } from "./routers/account";
import { accountPlanRouter } from "./routers/accountPlan";
import { adjustRouter } from "./routers/adjust";
import { adjustReasonRouter } from "./routers/adjustReason";
import { bankRouter } from "./routers/bank";
import { cabinetRouter } from "./routers/cabinet";
import { companyRouter } from "./routers/company";
import { controlTypeRouter } from "./routers/controlType";
import { documentTypeRouter } from "./routers/documentType";
import { groupRouter } from "./routers/group";
import { inventoryRouter } from "./routers/inventory";
import { invoiceRouter } from "./routers/invoice";
import { operationRouter } from "./routers/operation";
import { orderRouter } from "./routers/order";
import { productRouter } from "./routers/product";
import { productCategoryRouter } from "./routers/productCategory";
import { projectRouter } from "./routers/project";
import { requestRouter } from "./routers/request";
import { roleRouter } from "./routers/role";
import { shelfRouter } from "./routers/shelf";
import { stockRouter } from "./routers/stock";
import { supplierRouter } from "./routers/supplier";
import { unitRouter } from "./routers/unit";
import { userRouter } from "./routers/user";
import { userRoleRouter } from "./routers/userRole";
import { useSectorRouter } from "./routers/useSector";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  adjust: adjustRouter,
  company: companyRouter,
  operation: operationRouter,
  product: productRouter,
  request: requestRouter,
  role: roleRouter,
  stock: stockRouter,
  supplier: supplierRouter,
  userRole: userRoleRouter,
  user: userRouter,
  inventory: inventoryRouter,
  invoice: invoiceRouter,
  order: orderRouter,
  generalParameters: {
    cabinet: cabinetRouter,
    controlType: controlTypeRouter,
    useSector: useSectorRouter,
    shelf: shelfRouter,
    productCategory: productCategoryRouter,
    adjustReason: adjustReasonRouter,
    unit: unitRouter,
    bank: bankRouter,
    documentType: documentTypeRouter,
    group: groupRouter,
    project: projectRouter,
    account: accountRouter,
    accountPlan: accountPlanRouter,
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
