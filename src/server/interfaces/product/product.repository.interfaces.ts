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

const createProps = z.object({
  name: z.string(),
  status: z.string(),
  buyQuantity: z.number(),
  buyUnit: z.string(),
  buyDate: z.date(),
  currentStock: z.number(),
  minimunStock: z.number(),
  maximumStock: z.number(),
  currentInventory: z.number(),
  controlTypeId: z.string(),
  categoryId: z.string(),
  sectorOfUseId: z.string(),
  stockId: z.string(),
  shelfId: z.string(),
  cabinetId: z.string(),
});

type CreateProps = z.infer<typeof createProps>;

const editProps = z.object({
  id: z.string(),
  data: z.object({
    name: z.string().optional(),
    status: z.string().optional(),
    buyQuantity: z.number().optional(),
    buyUnit: z.string().optional(),
    buyDate: z.date().optional(),
    currentStock: z.number().optional(),
    minimunStock: z.number().optional(),
    maximumStock: z.number().optional(),
    currentInventory: z.number().optional(),
    controlTypeId: z.string().optional(),
    categoryId: z.string().optional(),
    sectorOfUseId: z.string().optional(),
    stockId: z.string().optional(),
    shelfId: z.string().optional(),
    cabinetId: z.string().optional(),
  }),
});

type EditProps = z.infer<typeof editProps>;

const removeProps = z.object({
  id: z.string(),
});

type RemoveProps = z.infer<typeof removeProps>;

export const productRepositorySchema = {
  getAllProps,
  createProps,
  editProps,
  removeProps,
};

export type ProductRepositoryInterfaces = {
  GetAllProps: GetAllProps;
  CreateProps: CreateProps;
  EditProps: EditProps;
  RemoveProps: RemoveProps;
};
