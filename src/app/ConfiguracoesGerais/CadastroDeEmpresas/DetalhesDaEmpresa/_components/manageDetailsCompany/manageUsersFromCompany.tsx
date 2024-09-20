import { users } from "~/app/ControleDeAcesso/CadastroDeUsuarios/_components/usersData";
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
import { UserEdit } from "../../../../../ControleDeAcesso/CadastroDeUsuarios/_components/manageUsers/editUsers/userEdit";

type ManageUsersTableFromCompanyProps = {
  company: string;
};

export const ManageUsersTableFromCompany = ({
  company,
}: ManageUsersTableFromCompanyProps) => {
  const filteredUsers = users.filter((user) => user.company === company);

  return (
    <TableComponent className="mb-4">
      <TableComponent.Title>Usuários Cadastrados</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um usuário para editar seus dados ou remover
      </TableComponent.Subtitle>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[repeat(4,_1fr)_130px]">
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Email</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Empresa</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Cargo</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {filteredUsers.map((user, index) => (
          <TableComponent.Line
            className={`grid-cols-[repeat(4,_1fr)_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{user.name}</TableComponent.Value>
            <TableComponent.Value>{user.email}</TableComponent.Value>
            <TableComponent.Value>{user.company}</TableComponent.Value>
            <TableComponent.Value>{user.role}</TableComponent.Value>
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
                    o botão para remover o usuário da empresa
                  </DialogTitle>
                  <UserEdit user={user} />
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
