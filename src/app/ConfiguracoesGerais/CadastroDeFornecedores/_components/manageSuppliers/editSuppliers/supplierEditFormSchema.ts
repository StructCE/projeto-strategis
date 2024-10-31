import { z } from "zod";

const supplierContactSchema = z.object({
  name: z
    .string({
      required_error: "Por favor digite o nome do contato.",
    })
    .min(2, {
      message: "O nome do contato deve ter pelo menos 3 caracteres.",
    }),

  email: z
    .string({
      required_error: "Por favor digite o email do contato.",
    })
    .email({
      message: "Email inválido.",
    }),

  phone: z
    .string({ required_error: "Por favor digite o telefone" })
    .min(10, {
      message:
        "Número de telefone inválido. Insira apenas números incluindo o DDD.",
    })
    .max(11, {
      message:
        "Número de telefone inválido. Insira apenas números incluindo o DDD.",
    })
    .optional(),
});

export const editSupplierFormSchema = z.object({
  name: z
    .string({
      required_error: "Por favor digite o nome da empresa/fornecedor.",
    })
    .min(2, {
      message: "O nome deve ter pelo menos 3 caracteres.",
    }),

  cnpj: z
    .string({ required_error: "CNPJ não pode ser vazio." })
    .length(14, { message: "São necessarios 14 dígitos (apenas números)." }),

  email: z
    .string({
      required_error: "Por favor digite o email do fornecedor.",
    })
    .email({
      message: "Email inválido.",
    }),

  phone: z
    .string({ required_error: "Por favor digite o telefone" })
    .min(10, {
      message:
        "Número de telefone inválido. Insira apenas números incluindo o DDD.",
    })
    .max(11, {
      message:
        "Número de telefone inválido. Insira apenas números incluindo o DDD.",
    })
    .optional(),

  stateRegistration: z
    .string({
      required_error: "Por favor digite a inscrição estadual do fornecedor.",
    })
    .min(9, {
      message: "A inscrição estadual deve ter pelo menos 9 caracteres.",
    }),

  address: z
    .string({
      required_error: "Por favor digite o endereço do fornecedor.",
    })
    .min(5, {
      message: "O endereço deve ter pelo menos 5 caracteres.",
    }),

  neighborhood: z
    .string({
      required_error: "Por favor digite o bairro do fornecedor.",
    })
    .min(2, {
      message: "O bairro deve ter pelo menos 2 caracteres.",
    }),

  city: z
    .string({
      required_error: "Por favor digite o município/cidade do fornecedor.",
    })
    .min(2, {
      message: "A cidade deve ter pelo menos 2 caracteres.",
    }),

  federativeUnit: z
    .string({
      required_error: "Por favor selecione a unidade federativa do fornecedor.",
    })
    .min(1, {
      message: "Por favor selecione a unidade federativa do fornecedor.",
    }),

  cep: z
    .string({ required_error: "CEP deve ser obrigatório." })
    .length(8, { message: "Formato inválido. Digite apenas os números." }),

  contacts: z.array(supplierContactSchema).optional(),
});

export type EditSupplierFormValues = z.infer<typeof editSupplierFormSchema>;
