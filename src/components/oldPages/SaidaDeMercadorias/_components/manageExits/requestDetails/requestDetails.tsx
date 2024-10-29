"use client";
import { useState } from "react";
import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { type Request } from "../../exitsData";

type RequestType = {
  request: Request;
};

export const RequestDetail = (props: RequestType) => {
  const [quantities, setQuantities] = useState<Record<string, string>>({});

  // Função para atualizar a quantidade de um product específico
  const handleQuantityChange = (productCode: string, value: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productCode]: value,
    }));
  };

  // Função para finalizar a requisição
  const handleApproveRequisition = (request: Request) => {
    const exitData = {
      responsible: request.request_responsible,
      date: request.date?.toISOString(),
      products: request.products.map((product) => ({
        code: product.code,
        name: product.name,
        stock_current: product.stock_current,
        requested_quantity: product.requested_quantity,
        released_quantity: Number(quantities[product.code] ?? 0),
      })),
    };

    console.log(JSON.stringify(exitData, null, 2));
  };

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

        {props.request.products.map((product, index) => (
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

            <TableComponent.Value>
              <Input
                type="number"
                value={quantities[product.code] ?? ""}
                onChange={(e) =>
                  handleQuantityChange(product.code, e.target.value)
                }
                className="h-7 bg-cinza_destaque text-center focus-visible:bg-cinza_destaque sm:h-8"
              ></Input>
            </TableComponent.Value>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>

      <TableButtonComponent className="flex w-full items-center justify-end pt-2 sm:pt-4">
        <TableButtonComponent.Button
          className="hover:bg-hover_vermelho_botao bg-vermelho_botao_1"
          handlePress={() => handleApproveRequisition(props.request)}
        >
          Confirmar Saída
        </TableButtonComponent.Button>
      </TableButtonComponent>
    </TableComponent>
  );
};
