type ProductsCount = {
  productsCount: number;
};

type Product = {
  id: string;
  name: string;
  status: string;
  buyQuantity: number;
  buyUnit: string;
  buyDate: Date;
  currentStock: number;
  minimunStock: number;
  maximumStock: number;
  currentInventory: number;
  controlTypeId: string;
  categoryId: string;
  sectorOfUseId: string;
  stockId: string;
  shelfId: string;
  cabinetId: string;
};

export type ProductRouteInterfaces = {
  ProductsCount: ProductsCount;
  Product: Product;
};
