import { permanentRedirect } from "next/navigation";
import LoadingPage from "~/app/loading";
import { api } from "~/trpc/server";
import { CompanyEdit } from "../_components/manageDetailsCompany/editCompany/companyEdit";
import { ManageStocksTableFromComapany } from "../_components/manageDetailsCompany/manageStocksFromCompany";
import { ManageSuppliersTableFromComapany } from "../_components/manageDetailsCompany/manageSupplierFromCompany";
import { ManageUsersTableFromCompany } from "../_components/manageDetailsCompany/manageUsersFromCompany";

export default async function DetalhesDaEmpresa({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) {
    permanentRedirect("/ConfiguracoesGerais/CadastroDeEmpresas/");
  }

  const companyData = await api.company.getOneCompany({ id: params.id });
  // console.log(companyData);
  const companyUsers = await api.user.getAll();
  const companySuppliers = await api.company.getCompanySuppliers({
    id: params.id,
  });
  const companies = await api.company.getAllCompanies();

  if (!companyData) return <LoadingPage />;

  return (
    <div className="flex flex-col gap-4 bg-fundo_branco">
      <CompanyEdit
        company={companyData}
        users={companyUsers.map((user) => ({ id: user.id, name: user.name }))}
        suppliers={companySuppliers.map((supplier) => ({
          id: supplier.id,
          name: supplier.name,
        }))}
        companies={companies}
      />
      <ManageUsersTableFromCompany id={params.id} />
      <ManageSuppliersTableFromComapany id={params.id} />
      <ManageStocksTableFromComapany id={params.id} />
    </div>
  );
}
