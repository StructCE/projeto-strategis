import { ExternalLink } from "lucide-react";
import React from "react";
import { TableButtonComponent } from "~/components/tableButton";
import { HistoryEntryTable } from "./_components/manageEntry/historyEntryTable";
import ManageEntry from "./_components/manageEntry/manageEntry";

export default function TelaEntrada() {
  return (
    <div className="flex flex-col gap-2">
      <ManageEntry />

      <TableButtonComponent className="mb-2 border-y-[1px] border-cinza_mais_escuro_botao/20 py-1.5 sm:py-3">
        <TableButtonComponent.Link
          link_ref="/GestaoDeEstoque/EntradaDeMercadorias/GerarEntradaManualmente"
          className="hover:bg-hover_vermelho_botao bg-vermelho_botao_1"
          placeholder="Gerar Entrada Manualmente"
        >
          <ExternalLink
            className="flex h-full cursor-pointer self-center"
            size={20}
            strokeWidth={2.2}
            color="white"
          />
        </TableButtonComponent.Link>
      </TableButtonComponent>

      <HistoryEntryTable />
    </div>
  );
}
