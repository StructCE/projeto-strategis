import z from "zod";

const cabinetFromStockProps = z.object({
  stockId: z.string(),
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
  cabinetFromStockProps,
  registerProps,
  editProps,
  removeProps,
};

export type CabinetRepositoryInterfaces = {
  CabinetFromStockProps: CabinetFromStockProps;
  RegisterProps: RegisterProps;
  EditProps: EditProps;
  RemoveProps: RemoveProps;
};
