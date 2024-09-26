import { TableComponent } from "~/components/table";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

import TableNFsFilters from "./manageNFsFilters/tableNFsFilters";
import DetailNF from "../DetailNF/detailNF";

export type NotaFiscal = {
  numNF: number;
  date: string;
  quantity: string;
  company: string;
  supplier: string;
  description: string;
};

export const TableNFs = (props: { tableData: NotaFiscal[] }) => {
  return (
    <TableComponent>
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

            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
                  Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent
                aria-describedby={undefined}
                className="scroll-hidden max-h-[90vh] overflow-auto sm:max-w-[90rem]"
              >
                <DetailNF nf={notaFiscal} />;
              </DialogContent>
            </Dialog>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
