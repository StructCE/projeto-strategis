import { ExternalLink } from "lucide-react";
import { TableButtonComponent } from "~/components/tableButton";
import ManageInventoriesTable from "./_components/manageInventories/manageInventories";

export default function StockInventories() {
  return (
    <div className="flex w-full flex-col bg-fundo_branco">
      <ManageInventoriesTable />
      <TableButtonComponent className="pt-2 sm:pt-4">
        <TableButtonComponent.Link
          link_ref="/GestaoDeEstoque/InventariosDeEstoque/CriarInventario"
          className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao"
          placeholder="Criar Novo Inventário"
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
