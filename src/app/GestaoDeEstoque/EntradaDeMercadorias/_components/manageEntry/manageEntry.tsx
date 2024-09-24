"use client";

import { RequestComponent } from "~/components/card-request/cardRequest";
import { entryData } from "../../entryData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { useState } from "react";

export default function ManageEntry() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
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
                <RequestComponent.ColumnButtonManage onOpen={handleOpen} />
              </RequestComponent.Grid>
            </RequestComponent>
          ))}
      </div>
      <div>
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent aria-describedby={undefined} className="sm:max-w-7xl">
            <DialogHeader>
              <DialogTitle className="pb-1.5">
                Utilize os campos abaixo para editar os dados do fornecedor ou o
                botão para remover
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-8 mt-2 flex justify-end border-b-2 border-t-2 border-[#BFBFBF]">
        <Button className="my-3.5 h-10 bg-vermelho_botao_1 text-[14px] font-medium text-white hover:bg-hover_vermelho_botao sm:text-[16px]">
          Gerar Entrada Manualmente
        </Button>
      </div>
    </>
  );
}
