export type Cabinet = {
  id: string;
  name: string;
};

export type Shelf = {
  id: string;
  name: string;
  cabinetId: string; // Relacionamento direto com Cabinet
};

// Representa um armário (Cabinet) que pode ter várias prateleiras (Shelf)
export type CabinetWithShelves = {
  id: string;
  name: string;
  // stockCabinet: StockCabinet[]; // Inclui a relação entre Stock e Cabinet
  shelf: Shelf[]; // Inclui as prateleiras associadas ao Cabinet
};

export type CabinetRouteInterfaces = {
  Cabinet: Cabinet;
  CabinetWithShelves: CabinetWithShelves;
};
