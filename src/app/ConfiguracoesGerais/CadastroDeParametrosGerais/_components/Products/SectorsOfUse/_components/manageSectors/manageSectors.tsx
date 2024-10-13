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
import { SectorEdit } from "./editSectors/sectorEdit";

export const ManageSectorsTable = () => {
  const {
    data: sectorsOfUse = [],
    error,
    isLoading,
  } = api.generalParameters.useSector.getAll.useQuery();

  return (
    <TableComponent>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_130px]">
          <TableComponent.ValueTitle>
            Setor de Utilização
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar setores de utilização: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Carregando setores de utilização...
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {sectorsOfUse.length > 0 && !isLoading && !error
          ? sectorsOfUse
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((sector, index) => (
                <TableComponent.Line
                  className={`grid-cols-[1fr_130px] ${
                    index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                  }`}
                  key={index}
                >
                  <TableComponent.Value>{sector.name}</TableComponent.Value>
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
                          Utilize o campo abaixo para editar o setor ou o botão
                          para remover
                        </DialogTitle>
                        <SectorEdit sector={sector} />
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
                  Nenhum setor de utilização encontrado
                </TableComponent.Value>
              </TableComponent.Line>
            )}
      </TableComponent.Table>
    </TableComponent>
  );
};
