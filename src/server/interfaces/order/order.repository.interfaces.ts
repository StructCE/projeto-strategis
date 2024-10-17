import z from "zod";

const getAllProps = z.object({
  // filters: z.object({
  //   date: z.date().optional(),
  //   responsibleName: z.string().optional(),
  // }),
});

type GetAllProps = z.infer<typeof getAllProps>;

const registerProps = z.object({
  date: z.date(),
  responsibleId: z.string(),
  stockId: z.string(),
  orderProducts: z.array(
    z.object({
      purchaseQuantity: z.number(),
      productSupplierId: z.string(),
    }),
  ),
});

type RegisterProps = z.infer<typeof registerProps>;

const editProps = z.object({
  id: z.string(),
  data: z.object({
    date: z.date().optional(),
    responsibleId: z.string().optional(),
    stockId: z.string().optional(),
    orderProducts: z.array(
      z.object({
        id: z.string(),
        data: z.object({
          buyQuantity: z.number().optional(),
          productSupplierId: z.string().optional(),
        }),
      }),
    ),
  }),
});

type EditProps = z.infer<typeof editProps>;

const deleteProps = z.object({
  id: z.string(),
});

type DeleteProps = z.infer<typeof deleteProps>;

export const orderRepositorySchema = {
  getAllProps,
  registerProps,
  editProps,
  deleteProps,
};

export type OrderRepositoryInterfaces = {
  GetAllProps: GetAllProps;
  RegisterProps: RegisterProps;
  EditProps: EditProps;
  DeleteProps: DeleteProps;
};
