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
import { ShelfEdit } from "./editShelves/shelvesEdit";

export const ManageShelvesTable = () => {
  const {
    data: cabinets = [],
    error,
    isLoading,
  } = api.generalParameters.cabinet.getAll.useQuery();

  return (
    <TableComponent>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_2fr_130px]">
          <TableComponent.ValueTitle>Prateleira</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Armário/Zona</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar prateleiras: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Carregando prateleiras...
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {cabinets.length > 0 && !isLoading && !error ? (
          // Verifica se há pelo menos um armário com prateleiras
          cabinets.every((cabinet) => cabinet.shelf.length === 0) ? (
            <TableComponent.Line
              key="no-shelves-found" // Key para a mensagem de "Nenhuma prateleira encontrada"
              className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500"
            >
              <TableComponent.Value>
                Nenhuma prateleira encontrada
              </TableComponent.Value>
            </TableComponent.Line>
          ) : (
            // Renderiza armários e prateleiras normalmente
            cabinets.map((cabinet) =>
              cabinet.shelf.map((shelf, index) => (
                <TableComponent.Line
                  className={`grid-cols-[1fr_2fr_130px] ${index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""}`}
                  key={shelf.id} // Chave única para a prateleira
                >
                  <TableComponent.Value>{shelf.name}</TableComponent.Value>
                  <TableComponent.Value>{cabinet.name}</TableComponent.Value>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
                        Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      aria-describedby={undefined}
                      className="max-h-[90vh] overflow-y-auto sm:max-w-7xl"
                    >
                      <DialogHeader>
                        <DialogTitle className="pb-1.5">
                          Utilize o campo abaixo para editar a prateleira ou o
                          botão para remover
                        </DialogTitle>

                        <DialogDescription className="text-black">
                          <ShelfEdit shelf={shelf} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableComponent.Line>
              )),
            )
          )
        ) : (
          // Fallback caso não haja armários
          !isLoading &&
          !error && (
            <TableComponent.Line
              key="no-cabinets-found" // Key única para fallback quando não há armários
              className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500"
            >
              <TableComponent.Value>
                Nenhum armário encontrado
              </TableComponent.Value>
            </TableComponent.Line>
          )
        )}
      </TableComponent.Table>
    </TableComponent>
  );
};
