import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { cabinetRouter } from "./routers/cabinet";
import { companyRouter } from "./routers/company";
import { controlTypeRouter } from "./routers/controlType";
import { entryRouter } from "./routers/entry";
import { operationRouter } from "./routers/operation";
import { productRouter } from "./routers/product";
import { productCategoryRouter } from "./routers/productCategory";
import { requestRouter } from "./routers/request";
import { roleRouter } from "./routers/role";
import { shelfRouter } from "./routers/shelf";
import { stockRouter } from "./routers/stock";
import { supplierRouter } from "./routers/supplier";
import { userRouter } from "./routers/user";
import { userRoleRouter } from "./routers/userRole";
import { useSectorRouter } from "./routers/useSector";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  company: companyRouter,
  entry: entryRouter,
  operation: operationRouter,
  product: productRouter,
  request: requestRouter,
  role: roleRouter,
  stock: stockRouter,
  supplier: supplierRouter,
  userRole: userRoleRouter,
  user: userRouter,
  generalParameters: {
    cabinet: cabinetRouter,
    controlType: controlTypeRouter,
    useSector: useSectorRouter,
    shelf: shelfRouter,
    productCategory: productCategoryRouter,
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
