"use client";
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

import { CalendarIcon, UserCog } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter";
import { exits } from "../exitsData";
import { ExitDetails } from "./exitDetails/exitDetails";

export default function ExitsHistory() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [exitResponsible, setExitResponsible] = useState("");
  const [requestResponsible, setRequestResponsible] = useState("");

  const filteredExits = exits.filter((exit) => {
    const matchesDate =
      !date ||
      (exit.date.getDate() === date.getDate() &&
        exit.date.getMonth() === date.getMonth() + 1 &&
        exit.date.getFullYear() === date.getFullYear());

    const matchesExitResponsible =
      exitResponsible === "" ||
      exit.exit_responsible
        .toLowerCase()
        .includes(exitResponsible.toLowerCase());

    const matchesRequestResponsible =
      requestResponsible === "" ||
      exit.request_responsible
        .toLowerCase()
        .includes(requestResponsible.toLowerCase());

    return matchesDate && matchesExitResponsible && matchesRequestResponsible;
  });

  return (
    <TableComponent>
      <TableComponent.Title>Histórico de Saídas</TableComponent.Title>

      <TableComponent.FiltersLine className="my-2">
        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <CalendarIcon className={className} />
            )}
          />
          <Filter.DatePicker
            date={date}
            setDate={setDate}
            open={open}
            setOpen={setOpen}
            placeholder="Data"
          ></Filter.DatePicker>
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <UserCog className={className} />
            )}
          />{" "}
          <Filter.Input
            placeholder="Responsável"
            state={exitResponsible}
            setState={setExitResponsible}
          />
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <UserCog className={className} />
            )}
          />{" "}
          <Filter.Input
            placeholder="Requisitante"
            state={requestResponsible}
            setState={setRequestResponsible}
          />
        </Filter>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_2fr_2fr_100px_130px] gap-16">
          <TableComponent.ValueTitle>Data</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Responsável</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Solicitante</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Produtos
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {filteredExits.map((exit, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_2fr_2fr_100px_130px] gap-16 ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{`${exit.date.getDate()}/${exit.date.getMonth()}/${exit.date.getFullYear()}`}</TableComponent.Value>
            <TableComponent.Value>{exit.exit_responsible}</TableComponent.Value>
            <TableComponent.Value>
              {exit.request_responsible}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {exit.products.length}
            </TableComponent.Value>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-0 h-8 bg-cinza_destaque px-5 text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
                  Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="overflow-x-auto sm:max-w-[80rem]">
                <DialogHeader>
                  <DialogTitle className="pb-1.5 text-xl">
                    Detalhes da Saída:
                  </DialogTitle>
                  <ExitDetails exit={exit} />
                  <DialogDescription></DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
}
