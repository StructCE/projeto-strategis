type Stock = {
  id: string;
  name: string;
  companyId: string;
  legalResponsibleId: string;
};

type SerializedStock = {
  id: string;
  name: string;
  company: string;
  cabinets: string[];
  shelfs: string[];
  legalResponsible: {
    name: string;
    email: string;
    role: string;
    phone: string;
  };
};

export type StockRouteInterfaces = {
  SerializedStock: SerializedStock;
  Stock: Stock;
};
