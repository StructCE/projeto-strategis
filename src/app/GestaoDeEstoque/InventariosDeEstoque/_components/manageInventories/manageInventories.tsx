"use client";
import { Calendar, UserCog2 } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { inventories } from "../inventoriesData";
import InventoryDetails from "./inventoryDetails/inventoryDetailsTable";

export default function ManageInventoriesTable() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [inputResponsible, setInputResponsible] = useState("");

  const filteredInventories = inventories.filter((inventory) => {
    // const formattedInventoryDate = new Date(
    //   inventory.date,
    // ).toLocaleDateString();
    // const formattedInputDate = date?.toLocaleDateString();

    // const matchesDate = !date || formattedInventoryDate === formattedInputDate;

    const matchesResponsible =
      inputResponsible === "" ||
      inventory.responsible
        .toLowerCase()
        .includes(inputResponsible.toLowerCase());

    return matchesResponsible;
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
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_2fr_1.5fr_130px]">
          <TableComponent.ValueTitle>
            Data do Inventário
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Nome do Inventário
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Responsável pelo Inventário
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {filteredInventories.map((inventory, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_2fr_1.5fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>
              {inventory.date.toString()}
            </TableComponent.Value>
            <TableComponent.Value>{inventory.name}</TableComponent.Value>
            <TableComponent.Value>{inventory.responsible}</TableComponent.Value>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]">
                  Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl overflow-x-auto p-3 pb-5 pt-10 sm:p-6">
                <DialogHeader>
                  <DialogTitle className="w-fit pb-1.5">
                    Informações do {inventory.name}
                  </DialogTitle>
                  <DialogDescription className="w-fit text-base text-black">
                    <p className="w-fit">
                      <span className="font-semibold">Data do Inventário:</span>{" "}
                      {inventory.date.toString()}
                    </p>
                    <p className="w-fit">
                      <span className="font-semibold">
                        Responsável pelo Inventário:
                      </span>{" "}
                      {inventory.responsible}
                    </p>
                    <p className="w-fit font-semibold">Contagem:</p>
                  </DialogDescription>

                  <InventoryDetails inventory={inventory} />

                  <TableButtonComponent className="w-fit pt-2 sm:pt-4 lg:w-full">
                    <TableButtonComponent.Button className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao max-[425px]:w-full">
                      Realizar Ajuste de Estoque Automático
                    </TableButtonComponent.Button>
                  </TableButtonComponent>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
}
