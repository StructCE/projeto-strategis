import { z } from "zod";

export const editShelfFormSchema = z.object({
  description: z
    .string()
    .min(3, {
      message: "Descrição/nome deve ter pelo menos 1 caractere.",
    })
    .max(60, {
      message: "Descrição/nome deve ter no máximo 60 caracteres.",
    }),
});

export type EditShelfFormValues = z.infer<typeof editShelfFormSchema>;
