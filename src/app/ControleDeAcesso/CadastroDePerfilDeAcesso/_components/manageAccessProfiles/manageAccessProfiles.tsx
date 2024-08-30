import { TableComponent } from "~/components/table/tableContainer";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { roles } from "../accessProfilesData";
import { AccessProfileEditContainer } from "../editAcessProfile/accessProfileEditContainer";
import ManageAccessProfilesFilters from "./manageAccessProfilesFilters/manageAccessProfilesFilters";

export const ManageAccessProfilesTable = () => {
  return (
    <TableComponent>
      <TableComponent.Title>Gerenciar Perfis de Acesso</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um cargo para ver detalhes, editar ou remover
      </TableComponent.Subtitle>
      <TableComponent.FiltersLine>
        <ManageAccessProfilesFilters />
      </TableComponent.FiltersLine>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_4fr_130px]">
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Módulos de Acesso
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {roles.map((role, indexRoles) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_4fr_130px] ${
              indexRoles % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={indexRoles}
          >
            <TableComponent.Value>{role.name}</TableComponent.Value>
            <TableComponent.Value>
              {role.modules
                .slice(0, 4)
                .map(
                  (module, i) =>
                    `${module.label}${i < role.modules.slice(0, 4).length - 1 ? ", " : ""}`,
                )}
              {role.modules.length > 4 ? "..." : "."}
            </TableComponent.Value>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]">
                  Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-7xl">
                <DialogHeader>
                  <DialogTitle className="pb-1.5">
                    Utilize os campos abaixo para editar os dados do perfil de
                    acesso ou o botão para remover
                  </DialogTitle>
                  <AccessProfileEditContainer {...role} />
                  <DialogDescription></DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
