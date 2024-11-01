"use client";
import { useSession } from "next-auth/react";
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
import { useCompany } from "~/lib/companyProvider";
import { api } from "~/trpc/react";
import { ShelfEdit } from "./editShelves/shelvesEdit";

export const ManageShelvesTable = () => {
  const session = useSession();

  const { data: user } = api.user.getUserById.useQuery({
    id: session?.data?.user.id,
  });

  const { selectedCompany } = useCompany();

  const companyFilter = user?.UserRole.some(
    (userRole) => userRole.role.name === "Administrador",
  )
    ? selectedCompany === "all_companies" || !selectedCompany
      ? undefined
      : selectedCompany
    : user?.UserRole[0]?.company.name;

  const {
    data: cabinets = [],
    error,
    isLoading,
  } = api.generalParameters.cabinet.getAll.useQuery({
    filters: {
      company: companyFilter,
    },
  });

  const shelves = cabinets
    .sort((a, b) => a.name.localeCompare(b.name)) // Ordena os armários
    .flatMap((cabinet) =>
      cabinet.shelf.map((shelf) => ({
        ...shelf,
        cabinetName: cabinet.name,
        stockName: cabinet.stock?.name ?? "Não associado",
      })),
    );

  return (
    <TableComponent>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_1fr_1fr_130px] gap-4 sm:gap-8">
          <TableComponent.ValueTitle>Prateleira</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Armário/Zona</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Estoque</TableComponent.ValueTitle>
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
        {shelves.length > 0 && !isLoading && !error
          ? shelves.map((shelf, globalIndex) => (
              <TableComponent.Line
                key={globalIndex}
                className={`grid-cols-[1fr_1fr_1fr_130px] gap-4 sm:gap-8 ${
                  globalIndex % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                }`}
              >
                <TableComponent.Value>{shelf.name}</TableComponent.Value>
                <TableComponent.Value>{shelf.cabinetName}</TableComponent.Value>
                <TableComponent.Value>{shelf.stockName}</TableComponent.Value>

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
            ))
          : // Fallback caso não haja prateleiras ou armários
            !isLoading &&
            !error && (
              <TableComponent.Line
                key="no-cabinets-found"
                className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500"
              >
                <TableComponent.Value>
                  Nenhum armário encontrado
                </TableComponent.Value>
              </TableComponent.Line>
            )}
      </TableComponent.Table>
    </TableComponent>
  );
};
