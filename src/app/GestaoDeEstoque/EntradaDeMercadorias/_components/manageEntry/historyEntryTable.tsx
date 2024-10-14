"use client";
import { Calendar, Eraser, Search, Truck, UserCog } from "lucide-react";
import { useState } from "react";
import { suppliers } from "~/app/ConfiguracoesGerais/CadastroDeFornecedores/_components/supplierData";
// import { users } from "~/app/ControleDeAcesso/CadastroDeUsuarios/_components/usersData";
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
import { entries } from "../../entryData";
import { EntryDialogDetails } from "./entryDialogDetails";

export const HistoryEntryTable = () => {
  const [inputInvoice, setInputInvoice] = useState("");
  const [dateEntry, setDateEntry] = useState<Date | undefined>(undefined);
  const [openDateEntry, setOpenDateEntry] = useState(false);
  const [selectSupplier, setSelectSupplier] = useState("");
  const [selectResponsible, setSelectResponsible] = useState("");

  const filteredEntrys = entries.filter((entry) => {
    const entryInvoiceMatches = entry.invoice
      .toLowerCase()
      .includes(inputInvoice.toLowerCase());

    const matchesDateEntry =
      !dateEntry ||
      (entry.date_issue.getDate() === dateEntry.getDate() &&
        entry.date_issue.getMonth() === dateEntry.getMonth() + 1 &&
        entry.date_issue.getFullYear() === dateEntry.getFullYear());

    const matchesResponsible =
      selectResponsible === "" || entry.manager === selectResponsible;

    const matchesSupplier =
      selectSupplier === "" ||
      entry.suppliers.some((supplier) => supplier.name === selectSupplier);

    const matchesStatus = entry.status === "Confirmada";

    return (
      entryInvoiceMatches &&
      matchesDateEntry &&
      matchesSupplier &&
      matchesResponsible &&
      matchesStatus
    );
  });

  return (
    <TableComponent>
      <TableComponent.Title>Histórico de Entradas</TableComponent.Title>

      <TableComponent.FiltersLine>
        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Input
            placeholder="Nota Fiscal"
            state={inputInvoice}
            setState={setInputInvoice}
          />
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Calendar className={className} />
            )}
          />
          <Filter.DatePicker
            date={dateEntry}
            setDate={setDateEntry}
            open={openDateEntry}
            setOpen={setOpenDateEntry}
            placeholder="Data"
          />
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Truck className={className} />
            )}
          />
          <Filter.Select
            placeholder="Fornecedor"
            state={selectSupplier}
            setState={setSelectSupplier}
          >
            {suppliers.map((supplier, index) => (
              <Filter.SelectItems
                value={supplier.name}
                key={index}
              ></Filter.SelectItems>
            ))}
          </Filter.Select>
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <UserCog className={className} />
            )}
          />
          <Filter.Select
            placeholder="Fornecedor"
            state={selectResponsible}
            setState={setSelectResponsible}
          >
            {users.map((user, index) => (
              <Filter.SelectItems
                value={user.name}
                key={index}
              ></Filter.SelectItems>
            ))}
          </Filter.Select>
        </Filter>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="flex h-full cursor-pointer self-center">
              <Eraser
                size={20}
                onClick={() => {
                  setInputInvoice("");
                  setDateEntry(undefined);
                  setSelectSupplier("");
                  setSelectResponsible("");
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">Limpar filtros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_0.5fr_1fr_1.5fr_1.5fr_130px]">
          <TableComponent.ValueTitle>Nota Fiscal</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Data</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center leading-6">
            Quantidade
            <br />
            de Produtos
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Fornecedor(es)</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Responsável pela Confirmação
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {filteredEntrys.map((entry, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_0.5fr_1fr_1.5fr_1.5fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{entry.invoice}</TableComponent.Value>
            <TableComponent.Value>{`${entry.date_issue.getDate()}/${entry.date_issue.getMonth()}/${entry.date_issue.getFullYear()}`}</TableComponent.Value>
            <TableComponent.Value className="text-center">
              {entry.quantity_products}
            </TableComponent.Value>
            <TableComponent.Value>
              {entry.suppliers.map((s) => s.name).join(", ")}
            </TableComponent.Value>
            <TableComponent.Value>{entry.manager}</TableComponent.Value>

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
                  <DialogTitle>Detalhes da Entrada</DialogTitle>
                </DialogHeader>

                <DialogDescription className="text-black">
                  <EntryDialogDetails entry={entry} />
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
