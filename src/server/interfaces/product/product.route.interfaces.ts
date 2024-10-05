type ProductsCount = {
  productsCount: number;
};

type Product = {
  id: string;
  status: string;
  buyQuantity: string;
  buyUnit: string;
  buyDate: Date;
  currentStock: number;
  minimunStock: number;
  maximumStock: number;
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
