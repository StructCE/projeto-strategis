import { z } from "zod";

const legalRepresentativeSchema = {
  name: z
    .string({
      required_error: "Por favor digite o nome do resposável.",
    })
    .min(2, {
      message: "O nome do responsável deve ter pelo menos 3 caracteres.",
    }),

  role: z
    .string({
      required_error: "Por favor selecione o cargo.",
    })
    .min(1, {
      message: "Por favor selecione o cargo.",
    }),

  email: z
    .string({
      required_error: "Por favor digite o email do responsável.",
    })
    .email({
      message: "Email inválido.",
    }),

  phone: z
    .string()
    .min(8, {
      message:
        "Número de telefone inválido. O formato correto é (XX) XXXXX-XXXX.",
    })
    .max(16, {
      message:
        "Número de telefone inválido. O formato correto é (XX) XXXXX-XXXX.",
    })
    .optional(),
};

export const createCompanyFormSchema = z.object({
  name: z
    .string({ required_error: "Por favor digite o nome." })
    .min(3, { message: "Nome da empresa deve ter pelo menos 3 caracteres." })
    .max(60, { message: "Nome deve ter no máximo 60 caracteres." }),

  cnpj: z
    .string({ required_error: "CNPJ não pode ser vazio." })
    .length(14, { message: "São necessarios 14 dígitos." }),

  suppliers: z.array(z.string()),

  company_type: z.string({
    required_error: "Por favor selecione o tipo da empresa.",
  }),

  company_headquarters: z
    .object({
      name: z
        .string()
        .min(3, "Nome da matriz deve ter pelo menos 3 caracteres."),
      cnpj: z.string().min(14, "CNPJ da matriz deve ter 14 dígitos."),
    })
    .optional(),

  email: z
    .string({
      required_error: "Por favor digite um email.",
    })
    .email({
      message: "Email inválido.",
    }),

  phone: z
    .string({ required_error: "Por favor digite o telefone" })
    .min(8, {
      message:
        "Número de telefone inválido. O formato correto é (XX)XXXXX-XXXX.",
    })
    .max(16, {
      message:
        "Número de telefone inválido. O formato correto é (XX)XXXXX-XXXX.",
    }),

  state_registration: z
    .string({ required_error: "Campo obrigatório" })
    .min(9, { message: "Inscrição Estadual deve ter no minimo 9 caracteres" })
    .max(14, {
      message: "Inscrição Estadual deve ter no máximo 14 caracteres",
    }),

  tax_regime: z.string({
    required_error: "Por favor selecione um regime tributário",
  }),

  address: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, { message: "Endereço deve ter pelo menos 3 caracteres." })
    .max(60, { message: "Endereço deve ter no máximo 60 caracteres." }),

  neighborhood: z
    .string({ required_error: "Campo obrigatório" })
    .min(2, { message: "Endereço deve ter pelo menos 2 caracteres." })
    .max(25, { message: "Endereço deve ter no máximo 25 caracteres." }),

  city: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, { message: "Município deve ter pelo menos 3 caracteres." })
    .max(20, { message: "Município deve ter no máximo 20 caracteres." }),

  state: z.string({
    required_error: "Por favor selecione uma unidade federativa",
  }),

  cep: z
    .string({ required_error: "CEP deve ser obrigatório." })
    .length(8, { message: "São necessarios 8 dígitos" }),

  address_file_XML: z
    .string({
      required_error: "Coloque o endereço local dos arquivos XML",
    })
    .optional(),

  legal_representative: z.object(legalRepresentativeSchema).optional(),
});

export type CreateCompanyFormValues = z.infer<typeof createCompanyFormSchema>;
