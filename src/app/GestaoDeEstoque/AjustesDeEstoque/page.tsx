import { TableButtonComponent } from "~/components/tableButton";
import ManageAdjustmentsTable from "./_components/manageAdjustments/manageAdjustments";

export default function StockAdjustments() {
  return (
    <div className="flex w-full flex-col bg-fundo_branco">
      <ManageAdjustmentsTable />
      <TableButtonComponent className="pt-2 sm:pt-4">
        <TableButtonComponent.Link
          link_ref="/GestaoDeEstoque/AjustesDeEstoque/CriarAjusteDeEstoque"
          className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao"
        >
          Criar Novo Ajuste de Estoque
        </TableButtonComponent.Link>
      </TableButtonComponent>
    </div>
  );
}
