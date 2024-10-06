import { z } from "zod";

const getAllProps = z.object({
  filters: z.object({
    name: z.string(),
    company: z.string(),
  }),
});

type GetAllProps = z.infer<typeof getAllProps>;

const registerProps = z.object({
  name: z.string(),
  companyId: z.string(),
  legalResponsibleId: z.string(),
  cabinetsId: z.array(z.string()),
  shelfsId: z.array(z.string()),
});

type RegisterProps = z.infer<typeof registerProps>;

export const stockRepositorySchema = {
  getAllProps,
  registerProps,
};

export type StockRepositoryInterfaces = {
  GetAllProps: GetAllProps;
  RegisterProps: RegisterProps;
};
