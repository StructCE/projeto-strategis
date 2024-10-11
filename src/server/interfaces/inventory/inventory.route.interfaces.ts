type Inventory = {
  id: string;
  name: string;
  date: Date;
  responsibleId: string;
};

type SerializedInventory = {
  id: string;
  name: string;
  date: Date;
  responsibleName: string;
  inventoryProducts: {
    id: string;
    code: string;
    product: string;
    unit: string;
    inventoryQuantity: number;
    stockQuantity: number;
  }[];
};

export type InventoryRouteInterfaces = {
  Inventory: Inventory;
  SerializedInventory: SerializedInventory;
};
