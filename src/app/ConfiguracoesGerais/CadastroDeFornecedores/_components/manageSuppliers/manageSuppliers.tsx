"use client";
import { Eraser, Search } from "lucide-react";
import { useState } from "react";
import { states } from "~/app/ConfiguracoesGerais/CadastroDeEmpresas/_components/states";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table/index";
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
import { SupplierEdit } from "./editSuppliers/supplierEdit";

export const ManageSuppliersTable = () => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [selectState, setSelectState] = useState("");

  const {
    data: suppliers = [],
    error,
    isLoading,
  } = api.supplier.getAll.useQuery({
    filters: {
      name: inputName,
      email: inputEmail,
      federativeUnit: selectState,
    },
  });

  return (
    <TableComponent>
      <TableComponent.Title>Gerenciar Fornecedores</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um fornecedor para editar ou remover
      </TableComponent.Subtitle>

      <TableComponent.FiltersLine>
        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Input
            placeholder="Nome"
            state={inputName}
            setState={setInputName}
          />
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Input
            placeholder="Email"
            state={inputEmail}
            setState={setInputEmail}
          />
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Unidade Federativa"
            state={selectState}
            setState={setSelectState}
          >
            {states.map((state, index) => (
              <Filter.SelectItems
                value={state.value}
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
                  setInputEmail("");
                  setSelectState("");
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">Limpar filtros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[2fr_4fr_3fr_130px]">
          <TableComponent.ValueTitle>Fornecedor</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Endereço</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Email</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar fornecedores: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Carregando fornecedores...
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {suppliers.length > 0 && !isLoading && !error ? (
          suppliers.length > 0 ? (
            suppliers.map((supplier, index) => (
              <TableComponent.Line
                className={`grid-cols-[2fr_4fr_3fr_130px] ${
                  index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                }`}
                key={index}
              >
                <TableComponent.Value>{supplier.name}</TableComponent.Value>
                <TableComponent.Value>
                  {supplier.address} - {supplier.neighborhood} - {supplier.city}{" "}
                  ({supplier.federativeUnit})
                </TableComponent.Value>
                <TableComponent.Value>{supplier.email}</TableComponent.Value>

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
                        Utilize os campos abaixo para editar os dados do
                        fornecedor ou o botão para remover
                      </DialogTitle>

                      <DialogDescription className="text-black">
                        <SupplierEdit supplier={supplier} />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableComponent.Line>
            ))
          ) : (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum fornecedor encontrado com os filtros aplicados
              </TableComponent.Value>
            </TableComponent.Line>
          )
        ) : (
          !isLoading &&
          !error && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum fornecedor encontrado
              </TableComponent.Value>
            </TableComponent.Line>
          )
        )}
      </TableComponent.Table>
    </TableComponent>
  );
};
