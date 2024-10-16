import { TableComponent } from "~/components/table";
import { type SerializedRequest } from "~/server/interfaces/request/request.route.interfaces";

type RequestType = {
  request: SerializedRequest;
};

export default function PendingRequestDetails(props: RequestType) {
  return (
    <TableComponent className="gap-3 text-left">
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[70px_1.5fr_130px_90px_110px] gap-16">
          <TableComponent.ValueTitle className="text-center text-base sm:text-[18px]">
            Código
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-base sm:text-[18px]">
            Produto
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-base leading-5 sm:text-[18px]">
            Quantidade em Estoque
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-base leading-5 sm:text-[18px]">
            Estoque Mínimo
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-base leading-5 sm:text-[18px]">
            Quantidade Requisitada
          </TableComponent.ValueTitle>
        </TableComponent.LineTitle>

        {props.request.requestProducts.map((product, index) => (
          <TableComponent.Line
            className={`grid-cols-[70px_1.5fr_130px_90px_110px] gap-16 ${
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
              {product.currentStock}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
              {product.minimunStock}
            </TableComponent.Value>
            <TableComponent.Value className="px-2 text-center text-[13px] sm:text-[15px]">
              {product.requestedQuantity}
            </TableComponent.Value>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
}
