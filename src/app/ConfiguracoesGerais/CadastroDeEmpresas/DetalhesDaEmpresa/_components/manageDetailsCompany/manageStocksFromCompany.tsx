"use client";
import { Trash2 } from "lucide-react";
import { TableComponent } from "~/components/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/react";

export const ManageStocksTableFromComapany = (props: { id: string }) => {
  const stocks = api.company.getCompanyStocks.useQuery({ id: props.id });

  return (
    <TableComponent>
      <TableComponent.Title>Estoques Cadastrados</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um estoque para editar ou remover
      </TableComponent.Subtitle>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1.7fr_1fr_1fr_2fr_30px]">
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

        {stocks.data?.map((stock, index) => (
          <TableComponent.Line
            className={`grid-cols-[1.7fr_1fr_1fr_2fr_30px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{stock.name}</TableComponent.Value>
            <TableComponent.Value>
              {`${stock.name
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase())
                .join("")}-${stock.companyName.split(" ")[0]}`}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {stock.responsible.name}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {stock.responsible.email}
            </TableComponent.Value>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger className="m-1 flex justify-end">
                  <button
                    onClick={() =>
                      console.log(
                        "Remover ligação entre esse estoque e essa empresa",
                      )
                    }
                    className="text-black"
                    type="button"
                  >
                    <Trash2 />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Remover</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
