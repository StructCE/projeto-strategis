import "~/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Strategis",
  description: "Sistema Web Strategis",
  icons: [{ rel: "icon", url: "/logo-circ.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen w-screen overflow-x-hidden">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
