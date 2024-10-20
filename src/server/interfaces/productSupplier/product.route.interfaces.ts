type Product = {
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

export type ProductSupplierWithFeatures = {
  id: string;
  product: {
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
  supplier: {
    id: string;
    name: string;
  };
};

export type ProductSupplierRouteInterfaces = {
  ProductSupplierWithFeatures: ProductSupplierWithFeatures;
};
