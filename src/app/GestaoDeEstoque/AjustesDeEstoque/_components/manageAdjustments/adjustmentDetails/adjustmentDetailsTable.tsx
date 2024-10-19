import { TableComponent } from "~/components/table";
import { type SerializedAdjust } from "~/server/interfaces/adjust/adjust.route.interfaces";

type AdjustmentType = {
  adjustment: SerializedAdjust;
};

export default function AdjustmentDetails(props: AdjustmentType) {
  function handleProductDescription(stock: number, adjustment: number) {
    const difference = adjustment - stock;
    if (difference == 0) {
      return "Não foi feito ajuste.";
    } else {
      return `Ajuste realizado -> ${difference}`;
    }
  }

  return (
    <TableComponent className="gap-3 text-left">
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[70px_1fr_100px_100px_1fr_1fr] gap-6 sm:px-3">
          <TableComponent.ValueTitle className="text-center text-[14px] sm:text-base">
            Código
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-[14px] sm:text-base">
            Produto
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-[14px] sm:text-base">
            Estoque Antigo
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-[14px] sm:text-base">
            Estoque Ajustado
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-[14px] sm:text-base">
            Descrição
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-[14px] sm:text-base">
            Motivo
          </TableComponent.ValueTitle>
        </TableComponent.LineTitle>

        {props.adjustment.adjustProducts.map((product, index) => (
          <TableComponent.Line
            className={`min-w-full grid-cols-[70px_1fr_100px_100px_1fr_1fr] gap-6 sm:px-3 ${
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
              {product.oldStock}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
              {product.adjustedStock}
            </TableComponent.Value>
            <TableComponent.Value className="text-[13px] sm:text-[15px]">
              {handleProductDescription(
                product.oldStock,
                product.adjustedStock,
              )}
            </TableComponent.Value>
            <TableComponent.Value className="text-[13px] sm:text-[15px]">
              {product.reason.name ?? "Motivo não informado"}
            </TableComponent.Value>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
}
