import { z } from "zod";

export const editProjectFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Descrição/nome deve ter pelo menos 3 caracteres.",
    })
    .max(60, {
      message: "Descrição/nome deve ter no máximo 60 caracteres.",
    }),
});

export type EditProjectFormValues = z.infer<typeof editProjectFormSchema>;