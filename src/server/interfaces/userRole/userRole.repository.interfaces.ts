import { z } from "zod";

const createProps = z.object({
  userId: z.string(),
  companyId: z.string(),
  roleId: z.string(),
});

type CreateProps = z.infer<typeof createProps>;

const editProps = z.object({
  id: z.string(),
  data: z.object({
    userId: z.string().optional(),
    companyId: z.string().optional(),
    roleId: z.string().optional(),
  }),
});

type EditProps = z.infer<typeof editProps>;

const removeProps = z.object({
  id: z.string(),
});

type RemoveProps = z.infer<typeof removeProps>;

export const userRoleSchema = {
  createProps,
  editProps,
  removeProps,
};

export type UserRoleInterfaces = {
  CreateProps: CreateProps;
  EditProps: EditProps;
  RemoveProps: RemoveProps;
};
