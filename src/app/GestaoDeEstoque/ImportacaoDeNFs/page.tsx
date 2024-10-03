"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  ArrowRight,
  Building2,
  Calendar,
  Eraser,
  ExternalLink,
  FolderCog,
  Search,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { companies } from "~/app/ConfiguracoesGerais/CadastroDeEmpresas/_components/companiesData";
import { suppliers } from "~/app/ConfiguracoesGerais/CadastroDeFornecedores/_components/supplierData";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { default as InvoiceDetails } from "./_components/invoiceDetails/invoiceDetails";
import {
  inputPath,
  type Invoice,
  invoices,
  outputPath,
} from "./_components/invoicesData";

export default function ImportacaoDeNFs() {
  const [selectedTab, setSelectedTab] = useState("pending");

  // Filtros
  const [dateBegin, setDateBegin] = useState<Date | undefined>(undefined);
  const [openDatePickerBegin, setOpenDatePickerBegin] = useState(false);
  const [dateEnd, setDateEnd] = useState<Date | undefined>(undefined);
  const [openDatePickerEnd, setOpenDatePickerEnd] = useState(false);
  const [inputDescription, setInputDescription] = useState("");
  const [selectSupplier, setSelectSupplier] = useState("");
  const [selectCompany, setSelectCompany] = useState("");

  const filteredInvoices = invoices.filter((invoice) => {
    // Filtro de status com base na aba selecionada
    const matchesStatus =
      (selectedTab === "pending" && invoice.confirmed_status === "Pendente") ||
      (selectedTab === "confirmed" &&
        invoice.confirmed_status === "Confirmada") ||
      (selectedTab === "denied" && invoice.confirmed_status === "Rejeitada");

    const adjustedDateBegin = dateBegin
      ? new Date(
          dateBegin.getFullYear(),
          dateBegin.getMonth() + 1,
          dateBegin.getDate(),
        )
      : undefined;
    const adjustedDateEnd = dateEnd
      ? new Date(
          dateEnd.getFullYear(),
          dateEnd.getMonth() + 1,
          dateEnd.getDate(),
          23,
          59,
          59,
        )
      : undefined;

    const matchesDates =
      (!adjustedDateBegin || invoice.date_document >= adjustedDateBegin) &&
      (!adjustedDateEnd || invoice.date_document <= adjustedDateEnd);

    const matchesDescription =
      !inputDescription ||
      invoice.document_number
        .toLowerCase()
        .includes(inputDescription.toLowerCase());

    const matchesSupplier =
      !selectSupplier || invoice.supplier.name === selectSupplier;

    const matchesCompany =
      !selectCompany || invoice.company.name === selectCompany;

    return (
      matchesStatus &&
      matchesDates &&
      matchesDescription &&
      matchesSupplier &&
      matchesCompany
    );
  });

  const calculateInvoiceTotal = (invoice: Invoice): number => {
    return invoice.products.reduce((total, product) => {
      const productTotal = product.purchase_quantity * product.value_unit;
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

  function InvoiceDescription(invoice: Invoice): string {
    const productsString = invoice.products
      .map((product) => capitalizeFirstLetter(product.name))
      .join(",");

    return `VG:${calculateInvoiceTotal(invoice)
      .toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
      .replace(/\s/g, "")}-[${productsString}]`;
  }

  return (
    <div className="flex w-full flex-col gap-2 bg-fundo_branco text-[16px] font-semibold">
      <TableComponent>
        <TableComponent.Title>Importação de Notas Fiscais</TableComponent.Title>
      </TableComponent>

      <div className="my-2 flex flex-col items-center justify-between sm:my-1 md:flex-row">
        <div className="flex-col">
          <button className="flex flex-col items-center gap-2 py-1 sm:flex-row">
            <div className="flex gap-1">
              <FolderCog />
              <p className="font-bold">Origem:</p>
            </div>
            <p className="font-normal hover:underline">{inputPath}</p>
          </button>
          <button className="flex flex-col items-center gap-2 py-1 sm:flex-row">
            <div className="flex gap-1">
              <FolderCog />
              <p className="font-bold">Destino:</p>
            </div>
            <p className="font-normal hover:underline">{outputPath}</p>
          </button>
        </div>

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

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-fill h-fill"
      >
        <TabsList className="mb-3 flex h-fit w-full justify-start gap-1 bg-[#DBDBDB] p-2 sm:gap-4">
          <TabsTrigger
            className="px-1 py-1 text-[14px] sm:px-3 sm:text-[16px]"
            value="pending"
          >
            Pendentes
          </TabsTrigger>
          <TabsTrigger
            className="px-1 py-1 text-[14px] sm:px-3 sm:text-[16px]"
            value="confirmed"
          >
            Confirmadas
          </TabsTrigger>
          <TabsTrigger
            className="px-1 py-1 text-[14px] sm:px-3 sm:text-[16px]"
            value="denied"
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

          <Filter>
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
          </Filter>

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
                    setSelectCompany("");
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

              {filteredInvoices.map((invoice, index) => (
                <TableComponent.Line
                  className={`grid-cols-[130px_100px_2fr_2fr_3fr_130px] gap-8 ${
                    index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                  }`}
                  key={index}
                >
                  <TableComponent.Value className="text-center">
                    nº {invoice.document_number}
                  </TableComponent.Value>
                  <TableComponent.Value className="text-center">
                    {`${invoice.date_document.getDate()}/${invoice.date_document.getMonth()}/${invoice.date_document.getFullYear()}`}
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
                        Nota Fiscal <b>nº{invoice.document_number}</b> <br />
                        Valor Total:{" "}
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
                      </DialogTitle>

                      <InvoiceDetails invoice={invoice} />
                    </DialogContent>
                  </Dialog>
                </TableComponent.Line>
              ))}
            </TableComponent.Table>
          </TableComponent>
        </TabsContent>
      </Tabs>
    </div>
  );
}
