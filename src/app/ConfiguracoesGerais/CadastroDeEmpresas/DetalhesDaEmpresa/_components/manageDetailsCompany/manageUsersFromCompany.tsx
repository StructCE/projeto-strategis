"use client";
// import { Trash2 } from "lucide-react";
import { TableComponent } from "~/components/table";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "~/components/ui/tooltip";
import { api } from "~/trpc/react";

export function ManageUsersTableFromCompany(props: { id: string }) {
  const {
    data: users = [],
    error,
    isLoading,
  } = api.company.getCompanyUsers.useQuery({ id: props.id });

  return (
    <TableComponent className="mb-4">
      <TableComponent.Title>Usuários Cadastrados</TableComponent.Title>
      {/* <TableComponent.Subtitle>
        Selecione um usuário para editar seus dados ou remover
      </TableComponent.Subtitle> */}

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[repeat(4,_1fr)] gap-4 sm:gap-8">
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Email</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Empresa</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Cargo</TableComponent.ValueTitle>
          {/* <TableComponent.ButtonSpace></TableComponent.ButtonSpace> */}
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar usuários: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>Carregando usuários...</TableComponent.Value>
          </TableComponent.Line>
        )}
        {users.length === 0 ? (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Nenhum usuário encontrado
            </TableComponent.Value>
          </TableComponent.Line>
        ) : (
          users.map((user, index) => (
            <TableComponent.Line
              className={`grid-cols-[repeat(4,_1fr)] gap-4 sm:gap-8 ${
                index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
              }`}
              key={index}
            >
              <TableComponent.Value>{user.name}</TableComponent.Value>
              <TableComponent.Value>{user.email}</TableComponent.Value>
              <TableComponent.Value>{user.company}</TableComponent.Value>
              <TableComponent.Value>{user.role}</TableComponent.Value>

              {/* <TooltipProvider delayDuration={300}>
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
            </TooltipProvider> */}
            </TableComponent.Line>
          ))
        )}
      </TableComponent.Table>
    </TableComponent>
  );
}
