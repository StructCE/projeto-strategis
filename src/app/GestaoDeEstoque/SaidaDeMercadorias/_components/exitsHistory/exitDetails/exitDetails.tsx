"use client";
import { TableComponent } from "~/components/table";
import { Separator } from "~/components/ui/separator";
import { type Exit } from "../../exitsData";

type ExitType = {
  exit: Exit;
};

export const ExitDetails = (props: ExitType) => {
  return (
    <TableComponent>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[100px_1fr_100px_100px_10px_130px_130px] items-center justify-center gap-10">
          <TableComponent.ValueTitle className="text-center">
            Código
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Produto</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Estoque Atual
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Estoque Mínimo
          </TableComponent.ValueTitle>

          <Separator orientation="vertical" className="bg-black" />

          <TableComponent.ValueTitle className="text-center">
            Quantidade Solicitada
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Quantidade Confirmada
          </TableComponent.ValueTitle>
        </TableComponent.LineTitle>

        {props.exit.products.map((product, index) => (
          <TableComponent.Line
            className={`grid-cols-[100px_1fr_100px_100px_10px_130px_130px] gap-10 ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value className="text-center">
              {product.code}
            </TableComponent.Value>
            <TableComponent.Value>{product.name}</TableComponent.Value>
            <TableComponent.Value className="text-center">
              {product.stock_current}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {product.stock_min}
            </TableComponent.Value>

            <Separator orientation="vertical" className="bg-black" />

            <TableComponent.Value className="text-center">
              {product.requested_quantity}
            </TableComponent.Value>

            <TableComponent.Value className="text-center">
              {Number(product.released_quantity)}
            </TableComponent.Value>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
