import { z } from "zod";

const createProps = z.object({
  status: z.string(),
  buyQuantity: z.string(),
  buyUnit: z.string(),
  buyDate: z.date(),
  currentStock: z.number(),
  minimunStock: z.number(),
  maximumStock: z.number(),
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
    status: z.string(),
    buyQuantity: z.string(),
    buyUnit: z.string(),
    buyDate: z.date(),
    currentStock: z.number(),
    minimunStock: z.number(),
    maximumStock: z.number(),
    controlTypeId: z.string(),
    categoryId: z.string(),
    sectorOfUseId: z.string(),
    stockId: z.string(),
    shelfId: z.string(),
    cabinetId: z.string(),
  }),
});

type EditProps = z.infer<typeof editProps>

const removeProps = z.object({
  id: z.string()
})

type RemoveProps = z.infer<typeof removeProps>

export const productRepositorySchema = {
  createProps,
  editProps,
  removeProps
}

export type ProductRepositoryInterfaces = {
  CreateProps: CreateProps,
  EditProps: EditProps,
  RemoveProps: RemoveProps
}