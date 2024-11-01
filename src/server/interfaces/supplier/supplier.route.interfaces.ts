export type Supplier = {
  id: string;
  name: string;
  cnpj: string;
  email: string | null;
  phone: string | null;
  stateRegistration: string;
  address: string;
  neighborhood: string;
  city: string;
  federativeUnit: string;
  cep: string;
  contacts?: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
  }[];
};

export type SupplierRouteInterfaces = {
  Supplier: Supplier;
};
