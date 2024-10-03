"use client";
import React, { useState } from "react";
import { RequestComponent } from "~/components/card-request/cardRequest";
import { TableComponent } from "~/components/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { entries } from "../../entryData";
import { EntryDialogConfirm } from "./entryDialogDetailsConfirm";

export default function ManageEntry() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleOpen = (entry: never) => {
    setSelectedEntry(entry);
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <TableComponent>
      <TableComponent.Title>Gerenciar Entradas</TableComponent.Title>
      <TableComponent.Subtitle>Esperando confirmação:</TableComponent.Subtitle>

      <TableComponent.Table>
        {entries
          .filter((entry) => entry.status === "Em Aberto")
          .map((entry, index) => (
            <RequestComponent key={index} classname="mx-[2px] my-1.5">
              <RequestComponent.Grid>
                <RequestComponent.ColumnItem
                  isnº={true}
                  title="Nota Fiscal"
                  description={entry.invoice}
                />
                <RequestComponent.ColumnItem
                  title="Data de Emissão"
                  description={`${entry.date_issue.getDate()}/${entry.date_issue.getMonth()}/${entry.date_issue.getFullYear()}`}
                />
                <RequestComponent.ColumnItem
                  title="Quantidade de Produtos"
                  description={entry.quantity_products.toString()}
                />
                <RequestComponent.ColumnItem
                  title="Fornecedor(es)"
                  description={entry.suppliers.map((s) => s.name).join(", ")}
                />
                <RequestComponent.ColumnButtonManage
                  onOpen={() => handleOpen(entry as never)}
                />
              </RequestComponent.Grid>
            </RequestComponent>
          ))}
      </TableComponent.Table>
      <div>
        {selectedEntry && (
          <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent
              aria-describedby={undefined}
              className="sm:max-w-7xl"
            >
              <DialogHeader>
                <DialogTitle>Detalhes da Entrada</DialogTitle>
              </DialogHeader>

              <DialogDescription className="text-black">
                <EntryDialogConfirm entry={selectedEntry} />
              </DialogDescription>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </TableComponent>
  );
}
