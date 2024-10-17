"use client";
import { Calendar, Eraser, UserCog2 } from "lucide-react";
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
import { api } from "~/trpc/react";
import InventoryDetails from "./inventoryDetails/inventoryDetailsTable";

export default function ManageInventoriesTable() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [inputResponsible, setInputResponsible] = useState("");

  const {
    data: inventories = [],
    error,
    isLoading,
  } = api.inventory.getAllInventories.useQuery({
    // filters: { date: date, responsible: inputResponsible },'
  });

  const filteredInventories = inventories.filter((inventory) => {
    const matchesDate =
      !date ||
      (inventory.date.getDate() === date.getDate() &&
        inventory.date.getMonth() === date.getMonth() + 1 &&
        inventory.date.getFullYear() === date.getFullYear());

    const matchesResponsible =
      inputResponsible === "" ||
      inventory.responsibleName
        .toLowerCase()
        .includes(inputResponsible.toLowerCase());

    return matchesDate && matchesResponsible;
  });

  return (
    <TableComponent className="gap-3">
      <TableComponent.Title>Histórico de Inventários</TableComponent.Title>
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

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="flex h-full cursor-pointer self-center">
              <Eraser
                size={20}
                onClick={() => {
                  setDate(undefined);
                  setInputResponsible("");
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">Limpar filtros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_1.5fr_0.7fr_1fr_130px] gap-8">
          <TableComponent.ValueTitle>
            Data do Inventário
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Responsável pelo Inventário
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Produtos
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Ajuste Necessário?
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar inventários: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Carregando inventários...
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {inventories.length > 0 && !isLoading && !error ? (
          filteredInventories.length > 0 ? (
            filteredInventories
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((inventory, index) => (
                <TableComponent.Line
                  className={`grid-cols-[1fr_1.5fr_0.7fr_1fr_130px] gap-8 ${
                    index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                  }`}
                  key={index}
                >
                  <TableComponent.Value>
                    {`${inventory.date.getDate()}/${inventory.date.getMonth()}/${inventory.date.getFullYear()}`}
                  </TableComponent.Value>
                  <TableComponent.Value>
                    {inventory.responsibleName}
                  </TableComponent.Value>
                  <TableComponent.Value className="text-center">
                    {inventory.inventoryProducts.length}
                  </TableComponent.Value>
                  <TableComponent.Value className="text-center">
                    {inventory.inventoryProducts.some(
                      (product) =>
                        product.inventoryQuantity !== product.stockQuantity,
                    ) ? (
                      <span className="text-vermelho_botao_2">
                        Ajuste Necessário
                      </span>
                    ) : (
                      <span className="text-verde_botao">Estoque Ok</span>
                    )}
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
                          Informações do invnetário
                        </DialogTitle>
                        <DialogDescription className="w-fit text-base text-black">
                          <p className="w-fit">
                            <span className="font-semibold">
                              Data do Inventário:
                            </span>{" "}
                            {`${inventory.date.getDate()}/${inventory.date.getMonth()}/${inventory.date.getFullYear()}`}
                          </p>
                          <p className="w-fit">
                            <span className="font-semibold">
                              Responsável pelo Inventário:
                            </span>{" "}
                            {inventory.responsibleName}
                          </p>
                          <p className="w-fit font-semibold">Contagem:</p>
                        </DialogDescription>

                        <InventoryDetails inventory={inventory} />

                        <TableButtonComponent className="w-fit pt-2 sm:pt-4 lg:w-full">
                          <TableButtonComponent.Button className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao_1 max-[425px]:w-full">
                            Realizar Ajuste de Estoque Automático
                          </TableButtonComponent.Button>
                        </TableButtonComponent>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableComponent.Line>
              ))
          ) : (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum inventário encontrado com os filtros aplicados
              </TableComponent.Value>
            </TableComponent.Line>
          )
        ) : (
          !isLoading &&
          !error && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum inventário encontrado
              </TableComponent.Value>
            </TableComponent.Line>
          )
        )}
      </TableComponent.Table>
    </TableComponent>
  );
}
