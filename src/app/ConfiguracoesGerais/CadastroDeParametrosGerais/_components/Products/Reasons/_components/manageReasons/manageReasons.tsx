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
import { api } from "~/trpc/react";
import { ReasonEdit } from "./editReasons/reasonEdit";

export const ManageReasonsTable = () => {
  const {
    data: adjustReasons = [],
    error,
    isLoading,
  } = api.generalParameters.adjustReason.getAll.useQuery();

  return (
    <TableComponent>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_130px]">
          <TableComponent.ValueTitle>Motivo</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar motivos: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>Carregando motivos...</TableComponent.Value>
          </TableComponent.Line>
        )}
        {adjustReasons.length > 0 && !isLoading && !error
          ? adjustReasons
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((reason, index) => (
                <TableComponent.Line
                  className={`grid-cols-[1fr_130px] ${
                    index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                  }`}
                  key={index}
                >
                  <TableComponent.Value>{reason.name}</TableComponent.Value>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
                        Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      aria-describedby={undefined}
                      className="sm:max-w-7xl"
                    >
                      <DialogHeader>
                        <DialogTitle className="pb-1.5">
                          Utilize o campo abaixo para editar o motivo de ajuste
                          de estoque ou o botão para remover
                        </DialogTitle>
                        <ReasonEdit reason={reason} />
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableComponent.Line>
              ))
          : !isLoading &&
            !error && (
              <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
                <TableComponent.Value>
                  Nenhum motivo de ajuste encontrado
                </TableComponent.Value>
              </TableComponent.Line>
            )}
      </TableComponent.Table>
    </TableComponent>
  );
};
