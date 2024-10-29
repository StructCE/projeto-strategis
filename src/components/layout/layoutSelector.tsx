"use client";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import Navbar from "~/components/navbar/navbar";
import ResponsiveNavbar from "~/components/navbar/responsiveNavbar";
import SidebarContainer from "~/components/sidebar";
import { CompanyProvider } from "~/lib/companyProvider";

export default function LayoutSelector({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: Session | null }>) {
  const pathname = usePathname();

  if (!session && pathname !== "/login") {
    redirect("/login");
  }

  // Verifica se a rota é "/login" para usar um layout diferente
  if (pathname === "/login" || pathname === "/login2") {
    return <div>{children}</div>;
  }

  return (
    <SessionProvider>
      <CompanyProvider>
        <SidebarContainer />
        <div className="ml-0 flex min-h-screen w-full flex-col overflow-x-hidden xl:ml-[330px]">
          <div className="hidden xl:block">
            <Navbar session={session} />
          </div>
          <div className="block xl:hidden">
            <ResponsiveNavbar session={session} />
          </div>
          <div className="w-full p-4 sm:p-6 lg:p-8">{children}</div>
        </div>
      </CompanyProvider>
    </SessionProvider>
  );
}
