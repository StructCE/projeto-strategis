import "~/styles/globals.css";

import { type Metadata } from "next";

import Navbar from "~/components/navbar/navbar";
import ResponsiveNavbar from "~/components/navbar/responsiveNavbar";
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
      <body className="flex min-h-screen overflow-x-hidden bg-fundo_branco">
        <TRPCReactProvider>
          <SidebarContainer />
          <div className="ml-0 flex min-h-screen w-full flex-col overflow-x-hidden sm:ml-[270px] lg:ml-[330px]">
            <div className="hidden sm:block">
              <Navbar />
            </div>
            <div className="block sm:hidden">
              <ResponsiveNavbar />
            </div>
            <div className="p-4 sm:p-6 lg:p-8">{children}</div>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
