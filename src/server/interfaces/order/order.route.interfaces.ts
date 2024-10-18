export type Order = {
  id: string;
  date: Date;
  responsibleId: string;
  // stockId: string;
};

export type OrderProduct = {
  id: string;
  code: string;
  name: string;
  purchaseQuantity: number;
  currentStock: number;
  minimunStock: number;
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
      email: string;
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
  };
};

export type SerializedOrder = {
  id: string;
  date: Date;
  responsibleName: string;
  // stock: { id: string; name: string };
  orderProducts: OrderProduct[];
};

export type OrderRouteInterfaces = {
  Order: Order;
  SerializedOrder: SerializedOrder;
};
