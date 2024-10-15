import z from "zod";

const getUserById = z.object({
  id: z.string().optional(),
});

type GetUserById = z.infer<typeof getUserById>;

const registerProps = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  UserRole: z.array(
    z.object({
      companyId: z.string(),
      roleId: z.string(),
    }),
  ),
});

type RegisterProps = z.infer<typeof registerProps>;

const editProps = z.object({
  id: z.string(),
  data: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    UserRole: z.array(
      z.object({
        id: z.string(),
        companyId: z.string(),
        roleId: z.string(),
      }),
    ),
  }),
});

type EditProps = z.infer<typeof editProps>;

const deleteProps = z.object({
  id: z.string(),
});

type DeleteProps = z.infer<typeof deleteProps>;

export const userRepositorySchema = {
  getUserById,
  registerProps,
  editProps,
  deleteProps,
};

export type UserRepositoryInterfaces = {
  GetUserById: GetUserById;
  RegisterProps: RegisterProps;
  EditProps: EditProps;
  DeleteProps: DeleteProps;
};
