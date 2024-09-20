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
import { StockEdit } from "../editStocks/stockEdit";
import { stocks } from "../stockData";
import ManageStocksFilters from "./manageStocksFilters/manageStocksFilters";

export const ManageStocksTable = () => {
  // metodo que coloca endereço do estoque em abreviação
  const generateAbbreviationAddress = (address: string): string => {
    const words = address.trim().split(/\s+/).filter(Boolean);

    // Se tiver apenas uma palavra, retorna apenas a primeira letra
    if (words.length === 1) {
      return words[0]?.[0]?.toUpperCase() ?? "";
    }

    // Se tiver duas ou mais palavras, pega a primeira letra de cada uma
    const abbreviation = words
      .map((word) => word[0]?.toUpperCase() ?? "")
      .join("");

    return abbreviation;
  };

  return (
    <TableComponent>
      <TableComponent.Title>Estoques</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um estoque para editar ou remover
      </TableComponent.Subtitle>
      <TableComponent.FiltersLine>
        <ManageStocksFilters />
      </TableComponent.FiltersLine>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[0.6fr_1.7fr_1fr_1fr_2fr_130px]">
          <TableComponent.ValueTitle className="text-center">
            Código
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Sigla
          </TableComponent.ValueTitle>
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
        {stocks.map((stock, index) => (
          <TableComponent.Line
            className={`grid-cols-[0.6fr_1.7fr_1fr_1fr_2fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value className="text-center">
              {stock.code}
            </TableComponent.Value>
            <TableComponent.Value>{stock.name}</TableComponent.Value>
            <TableComponent.Value className="text-center">
              {stock.stock_address.map((address, index) => (
                <span key={index}>
                  {generateAbbreviationAddress(address.nameAddress)}
                </span>
              ))}
              -
              {stock.zone.map((zone, index) => (
                <span key={index}>{zone.nameZone}</span>
              ))}
              -
              {stock.shelf.map((shelf, index) => (
                <span key={index}>{shelf.nameShelf}</span>
              ))}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {stock.responsable_stock.map((responsable, index) => (
                <div key={index}>{responsable.name}</div>
              ))}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {stock.responsable_stock.map((responsable, index) => (
                <div key={index}>{responsable.email}</div>
              ))}
            </TableComponent.Value>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]">
                  Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-7xl">
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
