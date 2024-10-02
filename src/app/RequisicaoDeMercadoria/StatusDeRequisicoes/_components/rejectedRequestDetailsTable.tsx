import React from "react";
import { TableComponent } from "~/components/table";
import { type Request } from "../../RequisicoesDeMercadorias/_components/requestsData";

type RequestType = {
  request: Request;
};

export default function RejectedRequestDetails(props: RequestType) {
  return (
    <TableComponent className="gap-3 text-left">
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[0.5fr_2fr_1fr] gap-10">
          <TableComponent.ValueTitle className="text-center text-base sm:text-[18px]">
            Código
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-base sm:text-[18px]">
            Produto
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-base leading-5 sm:text-[18px]">
            Quantidade Requisitada
          </TableComponent.ValueTitle>
        </TableComponent.LineTitle>

        {props.request.products.map((product, index) => (
          <TableComponent.Line
            className={`grid-cols-[0.5fr_2fr_1fr] gap-10 ${
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
            <TableComponent.Value className="px-2 text-center text-[13px] sm:text-[15px]">
              {product.requested_quantity}
            </TableComponent.Value>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>

      <div className="mt-2 flex flex-col">
        <div className="w-fit">
          <span className="font-semibold">Data da Rejeição:</span>{" "}
          {`${props.request.status_date?.getDate()}/${props.request.status_date?.getMonth()}/${props.request.status_date?.getFullYear()}`}
        </div>
        <div className="w-fit">
          <span className="font-semibold">Responsável pela Rejeição:</span>{" "}
          {props.request.status_responsible}
        </div>
        {props.request.status_description != "" ? (
          <div>
            <span className="font-semibold">Descrição:</span>{" "}
            {props.request.status_description}
          </div>
        ) : (
          <></>
        )}
      </div>
    </TableComponent>
  );
}
