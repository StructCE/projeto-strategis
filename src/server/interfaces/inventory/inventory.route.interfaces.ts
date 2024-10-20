export type Inventory = {
  id: string;
  date: Date;
  responsibleId: string;
  stockId: string;
  status: string;
};

export type InventoryProduct = {
  id: string;
  productId: string;
  code: string;
  name: string;
  stockQuantity: number;
  inventoryQuantity: number;
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

export type SerializedInventory = {
  id: string;
  date: Date;
  responsibleName: string;
  stockId: string;
  status: string;
  inventoryProducts: InventoryProduct[];
};

export type InventoryRouteInterfaces = {
  Inventory: Inventory;
  SerializedInventory: SerializedInventory;
};
