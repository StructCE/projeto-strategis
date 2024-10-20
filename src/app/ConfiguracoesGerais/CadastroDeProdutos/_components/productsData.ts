export type Product = {
  name: string;
  code: string;
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
  status: string;
  parentProduct?: {
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
  } | null;
  unit: {
    id: string;
    name: string;
    abbreviation: string;
    unitsPerPack: number;
  };
  buyQuantity: number;
  buyDay: string;
  currentStock: number;
  minimunStock: number;
  maximumStock: number;
  controlType: { id: string; name: string };
  category: { id: string; name: string };
  sectorOfUse: { id: string; name: string };
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
