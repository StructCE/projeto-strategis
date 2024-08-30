import { z } from "zod";

export const editTypeFormSchema = z.object({
  descricao: z
    .string()
    .min(3, {
      message: "Descrição/nome deve ter pelo menos 3 caracteres.",
    })
    .max(60, {
      message: "Descrição/nome deve ter no máximo 60 caracteres.",
    }),
});

export type EditTypeFormValues = z.infer<typeof editTypeFormSchema>;
