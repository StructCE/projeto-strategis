"use client";
import { Calendar, Download, Eraser, Search, UserCog2 } from "lucide-react";
import { useState } from "react";
import { suppliers } from "~/app/ConfiguracoesGerais/CadastroDeFornecedores/_components/supplierData";
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
import { purchases } from "../purchasesData";
import { default as PurchaseDetails } from "./purchaseDetails/purchaseDetailsTable";

export default function ManagePurchasesTable() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [inputResponsible, setInputResponsible] = useState("");
  const [selectSuppliers, setSelectSuppliers] = useState<string[]>([]);

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesDate =
      !date ||
      (purchase.date.getDate() === date.getDate() &&
        purchase.date.getMonth() === date.getMonth() + 1 &&
        purchase.date.getFullYear() === date.getFullYear());

    const matchesResponsible =
      inputResponsible === "" ||
      purchase.responsible
        .toLowerCase()
        .includes(inputResponsible.toLowerCase());

    const matchesSupplier =
      selectSuppliers.length === 0 ||
      purchase.products.some((product) =>
        selectSuppliers.includes(product.supplier.name),
      );

    return matchesDate && matchesResponsible && matchesSupplier;
  });

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

        <div className="font-inter font-regular m-0 flex h-auto w-full gap-[14px] border-0 border-none bg-transparent p-0 text-[16px] text-black opacity-100 ring-0 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 data-[placeholder]:opacity-50 lg:w-auto">
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
            className="font-regular font-inter min-h-8 rounded-[12px] border-0 border-none bg-filtro bg-opacity-50 p-0 px-1 text-left text-[16px] text-black ring-0 hover:bg-filtro hover:bg-opacity-50 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 lg:text-center"
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
            <TooltipContent side="right">
              <p>Limpar filtros</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[0.7fr_1fr_2fr_130px]">
          <TableComponent.ValueTitle>Data do Pedido</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Responsável pelo Pedido
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Fornecedores</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {filteredPurchases.map((purchase, index) => (
          <TableComponent.Line
            className={`grid-cols-[0.7fr_1fr_2fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>
              {`${purchase.date.getDate()}/${purchase.date.getMonth()}/${purchase.date.getFullYear()}`}
            </TableComponent.Value>
            <TableComponent.Value>{purchase.responsible}</TableComponent.Value>
            <TableComponent.Value className="flex">
              {(() => {
                const suppliers = Array.from(
                  new Set(
                    purchase.products.map((product) => product.supplier.name),
                  ),
                );
                const displayedSuppliers = suppliers.slice(0, 3).join(", ");

                return suppliers.length > 3
                  ? `${displayedSuppliers}...`
                  : displayedSuppliers;
              })()}
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
                      <span className="font-semibold">Data do Pedido:</span>{" "}
                      {`${purchase.date.getDate()}/${purchase.date.getMonth()}/${purchase.date.getFullYear()}`}
                    </p>
                    <p className="w-fit">
                      <span className="font-semibold">
                        Responsável pelo Pedido:
                      </span>{" "}
                      {purchase.responsible}
                    </p>
                    <p className="w-fit font-semibold">Produtos:</p>
                  </DialogDescription>

                  <PurchaseDetails purchase={purchase} />

                  <TableButtonComponent className="w-fit pt-2 sm:pt-4 lg:w-full">
                    <TableButtonComponent.Button
                      className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao max-[425px]:w-full"
                      icon={
                        <Download
                          className="flex h-full cursor-pointer self-center"
                          size={20}
                          strokeWidth={2.2}
                          color="white"
                        />
                      }
                    >
                      Baixar Relatório
                    </TableButtonComponent.Button>
                  </TableButtonComponent>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
}
