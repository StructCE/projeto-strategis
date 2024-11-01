"use client";
import { Accordion } from "~/components/ui/accordion";
// import AccountPlans from "./_components/Payments/AccountPlans";
// import Banks from "./_components/Payments/Banks";
// import DocumentTypes from "./_components/Payments/DocumentTypes";
// import Groups from "./_components/Payments/Groups";
// import Projects from "./_components/Payments/Projects";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { api } from "~/trpc/react";
import ProductCategories from "./_components/Products/ProductCategories";
import Reasons from "./_components/Products/Reasons";
import SectorsOfUse from "./_components/Products/SectorsOfUse";
import TypesOfControl from "./_components/Products/TypeOfControl";
import Units from "./_components/Products/Units";
import Shelves from "./_components/Stocks/Shelves";
import Storages from "./_components/Stocks/Storages";

export default function GeneralParametersRegister() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const { data: user } = api.user.getUserById.useQuery({
    id: session?.user.id,
  });

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
    <div className="flex w-full flex-col bg-fundo_branco">
      <h1 className="text-[32px] font-medium">Parâmetros Gerais de Estoques</h1>
      <Accordion type="single" collapsible>
        <Storages />
        <Shelves />

        {user?.UserRole.some(
          (userRole) => userRole.role.name === "Administrador",
        ) ? (
          <div>
            <h1 className="mt-10 text-[32px] font-medium">
              Parâmetros Gerais de Produtos
            </h1>
            <TypesOfControl />
            <ProductCategories />
            <SectorsOfUse />
            <Units />
            <Reasons />

            {/* <h1 className="mt-8 text-[32px] font-medium">
              Parâmetros Gerais de Pagamentos
            </h1>
            <DocumentTypes />
            <AccountPlans />
            <Projects />
            <Banks />
            <Groups /> */}
          </div>
        ) : (
          <></>
        )}
      </Accordion>
    </div>
  );
}
