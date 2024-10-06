type Stock = {
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
  Stock: Stock;
};
