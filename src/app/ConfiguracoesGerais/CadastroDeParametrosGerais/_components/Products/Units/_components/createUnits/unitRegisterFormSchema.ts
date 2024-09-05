import { z } from "zod";

export const createUnitFormSchema = z.object({
  description: z
    .string()
    .min(3, {
      message: "Descrição/nome deve ter pelo menos 3 caracteres.",
    })
    .max(60, {
      message: "Descrição/nome deve ter no máximo 60 caracteres.",
    }),
  abbreviation: z.string().max(6, {
    message: "Sigla deve ter no máximo 6 caracteres.",
  }),
});

export type CreateUnitFormValues = z.infer<typeof createUnitFormSchema>;