import z from "zod";

const getReasonByNameProps = z.object({
  name: z.string(),
});

type GetReasonByNameProps = z.infer<typeof getReasonByNameProps>;

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

export const adjustReasonRepositorySchema = {
  getReasonByNameProps,
  registerProps,
  editProps,
  removeProps,
};

export type AdjustReasonRepositoryInterfaces = {
  GetReasonByNameProps: GetReasonByNameProps;
  RegisterProps: RegisterProps;
  EditProps: EditProps;
  RemoveProps: RemoveProps;
};
