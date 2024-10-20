import { z } from "zod";

export const editShelfFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Descrição/nome deve ter pelo menos 1 caractere.",
    })
    .max(30, {
      message: "Descrição/nome deve ter no máximo 30 caracteres.",
    }),
});

export type EditShelfFormValues = z.infer<typeof editShelfFormSchema>;
