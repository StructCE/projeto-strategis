import z from "zod";

const registerProps = z.object({
  name: z.string(),
  abbreviation: z.string(),
  unitsPerPack: z.number(),
});

type RegisterProps = z.infer<typeof registerProps>;

const editProps = z.object({
  id: z.string(),
  data: z.object({
    name: z.string().optional(),
    abbreviation: z.string().optional(),
    unitsPerPack: z.number().optional(),
  }),
});

type EditProps = z.infer<typeof editProps>;

const removeProps = z.object({
  id: z.string(),
});

type RemoveProps = z.infer<typeof removeProps>;

export const unitRepositorySchema = {
  registerProps,
  editProps,
  removeProps,
};

export type UnitRepositoryInterfaces = {
  RegisterProps: RegisterProps;
  EditProps: EditProps;
  RemoveProps: RemoveProps;
};
