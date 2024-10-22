import { z } from "zod";

const getAllProps = z.object({
  filters: z.object({
    name: z.string(),
    stock: z.string(),
    controlType: z.string(),
    productCategory: z.string(),
    sectorOfUse: z.string(),
  }),
});

type GetAllProps = z.infer<typeof getAllProps>;

const getProductsBySupplierIdProps = z.object({
  supplierId: z.string(),
});

type GetProductsBySupplierIdProps = z.infer<
  typeof getProductsBySupplierIdProps
>;

const createProps = z.object({
  name: z.string(),
  code: z.string(),
  ncm: z.number(),
  cfop: z.number(),
  status: z.string(),
  ProductSupplier: z.array(z.string()).optional(),
  parentProductId: z.string().optional(),
  unitId: z.string(),
  buyQuantity: z.number(),
  buyDay: z.string(),
  currentStock: z.number(),
  minimunStock: z.number(),
  maximumStock: z.number(),
  lastInventory: z.number(),
  controlTypeId: z.string(),
  categoryId: z.string(),
  sectorOfUseId: z.string(),
  shelfId: z.string(),
  usersWithPermission: z.array(z.string()),
});

type CreateProps = z.infer<typeof createProps>;

const editProps = z.object({
  id: z.string(),
  data: z.object({
    name: z.string(),
    code: z.string(),
    ncm: z.number(),
    cfop: z.number(),
    status: z.string(),
    ProductSupplier: z.array(z.string()).optional(),
    parentProductId: z.string().optional(),
    unitId: z.string(),
    buyQuantity: z.number(),
    buyDay: z.string(),
    currentStock: z.number(),
    minimunStock: z.number(),
    maximumStock: z.number(),
    lastInventory: z.number(),
    controlTypeId: z.string(),
    categoryId: z.string(),
    sectorOfUseId: z.string(),
    shelfId: z.string(),
    usersWithPermission: z.array(z.string()),
  }),
});

type EditProps = z.infer<typeof editProps>;

const removeProps = z.object({
  id: z.string(),
});

type RemoveProps = z.infer<typeof removeProps>;

export const productRepositorySchema = {
  getAllProps,
  getProductsBySupplierIdProps,
  createProps,
  editProps,
  removeProps,
};

export type ProductRepositoryInterfaces = {
  GetAllProps: GetAllProps;
  GetProductsBySupplierIdProps: GetProductsBySupplierIdProps;
  CreateProps: CreateProps;
  EditProps: EditProps;
  RemoveProps: RemoveProps;
};
