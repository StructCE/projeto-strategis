"use client";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { StockRegister } from "./_components/createStock/stockRegister";
import { ManageStocksTable } from "./_components/manageStocks/manageStocks";

export default function StocksRegister() {
  const session = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (!session.data?.user.allowedPagesPath.includes(pathname)) {
      redirect("/");
    }
  }, [session, pathname]);

  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <StockRegister />
      <ManageStocksTable />
    </div>
  );
}
