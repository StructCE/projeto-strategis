import z from "zod";

const getAllProps = z.object({
  filters: z.object({
    date: z.date().optional(),
    responsible: z.string().optional(),
  }).optional(),
}).optional();

type GetAllProps = z.infer<typeof getAllProps>;

const registerProps = z.object({
  responsibleId: z.string(),
  date: z.date(),
  stockId: z.string(),
  status: z.string(),
  inventoryProducts: z.array(
    z.object({
      inventoryQuantity: z.number(),
      stockQuantity: z.number(),
      productId: z.string(),
    }),
  ),
});

type RegisterProps = z.infer<typeof registerProps>;

const editProps = z.object({
  id: z.string(),
  inventoryData: z.object({
    status: z.string(),
  }),
});

type EditProps = z.infer<typeof editProps>;

export const inventoryRepositorySchema = {
  getAllProps,
  registerProps,
  editProps,
};

export type InventoryRepositoryInterfaces = {
  GetAllProps: GetAllProps;
  RegisterProps: RegisterProps;
  EditProps: EditProps;
};
