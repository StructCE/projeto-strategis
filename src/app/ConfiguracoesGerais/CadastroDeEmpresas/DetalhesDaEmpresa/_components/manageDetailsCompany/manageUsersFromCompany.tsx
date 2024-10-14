import { Trash2 } from "lucide-react";
// import { users } from "~/app/ControleDeAcesso/CadastroDeUsuarios/_components/usersData";
import { TableComponent } from "~/components/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

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
        <TableComponent.LineTitle className="grid-cols-[repeat(4,_1fr)_30px]">
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Email</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Empresa</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Cargo</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {filteredUsers.map((user, index) => (
          <TableComponent.Line
            className={`grid-cols-[repeat(4,_1fr)_30px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{user.name}</TableComponent.Value>
            <TableComponent.Value>{user.email}</TableComponent.Value>
            <TableComponent.Value>{user.company}</TableComponent.Value>
            <TableComponent.Value>{user.role}</TableComponent.Value>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger className="m-1 flex justify-end">
                  <button
                    onClick={() =>
                      console.log(
                        "Remover ligação entre esse usuário e essa empresa",
                      )
                    }
                    className="text-black"
                    type="button"
                  >
                    <Trash2 />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Remover</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
