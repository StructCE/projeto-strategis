"use client";
import { Calendar, Eraser, UserCog2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table";
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
import { api } from "~/trpc/react";
import InventoryDetails from "./inventoryDetails/inventoryDetailsTable";

export default function ManageInventoriesTable() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [inputResponsible, setInputResponsible] = useState("");

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

  const {
    data: inventories = [],
    error,
    isLoading,
  } = api.inventory.getAllInventories.useQuery({
    filters: {
      date: date,
      responsible: inputResponsible,
      company: companyFilter,
    },
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
            placeholder="Selecione uma data"
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

      {/* TELAS GRANDES */}
      <TableComponent.Table className="hidden sm:block">
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
          <TableComponent.Line className="min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar inventários: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Carregando inventários...
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {inventories.length > 0 && !isLoading && !error ? (
          inventories.length > 0 ? (
            inventories
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((inventory, index) => (
                <TableComponent.Line
                  className={`grid-cols-[1fr_1.5fr_0.7fr_1fr_130px] gap-8 ${
                    index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                  }`}
                  key={index}
                >
                  <TableComponent.Value>
                    {`${String(inventory.date.getDate()).padStart(2, "0")}/${String(inventory.date.getMonth()).padStart(2, "0")}/${String(inventory.date.getFullYear()).padStart(2, "0")}`}
                  </TableComponent.Value>
                  <TableComponent.Value>
                    {inventory.responsibleName}
                  </TableComponent.Value>
                  <TableComponent.Value className="text-center">
                    {inventory.inventoryProducts.length}
                  </TableComponent.Value>
                  <TableComponent.Value
                    className={`text-center ${
                      inventory.status === "Ajuste necessário"
                        ? "text-vermelho_botao_2"
                        : inventory.status === "Estoque OK"
                          ? "text-verde_botao"
                          : "text-azul_botao"
                    }`}
                  >
                    {inventory.status}
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
                          Informações do invnetário
                        </DialogTitle>
                        <DialogDescription className="w-fit text-base text-black">
                          <p className="w-fit">
                            <span className="font-semibold">
                              Data do Inventário:
                            </span>{" "}
                            {`${String(inventory.date.getDate()).padStart(2, "0")}/${String(inventory.date.getMonth()).padStart(2, "0")}/${String(inventory.date.getFullYear()).padStart(2, "0")}`}
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
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableComponent.Line>
              ))
          ) : (
            <TableComponent.Line className="min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum inventário encontrado com os filtros aplicados
              </TableComponent.Value>
            </TableComponent.Line>
          )
        ) : (
          !isLoading &&
          !error && (
            <TableComponent.Line className="min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum inventário encontrado
              </TableComponent.Value>
            </TableComponent.Line>
          )
        )}
      </TableComponent.Table>

      {/* TELAS PEQUENAS */}
      <TableComponent.Table className="block sm:hidden">
        <TableComponent.LineTitle className="min-w-[0px] grid-cols-[40px_1fr_90px] gap-2 px-[8px]">
          <TableComponent.ValueTitle className="text-sm">
            Data
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-sm">
            Ajuste <br />
            Necessário?
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace className="w-[90px] sm:w-[130px]"></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar inventários: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Carregando inventários...
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {inventories.length > 0 && !isLoading && !error ? (
          inventories.length > 0 ? (
            inventories
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((inventory, index) => (
                <TableComponent.Line
                  className={`min-w-[0px] grid-cols-[40px_1fr_90px] gap-2 px-[8px] ${
                    index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                  }`}
                  key={index}
                >
                  <TableComponent.Value className="text-[13px]">
                    {`${String(inventory.date.getDate()).padStart(2, "0")}/${String(inventory.date.getMonth()).padStart(2, "0")}`}
                  </TableComponent.Value>
                  <TableComponent.Value
                    className={`text-center text-[13px] ${
                      inventory.status === "Ajuste necessário"
                        ? "text-vermelho_botao_2"
                        : inventory.status === "Estoque OK"
                          ? "text-verde_botao"
                          : "text-azul_botao"
                    }`}
                  >
                    {inventory.status}
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
                        <DialogTitle className="w-fit pb-1 text-base">
                          Informações do invnetário
                        </DialogTitle>
                        <DialogDescription className="w-fit text-base text-black">
                          <p className="w-fit text-sm">
                            <span className="font-semibold">
                              Data do Inventário:
                            </span>{" "}
                            {`${String(inventory.date.getDate()).padStart(2, "0")}/${String(inventory.date.getMonth()).padStart(2, "0")}/${String(inventory.date.getFullYear()).padStart(2, "0")}`}
                          </p>
                          <p className="w-fit text-sm">
                            <span className="font-semibold">
                              Responsável pelo Inventário:
                            </span>{" "}
                            {inventory.responsibleName}
                          </p>
                          <p className="w-fit text-sm font-semibold">
                            Contagem:
                          </p>
                        </DialogDescription>

                        <InventoryDetails inventory={inventory} />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableComponent.Line>
              ))
          ) : (
            <TableComponent.Line className="min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum inventário encontrado com os filtros aplicados
              </TableComponent.Value>
            </TableComponent.Line>
          )
        ) : (
          !isLoading &&
          !error && (
            <TableComponent.Line className="min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
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
