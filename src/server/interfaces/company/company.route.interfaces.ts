type Company = {
  id: string;
  name: string;
  email: string | null;
  cnpj: string;
  type: string | null;
  headquarters: string | null;
  phone: string;
  stateRegistration: string;
  taxRegime: string | null;
  address: string;
  city: string;
  neighborhood: string;
  federativeUnit: string;
  cep: string;
  legalResponsibleId: string | null;
};

type EditCompany = {
  id: string;
  name: string;
  cnpj: string;
  suppliers: {
    id: string;
    name: string;
  }[];
  email: string | null;
  phone: string;
  stateRegistration: string;
  legalResponsibleId: string | null;
  type: string | null;
  headquarters: string | null;
  taxRegime: string | null;
  address: string;
  neighborhood: string;
  city: string;
  federativeUnit: string;
  cep: string;
};

type ManageCompany = {
  id: string;
  name: string;
  cnpj: string;
  registeredProductsCount: number;
  registeredSuppliersCount: number;
  registeredUsersCount: number;
};

type CompanySuppliers = {
  id: string;
  cnpj: string;
  name: string;
  email: string | null;
  address: string;
  phone: string | null;
  stateRegistration: string;
  neighborhood: string;
  city: string;
  federativeUnit: string;
  cep: string;
  contacts: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
  }[];
}[];

type CompanyUsers =
  | {
      id: string;
      name: string;
      email: string;
      role: string;
      company: string;
    }[]
  | undefined;

type CompanyStocks = {
  id: string;
  name: string;
  companyName: string;
  responsible: {
    name: string;
    email: string;
  };
};

export type CompanyRouteInterfaces = {
  Company: Company;
  EditCompany: EditCompany;
  CompanySuppliers: CompanySuppliers;
  CompanyUsers: CompanyUsers;
  CompanyStocks: CompanyStocks;
  ManageCompany: ManageCompany;
};
