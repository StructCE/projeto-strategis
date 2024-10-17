import { TableComponent } from "~/components/table";
import { SerializedInventory } from "~/server/interfaces/inventory/inventory.route.interfaces";

type InventoryType = {
  inventory: SerializedInventory;
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
    <TableComponent className="gap-3 text-left">
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

        {props.inventory.inventoryProducts.map((product, index) => (
          <TableComponent.Line
            className={`min-w-full grid-cols-[70px_1fr_113px_113px_92px_1fr] gap-8 ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
              {product.code}
            </TableComponent.Value>
            <TableComponent.Value className="text-[13px] sm:text-[15px]">
              {product.product}
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
  );
}
