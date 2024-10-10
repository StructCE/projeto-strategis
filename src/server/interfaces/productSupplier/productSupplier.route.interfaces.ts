import type {
  Cabinet,
  ControlType,
  ProductCategory,
  Shelf,
  Stock,
  Supplier,
  Unit,
  UseSector,
} from "@prisma/client";

type ProductsCount = {
  productsCount: number;
};

type Product = {
  id: string;
  name: string;
  status: string;
  buyQuantity: number;
  buyDate: Date;
  currentStock: number;
  minimunStock: number;
  maximumStock: number;
  currentInventory: number;
  unitId: string;
  controlTypeId: string;
  categoryId: string;
  sectorOfUseId: string;
  stockId: string;
  shelfId: string;
  cabinetId: string;
};

type ProductRelations = {
  unit: Unit;
  controlType: ControlType;
  category: ProductCategory;
  sectorOfUse: UseSector;
  stock: Stock;
  shelf: Shelf;
  cabinet: Cabinet;
  // suppliers: Supplier[]
};

export type ProductRouteInterfaces = {
  ProductsCount: ProductsCount;
  Product: Product;
  ProductWithRelations: Product & ProductRelations;
};
