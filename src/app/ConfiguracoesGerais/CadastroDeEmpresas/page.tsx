import { CompanyRegister } from "./_components/createCompany.tsx/companyRegister";
import { ManageCompaniesTable } from "./_components/manageCompany/manageCompanies";

export default function CompanyRegistration() {
  return (
    <>
      <CompanyRegister /> <ManageCompaniesTable />
    </>
  );
}
