"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Calendar, Download, Eraser, Search, UserCog2 } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { MultiSelect } from "~/components/ui/multi-select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { type SerializedOrder } from "~/server/interfaces/order/order.route.interfaces";
import { api } from "~/trpc/react";
import CustomReportPDF from "./pdfReport";
import { default as PurchaseDetails } from "./purchaseDetails/purchaseDetailsTable";
import { DeleteOrder } from "./useDeleteOrder";
import { EditOrder } from "./useEditOrder";

export default function ManagePurchasesTable() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [inputResponsible, setInputResponsible] = useState("");
  const [selectSuppliers, setSelectSuppliers] = useState<string[]>([]);

  const {
    data: orders = [],
    error,
    isLoading,
  } = api.order.getAll.useQuery({
    filters: {
      date: date,
      responsibleName: inputResponsible,
      suppliers: selectSuppliers,
    },
  });
  const { data: suppliers = [] } = api.supplier.getAll.useQuery();

  // function exportData(order: SerializedOrder) {
  //   const purchaseData = {
  //     date: order.date,
  //     responsible: order.responsible.name,
  //     orderProducts: order.orderProducts.map((product) => ({
  //       code: product.code,
  //       name: product.name,
  //       unit: product.unit,
  //       currentStock: product.currentStock,
  //       minimunStock: product.minimunStock,
  //       purchaseQuantity: product.purchaseQuantity,
  //       ProductSupplier: product.ProductSupplier,
  //       shelf: product.shelf,
  //     })),
  //   };

  //   const doc = new jsPDF();

  //   doc.setFont("helvetica", "bold");
  //   doc.setFontSize(16);
  //   doc.text(
  //     `Pedido de Compra - ${new Date(purchaseData.date).toLocaleDateString()}`,
  //     14,
  //     20,
  //   );

  //   doc.setFontSize(12);
  //   let yPosition = 25;
  //   const lineHeight = 5.5; // Altura entre as linhas de texto
  //   const pageHeight = 280; // Limite de altura da página

  //   function addKeyValuePair(
  //     key: string,
  //     value: string | number,
  //     x1: number,
  //     x2: number,
  //     y: number,
  //   ) {
  //     doc.setFont("helvetica", "bold");
  //     doc.text(`${key}:`, x1, y); // Chave
  //     doc.setFont("helvetica", "normal");

  //     const splitText: string[] = doc.splitTextToSize(
  //       `${value}`,
  //       120,
  //     ) as string[];
  //     doc.text(splitText, x2, y);

  //     return splitText.length * lineHeight;
  //   }

  //   yPosition += addKeyValuePair(
  //     "Responsável",
  //     order.responsible.name,
  //     14,
  //     70,
  //     (yPosition += lineHeight),
  //   );
  //   yPosition += 5;

  //   purchaseData.orderProducts.forEach((product) => {
  //     const productHeight = 12 * lineHeight + 14;

  //     if (yPosition + productHeight > pageHeight) {
  //       doc.addPage();
  //       yPosition = 14;
  //     }

  //     yPosition += addKeyValuePair(
  //       "Código",
  //       product.code,
  //       14,
  //       70,
  //       (yPosition += lineHeight),
  //     );
  //     yPosition += addKeyValuePair(
  //       "Nome",
  //       product.name,
  //       14,
  //       70,
  //       (yPosition += lineHeight),
  //     );
  //     yPosition += addKeyValuePair(
  //       "Unidade de Compra",
  //       `${product.unit.name} (${product.unit.abbreviation}) - ${product.unit.unitsPerPack}`,
  //       14,
  //       70,
  //       (yPosition += lineHeight),
  //     );
  //     yPosition += addKeyValuePair(
  //       "Estoque Atual",
  //       product.currentStock,
  //       14,
  //       70,
  //       (yPosition += lineHeight),
  //     );
  //     yPosition += addKeyValuePair(
  //       "Estoque Mínimo",
  //       product.minimunStock,
  //       14,
  //       70,
  //       (yPosition += lineHeight),
  //     );

  //     yPosition += addKeyValuePair(
  //       "Quantidade a Comprar",
  //       product.purchaseQuantity,
  //       14,
  //       70,
  //       (yPosition += lineHeight),
  //     );
  //     yPosition += addKeyValuePair(
  //       "Fornecedor",
  //       product.ProductSupplier.supplier.name,
  //       14,
  //       70,
  //       (yPosition += lineHeight),
  //     );
  //     yPosition += addKeyValuePair(
  //       "Endereço de Estoque",
  //       `${product.shelf.cabinet.StockCabinet.map((stockCabinet) => stockCabinet.stock.name).join()}, ${product.shelf.cabinet.name}, ${product.shelf.name}`,
  //       14,
  //       70,
  //       (yPosition += lineHeight),
  //     );

  //     yPosition += 10;
  //   });

  //   doc.save(`Pedido_Compra_${order.date.toISOString().slice(0, 10)}.pdf`);
  // }

  function orderData(order: SerializedOrder) {
    const purchaseData = {
      date: order.date,
      responsible: order.responsible.name,
      orderProducts: order.orderProducts.map((product) => ({
        code: product.code,
        name: product.name,
        unit: product.unit.abbreviation,
        currentStock: product.currentStock,
        minimunStock: product.minimunStock,
        purchaseQuantity: product.purchaseQuantity,
        ProductSupplier: product.ProductSupplier.supplier.name,
        stock: product.shelf?.cabinet.StockCabinet.map(
          (stockCabinet) => stockCabinet.stock.name,
        ).join(", "),
        cabinet: product.shelf?.cabinet.name,
        shelf: product.shelf?.name,
      })),
    };

    return purchaseData;
  }

  return (
    <TableComponent className="gap-3">
      <TableComponent.Title>
        Histórico de Pedidos de Compra
      </TableComponent.Title>

      <TableComponent.FiltersLine>
        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Calendar className={className} />
            )}
          />
          <Filter.DatePicker
            date={date}
            setDate={setDate}
            open={open}
            setOpen={setOpen}
            placeholder="Data"
          />
        </Filter>

        <Filter className="lg:w-[250px]">
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <UserCog2 className={className} />
            )}
          />
          <Filter.Input
            placeholder="Responsável"
            state={inputResponsible}
            setState={setInputResponsible}
          />
        </Filter>

        <div className="font-inter m-0 flex h-auto w-full gap-[14px] border-0 border-none bg-transparent p-0 text-[16px] font-normal text-black opacity-100 ring-0 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 data-[placeholder]:opacity-50 lg:w-auto">
          <MultiSelect
            FilterIcon={Search}
            options={suppliers.flatMap((supplier) => ({
              label: supplier.name,
              value: supplier.name,
            }))}
            onValueChange={setSelectSuppliers}
            defaultValue={selectSuppliers}
            placeholder="Fornecedores"
            variant="inverted"
            maxCount={2}
            className="font-inter min-h-8 rounded-[12px] border-0 border-none bg-filtro bg-opacity-50 p-0 px-1 text-left text-[16px] font-normal text-black ring-0 hover:bg-filtro hover:bg-opacity-50 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 lg:text-center"
          />
        </div>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="flex h-full cursor-pointer self-center">
              <Eraser
                size={20}
                onClick={() => {
                  setDate(undefined);
                  setInputResponsible("");
                  setSelectSuppliers([]);
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">Limpar filtros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[0.7fr_1.2fr_1.5fr_0.7fr_130px] gap-8">
          <TableComponent.ValueTitle>Data do Pedido</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Responsável pelo Pedido
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Fornecedores</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Produtos
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar pedidos de compra: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Carregando pedidos de compra...
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {orders.length > 0 && !isLoading && !error ? (
          orders.length > 0 ? (
            orders
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((order, index) => (
                <TableComponent.Line
                  className={`grid-cols-[0.7fr_1.2fr_1.5fr_0.7fr_130px] gap-8 ${
                    index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                  }`}
                  key={index}
                >
                  <TableComponent.Value>
                    {`${String(order.date.getDate()).padStart(2, "0")}/${String(order.date.getMonth()).padStart(2, "0")}/${String(order.date.getFullYear()).padStart(2, "0")}`}
                  </TableComponent.Value>
                  <TableComponent.Value>
                    {order.responsible.name}
                  </TableComponent.Value>
                  <TableComponent.Value className="flex">
                    {(() => {
                      const suppliers = Array.from(
                        new Set(
                          order.orderProducts.map(
                            (product) => product.ProductSupplier.supplier.name,
                          ),
                        ),
                      );
                      const displayedSuppliers = suppliers
                        .slice(0, 3)
                        .join(", ");

                      return suppliers.length > 3
                        ? `${displayedSuppliers}...`
                        : displayedSuppliers;
                    })()}
                  </TableComponent.Value>
                  <TableComponent.Value className="text-center">
                    {order.orderProducts.length}
                  </TableComponent.Value>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
                        Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      aria-describedby={undefined}
                      className="max-w-7xl overflow-x-auto p-3 pb-5 pt-10 sm:p-6"
                    >
                      <DialogHeader>
                        <DialogTitle className="w-fit pb-1.5">
                          Informações do Pedido de Compra
                        </DialogTitle>
                        <DialogDescription className="w-fit text-base text-black">
                          <p className="w-fit">
                            <span className="font-semibold">
                              Data do Pedido:
                            </span>{" "}
                            {`${String(order.date.getDate()).padStart(2, "0")}/${String(order.date.getMonth()).padStart(2, "0")}/${String(order.date.getFullYear()).padStart(2, "0")}`}
                          </p>
                          <p className="w-fit">
                            <span className="font-semibold">
                              Responsável pelo Pedido:
                            </span>{" "}
                            {order.responsible.name}
                          </p>
                          <p className="w-fit">
                            <span className="font-semibold">Status:</span>{" "}
                            {order.status ? (
                              <span className="font-normal text-verde_botao">
                                Confirmado
                              </span>
                            ) : (
                              <span className="font-normal text-amarelo_botao">
                                Pendente
                              </span>
                            )}
                          </p>
                          <p className="w-fit font-semibold">Produtos:</p>
                        </DialogDescription>

                        <PurchaseDetails order={order} />

                        <TableButtonComponent className="w-fit justify-between pt-2 sm:pt-4 lg:w-full">
                          <div className="flex gap-3">
                            <DeleteOrder orderId={order.id} />

                            {order.status ? <></> : <EditOrder order={order} />}
                          </div>

                          {/* <TableButtonComponent.Button
                            className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao_1 max-[425px]:w-full"
                            icon={
                              <Download
                                className="flex h-full cursor-pointer self-center"
                                size={20}
                                strokeWidth={2.2}
                                color="white"
                              />
                            }
                            handlePress={() => exportData(order)}
                          >
                            Baixar Relatório
                          </TableButtonComponent.Button> */}

                          <PDFDownloadLink
                            document={
                              <CustomReportPDF
                                purchaseData={orderData(order)}
                              />
                            }
                            fileName={`Relatorio_Personalizado_${new Date().toISOString().slice(0, 10)}.pdf`}
                          >
                            <TableButtonComponent.Button
                              className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao_1 max-[425px]:w-full"
                              icon={
                                <Download
                                  className="flex h-full cursor-pointer self-center"
                                  size={20}
                                  strokeWidth={2.2}
                                  color="white"
                                />
                              }
                            >
                              Exportar Dados em PDF
                            </TableButtonComponent.Button>
                          </PDFDownloadLink>
                        </TableButtonComponent>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableComponent.Line>
              ))
          ) : (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum pedido de compra encontrado com os filtros aplicados
              </TableComponent.Value>
            </TableComponent.Line>
          )
        ) : (
          !isLoading &&
          !error && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum pedido de compra encontrado
              </TableComponent.Value>
            </TableComponent.Line>
          )
        )}
      </TableComponent.Table>
    </TableComponent>
  );
}
