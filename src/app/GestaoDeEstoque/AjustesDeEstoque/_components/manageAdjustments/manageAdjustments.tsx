import { Calendar, Eraser, UserCog2 } from "lucide-react";
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
import { adjustments } from "../adjustmentsData";
import AdjustmentDetails from "./adjustmentDetails/adjustmentDetailsTable";

export default function ManageAdjustmentsTable() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [inputResponsible, setInputResponsible] = useState("");

  const filteredAdjustments = adjustments.filter((adjustment) => {
    const matchesDate =
      !date ||
      (adjustment.date.getDate() === date.getDate() &&
        adjustment.date.getMonth() === date.getMonth() + 1 &&
        adjustment.date.getFullYear() === date.getFullYear());

    const matchesResponsible =
      inputResponsible === "" ||
      adjustment.responsible
        .toLowerCase()
        .includes(inputResponsible.toLowerCase());

    return matchesDate && matchesResponsible;
  });

  return (
    <TableComponent className="gap-3">
      <TableComponent.Title>
        Histórico de Ajustes de Estoque
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
            <TooltipContent side="right">
              <p>Limpar filtros</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
        {filteredAdjustments.map((adjustment, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_2.5fr_1.5fr_1.5fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{`${adjustment.date.getDate()}/${adjustment.date.getMonth()}/${adjustment.date.getFullYear()}`}</TableComponent.Value>
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
                      {`${adjustment.date.getDate()}/${adjustment.date.getMonth()}/${adjustment.date.getFullYear()}`}
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
