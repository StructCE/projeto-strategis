type Order = {
  id: string;
  date: Date;
  responsibleId: string;
  stockId: string;
};

type SerializedOrder = {
  id: string;
  date: Date;
  responsibleName: string;
  stockName: string;
  products: {
    buyQuantity: number;
    unitType: string;
    supplier: string;
  }[];
};

export type OrderRouteInterfaces = {
  Order: Order;
  SerializedOrder: SerializedOrder;
};
