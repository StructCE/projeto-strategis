"use client";

import { Eraser, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { states } from "~/app/ConfiguracoesGerais/CadastroDeFornecedores/_components/supplierData";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table/index";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { companies } from "../companiesData";

export const ManageCompaniesTable = () => {
  const [inputCnpj, setInputCnpj] = useState("");
  const [inputName, setInputName] = useState("");
  const [selectState, setSelectState] = useState("");
  const [selectTaxRegime, setSelectTaxRegime] = useState("");

  const filteredCompanies = companies.filter((company) => {
    const matchesCnpj = inputCnpj === "" || company.cnpj.includes(inputCnpj);
    const matchesName =
      inputName === "" ||
      company.name.toLowerCase().includes(inputName.toLowerCase());
    const matchesState = selectState === "" || company.uf === selectState;
    const matchesTaxRegime =
      selectTaxRegime === "" || company.regime_tributario === selectTaxRegime;

    return matchesCnpj && matchesName && matchesState && matchesTaxRegime;
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
            {states.map((tributo, index) => (
              <Filter.SelectItems
                value={tributo.value}
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
            <Filter.SelectItems value="Lucro Real (LR)"></Filter.SelectItems>
            <Filter.SelectItems value="Lucro Presumido (LP)"></Filter.SelectItems>
            <Filter.SelectItems value="Simples Nacional (SN)"></Filter.SelectItems>
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
            <TooltipContent side="right">
              <p>Limpar filtros</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_2fr_1fr_1fr_1fr_130px]">
          <TableComponent.ValueTitle>CNPJ</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Empresa</TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Produtos
            <br />
            Cadastrados
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Fornecedores
            <br />
            Cadastrados
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Produtos com
            <br />
            Estoque Baixo
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {filteredCompanies.map((company, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_2fr_1fr_1fr_1fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{company.cnpj}</TableComponent.Value>
            <TableComponent.Value>{company.name}</TableComponent.Value>
            <TableComponent.Value className="text-center">
              {company.registered_products}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {company.registered_suppliers}
            </TableComponent.Value>
            <TableComponent.Value className="text-center">
              {company.low_stock_products}
            </TableComponent.Value>

            <Button
              onClick={() =>
                router.push(
                  `/ConfiguracoesGerais/CadastroDeEmpresas/DetalhesDaEmpresa?cnpj=${encodeURIComponent(company.cnpj)}`,
                )
              }
              className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]"
            >
              Detalhes
            </Button>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
