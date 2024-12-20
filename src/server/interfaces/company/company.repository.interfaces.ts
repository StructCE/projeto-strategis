import { z } from "zod";

const getAllProps = z
  .object({
    filters: z.object({
      cnpj: z.string().optional(),
      name: z.string().optional(),
      state: z.string().optional(),
      taxRegime: z.string().optional(),
    }),
  })
  .optional();

type GetAllProps = z.infer<typeof getAllProps>;

const countRegisteredUsers = z.object({
  id: z.string().optional(),
  cnpj: z.string().optional(),
});

type CountRegisteredUsers = z.infer<typeof countRegisteredUsers>;

const countRegisteredSuppliers = z.object({
  id: z.string().optional(),
  cnpj: z.string().optional(),
});

type CountRegisteredSuppliers = z.infer<typeof countRegisteredSuppliers>;

const countRegisteredStocks = z.object({
  id: z.string().optional(),
  cnpj: z.string().optional(),
});

type CountRegisteredStocks = z.infer<typeof countRegisteredStocks>;

const getOneProps = z.object({
  id: z.string().optional(),
  cnpj: z.string().optional(),
});

type GetOneProps = z.infer<typeof getOneProps>;

const getCompanyUsersProps = z.object({
  id: z.string().optional(),
  cnpj: z.string().optional(),
});

type GetCompanyUsersProps = z.infer<typeof getCompanyUsersProps>;

const getCompanySuppliersProps = z.object({
  id: z.string().optional(),
  cnpj: z.string().optional(),
});

type GetCompanySuppliersProps = z.infer<typeof getCompanySuppliersProps>;

const getCompanyStocksProps = z.object({
  id: z.string().optional(),
  cnpj: z.string().optional(),
});

type GetCompanyStocksProps = z.infer<typeof getCompanyStocksProps>;

const registerProps = z.object({
  name: z.string(),
  email: z.string(),
  cnpj: z.string(),
  type: z.string(),
  headquarters: z.string().optional(),
  phone: z.string(),
  stateRegistration: z.string(),
  taxRegime: z.string(),
  address: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  federativeUnit: z.string(),
  cep: z.string(),
  legalResponsibleId: z.string().optional(),
  suppliers: z.array(z.string()),
});

type RegisterProps = z.infer<typeof registerProps>;

const deleteProps = z.object({
  id: z.string().optional(),
  cnpj: z.string().optional(),
});

type DeleteProps = z.infer<typeof deleteProps>;

const editProps = z.object({
  id: z.string(),
  data: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    cnpj: z.string().optional(),
    type: z.string().optional(),
    headquarters: z.string().nullable().optional(),
    phone: z.string().optional(),
    stateRegistration: z.string().optional(),
    taxRegime: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    neighborhood: z.string().optional(),
    federativeUnit: z.string().optional(),
    cep: z.string().optional(),
    legalResponsibleId: z.string().optional().nullable(),
    suppliers: z.array(z.string()),
  }),
});

type EditProps = z.infer<typeof editProps>;

export const companyRepositorySchema = {
  getOneProps,
  registerProps,
  deleteProps,
  editProps,
  getCompanyUsersProps,
  getCompanySuppliersProps,
  getCompanyStocksProps,
  getAllProps,
  countRegisteredUsers,
  countRegisteredSuppliers,
  countRegisteredStocks,
};

export type CompanyRepositoryInterfaces = {
  GetAllProps: GetAllProps;
  GetOneProps: GetOneProps;
  RegisterProps: RegisterProps;
  DeleteProps: DeleteProps;
  EditProps: EditProps;
  GetCompanyUsersProps: GetCompanyUsersProps;
  GetCompanySuppliersProps: GetCompanySuppliersProps;
  GetCompanyStocksProps: GetCompanyStocksProps;
  CountRegisteredUsers: CountRegisteredUsers;
  CountRegisteredSuppliers: CountRegisteredSuppliers;
  CountRegisteredStocks: CountRegisteredStocks;
};
