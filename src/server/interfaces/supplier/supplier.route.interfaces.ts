export type Supplier = {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  stateRegistration: string;
  address: string;
  neighborhood: string;
  city: string;
  federativeUnit: string;
  cep: string;
};

export type SupplierRouteInterfaces = {
  Supplier: Supplier;
};
