"use client";
import { Eraser, Search, Calendar, UserCog } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table/index";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "~/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { entryData } from "../../entryData";
import { EntryDialogDatails } from "./entryDialogDatails";

export const HistoryEntryTable = () => {
  const [inputInvoice, setInputInvoice] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputManager, setInputManger] = useState("");
  const [inputSupplier, setInputSupplier] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const handleOpen = (entry: never) => {
    setSelectedEntry(entry);
    setIsOpen(true);
  };

  const filteredEntrys = entryData.filter((entry) => {
    const entryInvoiceMatches = entry.invoice
      .toLowerCase()
      .includes(inputInvoice.toLowerCase());

    const DateMatches = entry.date_issue
      .toLowerCase()
      .includes(inputDate.toLowerCase());

    const ManagerMatches = entry.manager
      .toLowerCase()
      .includes(inputManager.toLowerCase());

    const SupplierMatches = entry.suppliers.some((supplier) =>
      supplier.name.toLowerCase().includes(inputSupplier.toLowerCase()),
    );

    return (
      entryInvoiceMatches &&
      ManagerMatches &&
      DateMatches &&
      SupplierMatches &&
      entry.isConfirmed
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
          <Filter.Input
            placeholder="XX/XX/XXXX"
            state={inputDate}
            setState={setInputDate}
          />
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <UserCog className={className} />
            )}
          />
          <Filter.Input
            placeholder="Fornecedor"
            state={inputSupplier}
            setState={setInputSupplier}
          />
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <UserCog className={className} />
            )}
          />
          <Filter.Input
            placeholder="Responsável"
            state={inputManager}
            setState={setInputManger}
          />
        </Filter>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="flex h-full cursor-pointer self-center">
              <Eraser
                size={20}
                onClick={() => {
                  setInputInvoice("");
                  setInputDate("");
                  setInputManger("");
                  setInputSupplier("");
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
            <TableComponent.Value>{entry.date_issue}</TableComponent.Value>
            <TableComponent.Value className="text-center">
              {entry.quantity_products}
            </TableComponent.Value>
            <TableComponent.Value>
              {entry.suppliers.map((s) => s.name).join(", ")}
            </TableComponent.Value>
            <TableComponent.Value>{entry.manager}</TableComponent.Value>
            <Button
              onClick={() => handleOpen(entry as never)}
              className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]"
            >
              Detalhes
            </Button>
            <div>
              {selectedEntry && (
                <Dialog open={isOpen} onOpenChange={handleClose}>
                  <DialogContent
                    aria-describedby={undefined}
                    className="sm:max-w-7xl"
                  >
                    <DialogHeader>
                      <EntryDialogDatails datails={selectedEntry} />
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
