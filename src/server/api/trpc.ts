/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import { Prisma } from "@prisma/client";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { date, ZodError } from "zod";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getServerAuthSession();
  return {
    db,
    session,
    ...opts,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/* eslint-disable @typescript-eslint/no-explicit-any */
type ErrorHandlingMiddlewareProps = {
  path: string;
  next: () => Promise<any>;
};

const errorHandlingMiddleware = async (props: ErrorHandlingMiddlewareProps) => {
  const { path, next } = props;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await next();
  } catch (error) {
    console.error(`Error in ${path} procedure`, error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Instância não encontrada",
          cause: error,
        });
      }
      if (error.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Instância com campo de valor único que já existe",
          cause: error,
        });
      }
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Dados enviados da instância são inválidos",
        cause: error,
      });
    }
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Erro interno no servidor",
      cause: error,
    });
  }
};

export const errorHandledProcedure = t.procedure.use(errorHandlingMiddleware);

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = errorHandledProcedure;

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = errorHandledProcedure.use(
  async ({ ctx, next, path }) => {
    const router = path.split(".")[0] ?? "";
    if (!ctx.session?.user) {
      // if (!ctx.session?.user.allowedRouters.includes(router)) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { ...ctx.session, user: ctx.session?.user },
      },
    });
  },
);

const createDescriptionByPath = (path: string) => {
  const operationModels: Record<string, string> = {
    company: "Empresa",
    supplier: "Fornecedor",
    stock: "Estoque",
    product: "Produto",
    user: "Usuário",
    roles: "Perfis de Acesso",
    generalParameters: "Parâmetros Gerais",
    inventory: "Inventário",
    order: "Compras de Mercadorias",
    adjust: "Ajustes de Estoque",
    invoice: "Notas Fiscais",
    request: "Requisições de Mercadoria",
  };

  const operations: Record<string, string> = {
    register: "Registro",
    create: "Criação",
    update: "Atualização",
    edit: "Edição",
    delete: "Deleção",
    remove: "Remoção",
    autoRegister: "Importação",
  };

  let model = "",
    operation = "";
  const splitedPath = path.split(".");

  if (splitedPath.length === 2) {
    model = splitedPath[0] ?? "";
    operation = splitedPath[1] ?? "";
  }

  if (splitedPath.length === 3) {
    model = splitedPath[0] ?? "";
    operation = splitedPath[2] ?? "";
  }

  for (const key in operations) {
    if (operation.includes(key)) operation = operations[key] ?? "";
  }

  return operation + " de " + operationModels[model];
};

export const operationProcedure = protectedProcedure.use(async function ({
  ctx,
  path,
  next,
}): Promise<any> {
  try {
    const procedureResult = await next();
    await ctx.db.operation.create({
      data: {
        date: new Date(),
        description: createDescriptionByPath(path),
        responsibleId: ctx.session?.user.id,
      },
    });
    return procedureResult;
  } catch (e) {
    console.log("Não foi possível criar a operação devido a um erro");
  }
});
