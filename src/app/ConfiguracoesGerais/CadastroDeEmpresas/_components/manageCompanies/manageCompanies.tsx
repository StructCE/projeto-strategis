"use client";
import { Eraser, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table/index";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/react";
import { states } from "../states";

export function ManageCompaniesTable() {
  const [inputCnpj, setInputCnpj] = useState("");
  const [inputName, setInputName] = useState("");
  const [selectState, setSelectState] = useState("");
  const [selectTaxRegime, setSelectTaxRegime] = useState("");

  const {
    data: companies = [],
    error,
    isLoading,
  } = api.company.getManageCompanies.useQuery({
    filters: {
      cnpj: inputCnpj,
      name: inputName,
      state: selectState,
      taxRegime: selectTaxRegime,
    },
  });

  const router = useRouter();
  return (
    <TableComponent>
      <TableComponent.Title>Gerenciar Empresas</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione uma empresa para ver mais informações
      </TableComponent.Subtitle>

      <TableComponent.FiltersLine>
        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Input
            placeholder="CNPJ"
            state={inputCnpj}
            setState={setInputCnpj}
          />
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Input
            placeholder="Empresa"
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

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Regime Tributário"
            state={selectTaxRegime}
            setState={setSelectTaxRegime}
          >
            <Filter.SelectItems value="Lucro Real"></Filter.SelectItems>
            <Filter.SelectItems value="Lucro Presumido"></Filter.SelectItems>
            <Filter.SelectItems value="Simples Nacional"></Filter.SelectItems>
          </Filter.Select>
        </Filter>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="flex h-full cursor-pointer self-center">
              <Eraser
                size={20}
                onClick={() => {
                  setInputName("");
                  setInputCnpj("");
                  setSelectState("");
                  setSelectTaxRegime("");
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">Limpar filtros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_2fr_0.6fr_0.6fr_0.6fr_130px] gap-4 sm:gap-8">
          <TableComponent.ValueTitle>CNPJ</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Empresa</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Usuários
            <br />
            Cadastrados
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Fornecedores
            <br />
            Cadastrados
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Estoques
            <br />
            Cadastrados
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar empresas: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>Carregando empresas...</TableComponent.Value>
          </TableComponent.Line>
        )}
        {companies.length > 0 && !isLoading && !error ? (
          companies.length > 0 ? (
            companies.map((company, index) => (
              <TableComponent.Line
                className={`grid-cols-[1fr_2fr_0.6fr_0.6fr_0.6fr_130px] gap-4 sm:gap-8 ${
                  index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                }`}
                key={index}
              >
                <TableComponent.Value>
                  {company.cnpj
                    .replace(/\D/g, "")
                    .replace(
                      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                      "$1.$2.$3/$4-$5",
                    )}
                </TableComponent.Value>
                <TableComponent.Value>{company.name}</TableComponent.Value>
                <TableComponent.Value className="text-center">
                  {company.registeredUsersCount}
                </TableComponent.Value>
                <TableComponent.Value className="text-center">
                  {company.registeredSuppliersCount}
                </TableComponent.Value>
                <TableComponent.Value className="text-center">
                  {company.registeredStocksCount}
                </TableComponent.Value>

                <Button
                  onClick={() =>
                    router.push(
                      `/ConfiguracoesGerais/CadastroDeEmpresas/DetalhesDaEmpresa/${company.id}`,
                    )
                  }
                  className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]"
                >
                  Detalhes
                </Button>
              </TableComponent.Line>
            ))
          ) : (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhuma empresa encontrado com os filtros aplicados
              </TableComponent.Value>
            </TableComponent.Line>
          )
        ) : (
          !isLoading &&
          !error && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhuma empresa encontrada
              </TableComponent.Value>
            </TableComponent.Line>
          )
        )}
      </TableComponent.Table>
    </TableComponent>
  );
}
