import z from "zod";

const getAllProps = z.object({
  filters: z.object({
    name: z.string(),
    company: z.string(),
    role: z.string(),
  }),
});

type GetAllProps = z.infer<typeof getAllProps>;

const registerProps = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

type RegisterProps = z.infer<typeof registerProps>;

const editProps = z.object({
  id: z.string(),
  data: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
  }),
});

type EditProps = z.infer<typeof editProps>;

const deleteProps = z.object({
  id: z.string(),
});

type DeleteProps = z.infer<typeof deleteProps>;

export const userRepositorySchema = {
  getAllProps,
  registerProps,
  editProps,
  deleteProps,
};

export type UserRepositoryInterfaces = {
  GetAllProps: GetAllProps;
  RegisterProps: RegisterProps;
  EditProps: EditProps;
  DeleteProps: DeleteProps;
};
