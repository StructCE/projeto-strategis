export type Shelf = {
  id: string;
  name: string;
};

// Relacionamento entre Cabinet e Shelf, associando prateleiras a armários
export type CabinetShelf = {
  id: string;
  shelf: Shelf; // Inclui o objeto Shelf associado
};

// Representa a relação entre Stock e Cabinet
export type StockCabinet = {
  id: string;
  cabinetId: string;
  stockId: string;
  CabinetShelf: CabinetShelf[]; // Inclui as prateleiras associadas ao StockCabinet
};

// Representa um armário que pode ter várias prateleiras através de StockCabinet
export type CabinetWithShelves = {
  id: string;
  name: string;
  StockCabinet: StockCabinet[]; // Inclui os StockCabinets associados ao Cabinet
};

export type Cabinet = {
  id: string;
  name: string;
};

export type CabinetRouteInterfaces = {
  Cabinet: Cabinet;
  CabinetWithShelves: CabinetWithShelves;
};
