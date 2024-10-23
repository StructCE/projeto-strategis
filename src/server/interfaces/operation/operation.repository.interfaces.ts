import z from "zod";

const getAllProps = z
  .object({
    filters: z.object({
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      operator: z.string().optional(),
      company: z.string().optional(),
      operationType: z.string().optional(),
    }),
  })
  .optional();

type GetAllProps = z.infer<typeof getAllProps>;

const countOperationsProps = z.object({
  periodTime: z.number(),
});

type CountOperationProps = z.infer<typeof countOperationsProps>;

export type OperationRepositoryInterfaces = {
  CountOperationProps: CountOperationProps;
  GetAllProps: GetAllProps;
};

export const operationRepositorySchema = {
  countOperationsProps,
  getAllProps,
};
