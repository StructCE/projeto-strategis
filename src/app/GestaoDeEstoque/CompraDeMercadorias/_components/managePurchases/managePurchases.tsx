"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Calendar, Download, Eraser, Truck, UserCog2 } from "lucide-react";
import { useSession } from "next-auth/react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useCompany } from "~/lib/companyProvider";
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
  const [selectSupplier, setSelectSupplier] = useState("");

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
    : user?.UserRole[0]?.company.name;

  const { data: orders = [], error, isLoading } = api.order.getAll.useQuery();

  const filteredOrders = orders.filter((order) => {
    const matchesDate =
      !date ||
      (order.date.getDate() === date.getDate() &&
        order.date.getMonth() === date.getMonth() + 1 &&
        order.date.getFullYear() === date.getFullYear());

    const matchesResponsible =
      inputResponsible === "" ||
      order.responsible.name
        .toLowerCase()
        .includes(inputResponsible.toLowerCase());
    const matchesSupplier =
      selectSupplier === "" ||
      order.orderProducts.some(
        (product) => selectSupplier == product.ProductSupplier.supplier.name,
      );
    const matchesCompany =
      !companyFilter || order.responsible.company === companyFilter;

    return (
      matchesDate && matchesResponsible && matchesSupplier && matchesCompany
    );
  });

  const { data: suppliers = [] } = api.supplier.getAll.useQuery();

  function orderData(order: SerializedOrder) {
    const purchaseData = {
      date: order.date,
      company: order.responsible.company,
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

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="flex h-full cursor-pointer self-center">
              <Eraser
                size={20}
                onClick={() => {
                  setDate(undefined);
                  setInputResponsible("");
                  setSelectSupplier("");
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
          filteredOrders.length > 0 ? (
            filteredOrders
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
                      className="max-h-[90vh] max-w-7xl overflow-x-auto overflow-y-auto p-3 pb-5 pt-10 sm:p-6"
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
