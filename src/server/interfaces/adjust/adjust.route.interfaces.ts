type Adjust = {
  id: string;
  name: string;
  date: Date;
  type: string;
  responsibleId: string;
  stockId: string;
};

type SerializedAdjust = {
  id: string;
  name: string;
  date: Date;
  type: string;
  responsibleName: string;
  stockName: string;
  adjustProducts: {
    id: string;
    oldStock: number;
    adjustedStock: number;
    reason: string;
    product: string;
    productCode: string;
    productUnit: string;
  }[];
};

export type AdjustRouteInterfaces = {
  Adjust: Adjust;
  SerializedAdjust: SerializedAdjust;
};
