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
import { adjustments } from "../adjustmentsData";
import AdjustmentDetails from "./adjustmentDetails/adjustmentDetailsTable";
import ManageAdjustmentsFilters from "./manageAdjustmentsFilters/manageAdjustmentsFilters";

export default function ManageAdjustmentsTable() {
  return (
    <TableComponent className="gap-3">
      <TableComponent.Title>
        Histórico de Ajustes de Estoque
      </TableComponent.Title>
      <TableComponent.FiltersLine>
        <ManageAdjustmentsFilters />
      </TableComponent.FiltersLine>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_2.5fr_1.5fr_1.5fr_130px]">
          <TableComponent.ValueTitle>Data do Ajuste</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Nome do Ajuste</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Responsável pelo Ajuste
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Tipo de Ajuste</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {adjustments.map((adjustment, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_2.5fr_1.5fr_1.5fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{adjustment.date}</TableComponent.Value>
            <TableComponent.Value>{adjustment.name}</TableComponent.Value>
            <TableComponent.Value>
              {adjustment.responsible}
            </TableComponent.Value>
            <TableComponent.Value>{adjustment.type}</TableComponent.Value>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]">
                  Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl overflow-x-auto p-3 pb-5 pt-10 sm:p-6">
                <DialogHeader>
                  <DialogTitle className="w-fit pb-1.5">
                    Informações do {adjustment.name}
                  </DialogTitle>
                  <DialogDescription className="w-fit text-base text-black">
                    <p className="w-fit">
                      <span className="font-semibold">Data do Ajuste:</span>{" "}
                      {adjustment.date}
                    </p>
                    <p className="w-fit">
                      <span className="font-semibold">
                        Responsável pelo Ajuste:
                      </span>{" "}
                      {adjustment.responsible}
                    </p>
                    <p className="w-fit font-semibold">Ajustes:</p>
                  </DialogDescription>

                  <AdjustmentDetails adjustment={adjustment} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
}
