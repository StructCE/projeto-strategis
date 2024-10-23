import React from "react";
import { TableComponent } from "~/components/table";
import { type SerializedRequest } from "~/server/interfaces/request/request.route.interfaces";

type RequestType = {
  request: SerializedRequest;
};

export default function AcceptedRequestDetails(props: RequestType) {
  return (
    <TableComponent className="gap-3 text-left">
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[0.5fr_2fr_1fr_1fr] gap-10">
          <TableComponent.ValueTitle className="text-center text-base sm:text-[18px]">
            Código
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-base sm:text-[18px]">
            Produto
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-base leading-5 sm:text-[18px]">
            Quantidade Requisitada
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-base leading-5 sm:text-[18px]">
            Quantidade Entregue
          </TableComponent.ValueTitle>
        </TableComponent.LineTitle>

        {props.request.requestProducts.map((product, index) => (
          <TableComponent.Line
            className={`grid-cols-[0.5fr_2fr_1fr_1fr] gap-10 ${
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
              {product.requestedQuantity}
            </TableComponent.Value>
            <TableComponent.Value className="text-center text-[13px] sm:text-[15px]">
              {product.releasedQuantity}
            </TableComponent.Value>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>

      <div className="mt-2 flex flex-col">
        <p className="w-fit">
          <span className="font-semibold">Data da Confirmação:</span>{" "}
          {`${String(props.request.statusDate?.getDate()).padStart(2, "0")}/${String(props.request.statusDate?.getMonth()).padStart(2, "0")}/${String(props.request.statusDate?.getFullYear()).padStart(2, "0")}`}
        </p>
        <p className="w-fit">
          <span className="font-semibold">Responsável pela Confirmação:</span>{" "}
          {props.request.statusResponsible}
        </p>
        {props.request.statusDescription != "" ? (
          <p>
            <span className="font-semibold">Descrição:</span>{" "}
            {props.request.statusDescription}
          </p>
        ) : (
          <></>
        )}
      </div>
    </TableComponent>
  );
}
