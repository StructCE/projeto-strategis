export type Shelf = {
  id: string;
  name: string;
};

export type CabinetShelf = {
  id: string;
  shelf: Shelf; // Inclui o objeto Shelf
};

export type StockCabinet = {
  id: string;
  CabinetShelf: CabinetShelf[]; // Inclui as prateleiras associadas ao StockCabinet
};

export type Cabinet = {
  id: string;
  name: string;
  StockCabinet: StockCabinet[]; // Inclui os StockCabinets associados ao Cabinet
};

export type CabinetRouteInterfaces = {
  Cabinet: Cabinet;
};
