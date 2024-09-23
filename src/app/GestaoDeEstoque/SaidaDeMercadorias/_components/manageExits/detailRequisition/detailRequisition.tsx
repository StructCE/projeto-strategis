"use client";
import { useState } from "react";

import { Input } from "~/components/ui/input";

import { TableComponent } from "~/components/table";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { TableButtonComponent } from "~/components/tableButton";

type Produto = {
  codigo: number;
  nome: string;
  unidade: string;
  estoque_atual: number;
  estoque_min: number;
  estoque_max: number;
};

type Requisicao = {
  data: string;
  requisitante: string;
  descricao: string;
  produtos: Produto[];
  quant_solicitada_unidade: number;
  quant_solicitada_fardo: number;
};

export const DetailRequisition = (props: { requisition: Requisicao }) => {
  const [quantities, setQuantities] = useState<Record<string, string>>({});

  // Função para atualizar a quantidade de um produto específico
  const handleQuantityChange = (productCode: string, value: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productCode]: value,
    }));
  };

  // Função para finalizar o inventário
  const handleApproveRequisition = (req: Requisicao) => {
    // TODO
    return undefined;
  };

  return (
    <TableComponent>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[repeat(9,_1fr)]">
          <TableComponent.ValueTitle>Código</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Produto</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Unidade</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Estoque Atual (unidade)
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Estoque Mín.</TableComponent.ValueTitle>

          <Separator orientation="vertical" className="bg-black" />

          <TableComponent.ValueTitle>
            Quantidade Solicitada (unidade)
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Quantidade Solicitada (fardo)
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Quantidade Confirmada
          </TableComponent.ValueTitle>
        </TableComponent.LineTitle>

        {props.requisition.produtos.map((produto, index) => (
          <TableComponent.Line
            className={`grid-cols-[repeat(9,_1fr)] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{produto.codigo}</TableComponent.Value>
            <TableComponent.Value>{produto.nome}</TableComponent.Value>
            <TableComponent.Value>{produto.unidade}</TableComponent.Value>
            <TableComponent.Value>{produto.estoque_atual}</TableComponent.Value>
            {/* <TableComponent.Value>{produto.estoque_max}</TableComponent.Value> */}
            <TableComponent.Value>{produto.estoque_min}</TableComponent.Value>

            <Separator orientation="vertical" className="bg-black" />

            <TableComponent.Value>
              {props.requisition.quant_solicitada_unidade}
            </TableComponent.Value>
            <TableComponent.Value>
              {props.requisition.quant_solicitada_fardo}
            </TableComponent.Value>

            <TableComponent.Value>
              <Input
                type="number"
                value={quantities[produto.codigo] ?? ""}
                onChange={(e) =>
                  handleQuantityChange(String(produto.codigo), e.target.value)
                }
                className="w-[100px] border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
              ></Input>
            </TableComponent.Value>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>

      <TableButtonComponent className="justify-endpt-2 mt-6 flex w-full items-center sm:pt-4">
        <TableButtonComponent.Button
          className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao"
          handlePress={handleApproveRequisition(props.requisition)}
        >
          Confirmar Saída
        </TableButtonComponent.Button>
      </TableButtonComponent>
    </TableComponent>
  );
};
