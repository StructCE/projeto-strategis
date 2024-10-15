type ProductsCount = {
  productsCount: number;
};

export type Product = {
  id: string;
  code: string;
  name: string;
  status: string;
  ProductSupplier?: { supplierId: string }[] | null;
  buyQuantity: number;
  buyDay: string;
  currentStock: number;
  minimunStock: number;
  maximumStock: number;
  lastInventory: number;
  unitId: string;
  controlTypeId: string;
  categoryId: string;
  sectorOfUseId: string;
  shelfId: string;
  parentProductId?: string | null;
  usersWithPermission?: { userId: string }[] | null;
};

export type ProductWithFeatures = {
  id: string;
  code: string;
  name: string;
  status: string;
  buyQuantity: number;
  buyDay: string;
  currentStock: number;
  minimunStock: number;
  maximumStock: number;
  lastInventory: number;
  unitId: string;
  controlTypeId: string;
  categoryId: string;
  sectorOfUseId: string;
  shelfId: string;
  parentProductId?: string | null;
  // usersWithPermission: string | null;

  // Relations
  parentProduct?: Product | null;
  unit: {
    id: string;
    name: string;
    abbreviation: string;
    unitsPerPack: number;
  };
  controlType: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  sectorOfUse: {
    id: string;
    name: string;
  };
  shelf: {
    id: string;
    name: string;
    cabinet: {
      id: string;
      name: string;
    };
  };
  ProductSupplier: {
    id: string;
    value?: number | null;
    supplier: {
      id: string;
      name: string;
      cnpj: string;
      email: string;
      phone?: string | null;
      stateRegistration: string;
      address: string;
      neighborhood: string;
      city: string;
      federativeUnit: string;
      cep: string;
    };
  }[];
  usersWithPermission: { id: string; userId: string; productId: string }[];
};

export type ProductRouteInterfaces = {
  ProductsCount: ProductsCount;
  Product: Product;
  ProductWithFeatures: ProductWithFeatures;
};
