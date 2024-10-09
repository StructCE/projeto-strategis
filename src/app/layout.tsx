import { type Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutSelector from "~/components/layout/layoutSelector";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import { RolePermissionsWrapper } from "~/lib/rolePermissionsWrapper";
import { AuthProvider } from "~/lib/authProvider";

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
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} flex min-h-screen overflow-x-hidden bg-fundo_branco font-sans`}
      >
        <TRPCReactProvider>
          {/* Use LayoutSelector para alternar entre layouts */}
          <LayoutSelector>{children}</LayoutSelector>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
