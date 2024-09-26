import { ExternalLink } from "lucide-react";
import { TableButtonComponent } from "~/components/tableButton";
import ManagePurchasesTable from "./_components/managePurchases/managePurchases";

export default function PurchaseOrders() {
  return (
    <div className="flex w-full flex-col bg-fundo_branco">
      <ManagePurchasesTable />
      <TableButtonComponent className="pt-2 sm:pt-4">
        <TableButtonComponent.Link
          link_ref="/GestaoDeEstoque/CompraDeMercadorias/CriarPedidoDeCompra"
          className="hover:bg-hover_vermelho_botao_1 bg-vermelho_botao_1"
          placeholder="Criar Pedido de Compra"
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
