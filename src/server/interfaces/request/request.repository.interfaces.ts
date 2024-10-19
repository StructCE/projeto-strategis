import z from "zod";

const getAllProps = z.object({
  // filters: z.object({
  //   date: z.date(),
  //   requestResponsible: z.string(),
  //   status: z.string(),
  // }),
});

type GetAllProps = z.infer<typeof getAllProps>;

const registerProps = z.object({
  description: z.string(),
  requestDate: z.date(),
  responsibleId: z.string(),
  status: z.string(),
  statusDescription: z.string().optional(),
  statusDate: z.date().optional(),
  statusResponsibleId: z.string().optional(),
  // stockId: z.string(),
  requestProducts: z.array(
    z.object({
      requestedQuantity: z.number(),
      releasedQuantity: z.number().optional(),
      // requestId: z.string(),
      productId: z.string(),
      // unitId: z.string(),
    }),
  ),
});

type RegisterProps = z.infer<typeof registerProps>;

const editProps = z.object({
  id: z.string(),
  requestData: z.object({
    // description: z.string(),
    // requestDate: z.date(),
    // responsibleId: z.string(),
    status: z.string(),
    statusDescription: z.string().optional(),
    statusDate: z.date().optional(),
    statusResponsibleId: z.string().optional(),
    // stockId: z.string(),
    requestProducts: z.array(
      z.object({
        id: z.string(),
        // productId: z.string(),
        // requestedQuantity: z.number(),
        releasedQuantity: z.number().optional(),
        // requestId: z.string(),
        // productId: z.string(),
        // unitId: z.string(),
      }),
    ),
  }),
});

type EditProps = z.infer<typeof editProps>;

const deleteProps = z.object({
  id: z.string(),
});

type DeleteProps = z.infer<typeof deleteProps>;

export const requestRepositorySchema = {
  getAllProps,
  registerProps,
  editProps,
  deleteProps,
};

export type RequestRepositoryInterfaces = {
  GetAllProps: GetAllProps;
  RegisterProps: RegisterProps;
  EditProps: EditProps;
  DeleteProps: DeleteProps;
};
