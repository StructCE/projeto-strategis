import { CompanyRegister } from "./_components/createCompany/companyRegister";
import { ManageCompaniesTable } from "./_components/createCompany/manageCompanies/manageCompanies";

export default function CompanyRegistration() {
  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <CompanyRegister />
      <ManageCompaniesTable />
    </div>
  );
}
