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
import { TypeEdit } from "./editTypes/typeEdit";

export const ManageTypesTable = () => {
  const {
    data: controlTypes = [],
    error,
    isLoading,
  } = api.generalParameters.controlType.getAll.useQuery();

  return (
    <TableComponent>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_130px]">
          <TableComponent.ValueTitle>
            Tipo de Controle
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar tipos de controle: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Carregando tipos de controle...
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {controlTypes.length > 0 && !isLoading && !error
          ? controlTypes
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((type, index) => (
                <TableComponent.Line
                  className={`grid-cols-[1fr_130px] ${
                    index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                  }`}
                  key={index}
                >
                  <TableComponent.Value>{type.name}</TableComponent.Value>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
                        Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      aria-describedby={undefined}
                      className="sm:max-w-7xl max-h-[90vh] overflow-y-auto"
                    >
                      <DialogHeader>
                        <DialogTitle className="pb-1.5">
                          Utilize o campo abaixo para editar o tipo de controle
                          ou o botão para remover
                        </DialogTitle>

                        <DialogDescription className="text-black">
                          <TypeEdit controlType={type} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableComponent.Line>
              ))
          : !isLoading &&
            !error && (
              <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
                <TableComponent.Value>
                  Nenhum tipo de controle encontrado
                </TableComponent.Value>
              </TableComponent.Line>
            )}
      </TableComponent.Table>
    </TableComponent>
  );
};
