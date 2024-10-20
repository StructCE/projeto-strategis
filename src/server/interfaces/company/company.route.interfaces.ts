type Company = {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  type: string;
  headquarters: string | null;
  phone: string;
  stateRegistration: string;
  taxRegime: string;
  address: string;
  city: string;
  neighborhood: string;
  federativeUnit: string;
  cep: string;
  legalResponsibleId: string | null;
};

type ManageCompany = {
  id: string;
  name: string;
  cnpj: string;
  registeredProductsCount: number;
  registeredSuppliersCount: number;
  lowStockProductsCount: number;
};

type CompanySuppliers = {
  cnpj: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  stateRegistration: string;
  neighborhood: string;
  city: string;
  federativeUnit: string;
  cep: string;
  contacts: {
    id: string;
    name: string;
    email: string;
    phone: string;
  }[];
}[];

type CompanyUsers =
  | {
      name: string;
      email: string;
      role: string;
      company: string;
    }[]
  | undefined;

type CompanyStocks = {
  id: string;
  name: string;
};

export type CompanyRouteInterfaces = {
  Company: Company;
  CompanySuppliers: CompanySuppliers;
  CompanyUsers: CompanyUsers;
  CompanyStocks: CompanyStocks;
  ManageCompany: ManageCompany;
};
