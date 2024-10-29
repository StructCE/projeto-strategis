"use client";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { ProductRegister } from "./_components/createProducts/productRegister";
import ManageProductsTable from "./_components/manageProducts/manageProducts";

export default function ProductsRegister() {
  const session = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (!session.data?.user.allowedPagesPath.includes(pathname)) {
      redirect("/");
    }
  }, [session, pathname]);

  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <ProductRegister />
      <ManageProductsTable />
    </div>
  );
}
