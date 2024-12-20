import z from "zod";

const getAllProps = z
  .object({
    filters: z
      .object({
        date: z.date().optional(),
        responsible: z.string().optional(),
        adjustType: z.string().optional(),
        company: z.string().optional(),
      })
      .optional(),
  })
  .optional();

type GetAllProps = z.infer<typeof getAllProps>;

const registerProps = z.object({
  date: z.date(),
  responsibleId: z.string(),
  stockId: z.string(),
  type: z.string(),
  adjustProducts: z.array(
    z.object({
      productId: z.string(),
      oldStock: z.number(),
      adjustedStock: z.number(),
      reasonId: z.string(),
    }),
  ),
});

type RegisterProps = z.infer<typeof registerProps>;

export const adjustRepositorySchema = {
  getAllProps,
  registerProps,
};

export type AdjustRepositoryInterfaces = {
  GetAllProps: GetAllProps;
  RegisterProps: RegisterProps;
};
