import z from "zod";

const registerProps = z.object({
  name: z.string(),
  modules: z.array(z.number()),
});

type RegisterProps = z.infer<typeof registerProps>;

const editProps = z.object({
  id: z.string(),
  data: z.object({
    name: z.string(),
    modules: z
      .array(
        z
          .string()
          .transform((val) => Number(val))
          .refine((val) => !isNaN(val)),
      )
      .optional(),
  }),
});

type EditProps = z.infer<typeof editProps>;

const deleteProps = z.object({
  id: z.string(),
});

type DeleteProps = z.infer<typeof deleteProps>;

export const roleRepositorySchema = {
  registerProps,
  editProps,
  deleteProps,
};

export type RoleRepositoryInterfaces = {
  RegisterProps: RegisterProps;
  EditProps: EditProps;
  DeleteProps: DeleteProps;
};
