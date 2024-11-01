import z from "zod";

const getAllProps = z
  .object({
    filters: z.object({
      name: z.string().optional(),
      modules: z.array(z.string()).optional(),
    }),
  })
  .optional();

type GetAllProps = z.infer<typeof getAllProps>;

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
  getAllProps,
  registerProps,
  editProps,
  deleteProps,
};

export type RoleRepositoryInterfaces = {
  GetAllProps: GetAllProps;
  RegisterProps: RegisterProps;
  EditProps: EditProps;
  DeleteProps: DeleteProps;
};
