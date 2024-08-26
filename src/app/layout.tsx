import "~/styles/globals.css";

import { type Metadata } from "next";

import Navbar from "~/components/navbar";
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
      <body className="relative min-h-screen w-screen overflow-x-hidden">
        <TRPCReactProvider>
          <Navbar />
          <div className="pt-20">{children}</div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
