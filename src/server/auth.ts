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
    async getSessionAndUser(sessionToken: string) {
      const userAndSession = await p.session.findUnique({
        where: { sessionToken },
        include: {
          user: {
            include: {
              UserRole: {
                include: {
                  role: {
                    include: { RoleModule: { include: { module: true } } },
                  },
                },
              },
            },
          },
        },
      });
      if (!userAndSession) return null;
      const { user, ...session } = userAndSession;
      return { user, session };
    },
  };
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      phone: string;
      allowedPagesPath: string[];
      allowedRouters: string[];
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
    }[];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  // pages: {
  //   signIn: "/login",
  // },
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          allowedPagesPath: user?.UserRole
            ? [
                ...new Set(
                  user.UserRole.flatMap((userRole) =>
                    userRole?.role?.RoleModule
                      ? userRole.role.RoleModule.map(
                          (roleModule) => roleModule?.module?.pagePath,
                        )
                      : [],
                  ),
                ),
              ]
            : [],

          allowedRouters: user?.UserRole
            ? [
                ...new Set(
                  user.UserRole.flatMap((userRole) =>
                    userRole?.role?.RoleModule
                      ? userRole.role.RoleModule.map(
                          (roleModule) => roleModule?.module?.allowedRouter,
                        )
                      : [],
                  ),
                ),
              ]
            : [],
        },
      };
    },
  },
  adapter: customPrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
