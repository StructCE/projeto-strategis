"use client";
import { Eraser, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table/index";
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
import { StockEdit } from "./editStocks/stockEdit";

export const ManageStocksTable = () => {
  const [inputStockName, setInputStockName] = useState("");
  const [inputManagerName, setInputManagerName] = useState("");

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
    data: stocks = [],
    error,
    isLoading,
  } = api.stock.getAllStocks.useQuery({
    filters: {
      company: companyFilter,
      name: inputStockName,
      managerName: inputManagerName,
    },
  });
  // const { data: companies = [] } = api.company.getAllCompanies.useQuery();

  return (
    <TableComponent>
      <TableComponent.Title>Estoques</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um estoque para editar ou remover
      </TableComponent.Subtitle>

      <TableComponent.FiltersLine>
        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Input
            placeholder="Nome do estoque"
            state={inputStockName}
            setState={setInputStockName}
          />
        </Filter>

        {/* <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Empresa"
            state={selectCompany ?? ""}
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
              <Search className={className} />
            )}
          />
          <Filter.Input
            placeholder="Nome do responsável"
            state={inputManagerName}
            setState={setInputManagerName}
          />
        </Filter>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="flex h-full cursor-pointer self-center">
              <Eraser
                size={20}
                onClick={() => {
                  setInputStockName("");
                  // setSelectCompany("");
                  setInputManagerName("");
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">Limpar filtros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1.25fr_1.5fr_1.5fr_1.5fr_130px] gap-8">
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          {/* <TableComponent.ValueTitle>Sigla</TableComponent.ValueTitle> */}
          <TableComponent.ValueTitle className="leading-6">
            Empresa
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="leading-6">
            Nome do Responsável
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="leading-6">
            Email do Responsável
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar estoques: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>Carregando estoques...</TableComponent.Value>
          </TableComponent.Line>
        )}
        {stocks.length > 0 && !isLoading && !error ? (
          stocks.length > 0 ? (
            stocks
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((stock, index) => (
                <TableComponent.Line
                  className={`grid-cols-[1.25fr_1.5fr_1.5fr_1.5fr_130px] gap-8 ${
                    index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                  }`}
                  key={index}
                >
                  <TableComponent.Value>{stock.name}</TableComponent.Value>
                  {/* <TableComponent.Value>
                    {`${stock.name
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase())
                      .join("")}-${stock.company.name.split(" ")[0]}`}
                  </TableComponent.Value> */}
                  <TableComponent.Value>
                    {stock.company.name}
                  </TableComponent.Value>
                  <TableComponent.Value>
                    {stock.legalResponsible.name}
                  </TableComponent.Value>
                  <TableComponent.Value>
                    {stock.legalResponsible.email}
                  </TableComponent.Value>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
                        Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      aria-describedby={undefined}
                      className="max-h-[90vh] overflow-y-auto sm:max-w-7xl"
                    >
                      <DialogHeader>
                        <DialogTitle className="pb-1.5">
                          Utilize os campos abaixo para editar os dados do
                          estoque ou o botão para remover
                        </DialogTitle>

                        <DialogDescription className="text-black">
                          <StockEdit stock={stock} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableComponent.Line>
              ))
          ) : (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum estoque encontrado com os filtros aplicados
              </TableComponent.Value>
            </TableComponent.Line>
          )
        ) : (
          !isLoading &&
          !error && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum estoque encontrado
              </TableComponent.Value>
            </TableComponent.Line>
          )
        )}
      </TableComponent.Table>
    </TableComponent>
  );
};
