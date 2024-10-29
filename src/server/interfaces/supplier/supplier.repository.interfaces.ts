import { z } from "zod";

const getAll = z
  .object({
    filters: z.object({
      name: z.string().optional(),
      email: z.string().optional(),
      federativeUnit: z.string().optional(),
    }).optional(),
  })
  .optional();

type GetAll = z.infer<typeof getAll>;

const createProps = z.object({
  name: z.string(),
  cnpj: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  stateRegistration: z.string(),
  address: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  federativeUnit: z.string(),
  cep: z.string(),
  contacts: z
    .array(
      z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string().optional(),
      }),
    )
    .optional(),
});

type CreateProps = z.infer<typeof createProps>;

const editProps = z.object({
  id: z.string(),
  data: z.object({
    name: z.string(),
    cnpj: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    stateRegistration: z.string(),
    address: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    federativeUnit: z.string(),
    cep: z.string(),
    contacts: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          email: z.string(),
          phone: z.string().optional(),
        }),
      )
      .optional(),
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
