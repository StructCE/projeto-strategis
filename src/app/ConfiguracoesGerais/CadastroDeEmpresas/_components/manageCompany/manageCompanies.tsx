"use client";

import { TableComponent } from "~/components/table/index";
import { Button } from "~/components/ui/button";
//import { SupplierEdit } from "../editSuppliers/supplierEdit";
import { useRouter } from "next/navigation";
import { companies } from "./companiesData";
import ManageCompaniesFilters from "./manageCompaniesFilters/manageCompaniesFilters";

export const ManageCompaniesTable = () => {
  const router = useRouter();
  return (
    <TableComponent>
      <TableComponent.Title>Gerenciar Empresas</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione uma empresa para ver mais informações
      </TableComponent.Subtitle>
      <TableComponent.FiltersLine>
        <ManageCompaniesFilters />
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
        {companies.map((company, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_2fr_1fr_1fr_1fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{company.cnpj}</TableComponent.Value>
            <TableComponent.Value>{company.empresa}</TableComponent.Value>
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
