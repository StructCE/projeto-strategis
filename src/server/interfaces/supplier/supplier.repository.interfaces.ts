import { z } from "zod";

const getAll = z.object({
  filters: z.object({
    company: z.string(),
    cnpj: z.string(),
    email: z.string(),
    address: z.string(),
  }),
});

type GetAll = z.infer<typeof getAll>;

const createProps = z.object({
  name: z.string(),
  cnpj: z.string(),
  email: z.string(),
  phone: z.string(),
  stateRegistration: z.string(),
  address: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  federativeUnit: z.string(),
  cep: z.string(),
});

type CreateProps = z.infer<typeof createProps>;

const editProps = z.object({
  id: z.string(),
  data: z.object({
    name: z.string().optional(),
    cnpj: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    stateRegistration: z.string().optional(),
    address: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    federativeUnit: z.string().optional(),
    cep: z.string().optional(),
  }),
});

type EditProps = z.infer<typeof editProps>;

const removeProps = z.object({
  id: z.string(),
});

type RemoveProps = z.infer<typeof removeProps>;

export const supplierRepositorySchema = {
  createProps,
  editProps,
  removeProps,
  getAll,
};

export type SupplierRepositoryInterfaces = {
  CreateProps: CreateProps;
  EditProps: EditProps;
  RemoveProps: RemoveProps;
  GetAll: GetAll;
};
