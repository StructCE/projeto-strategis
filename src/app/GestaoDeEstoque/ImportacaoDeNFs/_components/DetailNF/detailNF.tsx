"use client";

import { ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import {
  armarios,
  categorias_produto,
  estoques,
  grupos_despesa,
  locais,
  prateleiras,
  produtos,
  setores_produto,
  tipos_despesa,
  tipos_produto,
} from "../produtosData";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { type Invoice } from "../invoicesData";
import SelectInput from "./select";
import { useDetailNFsInputs } from "./useDetailNF";

type NotaFiscalType = {
  invoice: Invoice;
};

// TODO: useStates para armazenar info de cada produto (e seus dados)
// TODO: lógica botões de reporte e confirmação
// TODO: lógica validação confirmação

export default function DetailNF(props: NotaFiscalType) {
  const selects = useDetailNFsInputs();
  const valorTotal = 9999.99;

  return (
    <>
      <h1 className="text-[1.5rem]">
        Nota Fiscal <b>nº{props.invoice.document_number}</b>
      </h1>

      <div className="flex-col">
        <button className="flex items-center gap-2 py-1">
          <ExternalLink />
          <p className="font-bold">Empresa:</p>
          <p className="hover:underline">{props.invoice.company.name}</p>
        </button>
        <button className="flex items-center gap-2 py-1">
          <ExternalLink />
          <p className="font-bold">Fornecedor:</p>
          <p className="hover:underline">{props.invoice.supplier.name}</p>
        </button>
      </div>

      <Separator />
      <div>
        <h2 className="text-[1.5rem] font-medium">PRODUTOS</h2>

        <Accordion type="single" collapsible className="w-full">
          {produtos.map((produto, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={`w-full p-0 ${index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""}`}
            >
              <AccordionTrigger className="text-[1.2rem] font-semibold">
                #{index + 1} - {produto.nome}
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <Table className="">
                  <TableBody className="w-full">
                    <TableRow>
                      <div className="grid grid-cols-3">
                        <TableCell className="">
                          <Label>Nome</Label>
                          {produto.nome ? (
                            <Input
                              value={produto.nome}
                              placeholder=""
                              disabled={true}
                            ></Input>
                          ) : (
                            <Input placeholder=""></Input>
                          )}
                        </TableCell>
                        <TableCell className="">
                          <Label>NCM</Label>
                          {produto.ncm ? (
                            <Input
                              value={produto.ncm}
                              placeholder=""
                              disabled={true}
                            ></Input>
                          ) : (
                            <Input placeholder=""></Input>
                          )}
                        </TableCell>
                        <TableCell className="">
                          <Label>CFOP</Label>
                          {produto.cfop ? (
                            <Input
                              value={produto.cfop}
                              placeholder=""
                              disabled={true}
                            ></Input>
                          ) : (
                            <Input placeholder=""></Input>
                          )}
                        </TableCell>
                      </div>
                    </TableRow>

                    <TableRow>
                      <div className="grid grid-cols-4">
                        <TableCell className="">
                          <Label>Unidade Compra</Label>
                          {produto.unidade_compra ? (
                            <Input
                              value={produto.unidade_compra}
                              disabled={true}
                              placeholder=""
                            ></Input>
                          ) : (
                            <Input placeholder=""></Input>
                          )}
                        </TableCell>

                        <TableCell className="">
                          <Label>Quantidade Compra</Label>
                          {produto.quantidade_compra ? (
                            <Input
                              value={produto.quantidade_compra}
                              disabled={true}
                              placeholder=""
                            ></Input>
                          ) : (
                            <Input placeholder=""></Input>
                          )}
                        </TableCell>

                        <TableCell className="">
                          <Label>Valor Unidade</Label>
                          {produto.valor_unidade ? (
                            <Input
                              value={produto.valor_unidade}
                              disabled={true}
                              placeholder=""
                            ></Input>
                          ) : (
                            <Input placeholder=""></Input>
                          )}
                        </TableCell>

                        <TableCell className="">
                          <Label>Valor Total</Label>
                          {produto.valor_total ? (
                            <Input
                              value={produto.valor_total}
                              disabled={true}
                              placeholder=""
                            ></Input>
                          ) : (
                            <Input placeholder=""></Input>
                          )}
                        </TableCell>
                      </div>
                    </TableRow>

                    <TableRow>
                      <div className="grid grid-cols-2">
                        <TableCell className="">
                          <Label>Grupo de Despesa</Label>
                          {produto.grupo_despesa ? (
                            <Input
                              value={produto.grupo_despesa}
                              disabled={true}
                              placeholder=""
                            ></Input>
                          ) : (
                            <SelectInput
                              options={grupos_despesa}
                              useValue={selects.selectedValue}
                              setUseValue={selects.setSelectedValue}
                            />
                          )}
                        </TableCell>

                        <TableCell className="">
                          <Label>Tipo de Despesa</Label>
                          {produto.tipo_despesa ? (
                            <Input
                              value={produto.tipo_despesa}
                              disabled={true}
                              placeholder=""
                            ></Input>
                          ) : (
                            <SelectInput
                              options={tipos_despesa}
                              useValue={selects.selectedValue}
                              setUseValue={selects.setSelectedValue}
                            />
                          )}
                        </TableCell>
                      </div>
                    </TableRow>

                    <TableRow>
                      <div className="grid grid-cols-3">
                        <TableCell className="">
                          <Label>Setor</Label>
                          {produto.setor ? (
                            <Input
                              value={produto.setor}
                              placeholder=""
                              disabled={true}
                            ></Input>
                          ) : (
                            <SelectInput
                              options={setores_produto}
                              useValue={selects.selectedValue}
                              setUseValue={selects.setSelectedValue}
                            />
                          )}
                        </TableCell>

                        <TableCell className="">
                          <Label>Categoria</Label>
                          {produto.categoria_produto ? (
                            <Input
                              value={produto.categoria_produto}
                              disabled={true}
                              placeholder=""
                            ></Input>
                          ) : (
                            <SelectInput
                              options={categorias_produto}
                              useValue={selects.selectedValue}
                              setUseValue={selects.setSelectedValue}
                            />
                          )}
                        </TableCell>

                        <TableCell className="">
                          <Label>Tipo</Label>
                          {produto.tipo_produto ? (
                            <Input
                              value={produto.tipo_produto}
                              disabled={true}
                              placeholder=""
                            ></Input>
                          ) : (
                            <SelectInput
                              options={tipos_produto}
                              useValue={selects.selectedValue}
                              setUseValue={selects.setSelectedValue}
                            />
                          )}
                        </TableCell>
                      </div>
                    </TableRow>

                    <TableRow>
                      <div className="grid grid-cols-4">
                        <TableCell className="">
                          <Label>Estoque</Label>
                          {produto.estoque ? (
                            <Input
                              value={produto.estoque}
                              disabled={true}
                              placeholder=""
                            ></Input>
                          ) : (
                            <SelectInput
                              options={estoques}
                              useValue={selects.selectedValue}
                              setUseValue={selects.setSelectedValue}
                            />
                          )}
                        </TableCell>
                        <TableCell className="">
                          <Label>Local</Label>
                          {produto.local ? (
                            <Input
                              value={produto.local}
                              placeholder=""
                              disabled={true}
                            ></Input>
                          ) : (
                            <SelectInput
                              options={locais}
                              useValue={selects.selectedValue}
                              setUseValue={selects.setSelectedValue}
                            />
                          )}
                        </TableCell>

                        <TableCell className="">
                          <Label>Armário/Zona</Label>
                          {produto.zona ? (
                            <Input
                              value={produto.zona}
                              placeholder=""
                              disabled={true}
                            ></Input>
                          ) : (
                            <SelectInput
                              options={armarios}
                              useValue={selects.selectedValue}
                              setUseValue={selects.setSelectedValue}
                            />
                          )}
                        </TableCell>

                        <TableCell className="">
                          <Label>Prateleira</Label>
                          {produto.prateleira ? (
                            <Input
                              value={produto.prateleira}
                              disabled={true}
                              placeholder=""
                            ></Input>
                          ) : (
                            <SelectInput
                              options={prateleiras}
                              useValue={selects.selectedValue}
                              setUseValue={selects.setSelectedValue}
                            />
                          )}
                        </TableCell>
                      </div>
                    </TableRow>

                    <TableRow className="h-fit">
                      <div className="grid h-40 grid-cols-1">
                        <TableCell className="">
                          <Label>Descrição</Label>
                          {produto.descricao ? (
                            <Input
                              value={produto.descricao}
                              disabled={true}
                              placeholder=""
                            ></Input>
                          ) : (
                            <Input
                              placeholder=""
                              type="text"
                              className="h-[80%] flex-wrap text-start"
                            ></Input>
                          )}
                        </TableCell>
                      </div>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-end p-2 text-xl font-semibold">
          <p>
            VALOR TOTAL: R$
            {valorTotal.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="m-6 flex items-center justify-center gap-4 font-bold">
          <Button className="bg-vermelho_botao_1 px-4 text-lg font-semibold">
            Reportar Erro
          </Button>
          <Button className="bg-verde_botao px-4 text-lg font-semibold">
            Confirmar NF
          </Button>
        </div>
      </div>
    </>
  );
}
