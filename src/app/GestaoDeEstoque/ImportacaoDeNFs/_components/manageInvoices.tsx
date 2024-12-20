"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  ArrowRight,
  // Building2,
  Calendar,
  Eraser,
  ExternalLink,
  Search,
  Truck,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useCompany } from "~/lib/companyProvider";
import { type SerializedInvoice } from "~/server/interfaces/invoice/invoice.route.interfaces";
import { api } from "~/trpc/react";
import { default as InvoiceDetails } from "./invoiceDetails/invoiceDetails";
import ImportInvoice from "./useImportInvoice";

export default function ImportacaoDeNFs() {
  // Filtros
  const [selectedTab, setSelectedTab] = useState("Pendente");
  const [dateBegin, setDateBegin] = useState<Date | undefined>(undefined);
  const [openDatePickerBegin, setOpenDatePickerBegin] = useState(false);
  const [dateEnd, setDateEnd] = useState<Date | undefined>(undefined);
  const [openDatePickerEnd, setOpenDatePickerEnd] = useState(false);
  const [inputDescription, setInputDescription] = useState("");
  const [selectSupplier, setSelectSupplier] = useState("");
  // const [selectCompany, setSelectCompany] = useState("");

  const session = useSession();

  const { data: user } = api.user.getUserById.useQuery({
    id: session?.data?.user.id,
  });

  const { selectedCompany } = useCompany();

  const companyFilter = user?.UserRole.some(
    (userRole) => userRole.role.name === "Administrador",
  )
    ? selectedCompany === "all_companies" || !selectedCompany
      ? undefined
      : selectedCompany
    : user?.UserRole.some((userRole) => userRole.role.name === "Operador")
      ? "all_companies"
      : user?.UserRole[0]?.company.name;

  const {
    data: invoices = [],
    error,
    isLoading,
  } = api.invoice.getAll.useQuery({
    filters: {
      startDocumentDate: dateBegin,
      endDocumentDate: dateEnd,
      supplier: selectSupplier,
      company: companyFilter,
      nfNumber: inputDescription,
      status: selectedTab,
    },
  });
  const { data: suppliers = [] } = api.supplier.getAll.useQuery({
    filters: { company: companyFilter },
  });
  // const { data: companies = [] } = api.company.getAllCompanies.useQuery();

  const calculateInvoiceTotal = (invoice: SerializedInvoice): number => {
    return invoice.invoiceProducts.reduce((total, product) => {
      const productTotal = product.purchaseQuantity * product.unitValue;
      return total + productTotal;
    }, 0);
  };

  function capitalizeFirstLetter(str: string): string {
    return str
      .trim() // Remove espaços em branco no início e no final
      .split(" ") // Divide a string em palavras usando espaço como delimitador
      .filter((word) => word !== "") // Remove quaisquer espaços extras entre as palavras
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza a primeira letra de cada palavra
      .join(""); // Junta as palavras sem espaços
  }

  function InvoiceDescription(invoice: SerializedInvoice): string {
    const productsString = invoice.invoiceProducts
      .map((product) => capitalizeFirstLetter(product.name))
      .join(",");

    // Valor total dos produtos: calculateInvoiceTotal(invoice)
    return `VG:${invoice.invoiceValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace(/\s/g, "")}-[${productsString}]`;
  }

  return (
    <div className="flex w-full flex-col gap-2 bg-fundo_branco text-[16px] font-semibold">
      <TableComponent>
        <TableComponent.Title>Importação de Notas Fiscais</TableComponent.Title>
      </TableComponent>

      <div className="my-1 flex flex-col items-center justify-start gap-1.5 sm:my-2 md:flex-row md:justify-between">
        <div className="flex flex-col gap-1.5">
          <Label className="font-normal">
            Selecione arquivos .XML para importá-los
          </Label>

          {/* Componente para selecionar arquivos, importá-los e criar as invoices */}
          <ImportInvoice />
        </div>

        <div className="flex flex-col gap-2">
          <TableButtonComponent.Link
            link_ref="/GestaoDeEstoque/ImportacaoDeNFs/ImportarNF"
            className="h-fit bg-azul_botao hover:bg-hover_azul_botao"
            placeholder="Adicionar Nota Fiscal Manualmente"
          >
            <ExternalLink
              className="flex h-full cursor-pointer self-center"
              size={20}
              strokeWidth={2.2}
              color="white"
            />
          </TableButtonComponent.Link>
        </div>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-fill h-fill"
      >
        <TabsList className="mb-3 flex h-fit w-full justify-start gap-1.5 bg-[#DBDBDB] p-2 sm:gap-4">
          <TabsTrigger
            className="px-1.5 py-1 text-[14px] sm:px-3 sm:text-[16px]"
            value="Pendente"
          >
            Pendentes
          </TabsTrigger>
          <TabsTrigger
            className="px-1.5 py-1 text-[14px] sm:px-3 sm:text-[16px]"
            value="Confirmada"
          >
            Confirmadas
          </TabsTrigger>
          <TabsTrigger
            className="px-1.5 py-1 text-[14px] sm:px-3 sm:text-[16px]"
            value="Rejeitada"
          >
            Rejeitadas
          </TabsTrigger>
        </TabsList>

        <TableComponent.FiltersLine className="my-1">
          <Filter className="gap-1.5">
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Calendar className={className} />
              )}
            />
            <Filter.DatePicker
              date={dateBegin}
              setDate={setDateBegin}
              open={openDatePickerBegin}
              setOpen={setOpenDatePickerBegin}
              placeholder="Data Inicial"
            />
            <Filter.Icon
              className="mx-2.5"
              icon={({ className }: { className: string }) => (
                <ArrowRight className={className} />
              )}
            />
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Calendar className={className} />
              )}
            />
            <Filter.DatePicker
              date={dateEnd}
              setDate={setDateEnd}
              open={openDatePickerEnd}
              setOpen={setOpenDatePickerEnd}
              placeholder="Data Final"
            />
          </Filter>

          {/* <Filter>
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Building2 className={className} />
              )}
            />
            <Filter.Select
              placeholder="Empresa"
              state={selectCompany}
              setState={setSelectCompany}
            >
              {companies.map((company, index) => (
                <Filter.SelectItems
                  value={company.name}
                  key={index}
                ></Filter.SelectItems>
              ))}
            </Filter.Select>
          </Filter> */}

          <Filter>
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Truck className={className} />
              )}
            />
            <Filter.Select
              placeholder="Fornecedor"
              state={selectSupplier}
              setState={setSelectSupplier}
            >
              {suppliers.map((supplier, index) => (
                <Filter.SelectItems
                  value={supplier.name}
                  key={index}
                ></Filter.SelectItems>
              ))}
            </Filter.Select>
          </Filter>

          <Filter>
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Search className={className} />
              )}
            />
            <Filter.Input
              placeholder="Nº da Nota Fiscal"
              state={inputDescription}
              setState={setInputDescription}
            />
          </Filter>

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger className="flex h-full cursor-pointer self-center">
                <Eraser
                  size={20}
                  onClick={() => {
                    setDateBegin(undefined);
                    setDateEnd(undefined);
                    setInputDescription("");
                    setSelectSupplier("");
                    // setSelectCompany("");
                  }}
                />
              </TooltipTrigger>
              <TooltipContent side="right">Limpar filtros</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableComponent.FiltersLine>

        <TabsContent value={selectedTab}>
          <TableComponent>
            <TableComponent.Table>
              <TableComponent.LineTitle className="grid-cols-[130px_100px_2fr_2fr_3fr_130px] gap-8">
                <TableComponent.ValueTitle className="text-center">
                  Nº da NF
                </TableComponent.ValueTitle>
                <TableComponent.ValueTitle className="text-center">
                  Data de <br /> Emissão
                </TableComponent.ValueTitle>
                <TableComponent.ValueTitle>Empresa</TableComponent.ValueTitle>
                <TableComponent.ValueTitle>
                  Fornecedor
                </TableComponent.ValueTitle>
                <TableComponent.ValueTitle>Descrição</TableComponent.ValueTitle>
                <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
              </TableComponent.LineTitle>

              {error && (
                <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
                  <TableComponent.Value>
                    Erro ao mostrar notas fiscais: {error.message}
                  </TableComponent.Value>
                </TableComponent.Line>
              )}
              {isLoading && (
                <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
                  <TableComponent.Value>
                    Carregando notas fiscais...
                  </TableComponent.Value>
                </TableComponent.Line>
              )}
              {invoices.length > 0 && !isLoading && !error ? (
                invoices.length > 0 ? (
                  invoices
                    .sort(
                      (a, b) =>
                        b.documentDate.getTime() - a.documentDate.getTime(),
                    )
                    .map((invoice, index) => (
                      <TableComponent.Line
                        className={`grid-cols-[130px_100px_2fr_2fr_3fr_130px] gap-8 ${
                          index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                        }`}
                        key={index}
                      >
                        <TableComponent.Value className="text-center">
                          nº {invoice.documentNumber}
                        </TableComponent.Value>
                        <TableComponent.Value className="text-center">
                          {`${String(invoice.documentDate.getDate()).padStart(2, "0")}/${String(invoice.documentDate.getMonth()).padStart(2, "0")}/${String(invoice.documentDate.getFullYear()).padStart(2, "0")}`}
                        </TableComponent.Value>
                        <TableComponent.Value>
                          {invoice.company.name}
                        </TableComponent.Value>
                        <TableComponent.Value>
                          {invoice.supplier.name}
                        </TableComponent.Value>
                        <TableComponent.Value>
                          {InvoiceDescription(invoice)}
                        </TableComponent.Value>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
                              Detalhes
                            </Button>
                          </DialogTrigger>
                          <DialogContent
                            aria-describedby={undefined}
                            className="max-h-[90vh] gap-0 overflow-y-auto sm:max-w-[90rem]"
                          >
                            <DialogTitle className="text-[1.5rem]">
                              Nota Fiscal <b>nº{invoice.documentNumber}</b>{" "}
                              <br />
                              Valor Total dos Produtos:{" "}
                              <b>
                                R$
                                {calculateInvoiceTotal(invoice).toLocaleString(
                                  "pt-BR",
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  },
                                )}
                              </b>
                              <br />
                              Valor Total da Nota:{" "}
                              <b>
                                R$
                                {invoice.invoiceValue.toLocaleString("pt-BR", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </b>
                            </DialogTitle>

                            <InvoiceDetails invoice={invoice} />
                          </DialogContent>
                        </Dialog>
                      </TableComponent.Line>
                    ))
                ) : (
                  <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
                    <TableComponent.Value>
                      Nenhuma nota fiscal encontrada com os filtros aplicados
                    </TableComponent.Value>
                  </TableComponent.Line>
                )
              ) : (
                !isLoading &&
                !error && (
                  <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
                    <TableComponent.Value>
                      Nenhuma nota fiscal encontrada
                    </TableComponent.Value>
                  </TableComponent.Line>
                )
              )}
            </TableComponent.Table>
          </TableComponent>
        </TabsContent>
      </Tabs>
    </div>
  );
}
