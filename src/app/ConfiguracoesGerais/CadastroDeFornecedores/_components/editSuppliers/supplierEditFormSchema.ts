import { z } from "zod";

export const editSupplierFormSchema = z.object({
  name: z
    .string({
      required_error: "Por favor digite o nome da empresa/fornecedor.",
    })
    .min(2, {
      message: "O nome deve ter pelo menos 2 caracteres.",
    }),

  cnpj: z
    .string({
      required_error: "Por favor digite o CNPJ do fornecedor.",
    })
    .length(18, {
      message: "O CNPJ deve ter 18 caracteres no formato XX.XXX.XXX/0001-XX.",
    })
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
      message: "Formato de CNPJ inválido. Use o formato XX.XXX.XXX/0001-XX.",
    }),

  email: z
    .string({
      required_error: "Por favor digite o email do fornecedor.",
    })
    .email({
      message: "Email inválido.",
    }),

  phone: z
    .string()
    .min(10, {
      message:
        "Número de telefone inválido. O formato correto é (XX)XXXX-XXXX ou (XX)XXXXX-XXXX.",
    })
    .max(16, {
      message:
        "Número de telefone inválido. O formato correto é (XX)XXXX-XXXX ou (XX)XXXXX-XXXX.",
    })
    .optional(),

  state_registration: z
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

  state: z.string({
    required_error: "Por favor selecione a unidade federativa do fornecedor.",
  }),

  cep: z
    .string({
      required_error: "Por favor digite o CEP do fornecedor.",
    })
    .length(9, {
      message: "O CEP deve ter 9 caracteres no formato XXXXX-XXX.",
    })
    .regex(/^\d{5}-\d{3}$/, {
      message: "Formato de CEP inválido. Use o formato XXXXX-XXX.",
    }),
});

export type EditSupplierFormValues = z.infer<typeof editSupplierFormSchema>;
