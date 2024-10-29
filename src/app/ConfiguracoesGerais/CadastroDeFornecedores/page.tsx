"use client";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { SupplierRegister } from "./_components/createSuppliers/supplierRegister";
import { ManageSuppliersTable } from "./_components/manageSuppliers/manageSuppliers";

export default function SuppliersRegister() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !session?.user.allowedPagesPath.includes(pathname)
    ) {
      redirect("/");
    }
  }, [session, status, pathname]);

  if (status === "loading") return null;

  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <SupplierRegister />
      <ManageSuppliersTable />
    </div>
  );
}
