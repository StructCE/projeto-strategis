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
import { StorageEdit } from "./editStorages/storageEdit";

export const ManageStoragesTable = () => {
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

  return (
    <TableComponent>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_1fr_1fr_130px] gap-4 sm:gap-8">
          <TableComponent.ValueTitle>Armário/Zona</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Prateleiras</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Estoque</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar armários/zonas: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Carregando armários e zonas...
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {cabinets.length > 0 && !isLoading && !error
          ? cabinets
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((cabinet, index) => (
                <TableComponent.Line
                  className={`grid-cols-[1fr_1fr_1fr_130px] gap-4 sm:gap-8 ${
                    index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                  }`}
                  key={index}
                >
                  <TableComponent.Value>{cabinet.name}</TableComponent.Value>
                  <TableComponent.Value>
                    {cabinet.shelf.length > 0
                      ? cabinet.shelf.map((shelf) => shelf.name).join(", ")
                      : "Sem prateleiras"}
                  </TableComponent.Value>
                  <TableComponent.Value>
                    {cabinet.stock ? cabinet.stock.name : "Não associado"}
                  </TableComponent.Value>

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
                          Utilize o campo abaixo para editar o armário/zona ou o
                          botão para remover
                        </DialogTitle>

                        <DialogDescription className="text-black">
                          <StorageEdit cabinet={cabinet} />
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
                  Nenhum armário/zona encontrado
                </TableComponent.Value>
              </TableComponent.Line>
            )}
      </TableComponent.Table>
    </TableComponent>
  );
};
