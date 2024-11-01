import { TableComponent } from "~/components/table";
import { type SerializedRequest } from "~/server/interfaces/request/request.route.interfaces";

type RequestType = {
  request: SerializedRequest;
};

export default function AcceptedRequestDetails(props: RequestType) {
  return (
    <TableComponent className="gap-3 text-left">
      <TableComponent.Table>
        <TableComponent.LineTitle className="min-w-[300px] grid-cols-[0.5fr_1fr_0.6fr_0.6fr] gap-4 px-[4px] sm:min-w-[1200px] sm:gap-10">
          <TableComponent.ValueTitle className="text-center text-sm sm:text-[18px]">
            Código
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-sm sm:text-[18px]">
            Produto
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="hidden text-center text-sm leading-5 sm:block sm:text-[18px]">
            Quantidade Requisitada
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="block text-center text-sm leading-5 sm:hidden sm:text-[18px]">
            Quant <br /> Req.
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="hidden text-center text-sm leading-5 sm:block sm:text-[18px]">
            Quantidade Entregue
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="block text-center text-sm leading-5 sm:hidden sm:text-[18px]">
            Quant <br /> Entrg.
          </TableComponent.ValueTitle>
        </TableComponent.LineTitle>

        {props.request.requestProducts.map((product, index) => (
          <TableComponent.Line
            className={`min-w-[300px] grid-cols-[0.5fr_1fr_0.6fr_0.6fr] gap-4 px-[4px] sm:min-w-[1200px] sm:gap-10 ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value className="text-center text-[12px] sm:text-[15px]">
              {product.code}
            </TableComponent.Value>
            <TableComponent.Value className="text-[12px] sm:text-[15px]">
              {product.name}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[12px] sm:text-[15px]">
              {product.requestedQuantity}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[12px] sm:text-[15px]">
              {product.releasedQuantity}
            </TableComponent.Value>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
}
