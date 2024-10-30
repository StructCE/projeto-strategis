import z from "zod";

const getAll = z
  .object({
    filters: z
      .object({
        company: z.string().optional(),
      })
      .optional(),
  })
  .optional();

type GetAll = z.infer<typeof getAll>;

const registerProps = z.object({
  cabinetId: z.string(),
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

export const shelfRepositorySchema = {
  getAll,
  registerProps,
  editProps,
  removeProps,
};

export type ShelfRepositoryInterfaces = {
  GetAll: GetAll;
  RegisterProps: RegisterProps;
  EditProps: EditProps;
  RemoveProps: RemoveProps;
};
