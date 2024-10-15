export type Stock = {
  id: string;
  name: string;
  companyId: string;
  legalResponsibleId: string;
};

export type StockWithCabinets = {
  id: string;
  name: string;
  company: { id: string; name: string };
  legalResponsible: {
    id: string;
    userId: string;
    name: string;
    email: string;
    role: string;
    phone: string;
  };
  StockCabinet: {
    id: string;
    cabinetId: string;
    cabinet: {
      Shelf: {
        id: string;
        name: string;
        cabinetId: string;
      }[];
    } & {
      id: string;
      name: string;
    };
  }[];
};

export type StockRouteInterfaces = {
  StockWithCabinets: StockWithCabinets;
  Stock: Stock;
};
