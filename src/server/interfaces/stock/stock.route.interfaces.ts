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
  cabinets: { name: string; shelves: string[] }[];
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
