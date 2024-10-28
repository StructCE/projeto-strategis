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
import { api } from "~/trpc/react";
import { modules } from "../accessProfileData";
import { AccessProfileEdit } from "./editAcessProfile/accessProfileEdit";

export const ManageAccessProfilesTable = () => {
  const [inputName, setInputName] = useState("");
  const [selectModules, setSelectModules] = useState<string[]>([]);

  const {
    data: roles = [],
    error,
    isLoading,
  } = api.role.getAll.useQuery({
    filters: {
      name: inputName,
      modules: selectModules,
    },
  });

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

        <div className="font-inter m-0 flex h-auto w-full gap-[14px] border-0 border-none bg-transparent p-0 text-[16px] font-normal text-black opacity-100 ring-0 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 data-[placeholder]:opacity-50 lg:w-auto">
          <MultiSelect
            FilterIcon={Search}
            options={modules.flatMap((module) => ({
              label: module.name,
              value: module.name,
            }))}
            onValueChange={setSelectModules}
            defaultValue={selectModules}
            placeholder="Módulos de acesso"
            variant="inverted"
            maxCount={2}
            className="font-inter min-h-8 rounded-[12px] border-0 border-none bg-filtro bg-opacity-50 p-0 px-1 text-left text-[16px] font-normal text-black ring-0 hover:bg-filtro hover:bg-opacity-50 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 lg:text-center"
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
            <TooltipContent side="right">Limpar filtros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_3fr_130px] gap-4">
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Módulos de Acesso
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar cargos: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>Carregando cargos...</TableComponent.Value>
          </TableComponent.Line>
        )}
        {roles.length > 0 && !isLoading && !error ? (
          roles.length > 0 ? (
            roles.map((role, index) => (
              <TableComponent.Line
                className={`grid-cols-[1fr_3fr_130px] gap-4 ${index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""}`}
                key={index}
              >
                <TableComponent.Value>{role.name}</TableComponent.Value>
                <TableComponent.Value>
                  {role.modules.length > 3
                    ? `${role.modules
                        .slice(0, 3)
                        .map((module) => module.name)
                        .join(", ")}...`
                    : role.modules.map((module) => module.name).join(", ")}
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
                        Utilize os campos abaixo para editar os dados do cargo
                        ou o botão para remover
                      </DialogTitle>

                      <DialogDescription className="text-black">
                        <AccessProfileEdit role={role} />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableComponent.Line>
            ))
          ) : (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum cargo encontrado com os filtros aplicados
              </TableComponent.Value>
            </TableComponent.Line>
          )
        ) : (
          !isLoading &&
          !error && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum cargo encontrado
              </TableComponent.Value>
            </TableComponent.Line>
          )
        )}
      </TableComponent.Table>
    </TableComponent>
  );
};
