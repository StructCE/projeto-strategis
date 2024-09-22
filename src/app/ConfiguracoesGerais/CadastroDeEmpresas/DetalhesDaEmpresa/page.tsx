"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "~/app/loading";
import { companies, type Company } from "../_components/companiesData";
import { CompanyEdit } from "./_components/manageDetailsCompany/editCompany/companyEdit";
import { ManageSuppliersTableFromComapany } from "./_components/manageDetailsCompany/manageSupplierFromCompany";
import { ManageUsersTableFromCompany } from "./_components/manageDetailsCompany/manageUsersFromCompany";

export default function DetalhesDaEmpresa() {
  const searchParams = useSearchParams();
  const cnpj = searchParams.get("cnpj");
  const [company, setCompany] = useState<Company | undefined>(undefined);

  useEffect(() => {
    if (cnpj) {
      const fetchCompany = () => {
        const fetchedCompany = companies.find((c) => c.cnpj === cnpj);
        setCompany(fetchedCompany);
      };
      fetchCompany();
    }
  }, [cnpj]);

  if (!company) return <LoadingPage />;

  return (
    <div className="flex flex-col gap-4 bg-fundo_branco">
      <CompanyEdit
        company={{
          name: company.name,
          cnpj: company.cnpj,
          suppliers: company.suppliers.map((supplier) => ({
            name: supplier.name,
          })),
          tipo_empresa: company.tipo_empresa,
          matriz_empresa: company.matriz_empresa,
          email: company.email,
          phone: company.phone,
          endereco: company.endereco,
          bairro: company.bairro,
          municipio: company.municipio,
          uf: company.uf,
          cep: company.cep,
          inscricao_estadual: company.inscricao_estadual,
          regime_tributario: company.regime_tributario,
          legalRepresentative: company.legalRepresentative,
          xmlFilePath: "",
          registered_products: 0,
          registered_suppliers: 0,
          low_stock_products: 0,
        }}
      />
      <ManageUsersTableFromCompany company={company.name} />
      <ManageSuppliersTableFromComapany />
    </div>
  );
}
