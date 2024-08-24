import "~/styles/globals.css";

import { type Metadata } from "next";

import SidebarContainer from "~/components/sidebar/sidebarContainer";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "SGE - Strategis",
  description: "Sistema de Gerenciamento de Estoque - Strategis",
  icons: [{ rel: "icon", url: "/logo-circ.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen w-screen overflow-x-hidden bg-fundo_branco">
        <SidebarContainer>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </SidebarContainer>
      </body>
    </html>
  );
}
