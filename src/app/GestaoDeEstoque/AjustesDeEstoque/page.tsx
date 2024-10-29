"use client";
import { ExternalLink } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { TableButtonComponent } from "~/components/tableButton";
import ManageAdjustmentsTable from "./_components/manageAdjustments/manageAdjustments";

export default function StockAdjustments() {
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
    <div className="flex w-full flex-col bg-fundo_branco">
      <ManageAdjustmentsTable />
      <TableButtonComponent className="pt-2 sm:pt-4">
        <TableButtonComponent.Link
          link_ref="/GestaoDeEstoque/AjustesDeEstoque/CriarAjusteDeEstoque"
          className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao_1"
          placeholder="Criar Novo Ajuste de Estoque"
        >
          <ExternalLink
            className="flex h-full cursor-pointer self-center"
            size={20}
            strokeWidth={2.2}
            color="white"
          />
        </TableButtonComponent.Link>
      </TableButtonComponent>
    </div>
  );
}
