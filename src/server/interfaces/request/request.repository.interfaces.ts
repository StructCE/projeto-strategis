import z from "zod";

const getAllProps = z.object({
  filters: z.object({
    date: z.date(),
    requestResponsible: z.string(),
    status: z.string(),
  }),
});

type GetAllProps = z.infer<typeof getAllProps>;

const registerProps = z.object({
  description: z.string(),
  requestDate: z.date(),
  statusDescription: z.string().optional(),
  statusDate: z.date().optional(),
  statusResponsibleId: z.string(),
  responsibleId: z.string(),
  status: z.string(),
  stockId: z.string(),
  requestProducts: z.array(
    z.object({
      requestedQuantity: z.number(),
      releasedQuantity: z.number(),
      requestId: z.string(),
      productId: z.string(),
      unitId: z.string(),
    }),
  ),
});

type RegisterProps = z.infer<typeof registerProps>;

const editProps = z.object({
  id: z.string(),
  requestData: z.object({
    description: z.string().optional(),
    requestDate: z.date().optional(),
    statusDescription: z.string().optional().optional(),
    statusDate: z.date().optional().optional(),
    statusResponsibleId: z.string().optional(),
    responsibleId: z.string().optional(),
    status: z.string().optional(),
    stockId: z.string().optional(),
    requestProducts: z.array(
      z.object({
        id: z.string(),
        requestProduct: z.object({
          requestedQuantity: z.number().optional(),
          releasedQuantity: z.number().optional(),
          requestId: z.string().optional(),
          productId: z.string().optional(),
          unitId: z.string().optional(),
        }),
      }),
    ),
  }),
});

type EditProps = z.infer<typeof editProps>;

export const requestRepositorySchema = {
  getAllProps,
  registerProps,
  editProps,
};

export type RequestRepositoryInterfaces = {
  GetAllProps: GetAllProps;
  RegisterProps: RegisterProps;
  EditProps: EditProps;
};
