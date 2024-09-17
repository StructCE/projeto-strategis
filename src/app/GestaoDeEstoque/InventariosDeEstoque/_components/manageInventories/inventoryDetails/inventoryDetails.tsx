import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
import { type Inventory } from "../../inventoriesData";

type InventoryType = {
  inventory: Inventory;
};

export default function InventoryDetails(props: InventoryType) {
  function handleProductDescription(stock: number, inventory: number) {
    const difference = inventory - stock;
    if (difference == 0) {
      return "Estoque bateu, não é necessário ajuste.";
    } else {
      return "Ajuste de estoque necessário.";
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <p>
        <span className="font-semibold">Data do Inventário:</span>{" "}
        {props.inventory.date}
      </p>
      <p>
        <span className="font-semibold">Responsável pelo Inventário:</span>{" "}
        {props.inventory.responsible}
      </p>
      <p className="font-semibold">Contagem:</p>

      <TableComponent className="gap-3">
        <TableComponent.Table>
          <TableComponent.LineTitle className="grid-cols-[70px_1fr_113px_113px_92px_1fr] gap-8">
            <TableComponent.ValueTitle className="text-center text-[14px] sm:text-base">
              Código
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-[14px] sm:text-base">
              Produto
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-center text-[14px] sm:text-base">
              Quantidade em Estoque
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-center text-[14px] sm:text-base">
              Quantidade em Inventário
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-center text-[14px] sm:text-base">
              Diferença
            </TableComponent.ValueTitle>
            <TableComponent.ValueTitle className="text-[14px] sm:text-base">
              Descrição
            </TableComponent.ValueTitle>
          </TableComponent.LineTitle>
          {props.inventory.products.map((product, index) => (
            <TableComponent.Line
              className={`grid-cols-[70px_1fr_113px_113px_92px_1fr] gap-8 ${
                index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
              }`}
              key={index}
            >
              <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
                {product.code}
              </TableComponent.Value>
              <TableComponent.Value className="text-[13px] sm:text-[15px]">
                {product.name}
              </TableComponent.Value>
              <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
                {product.stockQuantity}
              </TableComponent.Value>
              <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
                {product.inventoryQuantity}
              </TableComponent.Value>
              <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
                {product.inventoryQuantity - product.stockQuantity}
              </TableComponent.Value>
              <TableComponent.Value className="text-[13px] sm:text-[15px]">
                {handleProductDescription(
                  product.stockQuantity,
                  product.inventoryQuantity,
                )}
              </TableComponent.Value>
            </TableComponent.Line>
          ))}
        </TableComponent.Table>
      </TableComponent>

      <TableButtonComponent className="pt-2 sm:pt-4">
        <TableButtonComponent.Button className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao">
          Realizar Ajuste de Estoque Automático
        </TableButtonComponent.Button>
      </TableButtonComponent>
    </div>
  );
}
