export type Inventory = {
  id: string;
  date: Date;
  responsibleId: string;
};

export type InventoryProduct = {
  id: string;
  code: string;
  name: string;
  unit: {
    id: string;
    name: string;
    abbreviation: string;
    unitsPerPack: number;
  };
  inventoryQuantity: number;
  stockQuantity: number;
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
  inventoryProducts: InventoryProduct[];
};

export type InventoryRouteInterfaces = {
  Inventory: Inventory;
  SerializedInventory: SerializedInventory;
};
