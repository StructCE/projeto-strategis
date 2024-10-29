export type Order = {
  id: string;
  date: Date;
  responsibleId: string;
  status: boolean;
  // stockId: string;
};

export type OrderProduct = {
  id: string;
  code: string;
  name: string;
  ncm: number;
  cfop: number;
  purchaseQuantity: number | null;
  currentStock: number | null;
  minimunStock: number | null;
  unit: {
    id: string;
    name: string;
    abbreviation: string;
    unitsPerPack: number;
  };
  ProductSupplier: {
    id: string;
    supplier: {
      id: string;
      name: string;
      cnpj: string;
      email: string | null;
      phone?: string | null;
      stateRegistration: string;
      address: string;
      neighborhood: string;
      city: string;
      federativeUnit: string;
      cep: string;
    };
  };
  shelf: {
    id: string;
    name: string;
    cabinet: {
      id: string;
      name: string;
      StockCabinet: {
        stock: {
          id: string;
          name: string;
          companyId: string;
          legalResponsibleId: string;
        };
      }[];
    };
  } | null;
};

export type SerializedOrder = {
  id: string;
  date: Date;
  responsible: { id: string; name: string; company: string };
  status: boolean;
  // stock: { id: string; name: string };
  orderProducts: OrderProduct[];
};

export type OrderRouteInterfaces = {
  Order: Order;
  SerializedOrder: SerializedOrder;
};
