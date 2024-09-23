"use client";

import { Input } from "~/components/ui/input";

import { TableComponent } from "~/components/table";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";

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
  return (
    <div>
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
              <TableComponent.Value>
                {produto.estoque_atual}
              </TableComponent.Value>
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
                  className="w-[100px] border-[1px] border-borda_input bg-white placeholder:text-placeholder_input"
                  placeholder="Quant."
                />
              </TableComponent.Value>
            </TableComponent.Line>
          ))}
        </TableComponent.Table>
      </TableComponent>

      <div className="mt-6 flex w-full items-center justify-end">
        <Button className="bg-vermelho_botao_1 text-white">
          Confirmar Saída
        </Button>
      </div>
    </div>
  );
};
