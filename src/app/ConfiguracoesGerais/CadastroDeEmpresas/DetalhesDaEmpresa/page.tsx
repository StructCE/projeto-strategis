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
          company_type: company.company_type,
          company_headquarters: company.company_headquarters,
          email: company.email,
          phone: company.phone,
          address: company.address,
          neighborhood: company.neighborhood,
          city: company.city,
          state: company.state,
          cep: company.cep,
          state_registration: company.state_registration,
          tax_regime: company.tax_regime,
          legal_representative: company.legal_representative,
          xmlFilePath: "",
          registered_products: 0,
          low_stock_products: 0,
        }}
      />
      <ManageUsersTableFromCompany company={company.name} />
      <ManageSuppliersTableFromComapany />
    </div>
  );
}
