"use client";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { SupplierRegister } from "./_components/createSuppliers/supplierRegister";
import { ManageSuppliersTable } from "./_components/manageSuppliers/manageSuppliers";

export default function SuppliersRegister() {
  const session = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (!session.data?.user.allowedPagesPath.includes(pathname)) {
      redirect("/");
    }
  }, [session, pathname]);

  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <SupplierRegister />
      <ManageSuppliersTable />
    </div>
  );
}
