type Company = {
  id: string;
  name: string;
  cnpj: string;
  type: string;
  headquarters: string;
  phone: string;
  stateRegistration: string;
  taxRegime: string;
  address: string;
  neighborhood: string;
  federativeUnit: string;
  cep: string;
  filesAddress: string;
  legalResponsibleId: string;
};

type CompanySuppliers = {
  cnpj: string;
  name: string;
  address: string;
  phone: string;
  stateRegistration: string;
  neighborhood: string;
  city: string;
  federativeUnit: string;
  cep: string;
  contacts: {
    id: string;
    name: string | null;
    email: string | null;
    phone: string | null;
    cargo: string;
  }[];
}[];

type CompanyUsers =
  | {
      name: string | null;
      email: string | null;
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
};
