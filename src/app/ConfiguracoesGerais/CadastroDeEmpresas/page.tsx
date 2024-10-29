"use client";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { CompanyRegister } from "./_components/createCompany/companyRegister";
import { ManageCompaniesTable } from "./_components/manageCompanies/manageCompanies";

export default function CompanyRegistration() {
  const session = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (!session.data?.user.allowedPagesPath.includes(pathname)) {
      redirect("/");
    }
  }, [session, pathname]);

  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <CompanyRegister />
      <ManageCompaniesTable />
    </div>
  );
}
