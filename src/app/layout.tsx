import { type Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutSelector from "~/components/layout/layoutSelector";
import { AuthProvider } from "~/lib/authProvider";
import { RolePermissionsWrapper } from "~/lib/rolePermissionsWrapper";
import { getServerAuthSession } from "~/server/auth";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SGE - Strategis",
  description: "Sistema de Gerenciamento de Estoque - Strategis",
  icons: [{ rel: "icon", url: "/logo-circ.png" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} flex min-h-screen overflow-x-hidden bg-fundo_branco font-sans`}
      >
        <TRPCReactProvider>
          <LayoutSelector session={session}>{children}</LayoutSelector>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
