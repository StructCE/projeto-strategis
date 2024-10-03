import { z } from "zod";

export const createAccountPlanFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Descrição/nome deve ter pelo menos 3 caracteres.",
    })
    .max(60, {
      message: "Descrição/nome deve ter no máximo 60 caracteres.",
    }),

  abbreviation: z
    .string()
    .min(1, {
      message: "Sigla deve ter pelo menos 1 caractere.",
    })
    .max(5, {
      message: "Sigla deve ter no máximo 5 caracteres.",
    }),

  accounts: z
    .array(z.object({ name: z.string() }))
    .min(1, { message: "Selecione uma ou mais contas." }),
});

export type CreateAccountPlanFormValues = z.infer<
  typeof createAccountPlanFormSchema
>;
