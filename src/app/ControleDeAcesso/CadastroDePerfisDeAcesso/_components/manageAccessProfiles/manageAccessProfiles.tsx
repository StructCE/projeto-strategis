"use client";
import { Eraser, Search } from "lucide-react";
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
import { MultiSelect } from "~/components/ui/multi-select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { modules, roles } from "../accessProfileData";
import { AccessProfileEdit } from "./editAcessProfile/accessProfileEdit";

export const ManageAccessProfilesTable = () => {
  const [inputName, setInputName] = useState("");
  const [selectModules, setSelectModules] = useState<string[]>([]);

  // Função para verificar se o cargo tem pelo menos um módulo selecionado
  const roleMatchesSelectedModules = (
    roleModules: { label: string; value: string }[],
  ) => {
    if (selectModules.length === 0) return true; // Se nenhum módulo foi selecionado, não filtrar por módulos
    return roleModules.some((module) => selectModules.includes(module.value));
  };

  // Filtrar os cargos com base no nome e módulos selecionados
  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(inputName.toLowerCase()) && // Filtrar pelo nome do cargo
      roleMatchesSelectedModules(role.modules), // Filtrar pelos módulos selecionados
  );

  return (
    <TableComponent>
      <TableComponent.Title>Gerenciar Perfis de Acesso</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um cargo para ver detalhes, editar ou remover
      </TableComponent.Subtitle>
      <TableComponent.FiltersLine>
        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Input
            placeholder="Nome do Cargo"
            state={inputName}
            setState={setInputName}
          />
        </Filter>

        <div className="font-inter font-regular m-0 flex h-auto w-full gap-[14px] border-0 border-none bg-transparent p-0 text-[16px] text-black opacity-100 ring-0 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 data-[placeholder]:opacity-50 lg:w-auto">
          <MultiSelect
            FilterIcon={Search}
            options={modules} // Suas opções de módulos
            onValueChange={setSelectModules} // Atualiza os módulos selecionados
            defaultValue={selectModules}
            placeholder="Módulos de acesso"
            variant="inverted"
            maxCount={2}
            className="font-regular font-inter min-h-8 rounded-[12px] border-0 border-none bg-filtro bg-opacity-50 p-0 px-1 text-left text-[16px] text-black ring-0 hover:bg-filtro hover:bg-opacity-50 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 lg:text-center"
          />
        </div>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="flex h-full cursor-pointer self-center">
              <Eraser
                size={20}
                onClick={() => {
                  setInputName("");
                  setSelectModules([]);
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Limpar filtros</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_3fr_130px]">
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Módulos de Acesso
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {filteredRoles.map((role, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_3fr_130px] ${index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""}`}
            key={index}
          >
            <TableComponent.Value>{role.name}</TableComponent.Value>
            <TableComponent.Value>
              {role.modules.length > 4
                ? `${role.modules
                    .slice(0, 4)
                    .map((module) => module.label)
                    .join(", ")}...`
                : role.modules.map((module) => module.label).join(", ")}
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
                    Utilize os campos abaixo para editar os dados do fornecedor
                    ou o botão para remover
                  </DialogTitle>
                  <AccessProfileEdit role={role} />
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
