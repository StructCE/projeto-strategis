type ProductsCount = {
  productsCount: number;
};

export type Product = {
  id: string;
  code: string;
  name: string;
  ncm: number;
  cfop: number;
  status: string | null;
  ProductSupplier?: { supplierId: string }[] | null;
  buyQuantity: number | null;
  buyDay: string | null;
  currentStock: number | null;
  minimunStock: number | null;
  maximumStock: number | null;
  lastInventory: number | null;
  unitId: string;
  controlTypeId: string | null;
  categoryId: string | null;
  sectorOfUseId: string | null;
  shelfId: string | null;
  parentProductId?: string | null;
  usersWithPermission?: { userId: string }[] | null;
};

export type ProductWithFeatures = {
  id: string;
  code: string;
  name: string;
  ncm: number;
  cfop: number;
  status: string | null;
  buyQuantity: number | null;
  buyDay: string | null;
  currentStock: number | null;
  minimunStock: number | null;
  maximumStock: number | null;
  lastInventory: number | null;
  unitId: string;
  controlTypeId: string | null;
  categoryId: string | null;
  sectorOfUseId: string | null;
  shelfId: string | null;
  parentProductId?: string | null;

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
  } | null;
  category: {
    id: string;
    name: string;
  } | null;
  sectorOfUse: {
    id: string;
    name: string;
  } | null;
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
  } | null;

  ProductSupplier: {
    id: string;
    value?: number | null;
    supplier: {
      id: string;
      name: string;
      cnpj: string;
      email: string | null;
      phone?: string | null;
      stateRegistration: string;
      address: string;
      neighborhood: string;
      city: string;
      federativeUnit: string;
      cep: string;
    };
  }[];
  usersWithPermission: {
    id: string;
    userId: string;
    productId: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }[];
};

export type FlatProductWithFeatures = {
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
  address: {
    shelf: {
      id: string;
      name: string;
    };
    cabinet: {
      id: string;
      name: string;
    };
    stock: {
      id: string;
      name: string;
      companyId: string;
      legalResponsibleId: string;
    };
  };
};

export type ProductRouteInterfaces = {
  ProductsCount: ProductsCount;
  Product: Product;
  ProductWithFeatures: ProductWithFeatures;
  FlatProductWithFeatures: FlatProductWithFeatures;
};
