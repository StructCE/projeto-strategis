import z from "zod";

const getAll = z
  .object({
    filters: z
      .object({
        company: z.string().optional(),
        includeUnassociated: z.boolean().optional(),
      })
      .optional(),
  })
  .optional();

type GetAll = z.infer<typeof getAll>;

const cabinetFromStockProps = z.object({
  stockId: z.string().optional(),
  stockName: z.string().optional(),
});

type CabinetFromStockProps = z.infer<typeof cabinetFromStockProps>;

const registerProps = z.object({
  name: z.string(),
});

type RegisterProps = z.infer<typeof registerProps>;

const editProps = z.object({
  id: z.string(),
  data: z.object({
    name: z.string().optional(),
  }),
});

type EditProps = z.infer<typeof editProps>;

const removeProps = z.object({
  id: z.string(),
});

type RemoveProps = z.infer<typeof removeProps>;

export const cabinetRepositorySchema = {
  getAll,
  cabinetFromStockProps,
  registerProps,
  editProps,
  removeProps,
};

export type CabinetRepositoryInterfaces = {
  GetAll: GetAll;
  CabinetFromStockProps: CabinetFromStockProps;
  RegisterProps: RegisterProps;
  EditProps: EditProps;
  RemoveProps: RemoveProps;
};
