import { z } from "zod";

const getOneProps = z.object({
  id: z.string(),
});

type GetOneProps = z.infer<typeof getOneProps>;

const registerProps = z.object({
  name: z.string(),
  cnpj: z.string(),
  type: z.string(),
  headquarters: z.string(),
  phone: z.string(),
  stateRegistration: z.string(),
  taxRegime: z.string(),
  address: z.string(),
  neighborhood: z.string(),
  federativeUnit: z.string(),
  cep: z.string(),
  filesAddress: z.string(),
  legalResponsibleId: z.string(),
});

type RegisterProps = z.infer<typeof registerProps>;

export const companyRepositorySchema = {
  getOneProps,
  registerProps,
};

export type CompanyRepositoryInterfaces = {
  GetOneProps: GetOneProps;
  RegisterProps: RegisterProps;
};
