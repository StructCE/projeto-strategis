"use client";
import { ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { type Invoice } from "../invoicesData";
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
import SelectInput from "./select";
import { useDetailNFsInputs } from "./useDetailNF";

type NotaFiscalType = {
  invoice: Invoice;
};

// TODO: useStates para armazenar info de cada product (e seus dados)
// TODO: lógica botões de reporte e confirmação
// TODO: lógica validação confirmação

export default function InvoiceDetails(props: NotaFiscalType) {
  const selects = useDetailNFsInputs();

  const calculateInvoiceTotal = (invoice: Invoice): number => {
    return invoice.products.reduce((total, product) => {
      const productTotal = product.buy_quantity * product.value_unit;
      return total + productTotal;
    }, 0);
  };

  return (
    <div>
      <div className="my-1 flex-col">
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

      <h2 className="mb-1 text-[1.5rem] font-medium">Produtos:</h2>

      <Accordion
        type="single"
        collapsible
        className="mx-[1px] w-full p-0 shadow-[0px_0px_4px_0px_#0000004d]"
      >
        {props.invoice.products.map((product, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className={`w-full border-b-[0px] ${index % 2 === 0 ? "bg-[#eaeaea]" : ""}`}
          >
            <AccordionTrigger className="px-2 pb-0 text-[1.2rem] font-semibold">
              #{index + 1} - {product.name}
            </AccordionTrigger>
            <AccordionContent className="w-full">
              <Table>
                <TableBody className="w-full">
                  <TableRow>
                    <div className="grid grid-cols-3">
                      <TableCell>
                        <Label>Nome</Label>
                        {product.name ? (
                          <Input
                            value={product.name}
                            placeholder=""
                            disabled={true}
                          ></Input>
                        ) : (
                          <Input placeholder=""></Input>
                        )}
                      </TableCell>
                      <TableCell>
                        <Label>NCM</Label>
                        {product.ncm ? (
                          <Input
                            value={product.ncm}
                            placeholder=""
                            disabled={true}
                          ></Input>
                        ) : (
                          <Input placeholder=""></Input>
                        )}
                      </TableCell>
                      <TableCell>
                        <Label>CFOP</Label>
                        {product.cfop ? (
                          <Input
                            value={product.cfop}
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
                      <TableCell>
                        <Label>Unidade Compra</Label>
                        {product.buy_unit ? (
                          <Input
                            value={product.buy_unit.description}
                            disabled={true}
                            placeholder=""
                          ></Input>
                        ) : (
                          <Input placeholder=""></Input>
                        )}
                      </TableCell>

                      <TableCell>
                        <Label>Quantidade Compra</Label>
                        {product.buy_quantity ? (
                          <Input
                            value={product.buy_quantity}
                            disabled={true}
                            placeholder=""
                          ></Input>
                        ) : (
                          <Input placeholder=""></Input>
                        )}
                      </TableCell>

                      <TableCell>
                        <Label>Valor Unidade</Label>
                        {product.value_unit ? (
                          <Input
                            value={product.value_unit}
                            disabled={true}
                            placeholder=""
                          ></Input>
                        ) : (
                          <Input placeholder=""></Input>
                        )}
                      </TableCell>

                      <TableCell>
                        <Label>Valor Total</Label>
                        {product.buy_quantity * product.value_unit != 0 ? (
                          <Input
                            value={product.buy_quantity * product.value_unit}
                            disabled={true}
                            placeholder=""
                          ></Input>
                        ) : (
                          <Input placeholder=""></Input>
                        )}
                      </TableCell>
                    </div>
                  </TableRow>

                  {/* <TableRow>
                    <div className="grid grid-cols-2">
                      <TableCell>
                        <Label>Grupo de Despesa</Label>
                        {product.grupo_despesa ? (
                          <Input
                            value={product.grupo_despesa}
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

                      <TableCell>
                        <Label>Tipo de Despesa</Label>
                        {product.tipo_despesa ? (
                          <Input
                            value={product.tipo_despesa}
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
                  </TableRow> */}

                  {/* <TableRow>
                    <div className="grid grid-cols-3">
                      <TableCell>
                        <Label>Setor</Label>
                        {product.setor ? (
                          <Input
                            value={product.setor}
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

                      <TableCell>
                        <Label>Categoria</Label>
                        {product.categoria_produto ? (
                          <Input
                            value={product.categoria_produto}
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

                      <TableCell>
                        <Label>Tipo</Label>
                        {product.tipo_produto ? (
                          <Input
                            value={product.tipo_produto}
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
                  </TableRow> */}

                  <TableRow>
                    <div className="grid grid-cols-3">
                      <TableCell>
                        <Label>Estoque</Label>
                        {product.address.stock ? (
                          <Input
                            value={product.address.stock}
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

                      <TableCell>
                        <Label>Armário/Zona</Label>
                        {product.address.shelf ? (
                          <Input
                            value={product.address.shelf}
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

                      <TableCell>
                        <Label>Prateleira</Label>
                        {product.address.shelf ? (
                          <Input
                            value={product.address.shelf}
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

                  {/* <TableRow className="h-fit">
                    <div className="grid h-40 grid-cols-1">
                      <TableCell>
                        <Label>Descrição</Label>
                        {product.descricao ? (
                          <Input
                            value={product.descricao}
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
                  </TableRow> */}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex justify-end p-2 text-xl font-semibold">
        <p>
          Valor Total: R$
          {calculateInvoiceTotal(props.invoice).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <div className="mt-2 flex items-center justify-center gap-4 font-bold">
        <Button className="bg-vermelho_botao_2 px-4 text-lg font-semibold hover:bg-hover_vermelho_botao_2">
          Reportar Erro
        </Button>
        <Button className="bg-verde_botao px-4 text-lg font-semibold hover:bg-hover_verde_botao">
          Confirmar NF
        </Button>
      </div>
    </div>
  );
}
