"use client";

import { ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import {
  estoques,
  grupos_despesa,
  produtos,
  setores_produto,
  tipos_despesa,
  tipos_produto,
  locais,
  armarios,
  prateleiras,
  categorias_produto,
} from "../produtosData";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { useDetailNFsInputs } from "./useDetailNF";
import SelectInput from "./select";
import { Button } from "~/components/ui/button";

type NotaFiscal = {
  numNF: number;
  date: string;
  quantity: string;
  company: string;
  description: string;
};

export default function DetailNF(props: { nf: NotaFiscal }) {
  const restaurantPath = "";
  const supplierPath = "";
  const selects = useDetailNFsInputs();
  const valorTotal = 9999.99;

  return (
    <>
      <h1 className="text-[2rem]">
        Nota Fiscal <b>nº{props.nf.numNF}</b>
      </h1>

      <div className="flex-col border-b-[1px]">
        <a className="flex cursor-pointer items-center gap-2 py-1 hover:underline">
          <ExternalLink className="h-4 w-4" /> Empresa: {restaurantPath}
        </a>
        <a className="flex cursor-pointer items-center gap-2 py-1 hover:underline">
          <ExternalLink className="h-4 w-4" /> Fornecedor: {supplierPath}
        </a>
      </div>

      <div>
        <h2 className="text-[1.5rem] font-medium">PRODUTOS</h2>
        <Accordion type="single" collapsible className="w-full">
          {produtos.map((produto, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={`${index % 2 === 0 ? "bg-cinza_destaque" : "bg-fundo_tabela_destaque"}`}
            >
              <AccordionTrigger className="text-[1.2rem] font-semibold">
                #{index + 1} - {produto.nome}
              </AccordionTrigger>
              <AccordionContent>
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

        <div className="flex justify-start text-xl font-semibold">
          {/* TODO: colocar separação decimal com vírgula */}
          VALOR TOTAL: {valorTotal}
        </div>

        <div className="m-6 flex items-center justify-center gap-4 font-bold">
          <Button className="bg-vermelho_botao_1">REPORTAR ERRO</Button>
          <Button className="bg-verde_botao">CONFIRMAR NF</Button>
        </div>
      </div>
    </>
  );
}
