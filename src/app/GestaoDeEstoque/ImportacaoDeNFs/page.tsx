"use client";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import ImportacaoDeNFs from "./_components/importInvoices";

export default function ImportInvoices() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !session?.user.allowedPagesPath.some((allowedPath) =>
        pathname.startsWith(allowedPath),
      )
    ) {
      redirect("/");
    }
  }, [session, status, pathname]);

  if (status === "loading") return null;

  return <ImportacaoDeNFs />;
}
