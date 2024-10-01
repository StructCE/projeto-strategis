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

export type CompanyRouteInterfaces = {
  Company: Company;
};
