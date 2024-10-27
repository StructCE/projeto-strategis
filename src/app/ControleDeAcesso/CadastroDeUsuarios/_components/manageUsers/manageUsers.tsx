"use client";
import { Building2, Eraser, Search, UserCog } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/react";
import { UserEdit } from "./editUsers/userEdit";

export const ManageUsersTable = () => {
  const [inputName, setInputName] = useState("");
  const [selectCompany, setSelectCompany] = useState("");
  const [selectRole, setSelectRole] = useState("");

  const {
    data: users = [],
    error,
    isLoading,
  } = api.user.getAll.useQuery({
    filters: {
      name: inputName,
      company: selectCompany,
      role: selectRole,
    },
  });
  const { data: companies = [] } = api.company.getAllCompanies.useQuery();
  const { data: roles = [] } = api.role.getAll.useQuery();

  const getCompanyNameById = (companyId: string) => {
    const company = companies.find((company) => company.id === companyId);
    return company ? company.name : "Empresa não encontrada";
  };

  const getRoleNameById = (roleId: string) => {
    const role = roles.find((role) => role.id === roleId);
    return role ? role.name : "Cargo não encontrado";
  };

  return (
    <TableComponent>
      <TableComponent.Title>Gerenciar Usuários</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um usuário para editar ou remover
      </TableComponent.Subtitle>

      <TableComponent.FiltersLine>
        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Input
            placeholder="Nome do Usuário"
            state={inputName}
            setState={setInputName}
          />
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Building2 className={className} />
            )}
          />
          <Filter.Select
            placeholder="Empresa"
            state={selectCompany}
            setState={setSelectCompany}
          >
            {companies.map((company, index) => (
              <Filter.SelectItems
                value={company.name}
                key={index}
              ></Filter.SelectItems>
            ))}
          </Filter.Select>
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <UserCog className={className} />
            )}
          />
          <Filter.Select
            placeholder="Cargo"
            state={selectRole}
            setState={setSelectRole}
          >
            {roles.map((role, index) => (
              <Filter.SelectItems
                value={role.name}
                key={index}
              ></Filter.SelectItems>
            ))}
          </Filter.Select>
        </Filter>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="flex h-full cursor-pointer self-center">
              <Eraser
                size={20}
                onClick={() => {
                  setInputName("");
                  setSelectCompany("");
                  setSelectRole("");
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">Limpar filtros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[repeat(3,_1fr)_0.75fr_130px] gap-8">
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Email</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Empresa</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Cargo</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
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
        {users.length > 0 && !isLoading && !error ? (
          users.length > 0 ? (
            users.map((user, index) => (
              <TableComponent.Line
                className={`grid-cols-[repeat(3,_1fr)_0.75fr_130px] gap-8 ${
                  index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                }`}
                key={index}
              >
                <TableComponent.Value>{user.name}</TableComponent.Value>
                <TableComponent.Value>{user.email}</TableComponent.Value>
                <TableComponent.Value>
                  {user.UserRole.length > 2
                    ? user.UserRole.slice(0, 2)
                        .map(
                          (userRole, index) =>
                            `${index + 1}-${getCompanyNameById(userRole.companyId)}`,
                        )
                        .join(", ") + "..."
                    : user.UserRole.length > 1
                      ? user.UserRole.map(
                          (userRole, index) =>
                            `${index + 1}-${getCompanyNameById(userRole.companyId)}`,
                        ).join(", ")
                      : user.UserRole.map((userRole) =>
                          getCompanyNameById(userRole.companyId),
                        ).join(", ")}
                </TableComponent.Value>
                <TableComponent.Value>
                  {user.UserRole.length > 2
                    ? user.UserRole.slice(0, 2)
                        .map(
                          (userRole, index) =>
                            `${index + 1}-${getRoleNameById(userRole.roleId)}`,
                        )
                        .join(", ") + "..."
                    : user.UserRole.length > 1
                      ? user.UserRole.map(
                          (userRole, index) =>
                            `${index + 1}-${getRoleNameById(userRole.roleId)}`,
                        ).join(", ")
                      : user.UserRole.map((userRole) =>
                          getRoleNameById(userRole.roleId),
                        ).join(", ")}
                </TableComponent.Value>

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
                        Utilize os campos abaixo para editar os dados do usuário
                        ou o botão para remover
                      </DialogTitle>

                      <DialogDescription className="text-black">
                        <UserEdit user={user} />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableComponent.Line>
            ))
          ) : (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum usuário encontrado com os filtros aplicados
              </TableComponent.Value>
            </TableComponent.Line>
          )
        ) : (
          !isLoading &&
          !error && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum usuário encontrado
              </TableComponent.Value>
            </TableComponent.Line>
          )
        )}
      </TableComponent.Table>
    </TableComponent>
  );
};
