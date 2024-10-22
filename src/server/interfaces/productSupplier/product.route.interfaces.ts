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
  shelfId: string | null;
  parentProductId?: string | null;
  usersWithPermission?: { userId: string }[] | null;
};

export type ProductSupplierWithFeatures = {
  id: string;
  product: {
    id: string;
    code: string;
    name: string;
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
