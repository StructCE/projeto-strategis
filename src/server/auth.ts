import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { env } from "~/env";
import { db } from "~/server/db";

function customPrismaAdapter(p: typeof db) {
  return {
    ...PrismaAdapter(p),
    createUser: undefined,
    getUser: (id: string) =>
      p.user.findUnique({
        where: { id },
        include: {
          UserRole: {
            include: {
              role: { include: { RoleModule: { include: { module: true } } } },
            },
          },
        },
      }),
  };
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      phone: string;
      allowedPagesPath: string[];
      allowedRouters: string[];
      // ...other properties
    } & DefaultSession["user"];
  }

  interface User {
    name: string;
    email: string;
    phone: string;
    UserRole: {
      role: {
        RoleModule: {
          id: string;
          moduleId: string;
          roleId: string;
          module: {
            id: string;
            name: string;
            code: number;
            pagePath: string;
            allowedRouter: string;
          };
        }[];
      } & {
        id: string;
        name: string;
      };
      // ...other properties
      // role: UserRole;
    }[];
  }
}
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        allowedPagesPath: [
          ...new Set(
            user.UserRole.flatMap((userRole) =>
              userRole.role.RoleModule.map(
                (roleModule) => roleModule.module.pagePath,
              ),
            ),
          ),
        ],
        allowedRouters: [
          ...new Set(
            user.UserRole.flatMap((userRole) =>
              userRole.role.RoleModule.map(
                (roleModule) => roleModule.module.allowedRouter,
              ),
            ),
          ),
        ],
      },
    }),
  },
  adapter: customPrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the GOOGLE provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
