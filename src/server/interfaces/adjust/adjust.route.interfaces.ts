export type Adjust = {
  id: string;
  date: Date;
  type: string;
  responsibleId: string;
  stockId: string;
};

export type AdjustProduct = {
  id: string;
  code: string;
  name: string;
  currentStock: number;
  oldStock: number;
  adjustedStock: number;
  reason: { id: string; name: string };
  unit: {
    id: string;
    name: string;
    abbreviation: string;
    unitsPerPack: number;
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

export type SerializedAdjust = {
  id: string;
  date: Date;
  type: string;
  responsibleName: string;
  stockName: string;
  adjustProducts: AdjustProduct[];
};

export type AdjustRouteInterfaces = {
  Adjust: Adjust;
  SerializedAdjust: SerializedAdjust;
};
