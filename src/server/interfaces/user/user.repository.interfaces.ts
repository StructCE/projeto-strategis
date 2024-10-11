import z from "zod";

const registerProps = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  companyId: z.string(),
  roleId: z.string(),
});

type RegisterProps = z.infer<typeof registerProps>;

const editProps = z.object({
  id: z.string(),
  data: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    companyId: z.string().optional(),
    roleId: z.string().optional(),
  }),
});

type EditProps = z.infer<typeof editProps>;

const deleteProps = z.object({
  id: z.string(),
});

type DeleteProps = z.infer<typeof deleteProps>;

export const userRepositorySchema = {
  registerProps,
  editProps,
  deleteProps,
};

export type UserRepositoryInterfaces = {
  RegisterProps: RegisterProps;
  EditProps: EditProps;
  DeleteProps: DeleteProps;
};
