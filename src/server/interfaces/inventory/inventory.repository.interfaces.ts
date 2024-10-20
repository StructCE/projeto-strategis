import z from "zod";

const getAllProps = z.object({
  // filters: z.object({
  //   date: z.date().optional(),
  //   responsible: z.string().optional(),
  // }),
});

type GetAllProps = z.infer<typeof getAllProps>;

const registerProps = z.object({
  responsibleId: z.string(),
  date: z.date(),
  stockId: z.string(),
  inventoryProducts: z.array(
    z.object({
      inventoryQuantity: z.number(),
      stockQuantity: z.number(),
      productId: z.string(),
    }),
  ),
});

type RegisterProps = z.infer<typeof registerProps>;

export const inventoryRepositorySchema = {
  getAllProps,
  registerProps,
};

export type InventoryRepositoryInterfaces = {
  GetAllProps: GetAllProps;
  RegisterProps: RegisterProps;
};
