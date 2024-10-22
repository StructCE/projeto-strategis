import { z } from "zod";

export const createCompanyFormSchema = z.object({
  name: z
    .string({ required_error: "Por favor digite o nome." })
    .min(3, { message: "Nome da empresa deve ter pelo menos 3 caracteres." })
    .max(60, { message: "Nome deve ter no máximo 60 caracteres." }),

  cnpj: z
    .string({ required_error: "CNPJ não pode ser vazio." })
    .length(14, { message: "São necessarios 14 dígitos." }),

  suppliers: z.array(z.string()),

  type: z.string({
    required_error: "Por favor selecione o tipo da empresa.",
  }),

  headquarters: z.string(),

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

  stateRegistration: z
    .string({ required_error: "Campo obrigatório" })
    .min(9, { message: "Inscrição Estadual deve ter no minimo 9 caracteres" })
    .max(14, {
      message: "Inscrição Estadual deve ter no máximo 14 caracteres",
    }),

  taxRegime: z.string({
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

  federativeUnit: z.string({
    required_error: "Por favor selecione uma unidade federativa",
  }),

  cep: z
    .string({ required_error: "CEP deve ser obrigatório." })
    .length(8, { message: "São necessarios 8 dígitos" }),

  legalResponsibleId: z
    .string({
      required_error: "Selecione o representante legal da empresa",
    })
    .optional(),
});

export type CreateCompanyFormValues = z.infer<typeof createCompanyFormSchema>;
