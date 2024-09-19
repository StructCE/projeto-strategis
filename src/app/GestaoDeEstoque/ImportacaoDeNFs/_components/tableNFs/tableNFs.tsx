import { TableComponent } from "~/components/table";
import { Button } from "~/components/ui/button";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import TableNFsFilters from "./manageNFsFilters/tableNFsFilters";

export type NotaFiscal = {
  numNF: number;
  date: string;
  quantity: string;
  company: string;
  description: string;
};


export const TableNFs = (props: { tableData: NotaFiscal[] }) => {
  return (
    <TableComponent>
      {/* <TableComponent.Title>Notas Fiscais</TableComponent.Title> */}
      {/* <TableComponent.Subtitle>
      </TableComponent.Subtitle> */}
      <TableComponent.FiltersLine>
        <TableNFsFilters />
      </TableComponent.FiltersLine>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[repeat(3,_1fr)_2fr_3fr_130px]">
          <TableComponent.ValueTitle>Nº da NF</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Emissão</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Quant</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Fornecedor</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Descrição</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {props.tableData.map((notaFiscal, index) => (
          <TableComponent.Line
            className={`grid-cols-[repeat(3,_1fr)_2fr_3fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>nº {notaFiscal.numNF}</TableComponent.Value>
            <TableComponent.Value>{notaFiscal.date}</TableComponent.Value>
            <TableComponent.Value>{notaFiscal.quantity}</TableComponent.Value>
            <TableComponent.Value>{notaFiscal.company}</TableComponent.Value>
            <TableComponent.Value>
              {notaFiscal.description}
            </TableComponent.Value>

            <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]">
              Detalhes
            </Button>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
