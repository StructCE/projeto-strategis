import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { companyRouter } from "./routers/company";
import { entryRouter } from "./routers/entry";
import { operationRouter } from "./routers/operation";
import { productRouter } from "./routers/product";
import { requestRouter } from "./routers/request";
// import { stockRouter } from "./routers/stock";
import { supplierRouter } from "./routers/supplier";
import { userRoleRouter } from "./routers/userRole"; /**
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
//   stock: stockRouter,
  supplier: supplierRouter,
  userRole: userRoleRouter,
}); // export type definition of API
export type AppRouter = typeof appRouter; /**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
