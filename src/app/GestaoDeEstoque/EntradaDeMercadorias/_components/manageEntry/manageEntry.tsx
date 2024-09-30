"use client";

import { RequestComponent } from "~/components/card-request/cardRequest";
import { entryData } from "../../entryData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { EntryDialogConfirm } from "./entryDialogDatailsConfirm";

export default function ManageEntry() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null); // Estado para armazenar a entrada selecionada

  const handleOpen = (entry) => {
    setSelectedEntry(entry); // Definir a entrada selecionada
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div>
        <h1 className="font-inter mb-1 text-[24px] font-medium leading-none sm:text-[32px]">
          Gerenciar Entradas
        </h1>
        <p className="font-inter font-regular text-[14px] sm:text-[16px]">
          Esperando confirmação:
        </p>
      </div>
      <div>
        {entryData
          .filter((entry) => entry.isConfirmed === false)
          .map((entry, index) => (
            <RequestComponent key={index}>
              <RequestComponent.Grid>
                <RequestComponent.ColumnItem
                  isnº={true}
                  title="Nota Fiscal"
                  description={entry.invoice}
                />
                <RequestComponent.ColumnItem
                  title="Data de Emissão"
                  description={entry.date_issue}
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
                  onOpen={() => handleOpen(entry)} // Passar a entrada clicada
                />
              </RequestComponent.Grid>
            </RequestComponent>
          ))}
      </div>
      <div>
        {selectedEntry && (
          <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent
              aria-describedby={undefined}
              className="sm:max-w-7xl"
            >
              <DialogHeader>
                <EntryDialogConfirm requisitionConfirmEntry={selectedEntry} />
                <DialogDescription></DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="mb-8 mt-2 flex justify-end border-b-2 border-t-2 border-[#BFBFBF]">
        <Button className="my-3.5 h-10 bg-vermelho_botao_1 text-[14px] font-medium text-white hover:bg-hover_vermelho_botao sm:text-[16px]">
          Gerar Entrada Manualmente
        </Button>
      </div>
    </>
  );
}
