"use client";
import { Eraser, Search } from "lucide-react";
import { useState } from "react";
import { companies } from "~/app/ControleDeAcesso/CadastroDeUsuarios/_components/usersData";
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
import { stocks } from "../stockData";
import { StockEdit } from "./editStocks/stockEdit";

export const ManageStocksTable = () => {
  const [inputStockName, setInputStockName] = useState("");
  const [inputManagerName, setInputManagerName] = useState("");
  const [selectCompany, setSelectCompany] = useState("");

  const filteredStocks = stocks.filter((stock) => {
    const stockNameMatches = stock.name
      .toLowerCase()
      .includes(inputStockName.toLowerCase());

    const companyMatches = selectCompany
      ? stock.company.value === selectCompany
      : true;

    const managerNameMatches = stock.stock_manager.name
      .toLowerCase()
      .includes(inputManagerName.toLowerCase());

    return stockNameMatches && companyMatches && managerNameMatches;
  });

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

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Empresa"
            state={selectCompany}
            setState={setSelectCompany}
          >
            {companies.map((company, index) => (
              <Filter.SelectItems
                value={company.value}
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
                  setSelectCompany("");
                  setInputManagerName("");
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
        <TableComponent.LineTitle className="grid-cols-[1.7fr_1fr_1fr_2fr_130px]">
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Sigla</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center leading-6">
            Nome do <br />
            Responsável
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center leading-6">
            Email do <br />
            Responsável
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {filteredStocks.map((stock, index) => (
          <TableComponent.Line
            className={`grid-cols-[1.7fr_1fr_1fr_2fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{stock.name}</TableComponent.Value>
            <TableComponent.Value>
              {`${stock.name
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase())
                .join("")}-${stock.company.name.split(" ")[0]}`}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {stock.stock_manager.name}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {stock.stock_manager.email}
            </TableComponent.Value>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]">
                  Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent
                aria-describedby={undefined}
                className="sm:max-w-7xl"
              >
                <DialogHeader>
                  <DialogTitle className="pb-1.5">
                    Utilize os campos abaixo para editar os dados do estoque ou
                    o botão para remover
                  </DialogTitle>
                  <StockEdit stock={stock} />
                  <DialogDescription></DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
