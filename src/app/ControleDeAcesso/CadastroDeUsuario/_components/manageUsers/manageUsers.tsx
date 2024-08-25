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
import { UserEditContainer } from "../editUsers/userEditContainer";
import { Usuarios } from "../usersData";
import ManageUsersFilters from "./manageUsersFilters/manageUsersFilters";

export const ManageUsersTable = () => {
  return (
    <TableComponent>
      <TableComponent.Title>Gerenciar Usuários</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um usuário para editar ou remover
      </TableComponent.Subtitle>
      <TableComponent.FiltersLine>
        <ManageUsersFilters />
      </TableComponent.FiltersLine>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[repeat(4,_1fr)_130px]">
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Email</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Empresa</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Cargo</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {Usuarios.map((usuario, index) => (
          <TableComponent.Line
            className={`grid-cols-[repeat(4,_1fr)_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{usuario.nome}</TableComponent.Value>
            <TableComponent.Value>{usuario.email}</TableComponent.Value>
            <TableComponent.Value>{usuario.empresa}</TableComponent.Value>
            <TableComponent.Value>{usuario.cargo}</TableComponent.Value>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]">
                  Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-7xl">
                <DialogHeader>
                  <DialogTitle className="pb-1.5">
                    Utilize os campos abaixo para editar os dados do usuário ou
                    o botão para remover
                  </DialogTitle>
                  <UserEditContainer {...usuario} />
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
