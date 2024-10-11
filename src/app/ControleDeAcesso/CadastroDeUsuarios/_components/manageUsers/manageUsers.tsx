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
  const [inputNameEmail, setInputNameEmail] = useState("");
  const [selectCompany, setSelectCompany] = useState("");
  const [selectRole, setSelectRole] = useState("");

  const { data: users = [] } = api.user.getAll.useQuery();
  const { data: companies = [] } = api.company.getAllCompanies.useQuery();
  const { data: roles = [] } = api.role.getAll.useQuery();

  // console.log(users);

  const filteredUsers = users.filter((user) => {
    const matchesName =
      inputNameEmail === "" ||
      user.name.toLowerCase().includes(inputNameEmail.toLowerCase()) ||
      user.email.toLowerCase().includes(inputNameEmail.toLowerCase());
    const matchesCompany =
      selectCompany === "" ||
      user.UserRole.some((userRole) => userRole.company === selectCompany);
    const matchesRole =
      selectRole === "" ||
      user.UserRole.some((userRole) => userRole.role === selectRole);

    return matchesName && matchesCompany && matchesRole;
  });

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
            placeholder="Nome/email do Usuário"
            state={inputNameEmail}
            setState={setInputNameEmail}
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
                  setInputNameEmail("");
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
        <TableComponent.LineTitle className="grid-cols-[repeat(4,_1fr)_130px] gap-6">
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Email</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Empresa</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Cargo</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {filteredUsers.map((user, index) => (
          <TableComponent.Line
            className={`grid-cols-[repeat(4,_1fr)_130px] gap-6 ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{user.name}</TableComponent.Value>
            <TableComponent.Value className="overflow-x-hidden">
              {user.email}
            </TableComponent.Value>
            <TableComponent.Value>
              {user.UserRole.map((userRole) => userRole.company).join(", ")}
            </TableComponent.Value>
            <TableComponent.Value>
              {user.UserRole.map((userRole) => userRole.role).join(", ")}
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
                    Utilize os campos abaixo para editar os dados do usuário ou
                    o botão para remover
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
