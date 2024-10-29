"use client";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { CompanyRegister } from "./_components/createCompany/companyRegister";
import { ManageCompaniesTable } from "./_components/manageCompanies/manageCompanies";

export default function CompanyRegistration() {
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

  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <CompanyRegister />
      <ManageCompaniesTable />
    </div>
  );
}
