import "~/styles/globals.css";
import { Inter } from "next/font/google";

import { type Metadata } from "next";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} min-h-screen w-screen overflow-x-hidden font-sans`}
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
